import React, { useContext, useState,useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { Contextapi } from '../../context/Appcontext';
import logo from "../../assets/logo.png"
import { IoPricetagsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { RiPageSeparator } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineWeb } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { SiSololearn } from "react-icons/si";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { RiLuggageDepositFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import {
  FaHome,
  FaShoppingCart,
  FaFileInvoice,
  FaWallet,
  FaBox,
  FaBook,
  FaUserCircle,
  FaTicketAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdHistory, MdTrackChanges } from 'react-icons/md';
import { AiOutlineDashboard } from 'react-icons/ai';
const Userdashboardleftside = () => {
    const {activesidebar,setactivesidebar}=useContext(Contextapi)
     const [activesubmenu,setactivesubmenu]=useState(false);
    const [activesubmenu2,setactivesubmenu2]=useState(false);
    const [activesubmenu3,setactivesubmenu3]=useState(false);
    const [activesubmenu4,setactivesubmenu4]=useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout function


  const logoutfunction = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your session.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_data");
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };
  

  // Close sidebar
  const closesidebar = () => setactivesidebar(false);
  return (
    <>
    <section className={activesidebar ? 'w-[100%] bg-[#338585] z-[10000] xl:block hidden border-r-[1px] border-[#eee] h-[100%]  relative transition-all duration-300  top-0 left-[-100%]':'w-[100%] z-[1000] h-[100%] border-r-[1px] border-[#eee]  transition-all xl:block hidden duration-300  bg-[#338585] relative left-0 top-0 overflow-y-auto no-scrollbar'}>
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      {/* User Panel Header */}
      <div className="mb-8 flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-lg font-bold">User Panel</h2>
        <span className="bg-red-500 text-sm px-2 py-1 rounded">Free</span>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        <NavLink to="/user-dashboard" className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
        <AiOutlineDashboard size={20} />
        <span>Dashboard</span>
        </NavLink>
          <NavLink to="/my-order"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaShoppingCart size={20} />
          <span>My Order</span>
          </NavLink>
          <NavLink to="/my-invoice"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaFileInvoice size={20} />
          <span>My Invoice</span>
          </NavLink>
          <NavLink to="/deposit" className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <RiLuggageDepositFill size={20} />
          <span>Deposit</span>
          </NavLink>
          <NavLink to="/tracking-order"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <MdTrackChanges size={20} />
          <span>Tracking Order</span>
          </NavLink>
          <NavLink to="/transictions" className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <MdHistory size={20} />
          <span>Transaction History</span>
          </NavLink>
          <NavLink to="/all-product"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaBox size={20} />
          <span>All Product</span>
          </NavLink>
          <NavLink to="/all-course" className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaBook size={20} />
          <span>All Course</span>
          </NavLink>
          <NavLink to="/tutorial"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaUserCircle size={20} />
          <span>Tutorial</span>
          </NavLink>
          <NavLink to="/wallet"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaWallet size={20} />
          <span>My Wallet</span>
          </NavLink>
        <NavLink to="/user-profile"className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaUserCircle size={20} />
          <span>Profile</span>
        </NavLink>
      
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaTicketAlt size={20} />
          <span>Support Ticket</span>
        </li>
        <li onClick={logoutfunction} className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaSignOutAlt size={20} />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
    </section>
    <section className={activesidebar ? ' z-[10453530000] bg-[#338585] w-[60%] xl:hidden block h-[100%] fixed transition-all duration-300 shadow-boxshadow5 border-r-[1px] border-[#eee]  top-0 left-0':'z-[100000] w-[100%] h-[100%] transition-all xl:hidden block duration-300 bg-[#338585] fixed left-[-100%] top-0 shadow-boxshadow5 border-r-[1px] border-[#eee]'}>
       <div onClick={closesidebar} className="cursor-pointer close absolute top-[10px] right-[30px]">
          <button className='text-[25px] hover:text-[#FF5200] transition-all duration-200'><IoClose/></button>
       </div>
       <div className="w-full h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      {/* User Panel Header */}
      <div className="mb-8 flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-lg font-bold">User Panel</h2>
        <span className="bg-red-500 text-sm px-2 py-1 rounded">Free</span>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <AiOutlineDashboard size={20} />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaShoppingCart size={20} />
          <span>My Order</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaFileInvoice size={20} />
          <span>My Invoice</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <MdTrackChanges size={20} />
          <span>Tracking Order</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <MdHistory size={20} />
          <span>Transaction History</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaBox size={20} />
          <span>All Product</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaBook size={20} />
          <span>All Course</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaUserCircle size={20} />
          <span>Tutorial</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaWallet size={20} />
          <span>My Wallet</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaUserCircle size={20} />
          <span>Profile</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaTicketAlt size={20} />
          <span>Support Ticket</span>
        </li>
        <li onClick={logoutfunction} className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer border-b border-gray-700 pb-2">
          <FaSignOutAlt size={20} />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
    </section>
    </>
  )
}

export default Userdashboardleftside