// import affiliatImg from "../../assets/affiliatesDa.png";
// Import Swiper React components
import React,{useState,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AffiliatesAllProduct = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [videos, set_tutorials] = useState([]);
  const get_tutorial = () => {
    axios
      .get(`${base_url}/all-tutorials`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.success) {
          set_tutorials(res.data.data);
          console.log(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_tutorial();
  }, []);
  return (
    <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-[20px]">
            {videos?.slice(0,3).map((video) => (
                <div key={video._id} className="flex bg-[#AB1E1E] rounded-[5px] overflow-hidden flex-col items-center">
                    {/* Video Container */}
                    <div className="w-full bg-red-500 relative">
                        {/* YouTube iframe */}
                        <iframe
                            src={video.tutorial_link}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48"
                        ></iframe>
                    </div>

                    {/* Video Title */}
                   {
                    video.title.length > 20 ?  <p className="mt-2 text-[18px] font-semibold p-[10px] text-white">{video.title.slice(0,20)}...</p>: <p className="mt-2 text-[18px] font-semibold p-[10px] text-white">{video.title}</p>
                   }
                </div>
            ))}
        </div>
    </div>
  );
};

export default AffiliatesAllProduct;
