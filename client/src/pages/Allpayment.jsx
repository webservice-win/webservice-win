import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Allpayment = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // ---------------all-payment--------------
  const [payment, set_payment] = useState([]);
  const get_payment = () => {
    axios
      .get(`${base_url}/admin/all-payment`)
      .then((res) => {
        if (res.data.success) {
          set_payment(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_payment();
  }, []);
  return (
    <section>
      <section className="w-full  lg:h-[70vh] ">
        <Header />
        <div className="hero w-full relative font-rubik bg-main_section lg:h-[52vh] flex justify-center gap-[100px] items-center আমাদের গ্রাহক ওরাকল টেকনোলজি বিশ্বাস করে যেভাবে পেমেন্ট করেন তাদরে কিছূ পেমেন্ট প্রুভ দেখুন  py-[20px] overflow-hidden">
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
                আমাদের গ্রাহক ওরাকল টেকনোলজি বিশ্বাস করে যেভাবে পেমেন্ট করেন
                তাদরে কিছূ পেমেন্ট প্রুভ দেখুন ।
              </h1>
              <p className="text-[16px]  lg:text-[18px] text-neutral-200">
                অনলাইনে এতো এতো প্রতারনা চলছে যা বলার বাহিরে এই প্রতারনার যুগে
                আমারা শতভাগ সচ্ছতার সাথে কাজ করে যাচ্ছি তারপর হাজার সচ্ছতার মাঝে
                কিছু এন্টি পার্টি আছে যারা প্রতারনা করে তারা আমাদের নামে নেগেটিভ
                তথ্য ছড়ায় যার জন্য আমরা আপনাদের দেখাচ্ছি কত শত মানুষ এর আস্তা
                ওরাকল টেনোলজীর উপর তা আপনি নিজেই দেখে নিন ।
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
            গ্রাহক আমাদের যে ভাবে পেমেন্ট করে
          </h1>
        </div>
        {/* ---------------review----------------- */}
        <section className="pt-[50px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[20px]">
          {payment.map((data) => {
            return (
              <div className="w-full h-auto p-[3px] lg:p-[5px] bg-white rounded-[10px]">
                <img
                  className="w-full rounded-[10px]"
                  src={`${base_url}/images/${data.image}`}
                  alt=""
                />
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

export default Allpayment;
