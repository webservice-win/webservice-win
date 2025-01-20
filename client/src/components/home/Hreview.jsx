import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const Hreview = () => {
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

  // ==================read more popup=================
  const [selectedData, setSelectedData] = useState(null);

  const handleReadMoreClick = (data) => {
    setSelectedData(data);
  };

  const handleClosePopup = () => {
    setSelectedData(null);
  };
  return (
    <>
      {feedback.length > 0 ? (
        <section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] lg:py-[70px]">
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px]  rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
              আমাদের গ্রাহকদের রিভিউ
            </h1>
          </div>
          {/* ---------------review----------------- */}
          <section className="pt-[30px] lg:pt-[50px] font-poppins grid lg:grid-cols-2 xl:grid-cols-3  gap-[20px]">
            {feedback?.slice(0, 9).map((data, index) => (
              <div
                key={index}
                className="p-[18px] rounded-[10px] shadow-md bg-white"
              >
                {/* Header Section */}
                <div className="flex items-center justify-between mb-[10px] space-x-3">
                  <img
                    src={`${base_url}/images/${data.image}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{data.name}</h3>
                    <div className="flex items-center gap-[3px]">
                      {Array.from(
                        { length: Math.round(data.rating) },
                        (_, i) => (
                          <FaStar key={i} className="text-orange-500" />
                        )
                      )}
                      {Array.from(
                        { length: 5 - Math.round(data.rating) },
                        (_, i) => (
                          <FaRegStar key={i} className="text-gray-400" />
                        )
                      )}
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        {data.rating}/Stars
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                {data.message.length > 150 ? (
                  <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
                    {data.message.slice(0, 150)}{" "}
                    <span
                      onClick={() => handleReadMoreClick(data)}
                      className="text-indigo-600 underline cursor-pointer font-poppins text-[14px] font-[500] ml-[5px]"
                    >
                      Read more...
                    </span>
                  </p>
                ) : (
                  <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
                    {data.message}
                  </p>
                )}
              </div>
            ))}

            {/* Popup Section */}
            {selectedData && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={handleClosePopup}
              >
                <div
                  className="p-[18px] w-[90%] md:w-[70%] lg:w-[60%] xl:w-[40%] rounded-[10px] shadow-md bg-white relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-[10px] p-[15px] space-x-3">
                    <img
                      src={`${base_url}/images/${selectedData.image}`}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{selectedData.name}</h3>
                      <div className="flex items-center gap-[3px]">
                        {Array.from(
                          { length: Math.round(selectedData.rating) },
                          (_, i) => (
                            <FaStar key={i} className="text-orange-500" />
                          )
                        )}
                        {Array.from(
                          { length: 5 - Math.round(selectedData.rating) },
                          (_, i) => (
                            <FaRegStar key={i} className="text-gray-400" />
                          )
                        )}
                        <span className="ml-2 text-sm font-semibold text-gray-600">
                          {selectedData.rating}/Stars
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <p className="mt-3 text-[16px] font-[600] font-bangla_font text-neutral-600 leading-relaxed">
                    {selectedData.message}
                  </p>

                  {/* Close Button */}
                  <button
                    onClick={handleClosePopup}
                    className="absolute top-1 font-[500] right-2 text-gray-500 hover:text-gray-700"
                  >
                    <IoClose className="text-[22px]" />
                  </button>
                </div>
              </div>
            )}
          </section>
          {/* -------------box----------------- */}
          {feedback?.length > 9 ? (
            <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
              <NavLink to="/feedback">
                <button className="px-[30px] rounded-[5px] py-[12px] text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]">
                  Load more
                </button>
              </NavLink>
            </div>
          ) : (
            ""
          )}

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

export default Hreview;
