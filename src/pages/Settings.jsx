import axios from "axios";
import { useState, useEffect } from "react";
import { FaUser, } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utilityFunctions/logout";
import Loader from "../components/Loader";

const Settings = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("profile");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("")
  const navigate = useNavigate()


  const getMyProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === "success") {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);


  const updateMyPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.patch(
        `${baseUrl}/api/v1/users/updateMyPassword`,
        {
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("Password Updated Successfully")
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        logoutUser(navigate)

      }
    } catch (error) {
      console.error(error);

    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = e.target
      const formData = new FormData(form)

      const res = await axios.patch(`${baseUrl}/api/v1/users/updateMe`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      )
      if (res.data.status === 'success') {
        console.log(res.data)
        const updatedUser = res.data.data.user
        setUser(updatedUser)

        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");

      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false)
    }
  }
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };



  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center relative top-2 mb-6 bg-white p-2 px-4 rounded-xl shadow py-3">
        <h1 className="text-2xl font-semibold">
          Account settings
        </h1>

      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-10">

        {/* Sidebar Buttons */}
        <div className="w-full md:w-1/4 bg-white  h-fit shadow-md rounded-2xl p-4 flex flex-col gap-2">

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 p-3 rounded-lg font-semibold transition shadow-md 
              ${activeTab === "profile" ? "bg-green-500 text-white" : "text-gray-700"}
            `}
          >
            <FaUser /> Profile Settings
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 p-3 rounded-lg font-semibold transition shadow-md 
              ${activeTab === "password" ? "bg-green-500 text-white" : "text-gray-700"}
            `}
          >
            <MdPassword /> Password
          </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">

          {/* =============== PROFILE SECTION =============== */}
          {activeTab === "profile" && (
            <div className="bg-white shadow-md rounded-2xl p-4 transition-all duration-300">

              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center justify-between rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-center gap-6">
                  <img
                    id="settingsProfilePicture"
                    src={previewImage || user?.photo || "/avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />

                  <div>
                    <h2 id="profileName" className="text-xl font-bold text-gray-800">
                      {user?.name}
                    </h2>
                    <p id="profilePhone" className="text-gray-600 text-sm">{user?.phone}</p>
                    <p id="profileEmail" className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <label
                    htmlFor="settingsProfileImageInput"
                    className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 shadow cursor-pointer"
                  >
                    Upload New Photo
                  </label>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleUserUpdate} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none"
                    defaultValue={user?.name}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Phone number</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none"
                    defaultValue={user?.phone}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full rounded-full border border-gray-100 p-3"
                    defaultValue={user?.email}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">ID</label>
                  <input
                    type="text"
                    className="w-full rounded-full border border-gray-100 p-3 text-gray-400"
                    readOnly
                    defaultValue={user?._id}
                  />
                </div>

                <input
                  id="settingsProfileImageInput"
                  className="hidden"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleImagePreview}
                />


                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-medium">Role</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full rounded-full border border-gray-100 p-3 text-gray-400"
                    defaultValue={user?.role}
                  />
                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="reset"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 shadow"
                  >
                    Cancel
                  </button>

                  <button type="submit" disabled={loading} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold shadow ${loading
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"} `} >
                    {loading ? (
                      <>
                        <Loader size={5} />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                </div>
              </form>
            </div>
          )}

          {/* =============== PASSWORD SECTION =============== */}
          {activeTab === "password" && (
            <div className="bg-white shadow-md rounded-2xl p-6 transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Change password</h2>

              <form onSubmit={updateMyPassword} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Old password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-full border border-gray-200 p-3"
                    placeholder="Enter old password"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Enter new password</label>
                    <input
                      value={newPassword}
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-full border border-gray-200 p-3"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Confirm password</label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      className="w-full rounded-full border border-gray-200 p-3"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    id="settingsChangePassword"
                    type="submit"
                    className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
