import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import axios from 'axios';
const Trackingorder = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const user_info=JSON.parse(localStorage.getItem("user_data"));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [orders,set_orders]=useState([]);
  const get_website=()=>{
      axios.get(`${base_url}/user-order/${user_info._id}`)
      .then((res)=>{
          if(res.data.success){
            set_orders(res.data.data);
            console.log(res.data)
          }
      }).catch((err)=>{
          console.log(err.name)
      })
  };
  useEffect(()=>{
      get_website()
  },[]);
  const statusColors = {
    pending: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    hold: "bg-orange-100 text-orange-700",
  };

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter]);

  const filterOrders = () => {
    let filtered = orders;

    // Filter by search term (search by product name or customer name)
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter((order) => order.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredOrders(filtered);
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />

        <section className="w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]">
          <div className="p-4">
            <h1 className='text-[22px] font-[500] mb-[15px]'>Tracking Orders</h1>

            {/* Search and Filter */}
            <div className="mb-4 flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Product Name or Customer"
                className="p-2 border rounded-md w-1/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="p-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className='bg-gradient-to-r from-teal-500 to-teal-600'>
                  <tr className="bg-gradient-to-r from-teal-500 to-teal-600 w-full text-white">
                  <th className="px-4 py-2 text-left text-[17px] font-semibold">Invoice ID</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Order Date</th>
                    <th className="px-4 py-[12px] text-left text-[17px] font-semibold">Product Name</th>
                    <th className="px-4 py-2 text-left text-[17px] font-semibold">Price</th>
                    <th className="px-4 py-2 text-left text-[17px] font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-100 transition-colors`}
                      >
                        <td className="px-4 py-3 text-[16px] font-[500] text-orange-500">{order.invoice_id}</td>
                        <td className="px-4 py-3 text-[16px] font-[500] text-gray-700">{order.createdAt.slice(0,10)}</td>
                       {
                        order.product_name.length > 20 ?  <td className="px-4 py-3 text-sm text-gray-700">{order.product_name.slice(0,20)}..</td>: <td className="px-4 py-3 text-sm text-gray-700">{order.product_name}</td>
                       }
                        <td className="px-4 py-3 text-[16px] font-[500] text-orange-500">${order.product_price}</td>

                        <td className="px-4 py-3 text-sm">
  <span
    className={`px-3 py-1 rounded-full text-[15px] font-medium ${statusColors[order.status]} animate-jump`}
  >
    {order.status}
  </span>
</td>

                        <td className="px-4 py-3 text-sm text-gray-700">{order.estimatedDelivery}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Trackingorder;
