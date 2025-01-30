import React, { useEffect, useState } from "react";
import { SiHyperskill } from "react-icons/si";
import axios from "axios";
import { NavLink } from "react-router-dom";
import loading_gif from "../../assets/loader.gif";

const Teammember = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [members, setMembers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const getMembers = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/all-member`);
      if (res.data.success) {
        setMembers(res.data.data);
      }
    } catch (err) {
      console.log(err.name);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      {members.length > 0 ? (
        <section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px] lg:py-[70px]">
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
              আমাদের দলের সদস্য
            </h1>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 mt-[30px] lg:mt-[50px] lg:grid-cols-3 xl:grid-cols-4 gap-[10px] lg:gap-[20px]">
            {members.slice(0, visibleCount).map((data, index) => (
              <div key={index} className="bg-white font-poppins dark:bg-gray-900 p-[5px] rounded-[10px] shadow-lg">
                <div className="px-3 py-[50px] bg-[#010053] rounded-[10px]">
                  <div className="text-center my-4">
                    <img
                      className="w-[150px] h-[150px] rounded-full m-auto dark:border-gray-800 my-4 border-[3px] border-[#eee]"
                      src={`${base_url}/images/${data.image}`}
                      alt="team-member"
                    />
                    <div className="py-2">
                      <h3 className="font-bold text-2xl text-white dark:text-white mb-1">
                        {data.name}
                      </h3>
                      <div className="inline-flex font-[500] text-white dark:text-gray-300 items-center">
                        <SiHyperskill className="text-[16px] mr-[7px]" />
                        {data.designation}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2">
                    <NavLink to={`${data.facebook_link}`} target="_blank" className="flex-1">
                      <button className="w-full rounded-full bg-blue-600 dark:bg-blue-800 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
                        Facebook
                      </button>
                    </NavLink>
                    <NavLink to={`${data.twitter_link}`} target="_blank" className="flex-1">
                      <button className="w-full rounded-full bg-blue-600 dark:border-gray-700 font-semibold text-white px-4 py-2">
                        Linkedin
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {visibleCount < members.length && (
            <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
              <button
                onClick={handleLoadMore}
                className="px-[30px] rounded-[5px] py-[12px] text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="w-full py-[50px] bg-main_section">
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-green-700 border-[3px] border-white text-white">
              আমাদের দলের সদস্য
            </h1>
          </div>
          <div>
            <h1 className="mt-[10px] text-white text-center py-[40px] text-[16px] lg:text-[20px] font-[500]">
              Loading....
            </h1>
          </div>
        </section>
      )}
    </>
  );
};

export default Teammember;
