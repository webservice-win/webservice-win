import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { FaTrophy } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import empty_img from "../../assets/empty.png"
import axios from "axios"
const Deposit = () => {
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
   const depositHistory = [
    { id: 1, date: "2025-01-15", amount: "$100.00", provider: "PayPal", transaction: "TXN12345", status: "Completed" },
    { id: 2, date: "2025-01-14", amount: "$50.00", provider: "Stripe", transaction: "TXN12346", status: "Pending" },
    { id: 3, date: "2025-01-13", amount: "$200.00", provider: "Bank Transfer", transaction: "TXN12347", status: "Failed" },
    { id: 4, date: "2025-01-12", amount: "$150.00", provider: "Payoneer", transaction: "TXN12348", status: "Completed" },
    { id: 5, date: "2025-01-11", amount: "$300.00", provider: "Revolut", transaction: "TXN12349", status: "Pending" },
  ];

  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

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
  
         {/* ------------------new customer table----------------- */}
         <div className="p-4">
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">Amount</th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">Provider</th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">Transaction</th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {depositHistory.map((deposit, index) => (
              <tr
                key={deposit.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-100 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{deposit.date}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{deposit.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{deposit.provider}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{deposit.transaction}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[deposit.status]
                    }`}
                  >
                    {deposit.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <button
                    className="px-3 py-[10px] bg-indigo-500 text-white text-[17px] font-medium rounded-lg hover:bg-indigo-600 transition"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
     </section>
     
     
          </section>
     </section>
     </section>

  )
}

export default Deposit