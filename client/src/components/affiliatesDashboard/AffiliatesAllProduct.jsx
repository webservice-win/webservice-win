// import affiliatImg from "../../assets/affiliatesDa.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AffiliatesAllProduct = () => {
  const videos = [
    {
        id: 1,
        url: "https://www.youtube.com/embed/r9Y35xwNPiI?si=jSkm8cIGRyVqSpvw",
        title: "Video Title",
    },
    {
        id: 2,
        url: "https://www.youtube.com/embed/r9Y35xwNPiI?si=jSkm8cIGRyVqSpvw",
        title: "Video Title",
    },
    {
        id: 3,
        url: "https://www.youtube.com/embed/r9Y35xwNPiI?si=jSkm8cIGRyVqSpvw",
        title: "Video Title",
    },
];
  return (
    <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-[20px]">
            {videos.map((video) => (
                <div key={video.id} className="flex bg-[#AB1E1E] rounded-[5px] overflow-hidden flex-col items-center">
                    {/* Video Container */}
                    <div className="w-full bg-red-500 relative">
                        {/* YouTube iframe */}
                        <iframe
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48"
                        ></iframe>
                    </div>

                    {/* Video Title */}
                   {
                    video.title.length > 20 ?  <p className="mt-2 text-sm font-semibold p-[10px] text-white">{video.title.slice(0,20)}...</p>: <p className="mt-2 text-sm font-semibold p-[10px] text-white">{video.title}</p>
                   }
                </div>
            ))}
        </div>
    </div>
  );
};

export default AffiliatesAllProduct;
