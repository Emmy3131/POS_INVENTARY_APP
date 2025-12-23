import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaTrash, FaMinus, FaPlus, FaTimes, FaBuilding, FaMoneyBill, FaCreditCard } from "react-icons/fa";
import Model from "../components/Modal";
import InputField from "../components/InputField"



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const baseUrl = 'https://pos-inventory-api.vercel.app';
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderSummary, setOrderSummary] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [customerName, setCustomerName] = useState('')
  const [amountPaid, setAmountPaid] = useState(null)


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);

  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!customerName) {
      toast.error("Please enter the customer name");
      return;
    }


    const saleData = {
      cartId,
      paymentMethod,
      customer: customerName,
      amountPaid
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/sales`,
        saleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === "success") {
        console.log(res.data)
        toast.success("Payment successful!");


        handleClearCart();
        setOrderSummary(false);
        setPaymentMethod("");
        setCustomerName("");
      }


    } catch (error) {
      console.error("Sale error:", error);
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };



  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/v1/cart`, {

        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setCartItems(res.data.data.items);
      setCartId(res.data.data.cartId);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to fetch cart items.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDelectCartItem = async (productId) => {

    if (!cartId) {
      toast.error('Cart ID is not available.');
      return;
    }
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/cart/${cartId}/item/${productId}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (res.data.status === 'success') {

        toast.success('Item removed from cart successfully!');
        setCartItems(cartItems.filter(item => item.product !== productId));

      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleQuantityUpdate = async (productId, quantity) => {

    if (!cartId) {
      toast.error('Cart ID is not available.');
      return;
    }
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/cart/${cartId}/item/${productId}`, {
        quantity
      }, {
        'content-type': 'application/json',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (res.data.status === 'success') {
        toast.success('Item quantity increased successfully!');
        setCartItems(items => items.map(item => item.product === productId ? res.data.data.item : item))
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Failed to increase item quantity: ${error.response.data.message}`);
      }
      console.error('Error increasing item quantity:', error);
    }
  };


  const handleClearCart = async () => {
    try {
      setIsLoading(true)
      const res = await axios.delete(
        `${baseUrl}/api/v1/cart/${cartId}/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        console.log("Cart cleared:", res.data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }finally{
      setIsLoading(false)
    }
  };


  const calculateOrderSummary = (items) => {
    let subtotal = 0;

    // Calculate subtotal
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const taxRate = 0.02; // 
    const tax = subtotal * taxRate;

    const discountRate = 0.10; // 
    const discount = subtotal * discountRate;

    const total = subtotal + tax - discount;

    return {
      subtotal,
      tax,
      discount,
      total,
    };
  };
  const summary = calculateOrderSummary(cartItems)

  const openOrderSummary = () => {
    setOrderSummary(true)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Cart</h2>

      {isLoading ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white shadow rounded-xl p-4 mb-4"
              >

                <div className="w-32 h-28 flex-shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>


                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-xl font-bold text-gray-900">₦{item.price}</p>
                </div>


                <div className="flex flex-col items-end">
                  <button onClick={() => handleDelectCartItem(item.product)} className="text-red-500 hover:text-red-700 text-xl mb-2">
                    <FaTrash />
                  </button>

                  <div className="flex items-center bg-gray-200 rounded-lg p-1">
                    <button onClick={() => handleQuantityUpdate(item.product, item.quantity - 1,)} className="text-red-500 px-2">
                      <FaMinus />
                    </button>
                    <button onClick={() => handleQuantityUpdate(item.product, item.quantity + 1)} className="text-blue-600 px-2">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <button
                disabled={isLoading}
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600font-semibold hover:bg-red-200 active:scale-95 transition shadow-sm"
              >
                Clear Cart
                {isLoading &&<Loader size={5}/>}
              </button>

            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div className="w-full lg:w-[300px] bg-white shadow rounded-xl p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">₦{summary.subtotal}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-700">
              <span>Tax</span>
              <span className="font-semibold text-red-600">₦{summary.tax}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-700">
              <span>Discount</span>
              <span className="font-semibold text-green-600">₦{summary.discount}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-gray-900 font-bold text-lg mb-6">
              <span>Order Total</span>
              <span>₦{summary.total}</span>
            </div>

            <button onClick={openOrderSummary} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600">
              Proceed to Payment
            </button>
          </div>

        </div >
      )}

      <Model isOpen={orderSummary} title="Order Summary">
        <div className="relative right-[-20]">
          <div
            onClick={() => setOrderSummary(false)}
            className=" cursor-pointer rounded-full bg-blue-400 p-3 w-[50px] h-[50px] text-center absolute right-0 top-0 flex items-center justify-center"
          >
            <FaTimes className="fa-solid text-[19px] font-bold hover:text-gray-500 fa-arrow-right" />

          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 w-full">

            {/* Title */}
            <div className="text-center mt-3">
              <h2 className="text-3xl font-bold text-gray-900">Payment Method</h2>
              <p className="text-[19px] text-gray-500 font-medium my-4">
                Please Select Your Payment Method
              </p>
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="flex gap-6 justify-center items-center my-6">

              {/* CARD */}
              <label
                className={`flex flex-col items-center w-[180px] bg-white shadow-md rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${paymentMethod === 'card' ? 'bg-green-100 border-2 border-green-600 ' : "hover:bg-green-200"}`}
              >
                <div className="text-[50px] text-green-600">
                  <FaCreditCard />
                </div>

                <InputField
                  name="paymentMethod"
                  value="card"
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                  className="hidden"
                  isRequired={true}
                />

                <span className="mt-2 font-semibold text-gray-700">
                  Card
                </span>
              </label>

              {/* CASH */}
              <label
                className={`flex flex-col items-center w-[180px] bg-white shadow-md rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${paymentMethod === 'cash' ? 'bg-green-100 border-2 border-green-600 ' : "hover:bg-green-200"}`}
              >
                <div className="text-[50px] text-green-600">
                  <FaMoneyBill />
                </div>

                <InputField
                  name="paymentMethod"
                  value="cash"
                  type="radio"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentMethodChange}
                  className="hidden"
                  isRequired={true}
                />

                <span className="mt-2 font-semibold text-gray-700">
                  Cash
                </span>
              </label>

              {/* BANK TRANSFER */}
              <label
                className={`flex flex-col items-center w-[180px] bg-white shadow-md rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${paymentMethod === 'transfer' ? 'bg-green-100 border-2 border-green-600 ' : "hover:bg-green-200"}`}
              >
                <div className="text-[50px] text-green-600">
                  <FaBuilding />
                </div>

                <InputField
                  name="paymentMethod"
                  value="bank transfer"
                  type="radio"
                  checked={paymentMethod === "transfer"}
                  onChange={handlePaymentMethodChange}
                  className="hidden"
                  isRequired={true}
                />

                <span className="mt-2 font-semibold text-gray-700">
                  Bank Transfer
                </span>
              </label>

            </div>


            {/* CUSTOMER NAME */}

            <form onSubmit={handlePaymentSubmit}>
              <InputField
                label="Customer Name"
                placeholder="Customer Name"
                name="customerName"
                isRequired={true}
                readOnly={false}
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}

              />



              {
                paymentMethod === 'cash' &&
                <InputField
                  label="Amount Paid"
                  name="amount"
                  type="number"
                  value={amountPaid}
                  onChange={(e => setAmountPaid(e.target.value))}

                />
              }

              {/* pay button */}
              <button
                type="submit"
                className="outline-none py-2 rounded-lg bg-green-800 mt-5 text-white hover:bg-green-700 shadow-md w-full text-center transition font-bold text-2xl"
              >
                Pay Now
              </button>
            </form>

          </div>
        </div>
      </Model>

    </div >
  );
};

export default Cart;
