import React, { useState, useEffect } from "react";
import bg1 from "../../assets/gradient.png";
import { FaChevronDown, FaChevronUp, FaPlay } from "react-icons/fa";
import axios from "axios";
import loaderGif from "../../assets/loader.gif"; // Add your loader gif here

const Businessmap = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [footer_video, set_footer_video] = useState([]);
  const [accordions, set_accordions] = useState([]);
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(true); // New state for thumbnail loader

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const get_accordions = () => {
    axios
      .get(`${base_url}/admin/all-accordions`)
      .then((res) => {
        if (res.data.success) {
          set_accordions(res.data.data);
        }
      })
      .catch((err) => console.log(err.name));
  };

  const get_video = () => {
    axios
      .get(`${base_url}/admin/all-videos`)
      .then((res) => {
        if (res.data.success) {
          set_footer_video(res.data.find_footer_video);
        }
      })
      .catch((err) => console.log(err.name));
  };

  useEffect(() => {
    get_accordions();
    get_video();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 relative h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
      <div className="flex justify-center items-center">
        <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
          {import.meta.env.VITE_SITE_NAME === "oraclescript"
            ? "আপনার ডিজিটাল বিজনেস রোড ম্যাপ"
            : "বেটিং বিজনেস রোড ম্যাপ"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[60px] mt-[50px]">
        {footer_video ? (
          <div className="w-[100%] md:w-[80%] lg:w-[45%]">
            <div className="flex flex-col items-center justify-center lg:p-4">
              <div
                className="relative cursor-pointer w-full bg-white p-[7px] rounded-[10px]"
                onClick={togglePopup}
              >
                {/* Loader while thumbnail loads */}
                {isThumbnailLoading && (
                  <div className="flex items-center justify-center h-[180px] md:h-[280px] lg:h-[350px]">
                    <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
                  </div>
                )}

                {/* Thumbnail Image */}
                <img
                  src={`${base_url}/images/${footer_video?.thumbnail}`}
                  alt="Video Thumbnail"
                  className={`w-full h-[180px] md:h-[280px] lg:h-[350px] rounded-[10px] ${
                    isThumbnailLoading ? "hidden" : "block"
                  }`}
                  onLoad={() => setIsThumbnailLoading(false)} // Hide loader when image loads
                />

                {/* Play Button */}
                {!isThumbnailLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <FaPlay className="text-[#ff4757] text-3xl" />
                    </div>
                  </div>
                )}
              </div>

              {isOpen && (
                <div className="fixed inset-0 z-[100000] bg-black bg-opacity-75 flex items-center justify-center">
                  <div className="relative w-[90%] max-w-3xl p-4 bg-white rounded-lg z-[100]">
                    <button
                      className="absolute top-[-10%] right-[-10%] z-[10000] text-red-500 text-lg font-bold hover:text-red-500"
                      onClick={togglePopup}
                    >
                      ✕
                    </button>

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
        <div className="w-full lg:w-1/2 font-bangla_font">
          <div className="grid grid-cols-1 gap-[8px] lg:gap-2">
            {accordions?.map((item, index) => (
              <div
                key={index}
                className="border font-poppins border-gray-300 rounded-lg overflow-hidden shadow-sm"
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
    </section>
  );
};

export default Businessmap;
