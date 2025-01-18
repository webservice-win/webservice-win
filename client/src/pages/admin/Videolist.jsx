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
import moment from "moment"
import { MdDeleteOutline } from "react-icons/md";
import empty_img from "../../assets/empty.png"
import Swal from "sweetalert2";

import axios from "axios"
const Videolist = () => {
   const navigate=useNavigate();
   const base_url="https://admin-api.oraclesoft.org";
   const admin_info=JSON.parse(localStorage.getItem("admin_data"));
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
   // ---------------allcategory--------------
const [category,set_category]=useState([]);
    const get_category=()=>{
        axios.get(`${base_url}/admin/all-videos`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                set_category(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_category()
    },[]);

    // ------------delete category-------------
            const delete_category=(id)=>{
      const confirm_box=confirm("Are you sure?");
       if(confirm_box){
       axios.delete(`${base_url}/admin/delete-video/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                Swal.fire("Success", `${res.data.message}`, "success");
               get_category();
            }
        }).catch((err)=>{
            console.log(err.name)
        })
       }
    
    }
    // ------------searching-system
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = category.filter(
    (data) =>
      data.thumbnail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.video_link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>

                {/* --------------------category-table------------------ */}
                {
                 category.length > 0 ? 
                  <section className="py-[20px] ">
             <div className="w-full flex justify-between items-center mb-[20px] flex-col lg:flex-row gap-[15px]">
          <div>
                 <h1 className="w-full text-left text-[20px] lg:mb-[15px] font-[600]">Videos List</h1>
                <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
              <li>Videos</li>
             <li><IoIosArrowForward/></li>
             <li>Videos List</li>
           </ul>
          </div>

               <div className="pb-4 w-full lg:w-auto bg-white dark:bg-gray-900">
                 <label htmlFor="table-search" className="sr-only">
                   Search
                 </label>
                 <div className="w-full lg:w-auto relative mt-1">
                   <div className="w-full lg:w-auto absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
                     type="text"
                     id="table-search"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="block w-full lg:w-auto ps-10 h-[45px] text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search for video"
                   />
                 </div>
               </div>
             </div>
             <div className="relative overflow-x-auto sm:rounded-[5px] border-[1px] border-[#eee]">
               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-white uppercase bg-indigo-500 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th scope="col" className="px-6 border-r border-gray-200 dark:border-gray-700 py-4 text-[14px] lg:text-[16px] font-[500]">
                       Image
                     </th>
                     <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]">
                       Link
                     </th>
                     <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]]">
                       Created
                     </th>
                     <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]">
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   {filteredCategories.length > 0 ? (
                     filteredCategories.map((data) => (
                       <tr
                         key={data._id}
                         className="bg-white border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                       >
                         <th
                           scope="row"
                           className="px-6 py-4 font-medium border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-nowrap whitespace-nowrap dark:text-white"
                         >
                           <img className='w-[80px] h-[80px]  rounded-[5px]' src={`${base_url}/images/${data.thumbnail}`} alt="" />
                         </th>
                         <td className="px-6 py-4 text-nowrap border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">{data.video_link}</td>
                         <td className="px-6 py-4 text-nowrap border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                           {moment(data?.createdAt).fromNow()}
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
                     ))
                   ) : (
                     <tr>
                       <td
                         colSpan="4"
                         className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                       >
                         No Provider found.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </section>:<section className='w-full flex justify-center items-center'>
                        <div>
                         <img className='w-[100px] lg:w-[300px]' src={empty_img} alt="" />
                         <h2 className='text-[18px] lg:text-[25px] text-center font-[500] mt-[5px]'>Videos are empty!</h2>
                        </div>
                   </section>
                }
                {/* --------------------category-table------------------ */}
       </section>
        </section>
    </section>
  )
}

export default Videolist