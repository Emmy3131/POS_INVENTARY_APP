import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import { FaEye, FaDownload } from "react-icons/fa";

const Transactions = () => {
  return (
    <div>
    
        <h1 className="font-bold mb-6 text-2xl  bg-white p-2 px-4 rounded-xl shadow">TRANSACTIONS</h1>

        <div class="bg-white shadow rounded-t-xl w-full overflow-hidden">
          <table class="min-w-full border-collapse text-left">
            <thead class="">
              <tr class="text-gray-600 bg-gray-200">
                <th class="px-6 py-3 font-semibold">Invoice ID</th>
                <th class="px-6 py-3 font-semibold">Customer Name</th>
                <th class="px-6 py-3 font-semibold">Amount</th>
                <th class="px-6 py-3 font-semibold">Payment method</th>
                <th class="px-6 py-3 font-semibold">Date</th>
                <th class="px-6 py-3 font-semibold">Status</th>
                <th class="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody id="transList" class="divide-y divide-gray-200">
              <tr id="${tr.id}" class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">1760988239852</td>
                <td class="px-6 py-4 text-gray-700">Emmy</td>
                <td class="px-6 py-4 text-gray-900 font-semibold">₦$:50000</td>
                <td class="px-6 py-4 text-gray-700">card</td>
                <td class="px-6 py-4 text-gray-700">12/23/2025</td>
                <td class="px-6 py-4 text-blue-600 font-medium">active</td>
                <td class="px-6 py-4 flex gap-3">
                  <button id="transDetails" class="text-blue-600 hover:text-blue-800">
                    <FaEye/>
                  </button>
                  <button class="text-gray-700 hover:text-black">
                    <FaDownload/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}
export default Transactions