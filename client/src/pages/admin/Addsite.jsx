import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

import moment from "moment"
const Addsite = () => {
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
      // ---------------allcategory--------------
const [category,set_category]=useState([]);
    const get_category=()=>{
        axios.get(`${base_url}/admin/all-site`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                set_category(res.data.data);
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_category()
    },[]);

    // ------------delete category-------------
            const delete_category=(id)=>{
      const confirm_box=confirm("Are you sure?");
       if(confirm_box){
       axios.delete(`${base_url}/admin/delete-site/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
               get_category();

            if(res.data.success){
                Swal.fire("Success", `${res.data.message}`, "success");
            }
        }).catch((err)=>{
            console.log(err.name)
        })
       }
    
    }
    // ------------searching-system
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = category.filter(
    (data) =>
      data.image.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.link.toLowerCase().includes(searchTerm.toLowerCase())
  );
//   ------------handle_form----------
    const [file,set_file]=useState();
    const [link_value,set_link]=useState("");
  const [profileImage, setProfileImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ----------image prevew-----
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    set_file(file)

      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
const handle_form = (e) => {
  console.log(link_value);
  e.preventDefault();

  // Validate the link_value
  if (link_value === "") {
    Swal.fire("Validation Error", "Information is required!", "error");
    return false;
  }

  const formdata = new FormData();
  formdata.append("link", link_value);
  formdata.append("file", file);
  console.log(file);

  // Show progress bar while submitting the form
  Swal.fire({
    title: "Submitting...",
    html: "Please wait while your site information is being submitted.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  // Make the POST request with file upload and progress tracking
  axios.post(`${base_url}/admin/add-site`, formdata, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      Swal.update({
        html: `Submitting... ${percentCompleted}% completed.`,
      });
    },
  })
  .then((res) => {
    // Close the progress bar popup after submission
    Swal.close();

    if (res.data.success === true) {
      set_link(""); // Reset the link value
      set_file(null); // Reset the file
      Swal.fire("Successful", `${res.data.message}`, "success");
      get_category(); // Call the get_category function after successful submission
    } else {
      Swal.fire("Error", `${res.data.message}`, "error");
    }
  })
  .catch((err) => {
    // Close the progress bar and show an error message if something goes wrong
    Swal.close();
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
    console.log(err);
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


       </div>
       {/* ------------------new category----------------- */}
         <section className='pt-[15px] pb-[30px] w-full border-[1px] border-[#eee] shadow-sm px-[20px] mt-[20px] rounded-[5px]'>
            <div>
                <h2 className='text-[20px] lg:text-[20px] font-[600]'>Add Website</h2>
            </div>
            {/* -------------------form---------------------- */}
               <form  onSubmit={handle_form} className="pt-[15px] lg:pt-[20px]">
     <div className="relative w-[80%] lg:w-[50%] xl:w-[40%] h-[200px] mb-[30px]">
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

      <div className="w-full mt-[20px] flex gap-[10px] lg:gap-[30px] mb-[10px]">
        <div className="w-[100%]">
          <label htmlFor="value" className="text-[15px] font-[500] text-gray-600">
            Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="value"
            value={link_value}
            placeholder="Link"
            onChange={(e)=>{set_link(e.target.value)}}
            className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
        </div>
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
            {
             category.length > 0 ? 
              <section className="py-[20px] pt-[50px]">
         <div className="w-full flex justify-between items-center mb-[20px] flex-col lg:flex-row gap-[15px]">
           <h1 className="w-full text-left text-[20px] lg:mb-[15px] font-[600]">Site List</h1>
           <div className="pb-4 w-full lg:w-auto bg-white dark:bg-gray-900">
             <label htmlFor="table-search" className="sr-only">
               Search
             </label>
             <div className="w-full lg:w-auto relative mt-1">
               <div className="w-full lg:w-auto absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                 <svg
                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
                   aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 20 20"
                 >
                   <path
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                   />
                 </svg>
               </div>
               <input
                 type="text"
                 id="table-search"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="block w-full lg:w-auto ps-10 h-[45px] text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search for provider"
               />
             </div>
           </div>
         </div>
         <div className="relative overflow-x-auto sm:rounded-[5px] border-[1px] border-[#eee]">
           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
             <thead className="text-xs text-white uppercase bg-indigo-500 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                 <th scope="col" className="px-6 border-r border-gray-200 dark:border-gray-700 py-4 text-[14px] lg:text-[16px] font-[500]">
                   Image
                 </th>
                 <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]">
                   Link
                 </th>
                 <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]]">
                   Created
                 </th>
                 <th scope="col" className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-[14px] lg:text-[16px] font-[500]">
                   Action
                 </th>
               </tr>
             </thead>
             <tbody>
               {filteredCategories.length > 0 ? (
                 filteredCategories.map((data) => (
                   <tr
                     key={data._id}
                     className="bg-white border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                   >
                     <th
                       scope="row"
                       className="px-6 py-4 font-medium border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-nowrap whitespace-nowrap dark:text-white"
                     >
                       <img className='w-[80px] h-[80px]  rounded-[5px]' src={`${base_url}/images/${data.image}`} alt="" />
                     </th>
                     <td className="px-6 py-4 text-nowrap border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">{data.link}</td>
                     <td className="px-6 py-4 text-nowrap border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                       {moment(data?.createdAt).fromNow()}
                     </td>
                     <td className="px-6 py-4 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                       <button
                         onClick={() => delete_category(data._id)}
                         className="p-[10px] rounded-[5px] bg-red-500 text-white text-[20px]"
                       >
                         <MdDeleteOutline />
                       </button>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td
                     colSpan="4"
                     className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                   >
                     No Site found.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>
       </section>:""
            }
            {/* --------------------category-table------------------ */}
       </section>
        </section>
    </section>
  )
}

export default Addsite