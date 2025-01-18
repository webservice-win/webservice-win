import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import empty_img from "../../assets/empty.png"
import axios from "axios"
const Feedbacklist = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);
     const uploadpost=()=>{
                setmodal(true)
     }
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
     const base_url="https://admin-api.oraclesoft.org";

     // ---------------all-feedback--------------
const [feedback,set_feedback]=useState([]);
    const get_feedback=()=>{
        axios.get(`${base_url}/admin/all-feedback`)
        .then((res)=>{
            if(res.data.success){
                set_feedback(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_feedback()
    },[]);
 // ------------delete category-------------
            const delete_category=(id)=>{
      const confirm_box=confirm("Are you sure?");
       if(confirm_box){
       axios.delete(`${base_url}/admin/delete-feedback/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                Swal.fire("Success", `${res.data.message}`, "success");
               get_feedback();
            }
        }).catch((err)=>{
            toast.error(err.name)
        })
       }
    
    }
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
     <div className='w-full flex justify-between items-center'>
         <div>
               <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Feedback List</h1>
           <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
              <li>Reviews</li>
             <li><IoIosArrowForward/></li>
             <li>Feedback List</li>
           </ul>
         </div>
         {/* -------------search-box------------------ */}
 
 <div className="w-[30%]">   
   <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
   <div className="relative w-[100%]">
     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
       <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
       </svg>
     </div>
     <input type="search" id="default-search" className="block w-full outline-none px-4 py-[12px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:placeholder-gray-400 dark:text-white " placeholder="Search website"  />
   </div>
 </div>
 
 
         {/* -------------search-box------------------ */}
        </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>


<div className="relative overflow-x-auto border-[1px] border-[#eee]  rounded-[5px]">

  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-indigo-500 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
      <tr>

        <th scope="col" className="px-6 py-3 font-[500] text-nowrap text-[15px]">
          Customer Name
        </th>
        <th scope="col" className="px-6 py-3 font-[500] text-nowrap text-[15px]">
          Message
        </th>
        <th scope="col" className="px-6 py-3 font-[500] text-nowrap text-[15px]">
          Rating
        </th>
        <th scope="col" className="px-6 py-3 text-nowrap">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {
        feedback.map((data)=>{
          return(
     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <img className="w-10 h-10 rounded-full" src={`${base_url}/images/${data.image}`} alt="Jese image" />
          <div className="ps-3">
            <div className="text-base font-semibold text-nowrap">{data.name}</div>
          </div>  
        </th>
        <td className="px-6 py-4">
                 {
        data.message.length > 50 ?       <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
        {data.message.slice(0,50)}...
      </p>:      <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
        {data.message}
      </p>
      }
        </td>
 <td className="px-6 py-4 text-[16px] font-[600] gap-[5px] text-orange-500 flex items-center">
  {Array.from({ length: Math.round(data.rating) }, (_, i) => (
    <FaStar key={i} className="text-orange-500" />
  ))}
  {Array.from({ length: 5 - Math.round(data.rating) }, (_, i) => (
    <FaRegStar key={i} className="text-gray-400" />
  ))}
</td>
        <td className="px-6 py-4 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                           <button
                             onClick={() => delete_category(data._id)}
                             className="p-[10px] rounded-[5px] bg-red-500 text-white text-[20px]"
                           >
                             <MdDeleteOutline />
                           </button>
                         </td>
      </tr>
          )
        })
      }
 

    </tbody>
  </table>
</div>


         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Feedbacklist