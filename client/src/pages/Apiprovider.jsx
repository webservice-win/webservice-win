import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Apiprovider = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [providers, set_provider] = useState([]);
  const get_provider = () => {
    axios
      .get(`${base_url}/admin/all-provider`)
      .then((res) => {
        if (res.data.success) {
          set_provider(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_provider();
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
          <div className="hero w-full flex justify-center  items-center z-[1]">
            <div className="text-center w-[90%] lg:w-[90%]  font-noto-sans">
              <h1 className="text-[20px] lg:text-[40px] font-bold mb-[10px] text-white">
                আমরা যাদের গেমিং এ পি আই ব্যাবহার করি আপনাদের সাইট এর জন্য ।
              </h1>
              <p className="text-[16px]  lg:text-[18px] text-neutral-200">
                আমরা নিচের দেওয়া প্রভাইডারদের এ পি আই ব্যাবহার করে থাকি আপনাদের
                বেটিং সাইট গুলো ডেভেলপমেন্ট করার জন্য তাদের সাথে আমরা পার্টনার
                হিসাবে যুক্ত আছি এবং অনুমেদিত লাইসেন্স প্রদানকারী
                হিসাবে আমরা কাজ করছি ।
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
          <h1 className="px-[25px] font-bangla_font rounded-full text-center w-auto text-[22px] lg:text-[30px] py-[10px] bg-color2 border-[3px] border-white text-white">
            আমাদের পার্টনার (এ পি ই প্রোভাইডার)
          </h1>
        </div>
        {/* ---------------review----------------- */}
        <section className="pt-[50px] grid lg:grid-cols-2 xl:grid-cols-6  gap-[20px]">
          {providers.map((data) => {
            return (
              <NavLink to={`${data.link}`} className="w-full" target="_blank">
                <div className=" w-full lg:w-[200px] h-[120px] lg:h-[180px] p-[6px] bg-white rounded-[10px]">
                  <img
                    className="w-full h-full rounded-[10px]"
                    src={`${base_url}/images/${data.image}`}
                    alt=""
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

export default Apiprovider;
