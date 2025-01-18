import React,{useState,useEffect} from 'react'
import { FaTrophy, FaUserFriends, FaChartBar, FaMoneyBillWave, FaHeadset } from "react-icons/fa";
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
const About = () => {
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
</section>
{/* --------------part2----------------- */}
<section className='w-full h-auto bg-main_section px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[70px]'>
   <div className=" px-4">
      <div className="">
            <div className='flex justify-center items-center'>
        <h1 className='px-[25px] font-bangla_font text-center w-auto text-[22px] lg:text-[30px] py-[10px] bg-color2 border-[3px] border-white text-white'>
      আমাদের অর্জন সমূহ
        </h1>
      </div>
        <div className="flex flex-col md:flex-row mt-[50px] rounded-[5px] overflow-hidden">
          {/* Tabs */}
          <div className="bg-green-700 text-white w-full md:w-1/3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 border-b border-green-600 ${
                  activeTab === index
                    ? "bg-blue-600"
                    : "hover:bg-green-600 transition duration-300"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white text-white w-full md:w-2/3 flex items-center justify-center px-4">
            <p>{tabs[activeTab].content}</p>
          </div>
        </div>
      </div>
    </div>
</section>
 {/* --------------------------section--------------- */}
  </section>
  )
}

export default About