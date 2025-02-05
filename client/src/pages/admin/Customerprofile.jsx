import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import axios from 'axios';

const Customerprofile = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const [customer_data, set_customer] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const {email}=useParams();
  const uploadpost = () => {
    setmodal(true);
  };

  const handlesidebar = () => {
    setactivesidebar(!activesidebar);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const customer_info = () => {
    axios
      .get(`${base_url}/admin/customer-profile/${email}`)
      .then((res) => {
        if (res.data.success) {
          set_customer(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };

  useEffect(() => {
    customer_info();
  }, []);

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 md:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto md:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] m-auto">
              <div key={customer_data._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{customer_data.name}</h2>
                <div className="space-y-2">
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Email:</span> {customer_data.email}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">WhatsApp:</span> {customer_data.whatsapp}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Telegram:</span> {customer_data.telegram}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Role:</span> {customer_data.role}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Deposit Balance:</span> ${customer_data.deposit_balance}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Due Balance:</span> ${customer_data.due_balance}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Total Orders:</span> {customer_data.total_order}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Paid Amount:</span> ${customer_data.paid_amount}</p>
                  <p className="text-[17px] text-gray-600"><span className="font-semibold">Joined:</span> {customer_data.createdAt?.slice(0,10)}</p>
                </div>
                {/* <div className="mt-4 flex justify-end space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                    Delete
                  </button>
                </div> */}
              </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Customerprofile;