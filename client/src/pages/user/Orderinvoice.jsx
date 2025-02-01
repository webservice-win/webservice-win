import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from "../../components/Dashboard/Userdashboardleftside";
import Userheader from "../../components/Dashboard/Userheader";
import axios from 'axios';
import red_logo from "../../assets/red-logo.png";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Orderinvoice = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  const [single_order, set_single_order] = useState(null);
  const componentRef = useRef(); // Create a ref for the invoice section

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
        if (res) {
          set_single_order(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(() => {
    getOrder(); 
  }, []);

  // Handle PDF Download
  const handleDownloadPDF = () => {
    const input = componentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  // Handle Print
  const handlePrint = () => {
    const printContents = componentRef.current.innerHTML; // Get the invoice content
    const originalContents = document.body.innerHTML; // Save the original page content

    // Replace the body content with the invoice content
    document.body.innerHTML = printContents;

    // Trigger the print dialog
    window.print();

    // Restore the original page content
    document.body.innerHTML = originalContents;

    // Re-attach event listeners or re-render components if necessary
    window.location.reload(); // Reload the page to restore functionality
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
        <section className="">
          <div className="bg-gray-100 min-h-screen p-6">
            {/* Invoice Section */}
            <div 
              ref={componentRef} // Attach the ref here
              className="bg-white border-[1px] border-[#eee] rounded-lg p-8 max-w-[210mm] mx-auto"
              style={{ 
                width: '210mm', 
                minHeight: '297mm', 
                boxSizing: 'border-box',
                margin: '0 auto',
                pageBreakAfter: 'always' 
              }}
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-8 border-b-[2px] border-gray-300 pb-4">
                <img className='w-[150px]' src={red_logo} alt="" />
                <div className="text-right">
                  <h2 className="text-xl font-bold">Invoice</h2>
                  <p className="text-sm font-semibold text-gray-700">Invoice ID: {single_order?.invoice_id}</p>
                </div>
              </div>

              {/* Billed To Section */}
              <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Billed To:</h3>
                <p>Customer ID: {single_order?.customer_id}</p>
                <p>Provider Name: {single_order?.provider_name}</p>
                {
                  single_order?.payeer_number=="" ? "":     <p>Payeer Number: {single_order?.payeer_number}</p>
                }
              </div>

              {/* Transaction Details Section */}
              <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Transaction Details</h3>
                {
                  single_order?.transiction=="" ? "": <p>Transaction ID: {single_order?.transaction}</p>
                }
                <p>Product Name: {single_order?.product_name}</p>
                <p>Product Price: {single_order?.product_price} USDT</p>
                <p>Paid: {single_order?.paid} USDT</p>
                <p>Due Payment: {single_order?.due_payment} USDT</p>
                <p>Created At: {new Date(single_order?.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(single_order?.updatedAt).toLocaleString()}</p>
              </div>

              {/* Itemized Table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Unit Price</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">{single_order?.product_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{single_order?.product_price} USDT</td>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">{single_order?.product_price} USDT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="text-right border-t-[2px] border-gray-300 pt-4">
                <p className="mb-2">Sub Total: <span className="font-bold">{single_order?.product_price} USDT</span></p>
                <p className="mb-2">Total Paid: <span className="font-bold">{single_order?.paid} USDT</span></p>
                <p className="mb-2">Total Due: <span className="font-bold text-red-500">{single_order?.due_payment} USDT</span></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                Print Invoice
              </button>
              <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                Download PDF
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Orderinvoice;