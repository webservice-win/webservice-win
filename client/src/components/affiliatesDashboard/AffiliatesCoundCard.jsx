import React,{useState,useEffect} from "react";
import { FaHandshake } from "react-icons/fa";
import { PiHandDepositBold, PiHandWithdrawBold } from "react-icons/pi";
import { BiTransferAlt } from "react-icons/bi";
import CAStatesCard from "./CAStatesCard";
import axios from "axios";
const AffiliatesCoundCard = () => {
  const stats = [
    {
      title: "Deposit Balance",
      amount: 0,
      Icon: PiHandDepositBold,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // " bg-[#3c8dbc]",
    },
    {
      title: "my order",
      amount: 0,
      Icon: PiHandWithdrawBold,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#00a65a]",
    },
    {
      title: "Due Amount",
      amount: 0,
      Icon: FaHandshake,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#f39c12]",
    },
    {
      title: "Paid Amount",
      amount: 0,
      Icon: BiTransferAlt,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#dd4b39]",
    },
  ];
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  // Replace with your backend base URL
  const user = JSON.parse(localStorage.getItem("user_data"));
  const [user_information,setuser_information]=useState([]);
const get_website=()=>{
    axios.get(`${base_url}/user/${user._id}`)
    .then((res)=>{
        if(res){
          setuser_information(res.data.data);
        }
    }).catch((err)=>{
        console.log(err.name)
    })
};
useEffect(()=>{
    get_website()
},[]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div
             className={`flex items-center justify-between p-4 rounded-md shadow-md bg-gradient-to-t from-red-600 to-black text-white`}
           >
             <div className="flex flex-col gap-3">
               <p className="text-2xl font-[500]">{user_information.due_balance} $</p>
               <h3 className="text-sm">Total Due</h3>
             </div>
             <FaHandshake className="text-6xl text-white opacity-15" />
           </div>
           <div
             className={`flex items-center justify-between p-4 rounded-md shadow-md bg-gradient-to-t from-red-600 to-black text-white`}
           >
             <div className="flex flex-col gap-3">
               <p className="text-2xl font-[500]">{user_information.deposit_balance} $</p>
               <h3 className="text-sm">Deposit Balance</h3>
             </div>
             <PiHandDepositBold className="text-6xl text-white opacity-15" />
           </div>
           <div
             className={`flex items-center justify-between p-4 rounded-md shadow-md bg-gradient-to-t from-red-600 to-black text-white`}
           >
             <div className="flex flex-col gap-3">
               <p className="text-2xl font-[500]">{user_information.total_order} $</p>
               <h3 className="text-sm">Total Order</h3>
             </div>
             <PiHandDepositBold className="text-6xl text-white opacity-15" />
           </div>
           <div
             className={`flex items-center justify-between p-4 rounded-md shadow-md bg-gradient-to-t from-red-600 to-black text-white`}
           >
             <div className="flex flex-col gap-3">
               <p className="text-2xl font-[500]">{user_information.paid_amount} $</p>
               <h3 className="text-sm">Total Paid</h3>
             </div>
             <PiHandDepositBold className="text-6xl text-white opacity-15" />
           </div>
    </div>
  );
};

export default AffiliatesCoundCard;
