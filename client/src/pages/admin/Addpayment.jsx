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
const Addpayment = () => {
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
  //  -----------payment data-------------
     // ---------------allcategory--------------
const [category,set_category]=useState([]);
    const get_category=()=>{
        axios.get(`${base_url}/admin/all-payment`, {
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
       axios.delete(`${base_url}/admin/delete-payment/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        .then((res)=>{
            if(res.data.success){
                Swal.fire("Success", `${res.data.message}`, "success");
               get_category();
            }
        }).catch((err)=>{
            toast.error(err.name)
        })
       }
    
    }
    // ------------searching-system
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = category.filter(
    (data) =>
      data.image.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  //  ----------handle image 
   const [profileImage, setProfileImage] = useState(
    "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
  );


//   ------------------handle-form--------------

 const [form, setForm] = useState({
    videoUrl: "",
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

  const { profileImage } = form;

  // URL validation using regular expression
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,}\/?/;

  if (!profileImage) {
    Swal.fire("Error", "Please upload image.", "error");
    return;
  }

  // Prepare FormData for submission
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }

  // Show progress bar while submitting the form
  Swal.fire({
    title: "Submitting...",
    html: "Please wait while your payment form is being submitted.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Make the POST request with file upload
    const response = await axios.post(`${base_url}/admin/add-payment`, formData, {
      headers: {
        'Authorization': localStorage.getItem('token'),
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
      Swal.fire("Success", "Your form has been submitted successfully.", "success");
      get_category();  // Call the get_category function after successful submission
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

       {/* ------------------new category----------------- */}
         <section className=' pb-[20px] w-full  mt-[20px] rounded-[10px]'>

            {/* -------------------form---------------------- */}
 <form onSubmit={handleSubmit} className='w-[100%] rounded-[5px]  p-[20px] border-[1px] border-[#eee] m-auto'>
        <h1 className='text-[20px] font-[600] mb-[15px]'>Add Payment Proof</h1>
  
      <div className="relative w-[80%] lg:w-[50%] xl:w-[40%] h-[200px] mb-[30px]">
        {/* Circular Profile Image */}
        <div className="w-[full] h-full rounded-[5px] overflow-hidden border-2 border-gray-300">
          {form.profileImage ? (
            <img
              src={form.profileImage}
              alt="Profile"
              className="w-full h-full"
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

      <div className="flex justify-end items-center gap-[10px]">
        <button
          type="submit"
          className="px-[30px]  w-full h-[50px] text-white text-[14px] gap-[8px] bg-indigo-500 flex justify-center items-center rounded-[5px] cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
            {/* -------------------form---------------------- */}
         </section>
       {/* --------------------category-table------------------ */}
           {
            category.length > 0 ? 
             <section className="py-[20px] pt-[50px]">
        <div className="w-full flex justify-between items-center mb-[20px] flex-col lg:flex-row gap-[15px]">
          <h1 className="w-full text-left text-[20px] lg:mb-[15px] font-[600]">Payment Proof List</h1>
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
                placeholder="Search for payment"
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
                    No Image found  as this name.
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

export default Addpayment