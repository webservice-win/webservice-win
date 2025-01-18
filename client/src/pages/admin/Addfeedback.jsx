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
const Addfeedback = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
       const base_url="https://admin-api.oraclesoft.org";
   const admin_info=JSON.parse(localStorage.getItem("admin_data"));

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
  //  ----------handle image 
   const [profileImage, setProfileImage] = useState(
    "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
  );


//   ------------------handle-form--------------
  const [form, setForm] = useState({
    customerName: "",
    rating: "",
    message: "",
    profileImage: null,
  });

  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setForm({ ...form, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  const { customerName, rating, message, profileImage } = form;

  if (!customerName || !rating || !message || !profileImage) {
    Swal.fire("Error", "Please fill out all required fields.", "error");
    return;
  }

  if (rating < 1 || rating > 5) {
    Swal.fire("Error", "Rating must be between 1 and 5.", "error");
    return;
  }

  // Check if the rating is a number and within the valid range (1-5)
  if (isNaN(rating) || rating <= 0 || rating > 5) {
    Swal.fire("Error", "Rating must be a valid number between 1 and 5.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("customerName", customerName);
  formData.append("rating", rating);
  formData.append("message", message);
  formData.append("file", file);

  // Show progress bar popup while the request is being processed
  Swal.fire({
    title: "Submitting...",
    html: "Please wait while your feedback is being submitted.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.post(`${base_url}/admin/add-feedback`, formData, {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        Swal.update({
          html: `Submitting... ${percentCompleted}% completed.`,
        });
      },
    });

    // Close progress bar popup after submission
    Swal.close();

    if (response.status === 200) {
      // Reset the form fields on success
      setForm({
        customerName: "",
        rating: "",
        message: "",
        profileImage: null,
      });

      Swal.fire("Success", "Your form has been submitted successfully.", "success");
    } else {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    // Close the progress bar if there’s an error
    Swal.close();
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
    console.error(error);
  }
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Add Feedback</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
             <li>Reviews</li>
            <li><IoIosArrowForward/></li>
            <li>Add Feedback</li>
          </ul>
        </div>

       </div>
       {/* ------------------new category----------------- */}
         <section className='pt-[40px] pb-[20px] w-full  mt-[20px] rounded-[10px]'>

            {/* -------------------form---------------------- */}
 <form onSubmit={handleSubmit}>
      <div className="relative w-40 h-40 mb-[30px]">
        {/* Circular Profile Image */}
        <div className="w-full h-full rounded-[5px] overflow-hidden border-2 border-gray-300">
          {form.profileImage ? (
            <img
              src={form.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              <span className="text-sm">Upload Image</span>
            </div>
          )}
        </div>

        {/* Camera Icon Overlay */}
        <label
          htmlFor="profileImageInput"
          className="absolute bottom-1 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700"
        >
          <FaCamera className="w-6 h-6" />
        </label>

        {/* Hidden File Input */}
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
        <div className="w-[100%]">
          <label htmlFor="customerName" className="text-[15px] font-[500] text-gray-600">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
        </div>
      </div>

      <div className="w-full mt-[20px] flex gap-[10px] lg:gap-[30px] mb-[10px]">
        <div className="w-[100%]">
          <label htmlFor="rating" className="text-[15px] font-[500] text-gray-600">
            Rating <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Number"
            className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
        </div>
      </div>

      <div className="w-[100%]">
        <label htmlFor="message" className="text-[15px] font-[500] text-gray-600">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message..."
          className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[150px] border-[1px] border-[#eee] p-[15px]"
        ></textarea>
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

export default Addfeedback