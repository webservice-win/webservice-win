import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png"
import img1 from "../assets/img1.webp"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"

import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
  <footer className="bg-black text-white  font-poppins">
      <div className="px-[20px] lg:px-[40px] py-[40px] flex flex-wrap xl:flex-nowrap justify-between  gap-8">
        {/* About Us Section */}
        <div className='w-auto xl:w-[25%]'>
          <img
            src={logo}
            alt="Oracle Technology Logo"
            className="h-16 mb-4"
          />
          <h2 className="text-lg font-semibold mb-2 text-yellow-400">About us</h2>
          <p className="text-sm">
            Oracle Technology is a professional IT company. Through us, you can
            easily create any type of betting site or e-commerce site in just
            7-10 working days. Do you need a website? Then call us on WhatsApp
            Oracle Technology LLC.
          </p>
        </div>

        {/* Our Company Links */}
        <div className='w-auto xl:w-[18%]'>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Our Company</h2>
          <ul className="flex flex-col gap-[5px] text-sm">
           <NavLink>
                 <li>About Us</li>
           </NavLink>
           <NavLink></NavLink>
           <NavLink to="/contact">
                <li>Contact Us</li>
           </NavLink>
           <NavLink>
                    <li>Who Are You</li>
           </NavLink>
       <NavLink >
                 <li>Privacy Policy</li>
       </NavLink>
     
           <NavLink>
                        <li>Refund Policy</li>
           </NavLink>

          </ul>
        </div>

        {/* Quick Links */}
        <div className='w-auto xl:w-[18%]'>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Quick Link</h2>
          <ul className="flex flex-col gap-[5px] text-sm">
            <li>Affiliate Program</li>
            <NavLink to="/api-provider">
               <li>Our Partner</li>
            </NavLink>
    
            <NavLink to="/our-customer">
            <li>Our Client</li>
            </NavLink>
            <NavLink to="video-reviews">
                          <li>Client Video Review</li>
            </NavLink>
            <NavLink to="/feedback">
                          <li>Client Feedback Review</li>
            </NavLink>
          </ul>
        </div >
 <div className='w-auto xl:w-[18%]'>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Official Partner</h2>
          <div>
          <img
              src={img2}
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
      <img
              src={img4}
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
              <img
              src={img5}
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
          </div>
        </div>
        {/* Official Partner */}
        <div className='w-auto xl:w-[18%]'>
          <h2 className="text-[15px] lg:text-lg font-semibold mb-4 text-yellow-400">Secured & Certified by:</h2>
      <div>
          <img
              src={img3}
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
       <img
              src={img1}
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
          </div>

        
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" text-center p-[15px] text-[16px] bg-purple-800 text-white">
        <p>© 2025 Oracle Technology. All rights reserved.</p>
      </div>
    </footer>

                                            
  )
}

export default Footer