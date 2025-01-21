import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Ourcustomer = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  // ---------------all-payment--------------
  const [oursite, set_oursite] = useState([]);
  const get_oursite = () => {
    axios
      .get(`${base_url}/admin/all-site`)
      .then((res) => {
        if (res.data.success) {
          set_oursite(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_oursite();
  }, []);
  return (
    <section>
      <section className="w-full bg-main_section  lg:h-[70vh] ">
        <Header />
        <div className="hero w-full relative font-rubik bg-main_section lg:h-[52vh] flex justify-center gap-[100px] items-center  px-[20px] md:px-[30px] lg:px-[60px] xl:px-[100px] py-[20px] overflow-hidden">
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
              <h1 className="text-[20px] lg:text-[40px]  font-bold mb-[10px] text-white">
                যারা আমাদের মাধ্যমে বিভিন্ন কাজ করে নিয়েছেন তাদরে কিছূ তথ্য
                আমাদের গ্রাহক যারা
              </h1>
              <p className="text-[16px]  lg:text-[18px] text-neutral-200">
                নিচের দেওয়া সাইট গুলো আমদের সেবা গ্রহন করেছেন এবং আমরা নিচের
                দেওয়া সাইট গুলো ডেভেলপমেন্ট করেছি আপনি চাই যে কোন ডিজাইন বেটিং
                সাইট , ই-কমার্স সাইট, ইনভেস্টমেন্ট সাইট , পি টি সি সাইট, ট্রেডিং
                সাইট সহ যে কোন ধরনের ওয়েব সাইট এপস আমাদের মাধ্যমে ডেভেলপমেন্ট
                করে নিতে পারেন ।
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
            আমাদের করা সাইট সমুহ
          </h1>
        </div>
        {/* ---------------review----------------- */}
        <section className="pt-[50px] grid lg:grid-cols-2 xl:grid-cols-6  gap-[20px]">
          {oursite.map((data) => {
            return (
              <NavLink>
                <div className="w-full relative cursor-pointer bg-white rounded-[10px] p-[3px] lg:p-[5px]">
                  <img
                    className="w-full h-[150px] lg:h-[200px] rounded-[10px]"
                    src={`${base_url}/images/${data.image}`}
                    alt="Profile"
                  />
                </div>
              </NavLink>
            );
          })}
        </section>
        {/* -------------box----------------- */}
      </section>
      <Footer />
    </section>
  );
};

export default Ourcustomer;
