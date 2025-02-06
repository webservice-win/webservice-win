import React, { useContext, useEffect, useState } from 'react';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Myorder = () => {
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
          <div>
                <h1 className='text-[20px] lg:text-[24px] font-[600] px-[20px] mb-[8px]'>Invoice List</h1>
          </div>
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
              <table className="min-w-full bg-white border border-gray-200 overflow-hidden">
  <thead className="text-xs text-white uppercase bg-gradient-to-r from-indigo-600 to-indigo-700 border-b border-gray-200 dark:border-gray-700">
    <tr>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Date</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Invoice ID</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Product Name</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Price</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Paid</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Due</th>

      <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">Status</th>
      <th className="px-6 py-[15px] text-left text-[17px] font-semibold">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredInvoices.length > 0 ? (
      filteredInvoices.map((invoice, index) => (
        <tr
          key={invoice._id}
          className={`${
            index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
          } border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
        >
          <td className="px-6 py-2 text-[16px] text-nowrap font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
            {invoice.createdAt.slice(0, 10)}
          </td>
          <td className="px-6 py-2 text-[16px] text-nowrap font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
            {invoice.invoice_id}
          </td>
          <td className="px-6 py-2 text-[16px] text-nowrap font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
            {invoice.product_name}
          </td>
          <td className="px-6 py-2 text-[16px] text-nowrap font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
            ${invoice.product_price}
          </td>
          <td
          className={`px-6 py-2 text-[16px] text-nowrap font-medium whitespace-nowrap border-r border-gray-200 dark:border-gray-700 ${
            invoice.paid > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
        
          ${invoice?.paid}
        </td>
        <td
          className={`px-6 py-2 text-[16px]  text-nowrap font-medium whitespace-nowrap border-r border-gray-200 dark:border-gray-700 ${
            invoice.due_payment > 0 ? "text-red-600" : "text-red-600"
          }`}
        >
          ${invoice?.due_payment}
          {
            invoice.due_payment > 0 ? <button className='bg-red-500 text-nowrap ml-[6px] text-white rounded-[5px] px-[12px] py-[6px] text-[15px]'>  <NavLink to={`/proceed-order/${invoice.invoice_id}`}>Pay </NavLink></button>:""
          }
        </td>
          <td className="px-6 py-2 text-[16px] font-medium text-nowrap border-r border-gray-200 dark:border-gray-700">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusColors[invoice.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {invoice.status}
            </span>
          </td>
          <td className="px-6 py-2 text-[16px text-nowrap] font-medium text-gray-700 dark:text-white">
            <NavLink to={`/user-order-invoice/${invoice._id}`}>
            <button className="px-4 py-2 bg-indigo-600 text-nowrap text-white text-[16px] font-medium rounded-lg hover:bg-indigo-700 transition">
              View Details
            </button>
            </NavLink>
          
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="px-6 py-3 text-center text-gray-700 dark:text-white">
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

export default Myorder;
