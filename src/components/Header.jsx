import { IoCartOutline } from "react-icons/io5";
import OIP from "../assets/images/OIP.webp";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa"
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utilityFunctions/logout";
import Loader from "./Loader";


function Header({ cartCount, toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleDropdown = () => { setIsOpen(!isOpen); };
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const dropdownRef = useRef(null)
  const baseUrl = "https://pos-inventory-api.vercel.app";

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser(navigate);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div
      className="fixed w-full z-20 top-0 left-0 bg-white shadow-md flex items-center justify-between px-6 py-[18px] rounded-xl">
      <div className="text-2xl font-bold text-gray-700 flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-700"
        >
          <FaBars />
        </button>
        <div
          className="text-2xl text-green-600 bg-black p-2 w-[50px] h-[50px] flex items-center justify-center rounded-full">
          <i className="fa-solid fa-cash-register"></i>
          <img src={OIP} className="w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1>POS</h1>
          <span className="text-green-400 text-sm truncate max-w-[90px] sm:max-w-[140px] md:max-w-[200px] lg:text-[17px]">INVENTERY MACHINE</span>
          <div className="">
            <p className="text-sm opacity-50 absolute"></p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block flex rounded-xl shadow-sm border border-green-400 bg-white p-3 w-[500px] justify-between">
        <input type="search" className=" outline-0 border-0 w-full" placeholder="Search" />
        <img className="w-[20px]" src="./utilityImages/searchIcon.png" alt="" />
      </div>

      <div className="flex items-center space-x-7">

        <Link to='/manage/cart' className="flex bg-gray-100 p-2 rounded-full gap-1 justify-center items-center">
          <IoCartOutline className="text-gray-600 text-xl cursor-pointer" />
          {cartCount > 0 && (
            <span className="text-blue-950 text-[17px]">
              {cartCount}
            </span>
          )}

        </Link>

        <div ref={dropdownRef} className="relative inline-block text-left">
          {/* Trigger */}
          <span onClick={() => handleDropdown()} id="profile-btn" className="flex gap-2 items-center cursor-pointer">
            <img id="userProfilePic" className="w-[30px] h-[30px] rounded-full" src={user && user.photo} alt="user" />
            <p className="hidden lg:block text-sm font-medium truncate whitespace-nowrap m-w-[30px]" id="userName">{user && user.name}</p>
            <IoIosArrowDown />
          </span>

          {/* Dropdown Menu  */}
          {isOpen && (
            <div id="dropdown-menu"
              className=" absolute text-center right-[5px]  mt-[10px] w-30 bg-white rounded-lg shadow-lg border-0">
              <div className="py-2">
                <Link to="/manage/settings" id="profileLink" onClick={() => setIsOpen(false)}>
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</span>
                </Link>
                <div onClick={() => {
                  setIsOpen(false);
                  handleLogout();}}
                  >
                    <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Logout
                      {loading && <Loader size={5} />}
                    </span>
                </div>
            </div>
            </div>
          )}
      </div>

    </div>
      {/* cart model start */ }

    </div >
  )
}
export default Header


