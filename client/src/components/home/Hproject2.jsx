import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import bg2 from "../../assets/gradient.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Hproject2 = () => {
  // State for websites and controlling displayed items
  const [websites, set_websites] = useState([]);
  const [visibleWebsites, setVisibleWebsites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [category,setcategory]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(`${base_url}/admin/all-category`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setcategory(categoryRes.data.data);
     console.log(categoryRes.data.data)
        const technologyRes = await axios.get(
          `${base_url}/admin/all-technology`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        // setTechnology(technologyRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // Fetch websites from API
  const get_website = () => {
    axios
      .get(`${base_url}/admin/all-websites`)
      .then((res) => {
        if (res.data.success) {
          set_websites(res.data.data);
          setVisibleWebsites(res.data.data.slice(0, 6)); // Show first 6 items initially
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };

  useEffect(() => {
    get_website();
  }, []);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setShowAll(true);
    setVisibleWebsites(websites); // Show all items
  };
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredWebsites = selectedCategory === 'all' 
    ? websites 
    : websites.filter(site => site.category.toLowerCase() === selectedCategory);


  return (
    <>
      {websites.length > 0 ? (
        <section className="w-full h-auto relative bg-gradient-to-r from-blue-500 to-purple-500 px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[30px] lg:py-[70px]">
          <div className="flex justify-center items-center">
            <h1 className="px-[20px] lg:px-[25px] rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white">
              আমাদের প্রজেক্ট সমূহ
            </h1>
          </div>
          {/* Project grid */}
          <div>
             {/* Category Filter */}
   {/* Category Filter */}
   <ul className="flex justify-center items-center gap-3 mt-5">
        <li 
          className={`px-5 py-2 rounded-full text-lg cursor-pointer ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setSelectedCategory('all')}
        >
          All
        </li>
        {category.map((cat, index) => (
          <li 
            key={index}
            className={`px-5 py-2 rounded-full text-lg cursor-pointer border-indigo-500 border-[2px] ${selectedCategory === cat.value.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={() => setSelectedCategory(cat.value.toLowerCase())}
          >
            {cat.label}
          </li>
        ))}
      </ul>
          </div>
          <section className="pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[25px]">
            {filteredWebsites.map((data, i) => (
              <div className="p-[5px] bg-white rounded-[10px]" key={i}>
                <div className="p-[7px] h-[100%] rounded-[10px]  font-poppins group bg-[#010053] overflow-hidden">
                  <div className="w-full h-[200px] lg:h-[300px] rounded-[10px] overflow-hidden">
                    <img
                      className="w-full h-full group-hover:scale-[1.1] group-hover:rotate-[2deg] transition-all duration-200"
                      src={`${base_url}/images/${data.thumbnail}`}
                      alt=""
                    />
                  </div>
                  <div className="px-[6px] py-[10px] lg:p-[15px] font-rubik w-full">
                    {data.title.length > 60 ? (
                      <NavLink to={`/single-website-details/${data._id}`}>
                        <h2 className="text-white font-noto-sans text-[16px] hover:underline hover:text-orange-400 cursor-pointer  lg:text-[22px] mb-[15px] font-[600]">
                          {data.title.slice(0, 60)}...
                        </h2>
                      </NavLink>
                    ) : (
                      <NavLink to={`/single-website-details/${data._id}`}>
                        <h2 className="text-[16px] lg:text-[22px] mb-[5px] lg:mb-[15px] hover:underline hover:text-orange-400 font-[600] font-noto-sans text-white">
                          {data.title}
                        </h2>
                      </NavLink>
                    )}
                    <div className="mb-[8px] flex gap-[10px] justify-between items-center">
                      <h2 className="text-[12px] lg:text-[13px] px-[4px] py-[7px] rounded-full bg-indigo-800 font-[500] text-white">
                        Single License: ${data.singleLicense}
                      </h2>
                      <h2 className="text-[12px] lg:text-[13px] px-[4px] py-[7px] rounded-full bg-indigo-800 font-[500] text-white">
                        Unlimited License: ${data.unlimitedLicense}
                      </h2>
                    </div>
                    <div className="flex justify-between items-center mt-[20px]">
                      <h2 className="text-[15px] lg:text-[17px] font-[500] text-white flex justify-center items-center gap-[8px]">
                        <FaHeart className="text-[15px] lg:text-[18px] text-red-600" />
                        <p>({data?.love}+)</p>
                      </h2>
                      <h2 className="text-[15px] lg:text-[17px] font-[500] text-white flex justify-center items-center gap-[8px]">
                        <AiOutlineLike className="text-[20px] text-indigo-300" />
                        <p>({data?.like}+)</p>
                      </h2>
                    </div>
                    <div className="flex justify-center items-center gap-[15px] mt-[10px] lg:mt-[15px]">
                      <NavLink
                        to={`${data.demoFrontend}`}
                        className="w-[50%]"
                        target="_blank"
                      >
                        <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] font-[500] rounded-full text-[14px] lg:text-[19px] font-[800] hover:bg-red-400 hover:text-white transition-all duration-150 font-bangla_font">
                          লাইভ ডেমো
                        </button>
                      </NavLink>
                      <NavLink
                        to={`/single-website-details/${data._id}`}
                        className="w-[50%]"
                      >
                        <button className="w-full py-[8px] lg:h-[50px] text-white bg-[#2563EB] font-[500] rounded-full text-[14px] lg:text-[19px] hover:bg-red-400 hover:text-white font-[800] transition-all duration-150 flex font-bangla_font justify-center items-center gap-[8px]">
                          বিস্তারিত দেখুন
                          <FaArrowUpRightFromSquare />
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          {/* "Load More" button */}
          {!showAll && websites.length > 6 && (
            <div className="flex w-full items-center justify-center mt-[50px] z-[100]">
              <button
                onClick={handleLoadMore}
                className="px-[30px] py-[12px] rounded-full text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Hproject2;
