import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Feedback = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // ---------------all-feedback--------------
  const [feedback, set_feedback] = useState([]);
  const get_feedback = () => {
    axios
      .get(`${base_url}/admin/all-feedback`)
      .then((res) => {
        if (res.data.success) {
          set_feedback(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_feedback();
  }, []);
  return (
    <section>
      <section className="w-full  lg:h-[70vh] ">
        <Header />
        <div className="hero w-full relative font-rubik bg-main_section lg:h-[52vh] flex justify-center gap-[100px] items-center px-[20px] md:px-[30px] lg:px-[60px] xl:px-[100px] py-[20px] overflow-hidden">
          <div className="overlaw absolute top-0 left-0 w-full h-full ">
            <img
              src="https://www.tawk.to/wp-content/uploads/2023/04/ATF-Background-Graphic.png"
              alt=""
            />
          </div>
          {/* --------------animation---------------- */}
          <div class="absolute w-4 h-4 bg-white rounded-full animate-bubble left-10 bottom-10"></div>
          <div class="absolute w-6 h-6 bg-white rounded-full animate-bubble left-20 bottom-20 delay-200"></div>
          <div class="absolute w-3 h-3 bg-white rounded-full animate-bubble left-30 bottom-5 delay-500"></div>
          <div class="absolute w-5 h-5 bg-white rounded-full animate-bubble left-40 bottom-15 delay-1000"></div>
          {/* -------------hero section------------ */}
          <div className="hero w-full flex justify-center items-center z-[1]">
            <div className="text-center w-[90%] lg:w-[90%]  font-noto-sans">
              <h1 className="text-[20px] lg:text-[40px] font-bold mb-[10px] text-white">
                আমাদের গ্রাহক ওরাকল টেকনোলজি সম্পর্কে কি বলেন রিভিউ গুলো দেখুন
              </h1>
              <p className="text-[16px]  lg:text-[18px] text-neutral-200">
                যেহেতু আমাদের টিম টোটাল রিমোটলি কাজ করে তাই আমরা চেষ্টা করি
                শতভাগ কাজের নিশ্চয়তা আপনাদের সকল এর আস্তা এবং ভালোবাসায় বিগত ৬
                বছর ধরে ওরাকল টিম বেটিং সাইট ডেভেলপমেন্ট প্রজেক্ট নিয়ে কাজ করছেন
                আমরা প্রায় ৪০০+ সাইট ডেভেলপমেন্ট করেছি ।
              </p>
            </div>
          </div>
          {/* ------------hero section------------ */}
        </div>
        {/* --------------------------section--------------- */}
        <section></section>
        {/* --------------------------section--------------- */}
      </section>
      <section className="w-full bg-main_section h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[70px]">
        <div className="flex justify-center items-center">
          <h1 className="px-[25px] rounded-full font-bangla_font text-center w-auto text-[22px] lg:text-[30px] py-[10px] bg-color2 border-[3px] border-white text-white">
            আমাদের গ্রাহকদের রিভিউ
          </h1>
        </div>
        {/* ---------------review----------------- */}
        <section className="pt-[50px] grid lg:grid-cols-2 xl:grid-cols-3  gap-[20px]">
          {feedback.map((data) => {
            return (
              <div className="p-[18px] rounded-[10px] shadow-md bg-white">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-[10px] space-x-3">
                  <img
                    src={`${base_url}/images/${data.image}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{data.name}</h3>
                    <div className="flex items-center">
                      <span className="flex text-orange-400">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} />
                        ))}
                      </span>
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        {data.rating}/Stars
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                {data.message.length > 150 ? (
                  <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
                    {data.message.slice(0, 150)}...
                  </p>
                ) : (
                  <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
                    {data.message}
                  </p>
                )}
              </div>
            );
          })}
        </section>
        {/* -------------box----------------- */}
      </section>
      <Footer />
    </section>
  );
};

export default Feedback;
