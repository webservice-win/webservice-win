import React, { useContext, useEffect, useState,useRef} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { FaTrophy } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import red_logo from "../../assets/red-logo.png"
import axios from 'axios';
const Invoice = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const {id}=useParams();
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const componentRef = useRef();

   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });
 
   const invoiceData = {
     _id: "6794bb6e64a0ee6bbc6cb6a6",
     product_id: "67896a37066927352f26b4e9",
     product_price: "299",
     customer_id: "679425e454bccb68fe27981f",
     provider_name: "Bank Transfer",
     payeer_number: "01688494104",
     transiction: "34234sdsdsd",
     status: "pending",
     createdAt: "2025-01-25T10:22:38.627Z",
     updatedAt: "2025-01-25T10:22:38.627Z",
   };
 
   const handleDownloadPDF = () => {
     const element = document.createElement("a");
     const file = new Blob([componentRef.current.outerHTML], { type: "text/html" });
     element.href = URL.createObjectURL(file);
     element.download = "invoice.html";
     document.body.appendChild(element);
     element.click();
     document.body.removeChild(element);
   };
   const base_url = import.meta.env.VITE_API_KEY_Base_URL;

   // ---------------all-feedback--------------
   const [single_order,set_single_order]=useState([])
   const get_orders = () => {
     axios
       .get(`${base_url}/admin/single-order/${id}`)
       .then((res) => {
         if (res.data.success) {
            set_single_order(res.data.data);
         }
       })
       .catch((err) => {
         console.log(err.name);
       });
   };
   useEffect(() => {
     get_orders();
   }, []);
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
  <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       {/* ----------------box-------------- */}
<section className="">
<div className="bg-gray-100 min-h-screen p-6 ">
      <div ref={componentRef} className="bg-white  border-[1px] border-[#eee] p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 ">
          <div>
            <img className='w-[150px]' src={red_logo} alt="" />
            {/* <h1 className="text-2xl font-bold text-red-600">Oracle Soft</h1> */}
            {/* <p className="text-sm">1st Floor, House: 21, Road: 3, Banani DOHS, Dhaka-1206</p>
            <p className="text-sm">info@imbdagency.com | 01797242610</p> */}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{}</h2>
            {/* <p className="text-sm">Invoice Date: {single_order?.createdAt.slice(0,10)}</p> */}
            <p className="text-sm font-semibold text-red-500">Status: {single_order.status}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Billed To:</h3>
          <p>Customer ID: {single_order.customer_id}</p>
          <p>Provider Name: {single_order.provider_name}</p>
          <p>Payeer Number: {single_order.payeer_number}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Product Details</h3>
          <p>Product ID: {single_order.product_id}</p>
          <p>Transaction: {single_order.transiction}</p>
          <p>Created At: {new Date(single_order.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(single_order.updatedAt).toLocaleString()}</p>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-sm mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">#</th>
              <th className="border border-gray-300 p-2 text-left">Item</th>
              <th className="border border-gray-300 p-2 text-left">Qty\hrs</th>
              <th className="border border-gray-300 p-2 text-left">Unit Price</th>
              <th className="border border-gray-300 p-2 text-left">Tax</th>
              <th className="border border-gray-300 p-2 text-left">Paid</th>
              <th className="border border-gray-300 p-2 text-left">Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">{single_order.product_name}</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">{single_order.product_price}$</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">{single_order.paid}$</td>
              <td className="border border-gray-300 text-red-500 p-2">{single_order.due_payment}$</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right">
          <p className="mb-2">Sub Total: <span className="font-bold">{single_order.product_price}$</span></p>
          <p className="mb-2">Total: <span className="font-bold">{single_order.product_price}$</span></p>
          <p className="mb-2">Total Paid: <span className="font-bold">{single_order.paid}$</span></p>
          <p className="mb-2">Total Due: <span className="font-bold text-red-500">{single_order.due_payment}$</span></p>
        </div>

        <p className="text-sm text-gray-500 mt-6">Note</p>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Print Invoice
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Download Invoice
        </button>
      </div>
    </div>
</section>
{/* ----------------box-------------- */}

        </section>
        </section>

     </section>
  )
}

export default Invoice