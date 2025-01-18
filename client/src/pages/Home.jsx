import React, { useState,useRef,useEffect } from 'react'
import Header from '../components/Header'
import Hproject from '../components/home/Hproject'
import Hproject2 from '../components/home/Hproject2'
import Hreview from '../components/home/Hreview'
import { FaPlane } from "react-icons/fa";
import Footer from '../components/Footer'
import axios from "axios"
import Hvideo from '../components/home/Hvideo'
import Payment from '../components/home/Payment'
import Ourpartner from '../components/home/Ourpartner'
import Oursite from '../components/home/Oursite'
import { FaWandMagicSparkles } from "react-icons/fa6";
import Typed from 'typed.js';
import { FaPlay } from "react-icons/fa";
import Businessmap from '../components/home/Businessmap'
import { useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import loader_gif from "../assets/loader.gif"
import Teammember from '../components/home/Teammember'
const Home = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
  const el = React.useRef(null);
    const base_url="https://admin-api.oraclesoft.org";

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Betting Web Development", ],
      typeSpeed: 50,
      loop: true,
      backSpeed:50,
      showCursor: false
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
// --------------video play
 const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

       // ---------------all-feedback--------------
const [header_video,set_header_video]=useState([]);
    const get_video=()=>{
        axios.get(`${base_url}/admin/all-videos`)
        .then((res)=>{
            if(res.data.success){
                set_header_video(res.data.find_header_video);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_video()
    },[]);
  return (
   <section className='w-full overflow-hidden '>
      <section className='w-full bg-main_section'>
        <Header/>
    <div className="hero w-full relative font-rubik  h-[100vh] lg:h-[80vh] flex justify-center gap-[50px] lg:gap-[100px] items-center px-[20px] md:px-[30px] lg:px-[50px] flex-col-reverse lg:flex-row xl:px-[100px] py-[40px] lg:py-[20px] overflow-hidden">
        <div className="overlaw absolute top-0 left-0 w-full h-full ">
          <img className='w-full h-[100%]' src="https://www.tawk.to/wp-content/uploads/2023/04/ATF-Background-Graphic.png" alt="" />
        </div>
        {/* --------------animation---------------- */}
        <div class="absolute w-4 h-4 bg-white rounded-full animate-bubble left-10 bottom-10"></div>
  <div class="absolute w-6 h-6 bg-white rounded-full animate-bubble left-20 bottom-20 delay-200"></div>
  <div class="absolute w-3 h-3 bg-white rounded-full animate-bubble left-30 bottom-5 delay-500"></div>
  <div class="absolute w-5 h-5 bg-white rounded-full animate-bubble left-40 bottom-15 delay-1000"></div>
      {/* Hero Text */}
      <div className="w-[100%] md:w-[80%] lg:w-[45%] z-[1]">
        <h2 className="text-[16px] lg:text-[35px] font-[600] text-white mb-[10px] lg:mb-[15px]">Oracle Technology LLC</h2>
        <h1 className="text-[17px] lg:text-[25px] font-[600]  text-white">
          A Leading Remote Software Development Company In The World.
        </h1>
        <h2 className="text-[20px] lg:text-[40px] font-[500] lg:font-[600] text-white mt-[20px]">
          <span ref={el}></span>
        </h2>
        <div className="btn mt-[20px] flex justify-start items-center gap-[10px]">
          <button className="px-[25px] lg:px-[38px] flex justify-center items-center gap-[8px] py-[8px] lg:py-[12px] border-[2px] border-white font-[500] bg-btncolor1 text-white rounded-full text-[14px] lg:text-[16px]">
            Project <FaWandMagicSparkles className='text-[16px] lg:text-[18px]'/>
          </button>
          <button className="px-[25px] lg:px-[38px] py-[8px] lg:py-[12px] border-[2px] font-[500] hover:bg-btncolor1 transition-all duration-150 hover:text-white border-white bg-transparent text-white rounded-full text-[14px] lg:text-[16px]">
            Course
          </button>
        </div>
      </div>

      {/* Video Section */}
{!header_video ? (
  <div className="relative w-full bg-white p-[7px] rounded-[10px]">
    {/* Skeleton for the thumbnail */}
    <Skeleton
      height={280}
      className="w-full h-[240px] md:h-[280px] lg:h-[280px] rounded-[10px]"
    />
    {/* Skeleton for the play button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-gray-300 rounded-full p-3">
        <Skeleton circle={true} height={50} width={50} />
      </div>
    </div>
  </div>
) : (
  <>
    {/* Thumbnail with Play Icon */}
    <div
      className="relative cursor-pointer w-[100%] lg:w-[80%] xl:w-[40%] bg-white p-[7px] rounded-[10px]"
      onClick={togglePopup}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[240px] md:h-[280px] lg:h-[280px] rounded-[10px] bg-white">
        {/* Show loading GIF with color */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Example: Light Blue Loading GIF */}
            <img
              src={loader_gif} // Replace with a GIF of your choice
              alt="Loading..."
              className="w-14 h-14"
            />
          </div>
        )}

        <img
          src={`${base_url}/images/${header_video?.thumbnail}`}
          className="w-full h-[240px] md:h-[280px] lg:h-[280px] rounded-[10px] opacity-0 transition-opacity duration-300"
          alt="Video Thumbnail"
          onLoad={handleImageLoad}
          style={isImageLoading ? { opacity: 0 } : { opacity: 1 }}
        />
      </div>

      {/* Play Button - Hidden when image is loading */}
      {!isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <FaPlay className="text-[#ff4757] text-3xl" />
          </div>
        </div>
      )}
    </div>

    {/* Video Popup */}
    {isOpen && (
      <div className="fixed inset-0 z-[100000] bg-black bg-opacity-75 flex items-center justify-center">
        <button
          className="absolute top-[10%] right-[10%] z-[10000] text-red-500 text-lg font-bold hover:text-red-500"
          onClick={togglePopup}
        >
          ✕
        </button>
        <div className="relative w-[90%] max-w-3xl lg:p-3 p-[5px] bg-white rounded-lg z-[100]">
          {/* YouTube Video */}
          <div className="w-full bg-white rounded-[10px] overflow-hidden z-[1000]">
            <iframe
              className="w-full h-[250px] lg:h-[350px] rounded-[10px] z-[100]"
              src={`${header_video?.video_link}`}
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
  </>
)}








    </div>
      </section>
      {/* ---------project-------------- */}
      <Hproject/>
      <Hproject2/>
      <Hreview/>
      <Hvideo/>
      <Payment/>
      <Businessmap/>
      <Ourpartner/>
      <Oursite/>
      <Teammember/>

      <Footer/>
   </section>
  )
}

export default Home