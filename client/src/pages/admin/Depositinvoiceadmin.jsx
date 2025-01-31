import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from "../../components/Dashboard/Dashboardleftside";
import Userheader from "../../components/Dashboard/Dashboardheader";
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import red_logo from "../../assets/red-logo.png";
const Depositinvoiceadmin = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  const [single_order, set_single_order] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    axios
      .get(`${base_url}/deposit-invoice/${id}`)
      .then((res) => {
        if (res.data && res.data.data) {
          set_single_order(res.data.data);
        } else {
          console.error("Unexpected API response structure:", res.data);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500'; // Yellow for Pending
      case 'Approved':
        return 'text-green-500'; // Green for Approved
      case 'Rejected':
        return 'text-red-500'; // Red for Rejected
      default:
        return 'text-gray-500'; // Default gray for unknown status
    }
  };

  // Handle the printing of the invoice
  const handlePrint = () => {
    const printContents = document.getElementById('invoice-container').innerHTML;
    const originalContents = document.body.innerHTML;

    // Replace the body content with the invoice content
    document.body.innerHTML = printContents;

    // Trigger the print dialog
    window.print();

    // Restore the original body content
    document.body.innerHTML = originalContents;

    // Re-render the page to restore functionality
    window.location.reload();
  };

  // Handle the downloading of the invoice as PDF
  const handleDownloadPDF = () => {
    const input = document.getElementById('invoice-container');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${single_order?.invoiceId}.pdf`); // Save the PDF with invoice ID
    });
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>

      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />
        
        <section className="">
          <div className="bg-gray-100 min-h-screen p-6">
            {loading ? (
              <p>Loading...</p>
            ) : single_order ? (
              <>
                {/* Invoice Container */}
                <div id="invoice-container" className="bg-white border-[1px] border-[#eee] shadow-lg rounded-lg p-8 max-w-[210mm] mx-auto" style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
                  {/* Invoice Header */}
                  <div className="flex justify-between items-center mb-8 border-b-[2px] border-gray-300 pb-4">
                               <img className='w-[150px]' src={red_logo} alt="" />
                    <div className="text-right">
                      <h2 className="text-xl font-bold">Deposit Invoice</h2>
                      <p className="text-sm font-semibold text-gray-700">Invoice ID: {single_order?.invoiceId}</p>
                      <p className={`text-sm font-semibold ${getStatusColor(single_order?.status)}`}>
                        Status: {single_order?.status}
                      </p>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                    <h3 className="text-lg font-semibold">Billed To:</h3>
                    <p>Customer Name: {single_order?.customer_name}</p>
                    {single_order?.senderNumber=="" ? "":   <p>Sender Number: {single_order?.senderNumber}</p>}
                    <p>Gateway Name: {single_order?.gatewayName}</p>
                  </div>

                  {/* Transaction Information */}
                  <div className="mb-6 border-b-[1px] border-gray-300 pb-4">
                    <h3 className="text-lg font-semibold">Transaction Details</h3>
                    {single_order?.transactionId=="" ? "":   <p>Sender Number: {single_order?.transactionId}</p>}
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
              </>
            ) : (
              <p>No data found for this invoice.</p>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default Depositinvoiceadmin;