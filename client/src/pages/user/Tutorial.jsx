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
const Tutorial = () => {
   const navigate=useNavigate();
     const base_url=import.meta.env.VITE_API_KEY_Base_URL;
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
        const [video_reviews, set_video_reviews] = useState([]);
        const get_video_review = () => {
          axios
            .get(`${base_url}/admin/all-video-review`)
            .then((res) => {
              if (res.data.success) {
                set_video_reviews(res.data.data);
              }
            })
            .catch((err) => {
              console.log(err.name);
            });
        };
        useEffect(() => {
          get_video_review();
        }, []);
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
                <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Tutorial List</h1>
            <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
               <li>Dashboard</li>
              <li><IoIosArrowForward/></li>
              <li>Tutorial List</li>
            </ul>
          </div>
          {/* -------------search-box------------------ */}

          {/* -------------search-box------------------ */}
         </div>
         {/* ------------------new customer table----------------- */}
  
     <section className="pt-[40px] pb-[30px]">
         
            {video_reviews.length > 0 ? 
                 <section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] lg:py-[70px] ">
                   <div className="flex justify-center items-center">
                     <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
                       আমাদের গ্রাহকদের ভিডিও রিভিউ
                     </h1>
                   </div>
                   {/* ---------------review----------------- */}
                   <section className="pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                     {video_reviews?.slice(0, 9).map((data, i) => {
                       return (
                         <div
                           key={i}
                           className="w-full overflow-hidden  rounded-[10px] p-[7px] bg-white"
                         >
                           <iframe
                             className="w-full h-[180px] lg:h-[250px] rounded-[10px]"
                             src={`${data.video_link}`}
                             title="YouTube video player"
                             frameborder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                             referrerpolicy="strict-origin-when-cross-origin"
                             allowfullscreen
                           ></iframe>
                         </div>
                       );
                     })}
                   </section>
                   {/* -------------box----------------- */}
                   {video_reviews?.length > 9 ? (
                     <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
                       <NavLink to="/video-reviews">
                         <button className="px-[30px] py-[12px] text-white rounded-[5px] bg-indigo-800 border-[2px] border-white font-poppins text-[16px]">
                           Load more
                         </button>
                       </NavLink>
                     </div>
                   ) : (
                     ""
                   )}
         
                   <div className="flex items-center justify-center mt-[50px] lg:mt-[80px]">
                     {/* Left Line */}
                     <div className="flex-grow border-t-[1px] border-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 sm:border-t-[1px]" />
         
                     {/* Left Dots */}
                     <div className="flex items-center space-x-1 mx-3 sm:space-x-2 md:space-x-3 lg:space-x-4">
                       <span className="h-[3px] w-[3px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[6px] w-[6px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[10px] w-[10px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
                     </div>
         
                     {/* Center Diamond */}
                     <div className="relative flex items-center justify-center mx-3 sm:mx-5 md:mx-7">
                       {/* Outer Diamond */}
                       <div className="w-8 h-8 border-[1px] border-gradient-to-r from-indigo-500 to-indigo-700 transform rotate-45 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                       {/* Inner Indigo Diamond */}
                       <div className="absolute w-4 h-4 bg-gradient-to-r from-indigo-600 to-indigo-800 transform rotate-45 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                     </div>
         
                     {/* Right Dots */}
                     <div className="flex items-center space-x-1 mx-3 sm:space-x-2 md:space-x-3 lg:space-x-4">
                       <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[10px] w-[10px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[6px] w-[6px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
                       <span className="h-[3px] w-[3px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
                     </div>
         
                     {/* Right Line */}
                     <div className="flex-grow border-t-[1px] border-gradient-to-l from-indigo-400 via-indigo-500 to-indigo-600 sm:border-t-[1px]" />
                   </div>
                 </section>
                :<section className='w-full flex justify-center items-center'>
               <div>
                <img className='w-[100px] lg:w-[300px]' src={empty_img} alt="" />
                <h2 className='text-[18px] lg:text-[25px] text-center font-[500] mt-[5px]'>Websites are empty!</h2>
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

export default Tutorial