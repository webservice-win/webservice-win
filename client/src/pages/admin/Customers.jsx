import React, { useContext, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { Contextapi } from '../../context/Appcontext';
import { useNavigate } from 'react-router-dom';

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

         
              </div>

              <table className="w-full border-collapse border-[1px] border-[#eee]">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Balance</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((data) => (
                    <tr key={data._id} className="border-b">
                      <td className="py-3 px-4 text-orange-500 font-[500]">{data.name}</td>
                      <td className="py-3 px-4">{data?.email}</td>
                      <td className="py-3 px-4">{data?.deposit_balance}</td>
                      <td className="py-3 px-4">{data?.createdAt?.slice(0, 10)}</td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            delete_order(data._id);
                          }}
                          className="p-[10px] bg-red-500 rounded-[5px] text-[18px] text-white"
                        >
                          <MdOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
