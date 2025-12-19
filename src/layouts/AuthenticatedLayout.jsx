import Header from "../components/Header"
import Sidebar from "../components/SideBar"
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


const AuthenticatedLayout = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const token = localStorage.getItem("token");

  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const items =
      res.data?.data?.items ||
      res.data?.data?.cart?.items ||
      [];

    setCartCount(items.length);
    console.log(" Cart count updated:", items.length);
  } catch (error) {
    console.warn(" Cart does not exist yet, defaulting to 0");
    setCartCount(0);
  }
};


  useEffect(() => {
    fetchCartCount();
  }, []);

  useEffect(() => {
    console.log("🛒 Cart count updated:", cartCount);
  }, [cartCount]);

  return (
    <div className="bg-gray-100 h-dvh">
      <Header cartCount={cartCount} />
      <Sidebar />
      <main className="ml-36 mt-[86px] p-6 relative max-w-[85%]">
        <Outlet context={{ refreshCartCount: fetchCartCount }} />
      </main>
    </div>
  )
}

export default AuthenticatedLayout