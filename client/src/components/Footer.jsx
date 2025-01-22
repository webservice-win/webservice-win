import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.webp";
// import image5 from "../assets/image5.png";

import { NavLink } from "react-router-dom";
const Footer = () => {
  const scriptPartnerImages = [img1, img4, img5];
  const softPartnerImages = [image2, image3];

  const scriptSecuredImages = [img2, img3];
  const softSecuredImages = [image1, image4];

  console.log(import.meta.env.VITE_SITE_NAME);
  return (
    <footer className="bg-black text-white font-poppins">
      <div className="px-[20px] lg:px-[40px] py-[40px] flex flex-wrap xl:flex-nowrap gap-8">
        {/* About Us Section */}
        <div className="md:w-[25%]">
          <img src={logo} alt="Oracle Technology Logo" className="h-16 mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-yellow-400">
            About us
          </h2>
          <p className="text-sm">
            Oracle Technology is a professional IT company. Through us, you can
            easily create any type of{" "}
            {import.meta.env.VITE_SITE_NAME === "oraclescript"
              ? "website"
              : "betting site"}{" "}
            or e-commerce site in just 7-10 working days. Do you need a website?
            Then call us on WhatsApp Oracle Technology LLC.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-3">
          {/* Our Company Links */}
          <div className="">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              Our Company
            </h2>
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
              <NavLink>
                <li>Privacy Policy</li>
              </NavLink>

              <NavLink>
                <li>Refund Policy</li>
              </NavLink>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              Quick Link
            </h2>
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
          </div>
          <div className="">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              Official Partner
            </h2>
            <div>
              {import.meta.env.VITE_SITE_NAME === "oraclescript"
                ? scriptPartnerImages?.map((item) => (
                    <img
                      key={item}
                      src={item}
                      alt="HeyVIP Logo"
                      className="h-10 mb-[10px]"
                    />
                  ))
                : softPartnerImages?.map((item) => (
                    <img
                      key={item}
                      src={item}
                      alt="HeyVIP Logo"
                      className="h-10 mb-[10px]"
                    />
                  ))}
            </div>
          </div>
          {/* Official Partner */}
          <div className="">
            <h2 className="text-[15px] lg:text-lg font-semibold mb-4 text-yellow-400">
              Secured & Certified by:
            </h2>
            <div>
              {import.meta.env.VITE_SITE_NAME === "oraclescript"
                ? scriptSecuredImages?.map((item) => (
                    <img
                      key={item}
                      src={item}
                      alt="HeyVIP Logo"
                      className="h-10 mb-[10px]"
                    />
                  ))
                : softSecuredImages?.map((item) => (
                    <img
                      key={item}
                      src={item}
                      alt="HeyVIP Logo"
                      className="h-10 mb-[10px]"
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" text-center p-[15px] text-[16px] bg-purple-800 text-white">
        <p>© 2025 Oracle Technology. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
