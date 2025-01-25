import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import bg2 from "../../assets/gradient.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
const Hproject2 = () => {
  // ---------------all-websites--------------
  const [websites, set_websites] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

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
  return (
    <>
      {websites.length > 0 ? (
        <section className="w-full h-auto relative bg-gradient-to-r from-blue-500 to-purple-500 px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[30px] lg:py-[70px] ">
          {/* -----------------------bg1-------------- */}
          {/* <div className='absolute top-0 right-[-80%] '>
                        <img className='w-[100%] z-[1] rotate-[190deg]' src={bg2} alt="" />
                       </div> */}
          {/* ------------------bg1-------------- */}
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
              আমাদের প্রজেক্ট সমূহ
            </h1>
          </div>
          {/* -------------------box------------------- */}
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
                        <h2 className="text-[15px] lg:text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]">
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
                          <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] font-[500] rounded-full text-[14px] lg:text-[19px] font-[800] hover:bg-red-400 hover:text-white transition-all duration-150 font-bangla_font">
                            লাইভ ডেমো
                          </button>
                        </NavLink>
                        <NavLink
                          to={`/single-website-details/${data._id}`}
                          className="w-[50%]"
                        >
                          <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] font-[500] rounded-full text-[14px] lg:text-[19px] hover:bg-red-400 hover:text-white font-[800] transition-all duration-150 flex font-bangla_font justify-center items-center gap-[8px]">
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
          {/* -------------box----------------- */}
          <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
            <button className="px-[30px] py-[12px] rounded-full text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]">
              Load more
            </button>
          </div>

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
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Hproject2;
