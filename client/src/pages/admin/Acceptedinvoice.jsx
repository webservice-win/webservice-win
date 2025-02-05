import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';

const Acceptedinvoice = () => {
  const { activesidebar, setactivesidebar, setactivetopbar } = useContext(Contextapi);
  const [searchQuery, setSearchQuery] = useState('');
  const [statuses] = useState(['Pending', 'Processing', 'Completed', 'Failed', 'Cancelled']);
  const [filter, setFilter] = useState('');
  const [deposits, setDeposits] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
const [orderstatus,setorderstatus]=useState(["Pending", "Approved", "Rejected"]);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setactivetopbar(window.scrollY > 100);
    });
    return () => window.removeEventListener('scroll', null);
  }, []);

  const getDeposits = () => {
    axios
      .get(`${base_url}/admin/all-invoice`)
      .then((res) => {
        if (res.data.success) {
          setDeposits(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    getDeposits();
  }, []);

  const deleteDeposit = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this deposit!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${base_url}/admin/delete-invoice/${id}`, {
            headers: { Authorization: localStorage.getItem('token') },
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire('Deleted!', res.data.message, 'success');
              getDeposits();
            }
          })
          .catch((err) => console.error(err.message));
      }
    });
  };

  const filteredDeposits = deposits.filter(
    (deposit) =>

      (filter === '' || deposit.status === filter)
  );
  const handlestatus=(id,status_val)=>{
    try {
     Swal.fire({
       title: 'Are you sure?',
       text: 'You want be update the deposit status!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, Update it!',
       cancelButtonText: 'Cancel',
       reverseButtons: true
   }).then((result) => {
       if (result.isConfirmed) {
         axios.put(`${base_url}/admin/update-deposit-status/${id}`, {
           status: status_val,
         }).then((res)=>{
           if(res.data.success){
             Swal.fire({
                 title: 'Successful',
                 text: `${res.data.message} to ${status_val}`,
                 icon: 'success',
             })
         }
         }).catch((err)=>{
           console.log(err)
         })
       } else {
           // If canceled, no action is taken
           console.log('Delete action was canceled');
       }
   });
      
   } catch (error) {
     console.log(error);
   }
}
  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section
        className={
          activesidebar
            ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden'
            : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'
        }
      >
        <Dashboardleftside />
      </section>
      <section
        className={
          activesidebar
            ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300'
            : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'
        }
      >
        <Dashboradheader />
        <section className="pt-[20px]">
          <div className="p-6">
            <div className="w-full bg-white p-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Deposits Table</h1>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Search by Customer Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>

                <select
                  className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <table className="w-full border-collapse border-[1px] border-[#eee]">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="py-3 px-4 text-left text-nowrap border-r-[1px]">Invoice Id</th>
                    <th className="py-3 px-4 text-left text-nowrap border-r-[1px]">User</th>
                    <th className="py-3 px-4 text-left text-nowrap border-r-[1px]">Sent Amount</th>
                    <th className="py-3 px-4 text-left text-nowrap border-r-[1px]">Due Amount</th>
                    <th className="py-3 px-4 text-left text-nowrap border-r-[1px]">Date</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeposits.map((invoice) => (
                    <tr key={invoice._id} className="border-b">
                      <td className="py-3 px-4 text-orange-500 font-[500] text-nowrap border-r-[1px]">{invoice.invoice_id}</td>
                         <td className="py-3 px-4 text-orange-500 font-[500] text-nowrap border-r-[1px]">
                                        <h2 className='text-[13px] text-black'>{invoice.name}</h2>
                                        <p className='text-[15px] text-indigo-600 mt-[4px] underline cursor-pointer'><NavLink to={`/customer-profile/${invoice.email}`}>
                                        {invoice.email}
                                          </NavLink></p>
                                      </td>
                      <td className="py-3 px-4 text-nowrap border-r-[1px]">{invoice.amount}</td>
                      <td className="py-3 px-4 text-nowrap border-r-[1px]">{invoice.due_amount}</td>
                      <td className="py-3 px-4 text-nowrap border-r-[1px]">{invoice.createdAt?.slice(0,10)}</td>

                      {/* <td className="py-3 px-4">
                  <select
                    className={`border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${
                        invoice.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}

                    defaultValue={deposit.status} onChange={(e)=>{handlestatus(deposit._id,e.target.value)}}
                  >
                    {
                        orderstatus.map((dat,i)=>{
                          return(
                            <option value={dat} key={i}>{dat}</option>
                          )
                        })
                      }
                  </select>
                </td> */}
                      <td className="py-3 px-4 flex justify-center items-center gap-[5px]">
                        <button
                          onClick={() => deleteDeposit(invoice._id)}
                          className="p-[10px] bg-red-500 rounded-[5px] text-[18px] text-white"
                        >
                          <MdOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Acceptedinvoice;
