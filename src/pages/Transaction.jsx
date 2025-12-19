import { FaEye, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Transactions = () => {
  const baseUrl = 'https://pos-inventory-api.vercel.app';
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const activeUser = JSON.parse(localStorage.getItem("user"));

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/v1/sales`, {

        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setTransactions(res.data.data.sales)
      console.log(res.data);


    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to fetch cart items.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={10} />
      </div>
    )
  }


  return (
    <div>

      <h1 className="font-bold mb-6 text-2xl  bg-white p-2 px-4 rounded-xl shadow">TRANSACTIONS</h1>

      <div class="bg-white shadow rounded-t-xl w-full overflow-hidden">
        <table class="min-w-full border-collapse text-left">
          <thead class="">
            <tr class="text-gray-600 bg-gray-200">
              {activeUser.role === 'admin' && <th class="px-6 py-3 font-semibold">Cashier</th>}
              <th class="px-6 py-3 font-semibold">Customer Name</th>
              <th class="px-6 py-3 font-semibold">Amount</th>
              <th class="px-6 py-3 font-semibold">Payment method</th>
              <th class="px-6 py-3 font-semibold">Date</th>
              <th class="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody id="transList" class="divide-y divide-gray-200">

            {transactions.map((item) => (
              <tr key={item._id} class="hover:bg-gray-50">
                {activeUser.role === 'admin' && <td class="px-6 py-4 font-medium text-gray-900">{item.cashier.name}</td>}
                <td class="px-6 py-4 text-gray-700">{item.customer}</td>
                <td class="px-6 py-4 text-gray-900 font-semibold">₦{item.totalAmount.toLocaleString()}</td>
                <td class="px-6 py-4 text-gray-700">{item.paymentMethod}</td>

                <td class="px-6 py-4 text-gray-700">{moment(item.createdAt).fromNow()}</td>

                <td class="px-6 py-4 flex gap-3">
                  <Link to={`${item._id}`} class="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </Link>

                  <button class="text-gray-700 hover:text-black">
                    <FaDownload />
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
export default Transactions