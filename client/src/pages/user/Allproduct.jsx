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
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import axios from "axios"
const Allproduct = () => {
   const navigate=useNavigate();
   const base_url = import.meta.env.VITE_API_KEY_Base_URL;
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
  const [websites, set_websites] = useState([]);

  const get_website = () => {
    axios
      .get(`${base_url}/admin/all-websites`)
      .then((res) => {
        if (res.data.success) {
          set_websites(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_website();
  }, []);
// ----------course searching system
 const [searchQuery, setSearchQuery] = useState("");
  const filteredCourses = websites.filter(websites =>
websites.category.toString().includes(searchQuery) ||
websites.technology.toString().includes(searchQuery) ||
websites.title.toString().includes(searchQuery) ||
websites.singleLicense.toString().includes(searchQuery) || 
websites.unlimitedLicense.toString().includes(searchQuery) 
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
                <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Website List</h1>
            <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
               <li>Websites</li>
              <li><IoIosArrowForward/></li>
              <li>Website List</li>
            </ul>
          </div>
          {/* -------------search-box------------------ */}
  
  
          {/* -------------search-box------------------ */}
         </div>
         {/* ------------------new customer table----------------- */}
  
     <section className=" pb-[30px]">
     {websites.length > 0 ? (
         <section className="w-full h-auto relative  ">
           <section className="pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[25px]">
             {websites.map((data, i) => {
               return (
                 <div className="p-[5px] bg-white rounded-[10px]">
                   <div
                     key={i}
                     className="p-[7px] h-[100%] rounded-[10px]  font-poppins group bg-[#010053] overflow-hidden "
                   >
                     <div className="w-full h-[200px] lg:h-[300px] rounded-[10px] overflow-hidden ">
                       <img
                         className="w-full h-full group-hover:scale-[1.1] group-hover:rotate-[2deg] transition-all duration-200"
                         src={`${base_url}/images/${data.thumbnail}`}
                         alt=""
                       />
                     </div>
                     <div className="px-[6px] py-[10px] lg:p-[15px] font-rubik w-full">
                       {data.title.length > 60 ? (
                         <NavLink to={`/single-website-details/${data._id}`}>
                           <h2 className="text-white font-noto-sans text-[16px] hover:underline hover:text-orange-400 cursor-pointer  lg:text-[22px] mb-[15px] font-[600] ">
                             {data.title.slice(0, 60)}...
                           </h2>
                         </NavLink>
                       ) : (
                         <NavLink to={`/single-website-details/${data._id}`}>
                           {" "}
                           <h2 className="text-[16px] lg:text-[22px] mb-[5px] lg:mb-[15px] hover:underline hover:text-orange-400 font-[600] font-noto-sans text-white">
                             {data.title}
                           </h2>
                         </NavLink>
                       )}
                       <div className="mb-[8px] flex gap-[10px] justify-between items-center ">
                         <h2 className="text-[12px] lg:text-[13px] p-[10px] rounded-full  bg-indigo-800 font-[500] text-white">
                           Single License:${data.singleLicense}
                         </h2>
                         <h2 className="text-[12px] lg:text-[13px] p-[10px] rounded-full bg-indigo-800 font-[500] text-white">
                           Unlimited License: ${data.unlimitedLicense}
                         </h2>
                       </div>
                       <div className="flex justify-between items-center mt-[20px]">
                         <h2 className="text-[15px] lg:text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]">
                           <FaHeart className="text-[15px] lg:text-[18px] text-red-600" />
                           <p>({data?.love}+)</p>
                         </h2>
                         <h2 className="text-[15px] lg:text-[17px]  font-[500] text-neutral-500 flex justify-center items-center gap-[8px]">
                           <AiOutlineLike className="text-[20px] text-indigo-300" />
                           <p>({data?.like}+)</p>
                         </h2>
                       </div>
                       <div className="flex justify-center items-center gap-[15px] mt-[10px] lg:mt-[15px]">
                         <NavLink
                           to={`${data.demoFrontend}`}
                           className="w-[50%]"
                           target="_blank"
                         >
                           <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] rounded-full text-[14px] lg:text-[19px] font-[800] hover:bg-red-400 hover:text-white transition-all duration-150 font-bangla_font">
                             লাইভ ডেমো
                           </button>
                         </NavLink>
                         <NavLink
                           to={`/single-website-details/${data._id}`}
                           className="w-[50%]"
                         >
                           <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] rounded-full text-[14px] lg:text-[19px] hover:bg-red-400 hover:text-white font-[800] transition-all duration-150 flex font-bangla_font justify-center items-center gap-[8px]">
                             বিস্তারিত দেখুন
                             <FaArrowUpRightFromSquare />
                           </button>
                         </NavLink>
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })}
           </section>
           {/* -------------box----------------- */}
          
         </section>
       ) : (
         ""
       )}
  
        </section>
         {/* ------------------------new customer table-------------------- */}
         </section>
       {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Allproduct