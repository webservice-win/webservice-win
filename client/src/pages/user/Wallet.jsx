import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import { FaWallet, FaMoneyBillWave, FaHistory, FaExchangeAlt } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import empty_img from "../../assets/empty.png"
import axios from "axios"

const Wallet = () => {
   const navigate=useNavigate();
     const base_url=import.meta.env.VITE_API_KEY_Base_URL;
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [showModal, setShowModal] = useState(false); // State to control modal visibility
   const [depositAmount, setDepositAmount] = useState(''); // State to store deposit amount
 
   // Toggle modal visibility
   const handleDepositClick = () => {
     setShowModal(true);
   };
 
   // Close modal
   const handleCloseModal = () => {
     setShowModal(false);
   };
 
   // Handle deposit form submission
   const handleDepositSubmit = () => {
     console.log('Deposit amount:', depositAmount);
     setShowModal(false); // Close modal after submission
   };
        // ---------------all-websites--------------
const [websites,set_websites]=useState([]);
const get_website=()=>{
    axios.get(`${base_url}/admin/all-websites`)
    .then((res)=>{
        if(res.data.success){
            set_websites(res.data.data);
        }
    }).catch((err)=>{
        console.log(err.name)
    })
};
useEffect(()=>{
    get_website()
},[]);
// ----------course searching system
 const [searchQuery, setSearchQuery] = useState("");
  const filteredCourses = websites.filter(websites =>
websites.category.toString().includes(searchQuery) ||
websites.technology.toString().includes(searchQuery) ||
websites.title.toString().includes(searchQuery) ||
websites.singleLicense.toString().includes(searchQuery) || 
websites.unlimitedLicense.toString().includes(searchQuery) 
);
  // ------------delete course-------------
        const delete_Website=(id)=>{
  const confirm_box=confirm("Are you sure?");
   if(confirm_box){
   axios.delete(`${base_url}/admin/delete-website/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    .then((res)=>{
        if(res.data.success){
            Swal.fire("Success", `${res.data.message}`, "success");
             get_website();
        }
    }).catch((err)=>{
       console.log(err.name)
    })
   }

}
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Userdashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader/> 
       {/* ----------------box-------------- */}
     <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
         <div className='w-full flex justify-between items-center'>
          <div>
                <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>My Wallet</h1>
            <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
               <li>Dashboard</li>
              <li><IoIosArrowForward/></li>
              <li>My Wallet</li>
            </ul>
          </div>
          {/* -------------search-box------------------ */}

  
  
          {/* -------------search-box------------------ */}
         </div>
         {/* ------------------new customer table----------------- */}
  
     <section className="pt-[40px] pb-[30px]">
     <div>
      <div className="w-full bg-white shadow-2xl rounded-2xl p-8">
        {/* Wallet Overview */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaWallet className="mr-3 text-purple-500" /> My Wallet
          </h1>
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90"
            onClick={handleDepositClick}
          >
            Add Funds
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-md">
            <p className="text-sm text-gray-600">Current Balance</p>
            <h2 className="text-4xl font-bold text-blue-700">$1,250.00</h2>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-md">
            <p className="text-sm text-gray-600">Withdrawable Balance</p>
            <h2 className="text-4xl font-bold text-green-700">$950.00</h2>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button className="flex items-center justify-center p-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg">
            <FaMoneyBillWave className="mr-2 text-xl" /> Deposit
          </button>
          <button className="flex items-center justify-center p-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg">
            <AiOutlinePlus className="mr-2 text-xl" /> Add Funds
          </button>
          <button className="flex items-center justify-center p-5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg">
            <AiOutlineMinus className="mr-2 text-xl" /> Withdraw
          </button>
          <button className="flex items-center justify-center p-5 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg">
            Settings
          </button>
        </div>
      </div>

      {/* Modal for Deposit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Deposit Funds</h2>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 mb-4 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={handleDepositSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:opacity-90"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </section>
         {/* ------------------------new customer table-------------------- */}
         </section>
       {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Wallet