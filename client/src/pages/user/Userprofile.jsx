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
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
const Userprofile = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const user_info = JSON.parse(localStorage.getItem("user_data"));
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [name,set_name]=useState("");
   const [email,set_email]=useState("");
   const [password,set_password]=useState("");
   useEffect(()=>{
         set_name(user_info.name);
         set_email(user_info.email)
   },[])
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Userdashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] bg-[#080F25] overflow-y-auto transition-all duration-300':' bg-[#080F25]  transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader/> 
       {/* ----------------box-------------- */}
              <section className='w-full p-[30px]'>
                 <form action="" className='w-full'>
                    <h1 className='text-[20px] lg:text-[25px] text-white'>Your Information</h1>
                 <div className='w-full mt-[30px]'>
                    <label htmlFor=""className='text-[17px] text-white'>Name</label>
                    <input type="text"placeholder='Enter your name'value={name} className='w-full h-[45px] outline-indigo-500 mt-[8px] px-[20px] rounded-[5px] bg-white border-[1px] border-[#eee] text-[16px]' />
                  </div>
                  <div className='w-full mt-[10px]'>
                    <label htmlFor=""className='text-[17px] text-white'>Email</label>
                    <input type="email"placeholder='Enter your email'value={email} className='w-full h-[45px] outline-indigo-500 mt-[8px] px-[20px] rounded-[5px] bg-white border-[1px] border-[#eee] text-[16px]' />
                  </div>
                  <div className='w-full mt-[10px]'>
                    <label htmlFor=""className='text-[17px] text-white'>Passoword</label>
                    <input type="password"placeholder='Enter your password'className='w-full h-[45px] outline-indigo-500 mt-[8px] px-[20px] rounded-[5px] bg-white border-[1px] border-[#eee] text-[16px]' />
                  </div>
                  <button className='w-full h-[50px] bg-indigo-600 rounded-[5px] text-white  mt-[20px]'>Submit</button>
                 </form>
              </section>
      {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Userprofile