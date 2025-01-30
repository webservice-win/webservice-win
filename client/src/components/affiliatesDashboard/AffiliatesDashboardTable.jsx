import React,{useState,useEffect} from "react";
import AffiliatesTable from "./AffiliatesTable";
import Userads from "./Userads";

const AffiliatesDashboardTable = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  // Replace with your backend base URL
  const user_info = JSON.parse(localStorage.getItem("user_data"));

  const statusColors = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };
  console.log(user_info)
const [transiction,set_transiction]=useState([])
const fetchDeposits = async () => {
  axios.get(`${base_url}/deposit/${user_info._id}`)
  .then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
};
  useEffect(() => {
    fetchDeposits();
  }, []);
  console.log(transiction)
  return (
    <>
      
      <div className="px-2 pt-4">
        <div className="bg-[#222222] py-3">
          <h1 className="text-2xl font-bold text-center text-white">
            Today Offer ads
          </h1>
        </div>
        <Userads/>
      </div>
    </>
  );
};

export default AffiliatesDashboardTable;
