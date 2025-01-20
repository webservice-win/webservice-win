import React, { useState, useEffect } from "react";
import bg1 from "../../assets/gradient.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import axios from "axios";
const Businessmap = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    { title: "কথোপকথন শুরু করুন", content: "আপনার কথোপকথন এখানে শুরু করুন।" },
    {
      title: "ব্যবসায়িক প্রস্তাব বা প্লান করুন",
      content: "আপনার প্রস্তাব বা পরিকল্পনা তৈরি করুন।",
    },
    {
      title: "ওয়েব সাইট ডিজাইন সিলেক্ট করুন",
      content: "আপনার পছন্দসই ডিজাইন নির্বাচন করুন।",
    },
    {
      title: "প্রথম পেমেন্ট করুন",
      content: "আপনার প্রথম পেমেন্ট সম্পন্ন করুন।",
    },
  ];

  // ---------------all-courses--------------
  const [accordions, set_accordions] = useState([]);
  const get_accordions = () => {
    axios
      .get(`${base_url}/admin/all-accordions`)
      .then((res) => {
        if (res.data.success) {
          set_accordions(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_accordions();
  }, []);
  // --------------video play
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the video popup
  const togglePopup = () => setIsOpen(!isOpen);
  // ---------------all-feedback--------------
  const [footer_video, set_footer_video] = useState([]);
  const get_video = () => {
    axios
      .get(`${base_url}/admin/all-videos`)
      .then((res) => {
        if (res.data.success) {
          set_footer_video(res.data.find_footer_video);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_video();
  }, []);
  return (
    <section className="w-full  bg-gradient-to-r overflow-hidden from-blue-500 to-purple-500 relative h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] ">
      {/* -----------------------bg1-------------- */}
      {/* <div className='absolute top-0 left-[-40%] '>
                  <img className='w-[60%]' src={bg1} alt="" />
                 </div> */}
      {/* ------------------bg1-------------- */}
      <div className="flex justify-center items-center ">
        <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
          বেটিং বিজনেস রোড ম্যাপ
        </h1>
      </div>
      {/* -------------------box------------------- */}
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[60px] mt-[50px] ">
        {/* Left Side: YouTube Video */}
        {footer_video ? (
          <div className="w-[100%] md:w-[80%] lg:w-[45%]">
            <div className="flex flex-col items-center justify-center lg:p-4">
              {/* Thumbnail with Play Icon */}
              <div
                className="relative cursor-pointer w-full bg-white p-[7px] rounded-[10px]"
                onClick={togglePopup}
              >
                {/* Thumbnail */}
                <img
                  src={`${base_url}/images/${footer_video?.thumbnail}`}
                  alt="Video Thumbnail"
                  className="w-full h-[180px] md:h-[280px] lg:h-[350px] rounded-[10px] "
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <FaPlay className="text-[#ff4757] text-3xl" />
                  </div>
                </div>
              </div>

              {/* Video Popup */}
              {isOpen && (
                <div className="fixed inset-0 z-[100000] bg-black bg-opacity-75 flex items-center justify-center ">
                  <div className="relative w-[90%] max-w-3xl p-4 bg-white rounded-lg z-[100]">
                    {/* Close Button */}
                    <button
                      className="absolute top-[-10%] right-[-10%] z-[10000] text-red-500 text-lg font-bold hover:text-red-500"
                      onClick={togglePopup}
                    >
                      ✕
                    </button>

                    {/* YouTube Video */}
                    <div className="w-full bg-white rounded-[10px] overflow-hidden z-[1000]">
                      <iframe
                        className="w-full h-[350px] rounded-[10px] z-[100]"
                        src={`${footer_video?.video_link}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-1/2 font-bangla_font ">
          <div className="grid grid-cols-1 gap-[8px] lg:gap-2">
            {accordions?.map((item, index) => (
              <div
                key={index}
                className="border font-poppins  border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex text-[17px] lg:text-[22px] justify-between items-center px-4 py-3 bg-green-700 text-white font-medium hover:bg-green-800 transition-all duration-200"
                >
                  {item?.title}
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {item?.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* -------------box----------------- */}

      {/* -----------line---------------- */}
      <div className="flex items-center justify-center mt-[80px]">
        {/* Left Line */}
        <div className="flex-grow border-t-[2px] border-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600" />

        {/* Left Dots */}
        <div className="flex items-center space-x-1.5 mx-5">
          <span className="h-[4px] w-[4px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[16px] w-[16px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[20px] w-[20px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
        </div>

        {/* Center Diamond */}
        <div className="relative flex items-center justify-center mx-5">
          {/* Outer Diamond */}
          <div className="w-12 h-12 border-[1.5px] border-gradient-to-r from-indigo-500 to-indigo-700 transform rotate-45" />
          {/* Inner Indigo Diamond */}
          <div className="absolute w-6 h-6 bg-gradient-to-r from-indigo-600 to-indigo-800 transform rotate-45" />
        </div>

        {/* Right Dots */}
        <div className="flex items-center space-x-1.5 mx-5">
          <span className="h-[20px] w-[20px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[16px] w-[16px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
          <span className="h-[4px] w-[4px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
        </div>

        {/* Right Line */}
        <div className="flex-grow border-t-[2px] border-gradient-to-l from-indigo-400 via-indigo-500 to-indigo-600" />
      </div>
    </section>
  );
};

export default Businessmap;
