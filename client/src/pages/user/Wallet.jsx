import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import { FaWallet, FaMoneyBillWave, FaHistory, FaExchangeAlt } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import empty_img from "../../assets/empty.png"
import axios from "axios"
import { FaArrowRight } from "react-icons/fa";
import { FaImage } from "react-icons/fa";

// DepositTab component for switching between BKash, Nagad, and Rocket
const DepositTab = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-md border-2 ${
        isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
      }`}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </button>
  );
};

// DepositForm for BKash
const DepositFormBKash = () => {
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const searchParams = new URLSearchParams(window.location.search); // For extracting price or other query params

  const handlePayNow = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = {};
    if (!senderNumber) validationErrors.senderNumber = "Sender's Bkash number is required.";
    if (!trxId) validationErrors.trxId = 'Transaction ID is required.';
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/pay', {
        senderNumber,
        trxId,
        method: 'bkash',
      });
      console.log(response.data); // Handle success
      setLoading(false);
    } catch (error) {
      console.error('Payment error', error);
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full bg-white rounded-lg shadow-lg p-6"
      onSubmit={handlePayNow}
    >

      {/* Payment Instructions */}
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-6">
        <p className="text-center mb-2 font-semibold">
          এই বিকাশ নাম্বারে টাকা পাঠানোর পর মানি সেন্ডার নাম্বার এবং ইনভয়েস
          নম্বর লিখে সাবমিট করুন
        </p>
        <img
          src="https://i.imgur.com/pScFoho.png"
          alt="Bkash Steps"
          className="rounded-lg h-[350px] w-full"
        />
      </div>

      {/* Sender Input */}
      <div className="w-full flex justify-center items-center gap-[6px]">
        <div className="mb-4 w-[50%]">
          <label
            htmlFor="senderNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Sender's Bkash Number
          </label>
          <input
            type="text"
            id="senderNumber"
            value={senderNumber}
            onChange={(e) => setSenderNumber(e.target.value)}
            placeholder="Enter your Bkash number"
            className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.senderNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.senderNumber}</p>
          )}
        </div>
        <div className="mb-4 w-[50%]">
          <label htmlFor="trxId" className="block text-gray-700 font-medium mb-2">
            TRXID
          </label>
          <input
            type="text"
            id="trxId"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="Enter your Transaction ID"
            className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.trxId && (
            <p className="text-red-500 text-sm mt-1">{errors.trxId}</p>
          )}
        </div>
      </div>

      {/* Pay Now Button */}
      <button
        type="submit"
        className={`w-full ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold py-3 rounded-lg transition`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};


// DepositForm for Nagad
const DepositFormNagad = () => {
  const [agentNumber, setAgentNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/deposit', {
        agentNumber,
        amount,
        description,
        method: 'nagad',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error in deposit transaction', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Deposit via Nagad</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Agent Number</label>
        <input
          type="text"
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter agent number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter description"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-between items-center"
      >
        Submit <FaArrowRight />
      </button>
    </form>
  );
};

// DepositForm for Rocket
const DepositFormRocket = () => {
  const [agentNumber, setAgentNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/deposit', {
        agentNumber,
        amount,
        description,
        method: 'rocket',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error in deposit transaction', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Deposit via Rocket</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Agent Number</label>
        <input
          type="text"
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter agent number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter description"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-between items-center"
      >
        Submit <FaArrowRight />
      </button>
    </form>
  );
};

const Wallet = () => {
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [activeTab, setActiveTab] = useState('bkash');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />
        <section className="w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]">
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-[20px] lg:text-[20px] font-[600] mb-[8px]">My Wallet</h1>
              <ul className="flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]">
                <li>Dashboard</li>
                <li><FaArrowRight /></li>
                <li>My Wallet</li>
              </ul>
            </div>
          </div>

          {/* Deposit Balance Box at the top */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold">Wallet</h1>
            <div className="text-lg mt-4">
              Deposit Amount: <span className="font-bold">$100</span>
            </div>
          </div>

          {/* Main layout: Left - Deposit tabs, Right - Deposit Form */}
          <div className="flex space-x-6">
            {/* Left side: Deposit Tabs */}
            <div className="w-1/4">
              <div className="space-y-4">
                <DepositTab name="bkash" isActive={activeTab === 'bkash'} onClick={() => handleTabClick('bkash')} />
                <DepositTab name="nagad" isActive={activeTab === 'nagad'} onClick={() => handleTabClick('nagad')} />
                <DepositTab name="rocket" isActive={activeTab === 'rocket'} onClick={() => handleTabClick('rocket')} />
              </div>
            </div>

            {/* Right side: Deposit Form */}
            <div className="w-3/4 flex flex-col space-y-6">
              {activeTab === 'bkash' && <DepositFormBKash />}
              {activeTab === 'nagad' && <DepositFormNagad />}
              {activeTab === 'rocket' && <DepositFormRocket />}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Wallet;
