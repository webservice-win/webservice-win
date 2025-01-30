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
const Myorder = () => {
   const navigate=useNavigate();
     const base_url=import.meta.env.VITE_API_KEY_Base_URL;
   const user_info=JSON.parse(localStorage.getItem("user_data"));

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
const [orders,set_orders]=useState([]);
const get_website=()=>{
    axios.get(`${base_url}/user-order/${user_info._id}`)
    .then((res)=>{
        if(res.data.success){
          set_orders(res.data.data);
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
  const filteredCourses = orders.filter(orders =>
    orders.product_price.toString().includes(searchQuery) ||
    orders.provider_name.toString().includes(searchQuery) ||
    orders.payeer_number.toString().includes(searchQuery) ||
    orders.transiction.toString().includes(searchQuery) || 
    orders.status.toString().includes(searchQuery) 
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
                <h1 className='text-[20px] lg:text-[24px] font-[600] mb-[8px]'>Order List</h1>
          </div>
          {/* -------------search-box------------------ */}
     {
      orders.length > 0 ?       <div className="w-[30%]">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative w-[100%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full outline-none px-4 py-[12px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search order"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
  :""
     }
  
  
          {/* -------------search-box------------------ */}
         </div>
         {/* ------------------new customer table----------------- */}
  
     <section className="pt-[40px] pb-[30px]">
         {
          orders.length > 0 ?     <div className="relative overflow-x-auto border-[1px] border-[#eee] rounded-[5px]">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l border-r border-b border-gray-200 dark:border-gray-700 overflow-hidden">
  <thead className="text-xs text-white uppercase bg-indigo-600 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
    <tr>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Product Name
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Package
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Price
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Sender Number
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
       Transiction
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Payment Method
      </th>
          <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Status
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Paid Amount
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Due Amount
      </th>
      <th
        scope="col"
        className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-semibold text-nowrap"
      >
        Download
      </th>
    </tr>
  </thead>
  <tbody>
    {filteredCourses.map((data, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0
            ? "bg-white dark:bg-gray-800"
            : "bg-gray-50 dark:bg-gray-900"
        } border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700`}
      >
        <td className="w-32 p-4 border-r border-gray-200 dark:border-gray-700 font-bangla_font text-[17px]">
          {data?.product_name}
        </td>
        <td className="w-32 p-4 border-r border-gray-200 dark:border-gray-700 font-bangla_font text-[17px]">
          {data?.package_name}
        </td>
        <td className="px-6 py-2 text-[16px] font-medium whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
          ${data?.product_price}
        </td>
        <td className="px-6 py-2 text-[16px] font-medium whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
          {data?.payeer_number}
        </td>
        <td className="px-6 py-2 text-[16px] font-medium whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
          {data?.transiction}
        </td>
        
        <td className="px-6 py-2 text-[16px] font-medium whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
          {data?.provider_name}
        </td>
        <td
          className={`px-6 py-2 text-[16px] font-medium whitespace-nowrap border-r border-gray-200 dark:border-gray-700 rounded-lg text-center ${
            data.status === "processing"
              ? "text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : data.status === "completed"
              ? "text-green-600 dark:bg-green-900 dark:text-green-300"
              : data.status === "failed"
              ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
              : "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {data?.status}
        </td>
        <td
          className={`px-6 py-2 text-[16px] font-medium whitespace-nowrap border-r border-gray-200 dark:border-gray-700 ${
            data.paid > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${data?.paid}
        </td>
        <td
          className={`px-6 py-2 text-[16px] font-medium whitespace-nowrap border-r border-gray-200 dark:border-gray-700 ${
            data.due_payment > 0 ? "text-red-600" : "text-red-600"
          }`}
        >
          ${data?.due_payment}
        </td>
        {data.status === "completed" ? (
          <td className="px-6 py-2 text-[16px] font-medium whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
            {/* Download link or button */}
            <a href={`https://i.imgur.com/pScFoho.png`} download className="text-indigo-400 underline">
              Download Zip File
            </a>
          </td>
        ) : (
          ""
        )}
      </tr>
    ))}
  </tbody>
</table>


          </div>:<section className='w-full flex justify-center items-center'>
               <div>
                <img className='w-[100px] lg:w-[300px]' src={empty_img} alt="" />
                <h2 className='text-[18px] lg:text-[25px] text-center font-[500] mt-[5px]'>Orders are empty!</h2>
               </div>
          </section>
         }
        </section>
         {/* ------------------------new customer table-------------------- */}
         </section>
       {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Myorder