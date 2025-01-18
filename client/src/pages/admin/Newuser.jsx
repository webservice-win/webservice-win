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
const Bnewuser = () => {
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
  //  ----------handle image 
   const [profileImage, setProfileImage] = useState(
    "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
  );

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New User</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>User</li>
            <li><IoIosArrowForward/></li>
            <li>New User</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            <div>
                <h2 className='text-[20px] lg:text-[20px] font-[600]'>User Information</h2>
            </div>
            {/* -------------------form---------------------- */}
                  <form action=""className='pt-[15px] lg:pt-[20px]'>
                  
 <div className="relative w-40 h-40 mx-auto mb-[30px]">
      {/* Circular Profile Image */}
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            <span className="text-sm">Upload Image</span>
          </div>
        )}
      </div>

      {/* Camera Icon Overlay */}
      <label
        htmlFor="profileImageInput"
        className="absolute bottom-1 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700"
      >
        <FaCamera className="w-6 h-6" />
      </label>

      {/* Hidden File Input */}
      <input
        id="profileImageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

                  
                    <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                        
                        <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>First Name <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='First Name'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Last Name <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Last Name'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>
                               <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  '>
                        <div className='w-[100%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'> Designation <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder=' Designation'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                 
                    </div>
                    
                       <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  lg:flex-row flex-col'>
                        <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Username <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Username'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Email <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Email'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>
                       <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  lg:flex-row flex-col'>
                             <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'> Confirm Password <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Confirm Password'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Password <span className='text-red-500'>*</span></label>
                            <input type="password"placeholder='Password'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>
                       <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] '>
                          <div className='w-[100%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Phone <span className='text-red-500'>*</span></label>
                            <input type="number"placeholder='Phone'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                 
                 
                    </div>
                 <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  lg:flex-row flex-col'>
                        <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>User Access <span className='text-red-500'>*</span></label>
                           <select name="" id=""className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] px-[15px]'>
                            <option value="Select Roles">Select Roles</option>
                            <option value="Administration">Administration</option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Manager of Marketing">Manager of Marketing</option>

                           </select>
                        </div>
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Custom User Access <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Custom User Access'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>

           <div className='flex justify-end items-center gap-[10px]'>
                       <button className='px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[22px]'/>Draft</button>
                                                        <button className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>Submit</button>
                                                     </div>
                  </form>
            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Bnewuser