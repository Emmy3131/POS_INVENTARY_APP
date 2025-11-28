import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { FaUsers, FaBoxOpen, FaMoneyBillAlt, FaChartLine } from "react-icons/fa";
import React from "react";
import { UserStat } from "./Users";

const Dashboard = () => {
  return (
    <div>
    
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard overview</h1>

          <div className="bg-white px-4 py-2 rounded-xl shadow-md text-blue-600 font-semibold">
            18:01pm | 05/09/2025
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 w-full mb-7">

          {/* Card 1 */}

          <StatCard
            icon={<FaChartLine />}
            title="Total Users"
            value="2"
            percent="+3%"
            percentColor="bg-green-100 text-green-600"
          />



          {/* Card 2 */}
          <StatCard
            title="Total Products"
            value="8"
            percent="+5%"
            percentColor="bg-green-100 text-green-600"
            icon={<FaChartLine />}
          />

          {/* Card 3 */}
          <StatCard
            title="Total Sales"
            value="19"
            percent="+2%"
            percentColor="bg-yellow-100 text-yellow-700"
            icon={<FaChartLine />}
          />

          {/* Card 4 */}
          <StatCard
            title="Total Transactions"
            value="₦674,526"
            percent="+3%"
            percentColor="bg-purple-100 text-purple-700"
            icon={<FaChartLine />}
          />
        </div>

        {/* Sales Trend */}
        <div className="flex gap-10">
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-lg">Sale’s Trend</h2>
              <p className="text-gray-500">This Month ▼</p>
            </div>

            <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              (Chart Placeholder)
            </div>
          </div>

          {/* Inventory Alerts + Chart */}
          <div className="flex gap-5">

            <div className="bg-white p-6 rounded-xl shadow-md">
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
        <div className=" w-full">
          <UserStat className = ""/>
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
