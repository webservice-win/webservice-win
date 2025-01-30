import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from "../../components/Dashboard/Userdashboardleftside";
import Userheader from "../../components/Dashboard/Userheader";
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

const Depositinvoice = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  const [single_order, set_single_order] = useState([]);

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
      .get(`${base_url}/deposit-invoice/${id}`)
      .then((res) => {
        if (res) {
          set_single_order(res.data.data);
          console.log(res.data.data) // Assuming the data is in res.data.data
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getOrder(); 
  }, []);
  console.log(single_order)

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
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>

      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />
        
        <section className="pt-[20px]">
          <div className="bg-gray-100 min-h-screen p-6">
            {/* Invoice Container */}
            <div ref={componentRef} className="bg-white border-[1px] border-[#eee] shadow-lg rounded-lg p-8 max-w-[210mm] mx-auto" style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
              
              {/* Invoice Header */}
              <div className="flex justify-between items-center mb-8 border-b-[2px] border-gray-300 pb-4">
                <h1 className="text-2xl font-bold text-red-600">Oracle Soft</h1>
                <div className="text-right">
                  <h2 className="text-xl font-bold">Deposit Invoice</h2>
                  <p className="text-sm font-semibold text-gray-700">Invoice ID: {single_order.invoiceId}</p>
                  <p className="text-sm font-semibold text-red-500">Status: {single_order?.status}</p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Billed To:</h3>
                <p>Customer Name: {single_order?.customer_name}</p>
                <p>Sender Number: {single_order?.senderNumber}</p>
                <p>Gateway Name: {single_order?.gatewayName}</p>
              </div>

              {/* Transaction Information */}
              <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Transaction Details</h3>
                <p>Transaction ID: {single_order?.transactionId}</p>
                <p>Deposit Amount: {single_order?.amount} BDT</p>
                <p>Created At: {new Date(single_order?.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(single_order?.updatedAt).toLocaleString()}</p>
              </div>

              {/* Deposit Amount Only */}
              <div className="text-right border-t-[2px] border-gray-300 pt-4">
                <p className="text-xl font-bold">Total Deposit: {single_order?.amount} BDT</p>
              </div>

              {/* Footer/Note */}
              <p className="text-sm text-gray-500 mt-6">Note: Please make the payment by the due date. If you have any questions, contact us at support@oraclesoft.com.</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                Print Invoice
              </button>
              <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                Download Invoice
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Depositinvoice;
