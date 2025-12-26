import { FaUsers, FaBoxOpen, FaMoneyBillAlt, FaChartLine } from "react-icons/fa";
import React from "react";
const activeUser = JSON.parse(localStorage.getItem("user"));


const Dashboard = () => {
  const isAdmin = activeUser.role === "admin"
  const isCashier = activeUser.role === "cashier"
  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg lg:text-2xl font-bold">Dashboard overview</h1>
      </div>

      {/* Overview Cards */}
      <div className={`grid gap-5 mt-6 w-full mb-7
    ${isAdmin ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"}`}>

        {/* Card 1 */}

        {isAdmin && (
          <StatCard
            title="Total Users"
            value="2"
          />
        )}

        {/* Card 2 */}
        {isAdmin && (
          <StatCard
            title="Total Products"
            value="8"
          />
        )}

        {/* Card 3 */}
        {(isAdmin || isCashier) && (
          <StatCard
            title="Total Sales"
            value="19"
            percent="+2%"
            percentColor="bg-yellow-100 text-yellow-700"
            icon={<FaChartLine />}
          />
        )}

        {/* Card 4 */}
        {(isAdmin || isCashier) && (
          <StatCard
            title="Total Transactions"
            value="₦674,526"
            percent="+3%"
            percentColor="bg-purple-100 text-purple-700"
            icon={<FaChartLine />}
          />
        )}
      </div>

      {/* Sales Trend */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:flex-1">
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold text-lg">Sale’s Trend</h2>
            <p className="text-gray-500">This Month ▼</p>
          </div>

          <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            (Chart Placeholder)
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-white p-6 rounded-xl shadow-md w-full">
            <h2 className="font-semibold mb-4 text-lg">Inventory Alerts</h2>

            <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              (Donut Chart Placeholder)
            </div>

            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-orange-400"></span>
                <p>Low Stocks</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-500"></span>
                <p>Out Of Stock</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard

const StatCard = ({ icon, title, value, percent, percentColor }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start w-full">

      <p className="text-gray-600">{title}</p>

      <h2 className="text-3xl font-semibold mt-1">{value}</h2>

      <span
        className={`flex text-sm py-1 mt-1 px-4 justify-between items-center rounded-full font-medium ${percentColor}`}
      >
        {icon} {percent}
      </span>
    </div>
  );
}
