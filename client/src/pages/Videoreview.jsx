import React,{useState,useEffect} from 'react'
import { FaStar } from "react-icons/fa";
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios"
import { useLocation } from 'react-router-dom';
const Videoreview = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
    const base_url="https://admin-api.oraclesoft.org";

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

  return (
    <section>
                    <section className='w-full  lg:h-[70vh] '>
        <Header/>
    <div className="hero w-full relative font-rubik bg-main_section lg:h-[52vh] flex justify-center gap-[100px] items-center  px-[20px] md:px-[30px] lg:px-[60px] xl:px-[100px] py-[20px] overflow-hidden">
        <div className="overlaw absolute top-0 left-0 w-full h-full ">
          <img src="https://www.tawk.to/wp-content/uploads/2023/04/ATF-Background-Graphic.png" alt="" />
        </div>
        {/* --------------animation---------------- */}
        <div class="absolute w-4 h-4 bg-white rounded-full animate-bubble left-10 bottom-10"></div>
  <div class="absolute w-6 h-6 bg-white rounded-full animate-bubble left-20 bottom-20 delay-200"></div>
  <div class="absolute w-3 h-3 bg-white rounded-full animate-bubble left-30 bottom-5 delay-500"></div>
  <div class="absolute w-5 h-5 bg-white rounded-full animate-bubble left-40 bottom-15 delay-1000"></div>
     {/* -------------hero section------------ */}
        <div className="hero w-full flex justify-center items-center z-[1]">
        <div className='text-center w-[90%] lg:w-[90%]  font-noto-sans'>
            <h1 className='text-[20px] lg:text-[40px] font-bold mb-[10px] text-white'>আমাদের গ্রাহক ওরাকল টেকনোলজি সম্পর্কে কি বলেন কিছু গ্রাহক এর ভিডিও রিভিউ দেখুন ..</h1>
            <p className='text-[16px]  lg:text-[18px] text-neutral-200'>আমরা বিগত ২০১৭ সাল থেকে বেটিং সাইট ডেভেলপমেন্ট করে আসছি আপনাদের সকল ভালোবাসায় আমাদের রিমোটলি সার্ভিস প্রদান করা প্রতিষ্ঠান আজ আপনাদের সবার কাছে পরিচিত এবং আস্তার যায়গা করে নিয়েছে আমাদের গ্রাহক রা আমাদের ভিডিও বার্তার মাধ্যমে আমাদের ইনিস্পায়ার করছেন আপনাদের সকল ভালোবাসায় আমরা আরও অনেক দুর এগিয়ে যেতে চাই । দেখুন আমাদের গ্রাহকরা কি বলেন ।</p>
        </div>
      </div>
    {/* ------------hero section------------ */}
  </div>
 {/* --------------------------section--------------- */}
 <section>


 </section>
 {/* --------------------------section--------------- */}

</section>
    <section className='w-full  bg-main_section h-auto px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[70px] '>
          <div className='flex justify-center items-center'>
        <h1 className='px-[25px] font-bangla_font text-center rounded-full w-auto text-[22px] lg:text-[30px] py-[10px] bg-color2 border-[3px] border-white text-white'>
          আমাদের গ্রাহকদের ভিডিও রিভিউ
        </h1>
      </div>
       {/* ---------------review----------------- */}
        <section className='pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]'>
         {
    video_reviews.map((data,i)=>{
      return(
     <div key={i} className='w-full overflow-hidden  rounded-[10px] p-[7px] bg-white'>
            <iframe className='w-full h-[250px] rounded-[10px]'  src={`${data.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
      )
    })
  }
     
        </section>
           {/* -------------box----------------- */}
      </section>
      <Footer/>
    </section>
   
  )
}

export default Videoreview