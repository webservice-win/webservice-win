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
const Transiction = () => {
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
        // ---------------all-websites--------------
        const transactions = [
          {
            id: 1,
            date: "2025-01-20",
            transactionId: "TXN12345",
            description: "Payment for order ORD12345",
            amount: "$500.00",
            status: "Success",
          },
          {
            id: 2,
            date: "2025-01-19",
            transactionId: "TXN12346",
            description: "Refund for order ORD12346",
            amount: "-$300.00",
            status: "Refunded",
          },
          {
            id: 3,
            date: "2025-01-18",
            transactionId: "TXN12347",
            description: "Payment for order ORD12347",
            amount: "$450.00",
            status: "Pending",
          },
          {
            id: 4,
            date: "2025-01-17",
            transactionId: "TXN12348",
            description: "Payment for order ORD12348",
            amount: "$700.00",
            status: "Failed",
          },
          {
            id: 5,
            date: "2025-01-16",
            transactionId: "TXN12349",
            description: "Payment for order ORD12349",
            amount: "$250.00",
            status: "Success",
          },
        ];
      
        const statusColors = {
          Success: "bg-green-100 text-green-700",
          Refunded: "bg-blue-100 text-blue-700",
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
     <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Date</th>
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Transaction ID</th>
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Description</th>
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Amount</th>
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-purple-100 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{transaction.date}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{transaction.transactionId}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{transaction.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{transaction.amount}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[transaction.status]
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
         </section>
       {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Transiction