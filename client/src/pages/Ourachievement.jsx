import React, { useState, useEffect } from "react";
import {
  FaTrophy,
  FaUserFriends,
  FaChartBar,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import Achievementmodel from "../components/home/Achievementmodel";
const Ourachievement = () => {
  const pathname = useLocation();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleViewClick = () => {
    setPopupVisible(true);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
  };
  const tabs = [
    {
      name: "Achievements ISO Certified",
      content: "No data for this category",
      icon: <FaTrophy />,
    },
    {
      name: "Trade License Certified",
      content: "No data for this category",
      icon: <FaTrophy />,
    },
    {
      name: "Evolution Partner Certificate",
      content: "No data for this category",
      icon: <FaHeadset />,
    },
    {
      name: "Casino Malaysia License",
      content: "No data for this category",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Casino Partner Certificate",
      content: "No data for this category",
      icon: <FaChartBar />,
    },
    {
      name: "Betfair Api Certificate",
      content: "No data for this category",
      icon: <FaUserFriends />,
    },
    {
      name: "Gaming Curacao Certificate",
      content: "No data for this category",
      icon: <FaTrophy />,
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [achievement, set_achievement] = useState([]);
  const get_achievement = () => {
    axios
      .get(`${base_url}/admin/all-achievement`)
      .then((res) => {
        if (res.data.success) {
          set_achievement(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_achievement();
    console.log(achievement);
  }, []);
  return (
    <section className="w-full font-poppins bg-main_section overflow-hidden">
      <section className="w-full  h-[70vh] ">
        <Header />
        <div className="hero w-full relative font-rubik bg-main_section h-[52vh] flex justify-center gap-[100px] items-center px-[100px] py-[20px] overflow-hidden">
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
            <div className="text-center">
              <h1 className="text-[40px] font-[600] font-rubik text-white">
                Best Websites Made For You
              </h1>
              <p className="text-[16px] text-neutral-200">
                The Perfect Solution For any Online Presence, We have 100+
                Premium Websites Project.
              </p>
            </div>
          </div>
          {/* ------------hero section------------ */}
        </div>
        {/* --------------------------section--------------- */}
        <section></section>
      </section>
      {/* --------------part2----------------- */}
      <section className="w-full h-auto bg-main_section px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[70px]">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-[30px] text-white">
            Our Acievement
          </h2>
          <div className="mt-[20px] flex justify-center items-center w-full">
            <div className="w-[30%] bg-[whitesmoke] flex justify-center rounded-full  h-[4px] items-center">
              <div className="w-[60%] bg-red-500 h-[4px]"></div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] lg:mt-[50px] font-poppins grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 w-full md:grid-cols-4 ">
          {achievement?.map((data, i) => {
            return <Achievementmodel data={data} key={i} />;
          })}
        </div>
      </section>
      {/* --------------------------section--------------- */}
      <Footer />
    </section>
  );
};

export default Ourachievement;
