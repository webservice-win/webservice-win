import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment"
const Addcourse = () => {
   const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
   const base_url="https://admin-api.oraclesoft.org";
  const admin_info = JSON.parse(localStorage.getItem("admin_data"));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  // Form data state
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    reviews: "",
    students: "",
    price: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.title || !formData.reviews || !formData.students || !formData.price) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!profileImage) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload a profile image.",
      });
      return;
    }

    // Submit the data using axios
    const formPayload = {
      ...formData,
      profileImage,
    };

    axios
      .post(`${base_url}/your-endpoint`, formPayload)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text: "Your form has been submitted successfully.",
          });
          setFormData({
            title: "",
            reviews: "",
            students: "",
            price: "",
          });
          setProfileImage(null); // Reset the profile image
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting the form. Please try again.",
        });
        console.error(err);
      });
  };


  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[15px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Add Course</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
             <li>Reviews</li>
            <li><IoIosArrowForward/></li>
            <li>Add Course</li>
          </ul>
        </div>

       </div>
       {/* ------------------new category----------------- */}
         <section className='pt-[40px] pb-[20px] w-full  mt-[20px] rounded-[10px]'>

            {/* -------------------form---------------------- */}
  <form onSubmit={handleSubmit}>
      <div className="relative w-[60%] lg:w-[50%] xl:w-[30%] h-[200px] mb-[30px]">
        <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              <span className="text-sm">Upload Image</span>
            </div>
          )}
        </div>
        <label
          htmlFor="profileImageInput"
          className="absolute bottom-1 right-2 bg-blue-600 text-white p-3 rounded-[5px] cursor-pointer hover:bg-blue-700"
        >
          <FaCamera className="w-4 h-4" />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Form Fields */}
      <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
        <div className="w-[100%]">
          <label htmlFor="title" className="text-[15px] font-[500] text-gray-600">
            Member Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
        </div>
      </div>

      <div className="w-[100%] mt-[15px]">
        <label htmlFor="reviews" className="text-[15px] font-[500] text-gray-600">
          Member Designation <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="reviews"
          value={formData.reviews}
          onChange={handleInputChange}
          placeholder="Enter member designation"
          className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
        />
      </div>

      <div className="w-[100%] mt-[15px]">
        <label htmlFor="students" className="text-[15px] font-[500] text-gray-600">
          Member Facebook Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          name="students"
          value={formData.students}
          onChange={handleInputChange}
          placeholder="Enter Facebook link"
          className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
        />
      </div>

      <div className="w-[100%] mt-[15px]">
        <label htmlFor="price" className="text-[15px] font-[500] text-gray-600">
          Member Twitter Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Enter Twitter link"
          className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
        />
      </div>

      <div className="flex justify-end items-center gap-[10px]">
        <button
          type="submit"
          className="px-[30px] w-full h-[50px] mt-[15px] text-white text-[14px] gap-[8px] bg-indigo-500 flex justify-center items-center rounded-[5px] cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new category-------------------- */}

         {/* --------------------category-table------------------ */}
       </section>
        </section>
    </section>
  )
}

export default Addcourse