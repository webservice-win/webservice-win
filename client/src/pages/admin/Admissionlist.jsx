import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios"
import Swal from "sweetalert2";
import empty_img from "../../assets/empty.png"
const Admissionlist = () => {
      const base_url="https://admin-api.oraclesoft.org";
   const admin_info=JSON.parse(localStorage.getItem("admin_data"));

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
      // ---------------all-courses--------------
const [admission,set_admission]=useState([]);
    const get_admission=()=>{
        axios.get(`${base_url}/admin/all-admission`,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                set_admission(res.data.data);
                console.log(res.data.data)
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_admission()
    },[]);
    // ----------course searching system
     const [searchQuery, setSearchQuery] = useState("");
      const filteredCourses = admission.filter(admission =>
    admission.name.toString().includes(searchQuery) ||
    admission.phone.toString().includes(searchQuery) ||
    admission.location.toString().includes(searchQuery) ||
    admission.profession.toString().includes(searchQuery) ||
    admission.schedule.toString().includes(searchQuery)

  );
      // ------------delete course-------------
            const delete_admission=(id)=>{
      const confirm_box=confirm("Are you sure?");
       if(confirm_box){
       axios.delete(`${base_url}/admin/delete-admission/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                Swal.fire("Success", `${res.data.message}`, "success");
               get_admission();
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Admission List</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
             <li>Admission</li>
            <li><IoIosArrowForward/></li>
            <li>Admission List</li>
          </ul>
        </div>
        {/* -------------search-box------------------ */}
   {
    admission.length > 0 ?       <div className="w-[30%]">
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
            placeholder="Search website"
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
        admission.length > 0 ?     <div className="relative overflow-x-auto border-[1px] border-[#eee] rounded-[5px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l border-r border-b border-gray-200 dark:border-gray-700">
            <thead className="text-xs text-white uppercase bg-indigo-500 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Name</th>
                <th scope="col" className="px-6 py-[15px] border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Phone</th>
                <th scope="col" className="px-6 py-3 border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Profession</th>
                <th scope="col" className="px-6 py-3 border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Location</th>
                <th scope="col" className="px-6 py-3 border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Time</th>
                <th scope="col" className="px-6 py-3 border-r border-gray-200 dark:border-gray-700 text-[15px] font-[500] text-nowrap">Schedule</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((data, index) => (
                <tr key={index} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.name}
                  </th>
                  <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.phone}
                  </th>
                       <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.profession}
                  </th>
                  <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.location}
                  </th>
                       <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.createdAt.slice(0,10)}
                  </th>
                  <th scope="row" className="px-6 py-2 text-[16px] font-[500]  tracking-[1px] text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {data?.schedule}
                  </th>
                  <td className="px-6 py-2 flex justify-start items-center gap-[8px]">
                    <NavLink className="font-medium text-white dark:text-blue-500 hover:underline p-[10px] text-[22px] cursor-pointer bg-indigo-500 rounded-[5px]">
                      <FiEdit />
                    </NavLink>
                    <div onClick={()=>{delete_admission(data._id)}} className="font-medium text-white dark:text-red-500 hover:underline p-[10px] text-[22px] cursor-pointer bg-red-500 rounded-[5px]">
                      <MdDeleteOutline />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>:<section className='w-full flex justify-center items-center'>
             <div>
              <img className='w-[100px] lg:w-[300px]' src={empty_img} alt="" />
              <h2 className='text-[18px] lg:text-[25px] text-center font-[500] mt-[5px]'>Admission are empty!</h2>
             </div>
        </section>
       }
      </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Admissionlist