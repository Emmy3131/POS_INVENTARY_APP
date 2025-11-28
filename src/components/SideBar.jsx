import { Link, useLocation } from "react-router-dom"
const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    { to: '/manage/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { to: '/manage/users', icon: 'person', label: 'Users' },
    { to: '/manage/products', icon: 'shopping_bag', label: 'Products' },
    { to: '/manage/makeSale', icon: 'sell', label: 'Make Sale' },
    { to: '/manage/transactions', icon: 'account_balance_wallet', label: 'Transactions' },
    { to: '/manage/settings', icon: 'settings', label: 'Settings' },
  ];
  return (
    <aside className="w-36 h-screen overflow-y-scroll fixed top-[90px] bg-white flex flex-col rounded-xl shadow">
      <nav className="space-y-4 p-3 pb-11">
        {navLinks.map(link => (
          <Link to={link.to} key={link.to}
            className={`nav-link flex flex-col items-center gap-3 px-6 py-2 ${pathname === link.to ? 'bg-black text-green-400' : 'hover:bg-black hover:text-green-400'}  rounded-lg`}>
            <span className="material-icons">{link.icon}</span> {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar