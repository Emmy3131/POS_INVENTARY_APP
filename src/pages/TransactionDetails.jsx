import { useParams, useNavigate } from "react-router-dom";
import { FaCreditCard, FaArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const TransactionDetails = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const token = localStorage.getItem("token");
  const { transactionId } = useParams();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const getSalesDetails = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${baseUrl}/api/v1/sales/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        setSale(res.data.data.sale);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      getSalesDetails();
    }
  }, [transactionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={10} />
      </div>
    )
  }
  return (
    <div>
      <div className="flex text-2xl font-semibold bg-white p-2 px-4 rounded-xl shadow justify-between mb-4">
        <h1>
          Transaction Details
        </h1>

        <span onClick={() => navigate("/manage/transactions")}>
          <FaArrowAltCircleRight />
        </span>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4 m-auto">

        {/* Transaction Summary */}
        <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <FaCreditCard className="text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold">Transaction</h2>
                <p className="text-sm text-gray-500">ID: {sale._id}</p>
                <p className="text-xs text-gray-400">
                  {new Date(sale.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-green-600">
                ₦{sale.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between flex-wrap gap-4 text-sm">
            <div>
              <p className="text-gray-500">Customer</p>
              <p className="font-medium">{sale.customer}</p>
            </div>

            <div>
              <p className="text-gray-500">Cashier</p>
              <p className="font-medium">{sale.cashier?.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Payment Method</p>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                {sale.paymentMethod}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-4">
          <h3 className="font-semibold">Items ({sale.items.length})</h3>

          {sale.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center gap-4 border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₦{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-semibold">
                ₦{item.total.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>₦{sale.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span>₦{sale.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total Paid</span>
            <span className="text-green-600">
              ₦{sale.amountPaid.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Change</span>
            <span>₦{sale.change.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
