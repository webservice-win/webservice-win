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
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const user_info=JSON.parse(localStorage.getItem("user_data"));

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [depositHistory, setDepositHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url=import.meta.env.VITE_API_KEY_Base_URL;
  // Replace with your backend base URL
  const userId = JSON.parse(localStorage.getItem("user_data"))._id;

  const statusColors = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get(`${base_url}/deposits`, {
          params: { userId },
        });
        if (response.data.success) {
          setDepositHistory(response.data.deposits);
        } else {
          setError("Failed to fetch deposits.");
        }
      } catch (err) {
        setError("An error occurred while fetching deposits.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  const filteredDeposits = depositHistory
    .filter((deposit) => {
      const matchesSearch = deposit.gatewayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "All" || deposit.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
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
         <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-left">Deposit History</h1>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Provider"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-[30%] focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        >
          <option value="All">All</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <th className="px-4 py-[12px] text-left text-[17px] font-semibold">
                Date
              </th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">
                Provider
              </th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">
                Transaction
              </th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">
                Status
              </th>
              <th className="px-4 py-2 text-left text-[17px] font-semibold">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.map((deposit, index) => (
              <tr
                key={deposit._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-100 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(deposit.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {deposit.amount}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {deposit.gatewayName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {deposit.transactionId}
                </td>
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
                  <NavLink to={`/deposit-invoice/${deposit._id}`}>
                  <button className="px-3 py-[10px] bg-indigo-500 text-white text-[17px] font-medium rounded-lg hover:bg-indigo-600 transition">
                    Details
                  </button>
                  </NavLink>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
     </section>
     
     
          </section>
     </section>
     </section>

  )
}

export default Deposit