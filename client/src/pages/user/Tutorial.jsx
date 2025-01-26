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
            .get(`${base_url}/admin/all-tutorials`)
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
  
     <section className=" pb-[30px]">
         
            {video_reviews.length > 0 ? 
                 <section className="w-full ">
                   {/* ---------------review----------------- */}
                   <section className="pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                     {video_reviews.map((data, i) => {
                       return (
                         <div
                           key={i}
                           className="w-full overflow-hidden  rounded-[10px] p-[7px] bg-white"
                         >
                           <iframe
                             className="w-full h-[180px] lg:h-[250px] rounded-[10px]"
                             src={`${data.tutorial_link}`}
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