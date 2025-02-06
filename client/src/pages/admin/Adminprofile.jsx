import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { FaTrophy } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import Userdashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Userheader from '../../components/Dashboard/Dashboardheader';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLockOutline } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';
const Adminprofile = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const admin_info = JSON.parse(localStorage.getItem("admin_data"));
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [name,set_name]=useState("");
   const [email,set_email]=useState("");
   const [password,set_password]=useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.state || !formData.zipCode || !formData.city) {
      alert('Please fill out all fields before submitting');
      return;
    }
    console.log('Updated Data:', formData);
    alert('Profile updated successfully!');
  };
//   ---------------------admin-profile----------------------
const base_url = import.meta.env.VITE_API_KEY_Base_URL;

const [admin_details,set_admin_details]=useState([])
const admin_infomation = () => {
  axios
    .get(`${base_url}/admin/admin-informations/${admin_info._id}`,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }})
    .then((res) => {
      if (res.data.success) {
        set_admin_details(res.data.data);
        console.log(res.data.data);
        set_name(res.data.data.name);
        set_email(res.data.data.email)
        set_password(res.data.data.password)

      }
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
    admin_infomation();
 
}, []);
// --------------update-form----------------------
const update_details=(e)=>{
     e.preventDefault();
     console.log(name,email,password)
     if(name=="" || email=="" || password==""){
         Swal.fire({
            icon:"error",
            title:"Update Failes",
            text:"Please fill up your information!"
         })
     }else if(!name=="" || !email=="" || !password==""){
        axios.put(`${base_url}/admin/update-details`,{name,email,password})
        .then((res)=>{
            if(res.data.success){
                Swal.fire({
                    icon:"Success",
                    title:"Updated Successfully!",
                    text:"You have changed your details!"
                 })
                 localStorage.removeItem("admin_data");
                 localStorage.removeItem("token");
                 navigate("/admin-login");
            }
        }).catch((err)=>{
            Swal.fire({
                icon:"error",
                title:"Update Failes",
                text:"Please fill up your information!"
             })
        })
     }
} 
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Userdashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh]  overflow-y-auto transition-all duration-300':'  transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader/> 
       {/* ----------------box-------------- */}
      <section className='w-full p-[30px]'>
      <section className="w-full mt-[30px] p-[20px] font-poppins border-[1px] border-[#eee]  bg-white  rounded-[5px]">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <FaUser /> Profile Setting
      </h2>
      <form className="space-y-[15px] " onSubmit={update_details}>
        <div>
          <label className="block text-[15px] font-medium">Name</label>
          <input type="text" name="lastName" value={name} onChange={(e)=>{set_name(e.target.value)}} className=" mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className=" text-[15px] font-medium flex items-center gap-2">
            <FaEnvelope /> E-mail Address
          </label>
          <input type="email" name="email" value={email} onChange={(e)=>{set_email(e.target.value)}}  className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className=" text-[15px] font-medium flex items-center gap-2">
            <MdLockOutline /> Password
          </label>
          <input type="password" name="password" value={password} onChange={(e)=>{set_password(e.target.value)}}  className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div className="col-span-2">
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md font-medium">Submit</button>
        </div>
      </form>
    </section>
      </section>
      {/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Adminprofile