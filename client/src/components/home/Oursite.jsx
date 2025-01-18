import React,{useState,useEffect} from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom';
const Oursite = () => {
   const base_url="https://admin-api.oraclesoft.org";

     // ---------------all-payment--------------
const [oursite,set_oursite]=useState([]);
    const get_oursite=()=>{
        axios.get(`${base_url}/admin/all-site`)
        .then((res)=>{
            if(res.data.success){
                set_oursite(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_oursite()
    },[]);
  return (
    <>
    {
      oursite.length > 0 ?    <section className='w-full h-auto bg-gradient-to-r from-blue-500 to-purple-500 px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] lg:py-[70px] '>
          <div className='flex justify-center items-center'>
        <h1 className='px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white'>
          আমাদের করা সাইট সমুহ
        </h1>
      </div>
       {/* ---------------review----------------- */}
    <section className='pt-[30px] lg:pt-[50px] font-poppins grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-[15px]'>
       {
        oursite.slice(0,18).map((data)=>{
          return(
          <NavLink>
               <div className='w-full relative cursor-pointer bg-white rounded-[10px] p-[3px] lg:p-[5px]'>
                <img className='w-full h-[150px] lg:h-[200px] rounded-[10px]'  src={`${base_url}/images/${data.image}`}          alt="Profile" />
              </div>
          </NavLink>
          )
        })
       }

        
         
    </section>
{
  oursite?.length > 18 ?    <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
     <NavLink to="/our-customer">
              <button className='px-[30px] rounded-[5px] py-[12px] text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]'>Load more</button>
     </NavLink>
         </div>:""
}
{/* -----------line---------------- */}
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

      </section>:""
    }
    </>
    
  )
}

export default Oursite