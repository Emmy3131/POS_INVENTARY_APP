import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaPrint } from "react-icons/fa";

const TransactionReceipt = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const token = localStorage.getItem("token");
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSalesReceipt = async () => {
    try {
      setLoading(true);
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
      console.error("Receipt Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      getSalesReceipt();
    }
  }, [transactionId]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // restore React
  };

  if (loading) return <p className="p-4">Loading receipt...</p>;
  if (!sale) return <p className="p-4 text-red-500">Receipt not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/manage/transactions")} className="flex items-center gap-2 text-sm">
          <FaArrowLeft /> Back
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPrint /> Print
        </button>
      </div>

      {/* Receipt */}
      <div
        ref={printRef}
        className="max-w-sm mx-auto bg-white p-4 rounded shadow text-sm"
      >
        <h1 className="text-center font-bold text-lg mb-2">
          POS RECEIPT
        </h1>

        <p className="text-center text-xs mb-4">
          {new Date(sale.createdAt).toLocaleString()}
        </p>

        <div className="border-t border-b py-2 mb-2">
          <p>
            <strong>Transaction ID:</strong>
            <br /> {sale._id}
          </p>
          <p>
            <strong>Cashier:</strong> {sale.cashier?.name}
          </p>
          <p>
            <strong>Customer:</strong> {sale.customer}
          </p>
        </div>

        {/* Items */}
        <div className="mb-2">
          {sale.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-xs mb-1"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₦{item.total.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-2 text-xs">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{sale.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₦{sale.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₦{sale.totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Paid</span>
            <span>₦{sale.amountPaid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Change</span>
            <span>₦{sale.change.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-center text-xs mt-4">
          Thank you for your purchase 🙏
        </p>
      </div>
    </div>
  );
};

export default TransactionReceipt;
