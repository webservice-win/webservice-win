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
import { FaMoneyCheck } from "react-icons/fa";
import axios from "axios"
const Dashboard = () => {
   const navigate=useNavigate();
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
   const [orders, setOrders] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [pending_order,setpending_order]=useState([])
  const admin_info = JSON.parse(localStorage.getItem("admin_data"));
  const [pending_deposit,set_pending_deposit]=useState([]);
  const [total_customer,set_totalcustomer]=useState([])
  // ---------------all-feedback--------------
  const get_orders = () => {
    axios
      .get(`${base_url}/admin/all-orders`)
      .then((res) => {
        if (res.data.success) {
            setOrders(res.data.data);
            setpending_order(res.data.pending_order)
            console.log(res.data.pending_order);
            set_pending_deposit(res.data.pending_deposit);
            set_totalcustomer(res.data.total_customer)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_orders();
  }, []);
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       {/* ----------------box-------------- */}
<section className="pt-[20px] lg:py-[30px] px-[20px] grid grid-cols-1 lg:grid-cols-3 gap-[15px] lg:gap-[20px]">
  <div className="h-auto w-full shadow-md rounded-[10px] border-[1px] border-[#eee] overflow-hidden bg-white relative p-5">
    {/* Background Pattern */}
    <div className="absolute top-0 right-0">
      <img src="https://spruko.com/demo/xintra/blazor/web-app/dist/assets/css/media-73-7NMLD3WI.png" alt="Background pattern" className="opacity-20 rotate-[190deg]" />
    </div>
    {/* Icon */}
    <div className="w-[70px] h-[70px] bg-[#ECEEFE] rounded-full p-[9px]">
      <div className="w-full h-full  bg-[#5C67F7] text-white rounded-full flex items-center justify-center">
       <SiSololearn className='text-[25px]'/>
      </div>
    </div>
    {/* Text Content */}
    <div className="mt-4">
      <h2 className="text-gray-600 font-medium text-[18px] mb-[8px]">Pending Orders</h2>
      <p className="text-2xl font-bold text-gray-800">{pending_order?.length}</p>
    </div>
  </div>
  <div className="h-auto w-full shadow-md border-[1px] border-[#eee] rounded-[10px] overflow-hidden bg-white relative p-5">
    {/* Background Pattern */}
    <div className="absolute top-0 right-0">
      <img src="https://spruko.com/demo/xintra/blazor/web-app/dist/assets/css/media-73-7NMLD3WI.png" alt="Background pattern" className="opacity-20 rotate-[190deg]" />
    </div>
    {/* Icon */}
    <div className="w-[70px] h-[70px] bg-[#FFEEF5] rounded-full p-[9px]">
      <div className="w-full h-full  bg-[#FF5D9F] text-white rounded-full flex items-center justify-center">
        <FaMoneyCheck className='text-[25px]'/>
      </div>
    </div>
    {/* Text Content */}
    <div className="mt-4">
      <h2 className="text-gray-600 font-medium text-[18px] mb-[8px]">Pending Deposits</h2>
      <p className="text-2xl font-bold text-gray-800"><i className="fa-solid fa-bangladeshi-taka-sign mr-[5px]" />{pending_deposit?.length}</p>
    </div>
  </div>
  <div className="h-auto w-full shadow-md border-[1px] border-[#eee] rounded-[10px] overflow-hidden bg-white relative p-5">
    {/* Background Pattern */}
    <div className="absolute top-0 right-0">
      <img src="https://spruko.com/demo/xintra/blazor/web-app/dist/assets/css/media-73-7NMLD3WI.png" alt="Background pattern" className="opacity-20 rotate-[190deg]" />
    </div>
    {/* Icon */}
    <div className="w-[70px] h-[70px] bg-[#FFF3F0] rounded-full p-[9px]">
      <div className="w-full h-full  bg-[#FF8E6F] text-white rounded-full flex items-center justify-center">
        <FaRegAddressCard className='text-[25px]'/>
      </div>
    </div>
    {/* Text Content */}
    <div className="mt-4">
      <h2 className="text-gray-600 font-medium text-[18px] mb-[8px]">Customers</h2>
      <p className="text-2xl font-bold text-gray-800">{total_customer?.length}</p>
    </div>
  </div>
</section>
{/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Dashboard