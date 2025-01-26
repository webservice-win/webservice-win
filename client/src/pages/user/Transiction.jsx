import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import empty_img from "../../assets/empty.png";
import axios from 'axios';

const Transiction = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const getWebsite = () => {
    const userInfo = JSON.parse(localStorage.getItem("user_info")); // Assuming user_info is stored in localStorage
    if (userInfo && userInfo._id) {
      axios.get(`${base_url}/user-order/${userInfo._id}`)
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err.name);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
    getWebsite(); // Call the API on component mount
  }, []);

  const statusColors = {
    Success: "bg-green-100 text-green-700",
    Refunded: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

  // Filter orders based on search term and selected status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />

        {/* Filter and Search Section */}
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by Transaction ID or Description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border w-[30%] rounded-md  py-[15px]"
            />

            {/* Filter by Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 border rounded-md w-1/4"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Refunded">Refunded</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="">
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 ">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Date</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Transaction ID</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Description</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Amount</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-100 transition-colors`}>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.transactionId}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No transactions found.
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
  );
};

export default Transiction;
