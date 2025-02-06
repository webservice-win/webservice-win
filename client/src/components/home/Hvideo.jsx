import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Hvideo = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [video_reviews, set_video_reviews] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const get_video_review = () => {
    axios
      .get(`${base_url}/admin/all-video-review`)
      .then((res) => {
        if (res.data.success) {
          set_video_reviews(shuffleArray(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };

  useEffect(() => {
    get_video_review();
  }, []);

  return (
    <>
      {video_reviews.length > 0 ? (
        <section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] lg:py-[70px] ">
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
              আমাদের গ্রাহকদের ভিডিও রিভিউ
            </h1>
          </div>

          <section className="pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
            {video_reviews?.slice(0, 9).map((data, i) => (
              <div key={i} className="w-full overflow-hidden rounded-[10px] p-[7px] bg-white">
                <iframe
                  className="w-full h-[180px] lg:h-[250px] rounded-[10px]"
                  src={`${data.video_link}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </section>

          {video_reviews?.length > 9 && (
            <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
              <NavLink to="/video-reviews">
                <button className="px-[30px] py-[12px] text-white rounded-[5px] bg-indigo-800 border-[2px] border-white font-poppins text-[16px]">
                  Load more
                </button>
              </NavLink>
            </div>
          )}
        </section>
      ) : null}
    </>
  );
};

export default Hvideo;
