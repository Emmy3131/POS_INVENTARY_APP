import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AuthenticatedLayout = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const token = localStorage.getItem("token");

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  // ✅ AUTO CLOSE SIDEBAR ON ROUTE CHANGE (MOBILE)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSideBarOpen(false);
    }
  }, [location.pathname]);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const count = res.data?.data?.items?.length || 0;
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <div className="bg-gray-100 h-dvh">
      <Header
        cartCount={cartCount}
        toggleSidebar={() => setIsSideBarOpen((prev) => !prev)}
      />

      <Sidebar
        isOpen={isSideBarOpen}
        closeSidebar={() => setIsSideBarOpen(false)}
      />

      <main className="lg:ml-36 mt-[86px] p-6 relative lg:max-w-[85%]">
        <Outlet context={{ refreshCartCount: fetchCartCount }} />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
