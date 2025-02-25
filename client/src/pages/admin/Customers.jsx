import React, { useContext, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { Contextapi } from '../../context/Appcontext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
function StatusSwitch({ status, onChange }) {
  const [isActive, setIsActive] = useState(status === "Active");

  const handleToggle = () => {
    const newStatus = isActive ? "Inactive" : "Active";
    setIsActive(!isActive);
    onChange(newStatus);
  };

  return (
    <div className="flex items-center space-x-3 w-[130px]">
      {/* Status Text */}
      {/* Square Toggle Switch */}
      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleToggle} />
        <div
          className={`w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
              isActive ? "translate-x-[20px]" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>
            <span className={`text-sm font-medium ${isActive ? "text-green-600" : "text-gray-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
// ==================invoice-sent=============================
const InvoicePopup = ({ order, onClose }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const validateMessage = (message) => message.trim().length > 0;
  const validateAmount = (amount) => !isNaN(amount) && Number(amount) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAmount(amount)) {
      setError("Amount must be a positive number");
      return;
    }
    axios
      .post(`${base_url}/admin/sent-invoice`, {
        orderId: order._id,
        amount,
        customer_id: order._id,
        message,
      })
      .then((response) => {
        setSuccess("Invoice sent successfully!");
        setTimeout(onClose, 2000);
      })
      .catch((err) => {
        setError("Failed to send invoice. Try again.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100000] bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[80%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
        <h2 className="text-lg font-[600] mb-4">Send Invoice</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md outline-orange-400 mt-[4px]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-md h-[150px] outline-orange-400 mt-[4px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Customers = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const get_orders = () => {
    axios
      .get(`${base_url}/admin/all-customers`)
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };

  useEffect(() => {
    get_orders();
  }, []);

  const delete_order = (id) => {
    const confirm_box = confirm("Are you sure?");
    if (confirm_box) {
      axios
        .delete(`${base_url}/admin/delete-customer/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            Swal.fire("Success", `${res.data.message}`, "success");
            get_orders();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "" || order.status === filter)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ---------------handleStatusChange----------------------
  const handleStatusChange=(e,status)=>{
    console.log(status)
    axios.put(`${base_url}/admin/user-status-update/${e._id}`,{status:status})
    .then((res)=>{
      if(res){
        toast.success(`You have updated acocunt stutus to ${status}`)
      }
    }).catch((err)=>{
      Swal.fire("Error", `${err.message}`, "error");
    })
  }
  // --------------inoive sent-------------------------
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={
        activesidebar
          ? "w-0 h-[100vh] transition-all duration-300 overflow-hidden"
          : "w-0 xl:w-[20%] transition-all duration-300 h-[100vh]"
      }>
        <Dashboardleftside />
      </section>

      <section
        className={
          activesidebar
            ? "w-[100%] h-[100vh] overflow-y-auto transition-all duration-300"
            : "transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]"
        }
      >
        <Dashboradheader />
        <section className="pt-[20px]">
          <div className="p-6">
            <div className="w-full bg-white p-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customers Table</h1>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Search by Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Toaster />

         
              </div>

              <table className="w-full border-collapse border-[1px] border-[#eee]">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Balance</th>
                    <th className="py-3 px-4 text-left">Due</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((data) => (
                    <tr key={data._id} className="border-b">
                      <td className="py-3 px-4 text-orange-500 font-[500]">{data.name}</td>
                      <td className="py-3 px-4">{data?.email}</td>
                      <td className="py-3 px-4">{data?.deposit_balance}</td>
                      <td className="py-3 px-4">{data?.due_balance}</td>
                      <td className="py-3 px-4">{data?.createdAt?.slice(0, 10)}</td>
                      <td>
                      <StatusSwitch
                      status={data.status}
                      onChange={(newStatus) => handleStatusChange(data, newStatus)}
                    />
                      </td>
                      <td className="py-3 px-4 flex justify-start items-center gap-[5px] ">
                            <button
                                          onClick={() => setSelectedOrder(data)}
                                          className="bg-green-500 text-white px-4 text-nowrap py-2 rounded-md hover:bg-green-600"
                                        >
                                          Invoice Sent
                                        </button>
                        <button
                          onClick={() => {
                            delete_order(data._id);
                          }}
                          className="p-[10px] bg-red-500 rounded-[5px] text-[18px] text-white"
                        >
                          <MdOutlineDelete />
                        </button>
                               <NavLink to={`/customer/${data._id}`}  className="p-[10px] bg-indigo-500 rounded-[5px] text-[18px] text-white">
                                                    <FaRegEye/>
                                                  </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedOrder && <InvoicePopup order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
              <div className="flex justify-center items-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 mx-1 rounded-md ${
                      currentPage === page
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Customers;
