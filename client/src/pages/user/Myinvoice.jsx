import React, { useContext, useEffect, useState } from 'react';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import axios from 'axios';

const Myinvoice = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const userInfo = JSON.parse(localStorage.getItem("user_data")); // Assuming user_info is stored in localStorage

  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState([]);

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700", // for processing status
  };

  // Fetch invoices from API
  const getInvoices = () => {
    axios.get(`${base_url}/user-order/${userInfo._id}`)
    .then((res) => {
      if (res) {
        console.log(res)
        setInvoices(res.data.data);
      }
    })
    .catch((err) => {
      console.log(err.name);
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
    getInvoices(); // Fetch the invoices when component mounts
  }, []);

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.invoice_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Userdashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Userheader />
          {/* ----------------box-------------- */}
          <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
            <div className="p-4">
              <div className="mb-4 flex justify-between items-center">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Search by Invoice ID, Product Name, or Status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Date</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Invoice ID</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Product Name</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Amount</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Status</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice, index) => (
                        <tr
                          key={invoice._id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-100 transition-colors`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">{new Date(invoice.createdAt.$date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{invoice.invoice_id}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{invoice.product_name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{`$${invoice.product_price}`}</td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status] || 'bg-gray-100 text-gray-700'}`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <button
                              className="px-3 py-[10px] bg-blue-500 text-white text-[16px] font-medium rounded-lg hover:bg-blue-600 transition"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-3 text-center text-gray-700">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Myinvoice;
