import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({ isOpen, closeSideBar }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const activeUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    closeSideBar();
  }, [pathname]);

  const adminLinks = [
    { to: "/manage/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/manage/users", icon: "person", label: "Users" },
    { to: "/manage/products", icon: "shopping_bag", label: "Products" },
    { to: "/manage/makeSale", icon: "sell", label: "MakeSale" },
    { to: "/manage/transactions", icon: "account_balance_wallet", label: "Transactions" },
    { to: "/manage/settings", icon: "settings", label: "Settings" },
  ];

  const cashierLink = [
    { to: "/manage/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/manage/makeSale", icon: "sell", label: "MakeSale" },
    { to: "/manage/transactions", icon: "account_balance_wallet", label: "Transactions" },
    { to: "/manage/settings", icon: "settings", label: "Settings" },
  ];

  const navLinks = activeUser?.role === "admin" ? adminLinks : cashierLink;

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={closeSideBar}
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[86px] left-0 h-[calc(100vh-86px)] w-36 bg-white
          flex flex-col rounded-xl shadow z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="space-y-4 p-3 pb-28 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              onClick={closeSideBar} // 👈 closes sidebar on mobile
              className={`flex flex-col items-center gap-3 px-6 py-2 rounded-lg
                ${
                  pathname === link.to
                    ? "bg-black text-green-400"
                    : "hover:bg-black hover:text-green-400"
                }`}
            >
              <span className="material-icons">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
