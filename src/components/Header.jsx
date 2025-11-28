import { IoCartOutline } from "react-icons/io5";
import OIP from "../assets/images/OIP.webp";
import emmy from "../assets/images/userq.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div
      className="fixed w-full z-20 top-0 left-0 bg-white shadow-md flex items-center justify-between px-6 py-[18px] rounded-xl">
      <div className="text-2xl font-bold text-gray-700 flex items-center space-x-3">
        <div
          className="text-2xl text-green-600 bg-black p-2 w-[50px] h-[50px] flex items-center justify-center rounded-full">
          <i className="fa-solid fa-cash-register"></i>
          <img src={OIP} className="w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1>POS</h1>
          <span className="text-green-400 text-md text-[17px]">INVENTERY MACHINE</span>
          <div className="">
            <p id="welcomeMassage" className="text-sm opacity-50 absolute"></p>
          </div>
        </div>
      </div>

      <div className="flex rounded-xl shadow-sm border border-green-400 bg-white p-3 w-[500px] justify-between">
        <input type="text" className="outline-0 border-0 w-full" placeholder="Search" />
        <img className="w-[20px]" src="./utilityImages/searchIcon.png" alt="" />
      </div>

      <div className="flex items-center space-x-7">

        <Link to='/cart' className="flex bg-gray-100 p-2 rounded-full gap-1 justify-center items-center">

          <IoCartOutline className="text-gray-600 text-xl cursor-pointer" />
          <p className="text-blue-950 text-[17px]">0</p>
        </Link>
        <div className="relative inline-block text-left">
          {/* Trigger */}
          <span id="profile-btn" className="flex gap-2 items-center cursor-pointer">
            <img id="userProfilePic" className="w-[30px] h-[30px] rounded-full" src={emmy} alt="user" />
            <p id="userName">Anyanwu Emmanuel</p>
            <IoIosArrowDown onClick={() => handleDropdown()} />
          </span>

          {/* Dropdown Menu  */}
          {isOpen && (
            <div id="dropdown-menu"
              className=" absolute text-center right-[5px]  mt-[10px] w-30 bg-white rounded-lg shadow-lg border-0">
              <div className="py-2">
                <div id="profileLink">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</span>
                </div>
                <div id="loggedOut">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
      {/* cart model start */}
     
    </div>
  )
}
export default Header


