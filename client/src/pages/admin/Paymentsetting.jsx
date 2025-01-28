import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';

const Paymentsetting = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);

  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Fetch payment methods from the backend
  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${base_url}/admin/payment-methods`);
      setPaymentMethods(response.data.data);// Store the fetched data in state
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  useEffect(() => {
    // Fetch payment methods from backend when the component mounts
  
    fetchPaymentMethods();
  }, []);

  const filteredGateways = paymentMethods.filter((gateway) =>
    gateway.gatewayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const delete_method = (id) => {
    const confirm_box = confirm("Are you sure?");
    if (confirm_box) {
      axios
        .delete(`${base_url}/admin/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            Swal.fire("Success", `${res.data.message}`, "success");
            fetchPaymentMethods();

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className="w-full h-[100vh] flex font-poppins">
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          {/* ----------------box-------------- */}
          <section className="bg-[#F3F3F9] min-h-[91vh]">
            <div className="p-6">
              <div className="w-full bg-white p-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manual Gateways</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <NavLink to="/add-payment-method">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-[3px] hover:bg-indigo-600 focus:outline-none">
                      + Add New
                    </button>
                  </NavLink>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-500 text-white">
                      <th className="py-3 px-4 text-left">Gateway</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGateways.map((gateway) => (
                      <tr key={gateway._id} className="border-b">
                        <td className="py-3 px-4">{gateway.gatewayName}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {gateway.status || 'Enabled'} {/* Assuming 'status' field exists in your model */}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex items-center space-x-2">
                          {/* <button
                            className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none"
                          >
                            <AiOutlineEdit className="mr-1" /> Edit
                          </button> */}
                          <button
                          onClick={()=>{delete_method(gateway._id)}}
                            className="flex items-center text-red-500 hover:text-red-600 focus:outline-none"
                          >
                            <AiOutlineDelete className="mr-1" /> Disable
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* ----------------box-------------- */}
        </section>
      </section>
    </section>
  );
};

export default Paymentsetting;
