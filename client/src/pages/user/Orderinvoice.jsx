import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from "../../components/Dashboard/Userdashboardleftside";
import Userheader from "../../components/Dashboard/Userheader";
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

const Orderinvoice = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  const [single_order, set_single_order] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);
  const getOrder = () => {
    axios
      .get(`${base_url}/my-order-invoice/${id}`)
      .then((res) => {
        if (res.data.success) {
          set_single_order(res.data.data); // Assuming the data is in res.data.data
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(()=>{
    getOrder(); 
  },[])
  // Handle the printing and downloading of the invoice
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([componentRef.current.outerHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "invoice.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
    {/* Sidebar */}
    <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
      <Userdashboardleftside />
    </section>

    {/* Main Content */}
    <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
      <Userheader />
      
      <section className="pt-[20px]">
        <div className="bg-gray-100 min-h-screen p-6">
          {/* Invoice Section */}
          <div ref={componentRef} className="bg-white border-[1px] border-[#eee] shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-red-600">Oracle Soft</h1>
              <div className="text-right">
                <h2 className="text-xl font-bold">Invoice</h2>
                <p className="text-sm font-semibold text-gray-700">Invoice ID: {single_order?.invoice_id}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold">Billed To:</h3>
              <p>Customer ID: {single_order?.customer_id}</p>
              <p>Provider Name: {single_order?.provider_name}</p>
              <p>Payeer Number: {single_order?.payeer_number}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold">Transaction Details</h3>
              <p>Transaction ID: {single_order?.transiction}</p>
              <p>Product Name: {single_order?.product_name}</p>
              <p>Product Price: {single_order?.product_price} BDT</p>
              <p>Paid: {single_order?.paid} BDT</p>
              <p>Due Payment: {single_order?.due_payment} BDT</p>
              <p>Created At: {new Date(single_order?.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(single_order?.updatedAt).toLocaleString()}</p>
            </div>

            <div className="text-right">
              <p className="mb-2">Sub Total: <span className="font-bold">{single_order?.product_price} BDT</span></p>
              <p className="mb-2">Total Paid: <span className="font-bold">{single_order?.paid} BDT</span></p>
              <p className="mb-2">Total Due: <span className="font-bold text-red-500">{single_order?.due_payment} BDT</span></p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
              Print Invoice
            </button>
          </div>
        </div>
      </section>
    </section>
  </section>
  );
};

export default Orderinvoice;
