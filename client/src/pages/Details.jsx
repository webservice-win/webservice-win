import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { FaCheck } from "react-icons/fa"; 
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios"
import DOMPurify from 'dompurify';
import { GrLineChart } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {Swiper,SwiperSlide} from "swiper/react"
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import Footer from '../components/Footer';
const Details = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
  const {id}=useParams();
     const base_url="https://admin-api.oraclesoft.org";
     // ---------------all-payment--------------
     const [features,set_features]=useState([]);
const [oursite,set_oursite]=useState([]);
  const [content, setContent] = useState('');
   const [error, setError] = useState(null);
    const get_oursite=()=>{
        axios.get(`${base_url}/admin/single-website-details/${id}`)
        .then((res)=>{
            if(res.data.success){
                set_oursite(res.data.data);
                set_features(res.data.data.features);
                setContent(res.data.data.details);
                console.log(res.data.data.features)
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_oursite()
    },[]);

     // ---------------all-feedback--------------
const [video_reviews,set_video_reviews]=useState([]);
    const get_video_review=()=>{
        axios.get(`${base_url}/admin/all-video-review`)
        .then((res)=>{
            if(res.data.success){
                set_video_reviews(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_video_review()
    },[]);
    const sanitizedContent = DOMPurify.sanitize(content);

  // --------------video play
   const [isOpen, setIsOpen] = useState(false);
  
    // Function to toggle the video popup
    const togglePopup = () => setIsOpen(!isOpen);
         // ---------------all-payment--------------
const [websites,set_websites]=useState([]);
    const get_websites=()=>{
        axios.get(`${base_url}/admin/all-site`)
        .then((res)=>{
            if(res.data.success){
                set_websites(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_websites()
    },[]);
    const [items,set_item]=useState([]);

    const get_website=()=>{
        axios.get(`${base_url}/admin/all-websites`)
        .then((res)=>{
            if(res.data.success){
                set_item(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_website()
    },[]);
  return (
   <section className='w-full overflow-hidden font-poppins'>
      <section className='w-full h-[40vh] lg:h-[65vh] overflow-hidden'>
        <Header/>
    <div className="hero w-full relative font-rubik h-[30vh] lg:h-[45vh] flex justify-center gap-[100px] items-center px-[20px] lg:px-[100px] py-[20px] overflow-hidden ">
         {/* -------------hero section------------ */}
         <div className='absolute top-0 left-0 w-full h-[100%] overflow-hidden'>
          <img className='w-full h-full'  src={`${base_url}/images/${oursite.banner2}`}alt="" />
         </div>
        <div className="hero w-full flex justify-center items-center z-[1]">
        <div className='w-full'>
            <h1 className='text-[18px] text-left m-auto lg:text-[30px]  font-[600] font-rubik text-white'>{oursite.title}</h1>
        </div>
      </div>
    {/* ------------hero section------------ */}
  </div>

{/* =------------------------details section-------------------- */}
 
{/* =------------------------details section-------------------- */}

      </section>
      <div className='w-full h-[50px] lg:h-[60px] flex border-t-[2px] border-b-[2px] border-white'>
      <div className='px-[20px]  w-[20%] lg:w-[10%] h-full flex justify-center items-center text-[16px] lg:text-[20px] text-white font-[500] bg-black'>
    Note:
    </div>
    <div className='w-[80%] lg:w-[90%] h-full  flex justify-center items-center bg-green-800 text-[16px] lg:text-[20px] text-white'>
      <marquee className=" inline-block text-white">{oursite?.note}</marquee>
    </div>
      </div>
      {/* ---------------details-section----------------- */}
      <section className='px-[20px] bg-main_section md:px-[50px] lg:px-[100px] pb-[60px]'>
        {/* ----------first part---------- */}
        <div className=" py-12">
      <div className="">
        {/* Demo Buttons */}
        <div className="flex justify-center gap-2 lg:gap-4 mb-[50px]">

          <NavLink to={`${oursite.demoFrontend}`} target="_blank">
          <button className="px-[20px] py-3 border-2 border-white text-white rounded-[20px] text-[14px] lg:text-[17px] font-medium bg-gradient-to-br from-red-500 via-red-700 to-black duration-200 hover:text-white transition">
            Demo Frontend 
          </button>
          </NavLink>
          <NavLink to={`${oursite.demoBackend}`} target="_blank">
     <button className="px-[20px] py-3 border-2 border-white text-white rounded-[20px] text-[14px] lg:text-[17px] font-medium bg-gradient-to-br from-red-500 via-red-700 to-black duration-200 hover:text-white transition">
            Demo Backend 
          </button>
            </NavLink>
      
        </div>

        {/* Pricing Section */}
<div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-[30px] grid-cols-1">
 <div
      className={`w-full p-6 rounded-lg overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-black border-[3px] border-white text-white shadow-lg relative`}
    >
      {/* Triangular Ribbon on Top-Right */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-green-700 to-black text-yellow-300 font-bold text-xs py-[25px] px-[50px] transform translate-x-[35%]  -translate-y-[10%] rotate-45">
       Top selling <br />Order Now
      </div>

      <h2 className="text-[16px] border-b-[1px] border-white pb-[5px] font-bold mb-4 text-center">Single License Script</h2>
      <h3 className="text-3xl font-extrabold mb-4 text-center text-[#fed330]">${oursite.singleLicense}</h3>
      <ul className="space-y-2 text-sm text-center list-none">
        {oursite.features?.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center justify-center list-none">
            <span className="mr-2">&#8226;</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-6 px-[25px] bg-indigo-900 border-[2px] border-white text-white rounded-full block m-auto py-2 text-[18px] font-bold hover:bg-yellow-600">
        Buy Now
      </button>
    </div>
     <div
      className={`w-full p-6 rounded-lg  overflow-hidden bg-gradient-to-br from-green-500 green-700 to-black border-[3px] border-white text-white shadow-lg relative`}
    >
      {/* Triangular Ribbon on Top-Right */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-green-700 to-black text-yellow-300 font-bold text-xs py-[25px] px-[50px] transform translate-x-[35%]  -translate-y-[10%] rotate-45">
        Best selling<br />Order Now
      </div>

      <h2 className="text-[16px] border-b-[1px] border-white pb-[5px] font-bold mb-4 text-center">Unlimited License Script</h2>
      <h3 className="text-3xl font-extrabold mb-4 text-center text-[#fed330]">${oursite.unlimitedLicense}</h3>
      <ul className="space-y-2 text-sm text-center list-none">
        {oursite.unlimitedfeatures?.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center justify-center list-none">
            <span className="mr-2">&#8226;</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-6 px-[25px] bg-indigo-900 border-[2px] border-white text-white rounded-full block m-auto py-2 text-[18px] font-bold hover:bg-yellow-600">
        Buy Now
      </button>
    </div>

     <div
      className={`w-full p-6 rounded-lg overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600  to-black  border-[3px] border-white text-white shadow-lg relative`}
    >
      {/* Triangular Ribbon on Top-Right */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-green-700 to-black text-yellow-300 font-bold text-xs py-[25px] px-[50px] transform translate-x-[35%]  -translate-y-[10%] rotate-45">
        Best selling<br />Order Now
      </div>

      <h2 className="text-[16px] border-b-[1px] border-white pb-[5px] font-bold mb-4 text-center">Completed Betting Website</h2>
      <h3 className="text-3xl font-extrabold mb-4 text-center text-[#fed330]">${oursite.bettinglicense}</h3>
      <ul className="space-y-2 text-sm text-center list-none">
        {oursite.bettingfeatures?.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center justify-center list-none">
            <span className="mr-2">&#8226;</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-6 px-[25px] bg-indigo-900 border-[2px] border-white text-white rounded-full block m-auto py-2 text-[18px] font-bold hover:bg-yellow-600">
        Buy Now
      </button>
    </div>
</div>


    {/* ------------------banner---------------------- */}
         <section>
          <div className='mt-[10px] lg:mt-[20px]  p-[3px] bg-white rounded-[10px]'>
            <img className='w-full h-full rounded-[10px] ' src={`${base_url}/images/${oursite.banner3}`} alt="" />
          </div>
         </section>
    {/* ---------------banner--------------------- */}
      </div>
        </div>
    {/* ------------second part------------- */}
     <div className="flex flex-wrap lg:flex-nowrap gap-5 lg:gap-8 ">
      {/* Left Banner Section */}
      <div className=" lg:w-2/3">
        <img
          src={`${base_url}/images/${oursite.thumbnail}`}
          alt="Baji Live Banner"
          className="rounded-lg mb-6"
        />
     
      </div>
    {/* Right Details Section */}
      <div className="bg-[#1B1464] border-[3px]  border-white rounded-[10px]  p-[15px] shadow-lg w-full lg:w-1/3">
             <div>
                  <div className="flex flex-col">
                       {/* Thumbnail with Play Icon */}
                       <div className="relative cursor-pointer w-full bg-white p-[3px] rounded-[10px]" onClick={togglePopup}>
                         {/* Thumbnail */}
                         <img
                            src={`${base_url}/images/${oursite?.tutorial_image}`}
                           alt="Video Thumbnail"
                           className="w-full h-[250px] md:h-[260px] lg:h-[280px] rounded-[10px] "
                         />
                 
                         {/* Play Button */}
                         <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-white rounded-full p-3 shadow-lg">
                             <FaPlay className="text-[#ff4757] text-3xl" />
                           </div>
                         </div>
                       </div>
                        <h1 className='text-[20px] text-white text-left mt-[15px]'>{oursite.tutorialtitle}</h1>
                       {/* Video Popup */}
                       {isOpen && (
                         <div className="fixed inset-0 z-[100000] bg-black bg-opacity-75 flex items-center justify-center ">
                           <div className="relative w-[90%] max-w-3xl p-4 bg-white rounded-lg z-[100]">
                             {/* Close Button */}
                             <button
                               className="absolute top-[-10%] right-[-10%] z-[10000] text-red-500 text-lg font-bold hover:text-red-500"
                               onClick={togglePopup}
                             >
                               ✕
                             </button>
                 
                             {/* YouTube Video */}
                             <div className="w-full bg-white rounded-[10px] overflow-hidden z-[1000]">
                               <iframe
                                 className="w-full h-[350px] rounded-[10px] z-[100]"
                                 src={`${oursite.tutorialLink}`}
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
      </div> 
  
    </div>
        {/* ------------second part------------- */}
     <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-8 mt-[20px] ">
      {/* Left Banner Section */}
           <div className=' lg:w-2/3 w-full p-[20px] bg-white border-[3px] border-indigo-700'>
            <h2 className='text-[15px] font-[500] text-neutral-600'><span className='font-[600] text-btncolor1'>Oracle Technology LLC </span>We have been successfully working on betting site development since 2018. We provide complete guidance and support to create a betting site. Many people who come to work with us talk about budget; sites are available in the market for very little money. Why do we spend so much? I tell them they should not lose their money after falling into the trap of less cash. Read this post carefully to see what is needed to create a betting site, and then you will understand why it costs so much. Then, you will consider where and how to create a betting site and do business.</h2>
            <div className='mt-[30px] font-poppins'>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p> // Show error message if there's an issue
      ) : (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> // Render sanitized HTML content
      )}
    </div>
          </div>
    {/* Right Details Section */}
      <div className=' w-full lg:w-1/3'>
            <div className='bg-[#1B1464] mb-[20px] border-white border-[3px]'>
              <img className='w-full h-full' src={`${base_url}/images/${oursite.banner4}`} alt="" />
            </div>
    <div className='bg-[#1B1464] mb-[20px] border-white border-[3px]'>
              <img className='w-full h-full' src={`${base_url}/images/${oursite.banner5}`} alt="" />
            </div>
                <div className='bg-[#1B1464] mb-[20px] border-white border-[3px]'>
              <img className='w-full h-full' src={`${base_url}/images/${oursite.banner6}`} alt="" />
            </div>
        </div>
  
    </div>
    {/* -------------------------description-------------------- */}
    {/* -------------------------description-------------------- */}
       <section className='flex flex-wrap mt-[20px] lg:flex-nowrap gap-4 lg:gap-8'>
        {
      video_reviews.length > 0 ?   <section className='w-full  h-auto  py-[20px] lg:py-[50px] '>
          <div className='flex justify-center items-center'>
        <h1 className='px-[40px] lg:px-[100px] font-bangla_font rounded-[15px] text-center w-auto text-[18px] lg:text-[30px] py-[10px] bg-[#1B1464] border-[3px] border-white text-white'>
          Related Review
        </h1>
      </div>
       {/* ---------------review----------------- */}
        <section className='pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]'>
         <div className='w-full overflow-hidden  rounded-[10px] p-[7px] bg-white'>
            <iframe className='w-full h-[250px] rounded-[10px]'  src={`${oursite?.tutorialLink2}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
             <div className='w-full overflow-hidden  rounded-[10px] p-[7px] bg-white'>
            <iframe className='w-full h-[250px] rounded-[10px]'  src={`${oursite?.tutorialLink3}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
                  <div className='w-full overflow-hidden  rounded-[10px] p-[7px] bg-white'>
            <iframe className='w-full h-[250px] rounded-[10px]'  src={`${oursite?.tutorialLink4}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
              
        </section>



      </section>:""
    }
       </section>
    {/* -------------------------description-------------------- */}
{
  items.length > 0 ?      <section className='py-[20px] lg:py-[50px]'>
        <div className='flex justify-center mb-[70px] items-center'>
         <h1 className='px-[40px] lg:px-[100px] font-bangla_font rounded-[15px] text-center w-auto text-[18px] lg:text-[30px] py-[10px] bg-[#1B1464] border-[3px] border-white text-white'>
          Related More Product
        </h1>
      </div>
      <section>
       <Swiper
      slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300:{
    slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

        }}
        modules={[Pagination,Navigation]}
        navigation
        className="mySwiper  "
      >
        {
          items?.slice(0,3).map((data,i)=>{
            return(
 <SwiperSlide>
                <div key={i} className='p-[7px] rounded-[10px] font-poppins group  bg-white overflow-hidden '>
                               <div className='w-full h-[200px] lg:h-[300px] rounded-[10px] overflow-hidden '>
                                   <img className='w-full h-full group-hover:scale-[1.1] group-hover:rotate-[2deg] transition-all duration-200' src={`${base_url}/images/${data.thumbnail}`}  alt="" />
                               </div>
                               <div className='p-[10px] lg:p-[15px] font-rubik w-full'>
                    {
                       data.title.length >60 ?  <h2 className='text-[16px] font-poppins lg:text-[22px] mb-[15px] font-[600] '>{data.title.slice(0,60)}...</h2>: <h2 className='text-[16px] lg:text-[22px] mb-[5px] lg:mb-[15px] font-[600] font-poppins'>{data.title}</h2>
                      }
                                       <h2 className='text-[14px] lg:text-[16px] font-[500] text-neutral-600 mb-[8px]'>Single License:${data.singleLicense}</h2>
                                       <h2 className='text-[14px] lg:text-[16px] font-[500] text-neutral-600'>Unlimited:${data.unlimitedLicense}</h2>
                                   <div className='flex justify-between items-center mt-[20px]'>
                                       <h2 className='text-[15px] lg:text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]'>
                                          <FaHeart className='text-[15px] lg:text-[18px] text-red-600'/>
                                          <p>({data?.love}+)</p>
                                       </h2>
                                                       <h2 className='text-[15px] lg:text-[17px] font-[500] text-neutral-500 flex justify-center items-center gap-[8px]'>
                                          <AiOutlineLike className='text-[20px] text-red-600'/>
                                          <p>({data?.like}+)</p>
                                       </h2>
                                   </div>
                                   <div className='flex justify-center items-center gap-[15px] mt-[10px] lg:mt-[15px]'>
                                       <button className='w-[50%] py-[8px] lg:h-[50px] text-red-500 border-red-400 border-[2px] font-[500] text-[14px] lg:text-[17px] hover:bg-red-400 hover:text-white transition-all duration-150'>Live Demo</button>
                                       <NavLink to={`/single-website-details/${data._id}`} className="w-[50%]">
                                               <button className='w-[100%] py-[8px] lg:h-[50px] text-gray-500 border-gray-400 border-[2px] font-[500] text-[14px] lg:text-[17px] hover:bg-gray-400 hover:text-white transition-all duration-150'>Details</button>
                                       </NavLink>
                                   </div>
                               </div>
                             </div>
        </SwiperSlide>
            )
          })
        }
       
<div>
  {/* If we need pagination */}
  <div className="swiper-pagination" />
  {/* If we need navigation buttons */}
  <div className="swiper-button-prev" />
  <div className="swiper-button-next" />
  {/* If we need scrollbar */}
  <div className="swiper-scrollbar" />
</div>

      </Swiper>

      </section>
     </section>:""
}
      </section>
      <Footer/>
</section>
  )
}

export default Details