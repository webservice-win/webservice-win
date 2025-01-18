import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import axios from "axios"
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { NavLink, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
const Product = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
    const [filter, setFilter] = useState("All");
   // ---------------all-websites--------------
const [items,set_item]=useState([]);
   const base_url="https://admin-api.oraclesoft.org";

    const get_website=()=>{
        axios.get(`${base_url}/admin/all-websites`)
        .then((res)=>{
            if(res.data.success){
                set_item(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_website()
    },[]);

  const filteredItems = filter === "All" ? items : items.filter(item => item.category === filter);

  return (
   <section className='w-full font-poppins overflow-hidden'>
      <section className='w-full  h-[70vh] '>
        <Header/>
    <div className="hero w-full relative font-rubik bg-main_section h-[50vh] flex justify-center gap-[100px] items-center px-[100px] py-[20px] overflow-hidden">
        <div className="overlaw absolute top-0 left-0 w-full h-full ">
          <img src="https://www.tawk.to/wp-content/uploads/2023/04/ATF-Background-Graphic.png" alt="" />
        </div>
        {/* --------------animation---------------- */}
        <div class="absolute w-4 h-4 bg-white rounded-full animate-bubble left-10 bottom-10"></div>
  <div class="absolute w-6 h-6 bg-white rounded-full animate-bubble left-20 bottom-20 delay-200"></div>
  <div class="absolute w-3 h-3 bg-white rounded-full animate-bubble left-30 bottom-5 delay-500"></div>
  <div class="absolute w-5 h-5 bg-white rounded-full animate-bubble left-40 bottom-15 delay-1000"></div>
     {/* -------------hero section------------ */}
        <div className="hero w-full flex justify-center items-center z-[1]">
        <div className='text-center'>
            <h1 className='text-[40px] font-[600] font-rubik text-white'>Best Websites Made For You</h1>
            <p className='text-[16px] text-neutral-200'>The Perfect Solution For any Online Presence, We have 100+ Premium Websites Project.</p>
        </div>
      </div>
    {/* ------------hero section------------ */}
  </div>
 {/* --------------------------section--------------- */}
 <section>


 </section>
 {/* --------------------------section--------------- */}

</section>
{/* ------------------box------------------ */}
<section className="px-[20px] md:px-[30px] bg-main_section lg:px-[50px] xl:px-[100px] lg:py-[80px]">
  
      <div className="flex justify-center items-center space-x-1 lg:space-x-3 p-4">
        {["All", "Exchange", "Self Deposit", "Investment site"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-[20px] lg:px-[30px] text-nowrap py-2 text-[14px] lg:text-[17px] border-[1px] rounded-full shadow-md ${
              filter === category
                ? "text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                : "text-gray-700 bg-white hover:border-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[25px]">
        {filteredItems.map((data,i) => (
      <div key={i} className='p-[7px] rounded-[10px] group  bg-white overflow-hidden z-[1] '>
                     <div className='w-full h-[300px] rounded-[10px] overflow-hidden '>
                         <img className='w-full h-full group-hover:scale-[1.1] group-hover:rotate-[2deg] transition-all duration-200' src={`${base_url}/images/${data.thumbnail}`}  alt="" />
                     </div>
                     <div className='p-[15px] font-rubik'>
          {
             data.title.length >60 ?  <h2 className='text-[22px] mb-[15px] font-[600] font-bangla_font'>{data.title.slice(0,60)}...</h2>: <h2 className='text-[22px] mb-[15px] font-[600] font-bangla_font'>{data.title}</h2>
            }
                             <h2 className='text-[16px] font-[500] text-neutral-600 mb-[8px]'>Single License:${data.singleLicense}</h2>
                             <h2 className='text-[16px] font-[500] text-neutral-600'>Unlimited:${data.unlimitedLicense}</h2>
                         <div className='flex justify-between items-center mt-[20px]'>
                             <h2 className='text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]'>
                                <FaHeart className='text-[18px] text-red-600'/>
                                <p>({data?.love}+)</p>
                             </h2>
                                             <h2 className='text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]'>
                                <AiOutlineLike className='text-[20px] text-red-600'/>
                                <p>({data?.like}+)</p>
                             </h2>
                         </div>
                         <div className='flex justify-center items-center gap-[15px] mt-[15px]'>
                             <button className='w-[50%] h-[50px] text-red-500 border-red-400 border-[2px] font-[500] text-[17px] hover:bg-red-400 hover:text-white transition-all duration-150'>Live Demo</button>
                             <NavLink to={`/single-website-details/${data._id}`} className="w-[50%]">
                                     <button className='w-[100%] h-[50px] text-gray-500 border-gray-400 border-[2px] font-[500] text-[17px] hover:bg-gray-400 hover:text-white transition-all duration-150'>Details</button>
                             </NavLink>
                         </div>
                     </div>
                   </div>
        ))}
      </section>
    </section>
{/* --------------footer-------------- */}
<Footer/>
</section>
  )
}

export default Product