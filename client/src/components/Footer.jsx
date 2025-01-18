import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png"
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
              src="https://i.ibb.co.com/jDmPsNV/Screenshot-2025-01-11-145708.png"
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
      <img
              src="https://i.ibb.co.com/CWzk93Y/Screenshot-2025-01-11-145724.png"
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
              <img
              src="https://i.ibb.co.com/yyfDP4x/Screenshot-2025-01-11-212818.png"
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
              src="https://i.ibb.co.com/yyp6zCc/Screenshot-2025-01-11-145739.png"
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
       <img
              src="https://i.ibb.co.com/RQKkWLx/Screenshot-2025-01-11-212926.png"
              alt="HeyVIP Logo"
              className="h-10 mb-[10px]"
            />
             <img
              src="https://i.ibb.co.com/kBzPT1v/Screenshot-2025-01-11-212939.png"
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