import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import axios from 'axios';

const Myinvoice = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);

  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState([
    { id: 1, date: "2025-01-15", invoiceId: "INV12345", amount: "$500.00", status: "Paid" },
    { id: 2, date: "2025-01-14", invoiceId: "INV12346", amount: "$300.00", status: "Unpaid" },
    { id: 3, date: "2025-01-13", invoiceId: "INV12347", amount: "$450.00", status: "Pending" },
    { id: 4, date: "2025-01-12", invoiceId: "INV12348", amount: "$700.00", status: "Paid" },
    { id: 5, date: "2025-01-11", invoiceId: "INV12349", amount: "$250.00", status: "Overdue" },
  ]);

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-orange-100 text-orange-700",
  };

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.date.includes(searchQuery) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, [setactivetopbar]);

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
                    placeholder="Search by Invoice ID, Date, or Status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto ">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Date</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Invoice ID</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Amount</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Status</th>
                      <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice, index) => (
                        <tr
                          key={invoice.id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-100 transition-colors`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">{invoice.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{invoice.invoiceId}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{invoice.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                statusColors[invoice.status]
                              }`}
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
                        <td colSpan="5" className="px-4 py-3 text-center text-gray-700">
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
