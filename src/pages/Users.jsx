import { FaUser, FaUserSlash } from "react-icons/fa";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Loader from "../components/Loader";
import SelectField from "../components/SelectField";
import axios from "axios";
import { toast } from "react-toastify";


export const UserStat = ({ }) => {
  const [users, setUsers] = useState([])
  const [addUser, setAddUser] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  const handleAddUser = () => {
    setAddUser(true)
  }
  const handleCancelAddUserModel = () => {
    setAddUser(false)
  }

  const baseUrl = 'https://pos-inventory-api.vercel.app'
  const token = localStorage.getItem('token');

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true)

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      setLoading(false)
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/users`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("User created successfully");

        const createdUser = res.data.data.user;

        setUsers((prev) => [...prev, createdUser]);

        form.reset();
        setAddUser(false);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }

      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your network connection")
      }
    } finally {
      setLoading(false)
    }
  };


  const fetchUsers = async () => {
    setIsFetchingUsers(true)

    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        setUsers(res.data.data.users);
      }

    } catch (error) {
      console.log(
        "Error fetching users:", error
      );
    } finally {
      setIsFetchingUsers(false)

    }
  };

  useEffect(function () {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 204) {
        console.log(res.data)
        toast.success("User deleted successfully");

        // remove from UI
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      setStatusLoadingId(user._id);
      const newStatus =
        user.status === "active" ? "deactivated" : "active";

      const res = await axios.patch(
        `${baseUrl}/api/v1/users/${user._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success(`User ${newStatus}`);

        // Update UI immediately
        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id ? { ...u, status: newStatus } : u
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    } finally {
      setStatusLoadingId(null);
    }
  };



  return (
    <div className="">
      <div className="flex justify-between mb-6 rounded-md shadow-md px-6 items-center">
        <div>
          <h2 className="text-xl font-semibold ">New users</h2>
        </div>
        <div>
          <button onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded-xl shadow font-bold hover:bg-black ml-4 my-2"><i
              className="fa-solid fa-plus"></i>Add User</button>
        </div>
      </div>

      <Modal
        isOpen={addUser}
        title="Add New User"
        onClose={handleCancelAddUserModel}
      >
        <div className="relative overflow-y-scroll">
          <form className="space-y-4" onSubmit={handleSubmitUser}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <InputField
              label="User Name"
              placeholder="User name"
              name="name"
              required
            />

            <InputField
              label="Email"
              placeholder="user email"
              type="email"
              name="email"
            />

            <InputField
              label="Phone Number"
              placeholder="phone number"
              type="number"
              name="phone"
            />

            <InputField
              label="Password"
              placeholder="Input password"
              type="password"
              name="password"
            />

            <InputField
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              name="passwordConfirm"
            />

            <SelectField
              label="Select User role"
              name="role"
              options={[
                { value: "cashier", label: "Cashier" },
                { value: "admin", label: "Admin" }
              ]}
            />

            <InputField
              label="Profile Image"
              type="file"
              name="photo"
            />

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancelAddUserModel}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading && <Loader size={5} />}
              <span className="text-lg">＋</span>
              <span>Submit</span>
            </button>
          </div>

        </form>
        </div>
      </Modal>


      {/* Table */}
      <div className="overflow-x-auto">
        {isFetchingUsers ? (
          <div className="flex justify-center py-10">
            <Loader size={12} />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No users found
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm ">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  {/* Avatar + Name */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{user.name}</span>
                  </td>

                  <td className="py-4 px-4 text-gray-600">{user.email}</td>
                  <td className="py-4 px-4 text-gray-600">{user.phone}</td>

                  {/* Date */}
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-4 flex gap-3">
                    <button
                      disabled={statusLoadingId === user._id}
                      onClick={() => handleToggleUserStatus(user)}
                      className={`p-2 rounded-lg transition ${user.status === "active"
                        ? "bg-green-100 hover:bg-green-200"
                        : "bg-gray-200 hover:bg-gray-300"
                        }disabled:opacity-50`}
                    >
                      {statusLoadingId === user._id ? (
                        <Loader size={4} />
                      ) : user.status === "active" ? (
                        <FaUser className="text-green-600" />
                      ) : (
                        <FaUserSlash className="text-gray-600" />
                      )}
                    </button>


                    <button onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-100 p-2 rounded-lg hover:bg-red-200">
                      <FaUserSlash className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}



      </div>
    </div>



  )
}
const Users = () => {

  return (
    <div>
      <UserStat />
    </div>
  )
}

export default Users