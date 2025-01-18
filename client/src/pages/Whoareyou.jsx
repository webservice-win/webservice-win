import React,{useState,useEffect} from 'react'
import { FaTrophy, FaUserFriends, FaChartBar, FaMoneyBillWave, FaHeadset } from "react-icons/fa";
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
const Whoareyou = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
  const tabs = [
    { name: "Achievements ISO Certified", content: "No data for this category" },
    { name: "Trade License Certified", content: "No data for this category" },
    { name: "Evolution Partner Certificate", content: "No data for this category" },
    { name: "Casino Malaysia License", content: "No data for this category" },
    { name: "Casino Partner Certificate", content: "No data for this category" },
    { name: "Betfair Api Certificate", content: "No data for this category" },
    { name: "Gaming Curacao Certificate", content: "No data for this category" },
  ];
  const [activeTab, setActiveTab] = useState(0);
  return (
  <section className='w-full font-poppins overflow-hidden'>
      <section className='w-full  h-[70vh] bg-main_section '>
        <Header/>
    <div className="hero w-full relative font-rubik bg-main_section h-[52vh] flex justify-center gap-[100px] items-center px-[100px] py-[20px] overflow-hidden">
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
</section>
{/* --------------part2----------------- */}

 {/* --------------------------section--------------- */}
  </section>
  )
}

export default Whoareyou