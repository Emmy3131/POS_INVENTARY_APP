import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { FaUser, FaUserSlash } from "react-icons/fa";
import { userData } from "../components/UserList";
import React from "react";

const users = userData;

export const UserStat = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-5">New users</h2>

      {/* Table */}
      <div className="overflow-x-auto">
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
                key={user.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition"
              >
                {/* Avatar + Name */}
                <td className="py-4 px-4 flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>

                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4 text-gray-600">{user.phone}</td>
                <td className="py-4 px-4 text-gray-600">{user.date}</td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className="text-blue-600 font-medium">
                    {user.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-4 flex gap-3">
                  <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                    <FaUser className="text-gray-700" />
                  </button>

                  <button className="bg-red-100 p-2 rounded-lg hover:bg-red-200">
                    <FaUserSlash className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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