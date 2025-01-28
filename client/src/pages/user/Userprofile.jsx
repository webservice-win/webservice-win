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
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
const Userprofile = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const user_info = JSON.parse(localStorage.getItem("user_data"));
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
   useEffect(()=>{
         set_name(user_info.name);
         set_email(user_info.email)
   },[])
   const [formData, setFormData] = useState({
    firstName: 'Rafiq',
    lastName: 'Mahim',
    email: 'rafiq@gmail.com',
    mobile: '01686273273',
    address: '',
    state: '',
    zipCode: '',
    city: '',
    country: 'Bangladesh',
  });

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
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Userdashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] bg-[#080F25] overflow-y-auto transition-all duration-300':' bg-[#080F25]  transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader/> 
       {/* ----------------box-------------- */}
      <section className='w-full p-[30px]'>
      <section className="w-full mt-[30px] p-[20px] font-poppins   bg-white shadow-md rounded-[5px]">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <FaUser /> Profile Setting
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[15px] font-medium">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px] font-medium">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className=" mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px] font-medium flex items-center gap-2">
            <FaEnvelope /> E-mail Address
          </label>
          <input type="email" name="email" value={formData.email} readOnly className="mt-[5px] w-full p-2 border rounded-md bg-gray-200" />
        </div>
        <div>
          <label className="block text-[15px] font-medium flex items-center gap-2">
            <FaPhone /> Mobile Number
          </label>
          <input type="text" name="mobile" value={formData.mobile} readOnly className="mt-[5px] w-full p-2 border rounded-md bg-gray-200" />
        </div>
        <div className="col-span-2">
          <label className="block text-[15px] font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px] font-medium">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px`] font-medium">Zip Code</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px] font-medium">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-[5px] w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-[15px] font-medium flex items-center gap-2">
            <FaMapMarkerAlt /> Country
          </label>
          <input type="text" name="country" value={formData.country} readOnly className="mt-[5px] w-full p-2 border rounded-md bg-gray-200" />
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

export default Userprofile