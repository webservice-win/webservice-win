import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { AiOutlinePlus, AiOutlineRollback, AiOutlineCamera } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

const Addpaymentmethod = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [uploadedImage, setUploadedImage] = useState(null);
   const [currencyName, setCurrencyName] = useState("");
   const [userData, setUserData] = useState([]);
   const [formData, setFormData] = useState({
     type: "",
     isRequired: "",
     label: "",
     width: "",
     instruction: "",
   });
   const [showPopup, setShowPopup] = useState(false);
   const [file,set_file]=useState(null)
   const handleImageUpload = (event) => {
     const file = event.target.files[0];
     console.log(file)
     if (file) {
        set_file(file);
       const reader = new FileReader();
       reader.onload = () => setUploadedImage(reader.result);
       reader.readAsDataURL(file);
     }
   };
 
   const handlePopupSubmit = () => {
     setUserData([...userData, formData]);
     setFormData({
       type: "",
       isRequired: "",
       label: "",
       width: "",
       instruction: "",
     });
     setShowPopup(false);
     Swal.fire("Success!", "New field added successfully.", "success");
   };
 
   const handleDeleteField = (index) => {
     Swal.fire({
       title: "Are you sure?",
       text: "This field will be permanently deleted.",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Yes, delete it!",
       cancelButtonText: "Cancel",
     }).then((result) => {
       if (result.isConfirmed) {
         setUserData(userData.filter((_, i) => i !== index));
         Swal.fire("Deleted!", "Field has been removed.", "success");
       }
     });
   };
   console.log(file)
     const [minAmount,set_minAmount]=useState();
     const [maxAmount,set_maxAmount]=useState();
     const [fixedCharge,set_fixedCharge]=useState();
     const [percentCharge,set_percentCharge]=useState();
     const [depositInstruction,set_depositInstruction]=useState("");
     const [getwayname,set_getwayname]=useState("");
     const [rate,set_rate]=useState();
   const handleSubmit = async (event) => {
     event.preventDefault();
    const form_data=new FormData();
    form_data.append("currencyName",currencyName);
    form_data.append("minAmount",minAmount);
    form_data.append("maxAmount",maxAmount);
    form_data.append("fixedCharge",fixedCharge);
    form_data.append("percentCharge",percentCharge);
    form_data.append("depositInstruction",depositInstruction);
    form_data.append("gatewayName",getwayname);
    form_data.append("rate",rate);
    form_data.append("userData",userData);
    form_data.append("file",file)
    console.log(file)
     const payload = {
       uploadedImage,
       currencyName,
       minAmount,
       maxAmount,
         fixedCharge,
         percentCharge,
       depositInstruction,
       userData,
     };
   console.log(payload)
    //  if (!currencyName || !payload.range.minAmount || !payload.range.maxAmount) {
    //    Swal.fire("Error", "Please fill in all required fields.", "error");
    //    return;
    //  }
     axios.post(`${base_url}/admin/manual-payment`,{userData})
     .then((res)=>{
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        icon: "success",

      })
     }).catch((err)=>{
        console.log(err)
     })
   };
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       {/* ----------------box-------------- */}
<section className="px-[20px] py-[35px]">
<div className="">
      <form onSubmit={handleSubmit} className=" bg-white border-[1px] border-[#eee] p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add Manual Gateway</h1>
          <button className="flex items-center text-gray-500 hover:text-gray-600 focus:outline-none">
            <AiOutlineRollback className="mr-1" /> Back
          </button>
        </div>

        <div className="mb-[60px] w-[20%] h-[200px] ">
          <label className="font-medium text-gray-700 mb-2 block">Upload Image</label>
          <div className="relative border rounded-md px-4 py-2 h-full bg-gray-50 flex items-center justify-center">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <AiOutlineCamera className="text-gray-500 text-4xl" />
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Gateway Name *</label>
            <input
              type="text"
              value={getwayname}
              onChange={(e)=>{set_getwayname(e.target.value)}}
              className="border rounded-[5px] mt-[5px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Currency *</label>
            <input
              type="text"
              className="border rounded-[5px] mt-[5px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setCurrencyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Rate *</label>
            <div className="flex items-center border-[1px] border-[#eee] rounded-md">
              <span className="px-4 py-2 text-gray-600 flex justify-center text-nowrap w-[20%] bg-gray-100">1 USD =</span>
              <input
                type="text"
                value={rate}
                onChange={(e)=>{set_rate(e.target.value)}}
                className="border-l px-4 py-2 w-full outline-none"
                placeholder="Currency Rate"
              />
              <span className="px-4 py-2 text-gray-600 h-full w-auto bg-gray-100">{currencyName}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] font-poppins mb-6">
          <div>
            <h2 className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-2">Range</h2>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Minimum Amount *</label>
              <div className="flex items-center border bg-gray-100 rounded-[5px]">
                <input
                  type="text"
                  value={minAmount}
                  onChange={(e)=>{set_minAmount(e.target.value)}}
                  className="   px-4 py-2 focus:outline-none rounded-l-[5px] focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <span className="ml-2 px-[10px] h-full bg-gray-100">USD</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <label className="font-medium text-gray-700">Maximum Amount *</label>
              <div className="flex items-center border bg-gray-100 rounded-[5px]">
                <input
                  type="text"
                  value={maxAmount}
                  onChange={(e)=>{set_maxAmount(e.target.value)}}
                  className=" rounded-l-[5px]  px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <span className="ml-2 px-[10px] h-full bg-gray-100">USD</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-2">Charge</h2>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Fixed Charge *</label>
              <div className="flex items-center border bg-gray-100 rounded-[5px]">
                <input
                  type="text"
                  value={fixedCharge}
                  onChange={(e)=>{set_fixedCharge(e.target.value)}}
                  className="rounded-l-[5px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <span className="ml-2 bg-gray-50 px-[10px] h-full">USD</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <label className="font-medium text-gray-700">Percent Charge *</label>
              <div className="flex items-center border bg-gray-100 rounded-[5px]">
                <input
                  type="text"
                  value={percentCharge}
                  onChange={(e)=>{set_percentCharge(e.target.value)}}
                  className="rounded-l-[5px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <span className="ml-2 bg-gray-50 px-[10px]">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-2">Deposit Instruction</h2>
          <textarea
          value={depositInstruction}
          onChange={(e)=>{set_depositInstruction(e.target.value)}}
            className="w-full border rounded-[5px] mt-[5px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 h-40"
          ></textarea>
        </div>

        <div className="mb-6">
         <div className='flex justify-between items-center bg-indigo-500 px-[10px] py-[5px] rounded-t-[10px]'>
         <h2 className=" text-white py-2 px-4 rounded-md mb-2">User Data</h2>
          <div
            className="flex items-center cursor-pointer text-white border-[1px] border-white px-[10px] py-[6px] rounded-[5px] focus:outline-none"
            onClick={() => setShowPopup(true)}
          >
            <AiOutlinePlus className="mr-1" /> Add New
          </div>
         </div>
          <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Type</th>
                <th className="border border-gray-200 px-4 py-2">Is Required</th>
                <th className="border border-gray-200 px-4 py-2">Label</th>
                <th className="border border-gray-200 px-4 py-2">Width</th>
                <th className="border border-gray-200 px-4 py-2">Instruction</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((field, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">{field.type}</td>
                  <td className="border border-gray-200 px-4 py-2">{field.isRequired}</td>
                  <td className="border border-gray-200 px-4 py-2">{field.label}</td>
                  <td className="border border-gray-200 px-4 py-2">{field.width}</td>
                  <td className="border border-gray-200 px-4 py-2">{field.instruction || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                      onClick={() => handleDeleteField(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
   
        </div>

        <button
          className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[10] justify-center">
          <div className="bg-white rounded-lg p-6 w-[30%]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Form</h3>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Type *</label>
              <select
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select One</option>
                <option value="file">File</option>
                <option value="text">Text</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Is Required *</label>
              <select
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.isRequired}
                onChange={(e) => setFormData({ ...formData, isRequired: e.target.value })}
              >
                <option value="">Select One</option>
                <option value="required">Required</option>
                <option value="optional">Optional</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Label *</label>
              <input
                type="text"
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Width *</label>
              <select
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              >
                <option value="">Select One</option>
                <option value="full">Full</option>
                <option value="half">Half</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Instruction (if any)</label>
              <input
                type="text"
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.instruction}
                onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</section>
{/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Addpaymentmethod