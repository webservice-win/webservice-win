import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import { FaWallet, FaMoneyBillWave, FaHistory, FaExchangeAlt, FaArrowRight, FaImage } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Userdashboardleftside from '../../components/Dashboard/Userdashboardleftside';
import Userheader from '../../components/Dashboard/Userheader';
import empty_img from "../../assets/empty.png";
import axios from "axios";
import Swal from "sweetalert2";

const Wallet = () => {
  const { activesidebar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info = JSON.parse(localStorage.getItem("user_data"));
  const [activeTab, setActiveTab] = useState("bkash");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({});
  const [details, set_details] = useState([]);
 const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [file, setFile] = useState(null);
  const [amount,set_amount]=useState()
  const [selectedTab, setSelectedTab] = useState("");
 console.log(amount)
  useEffect(() => {
    axios.get(`${base_url}/user/${user_info._id}`)
      .then((res) => set_details(res.data.data))
      .catch((err) => console.log(err.name));

    axios.get(`${base_url}/admin/payment-methods`)
      .then((res) => setPaymentMethods(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") setAmount(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for minimum deposit amount
    if (parseFloat(amount) < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The minimum deposit amount is $10!',
      });
      return;
    }

    const formData = new FormData();
    formData.append("gatewayName", selectedTab);
    formData.append("transactionId", trxId);
    formData.append("senderNumber", senderNumber);
    formData.append("amount", amount);
    formData.append("file", file);
    formData.append("customer_id", user_info._id);  // Replace with actual customer ID
    formData.append("email", user_info.email);  // Replace with actual email
    formData.append("customer_name", user_info.name); // Replace with actual customer name

    try {
      const response = await axios.post(`${base_url}/deposit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Deposit Successful',
        text: response.data.message,
      });
    } catch (error) {
      console.error("Error during deposit", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };


  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 transition-all duration-300' : 'w-0 xl:w-[20%] transition-all duration-300'}>
        <Userdashboardleftside />
      </section>
      <section className={activesidebar ? 'w-full transition-all duration-300' : 'w-full xl:w-[85%] transition-all duration-300'}>
        <Userheader />
        <section className="w-full m-auto py-10 px-6">
          <div className="bg-[#0E1335] text-center p-10 rounded-2xl shadow-lg mb-[10px] lg:mb-8">
            <h3 className="text-white text-lg font-medium">My Balance</h3>
            <p className="text-blue-400 text-2xl font-bold">${details.deposit_balance} USD</p>
          </div>
          <section className="w-full flex bg-[#F9FBFC] justify-center items-center py-[30px] lg:py-[80px] gap-[20px]">
            <div className="w-[95%] lg:w-[70%] flex  md:flex-row gap-6 lg:flex-row flex-col">
              {/* Left Section */}
              <div className="w-full md:w-1/2 shadow p-[10px] bg-gray-800">
                <div className='bg-gray-800 mt-[10px] p-[10px]'>
                  <h1 className="text-[22px] font-semibold mb-3 text-white">Payment Method</h1>
                  {["Binance", "Bank Transfer", "Bkash", "Nagad", "Rocket"].map((tab) => (
                    <div
                      key={tab}
                      className={`flex items-center justify-between bg-white p-3 mb-2 rounded-lg cursor-pointer border ${selectedTab === tab ? "border-blue-500 bg-blue-100" : "border-gray-200"}`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      <div className="flex items-center">
                        <input type="radio" checked={selectedTab === tab} readOnly className="mr-3" />
                        <p className="text-gray-700 font-medium">{tab}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 p-[10px] bg-gray-800">
                {(selectedTab === "Binance") && (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-gray-800 p-[10px]">
                      <h2 className="text-lg font-semibold mb-3 p-[10px] bg-yellow-500 text-center text-white">Payment Information</h2>
                      <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                        <h2>GETWAY NAME : BINANCE</h2>
                        <h2>BINANCE PAY ID : 942300272</h2>
                        <h2> EXCHENGE RATE : 1 USD = 126 BDT</h2>
                      </div>
                    </div>
                    <div>
                      <h2 className='p-[10px] text-center bg-yellow-500 text-[20px] text-white mb-[10px]'>Payment Summary</h2>
                      <label className='text-white'>Transaction ID</label>
                      <input type="text" name="transaction_id"value={trxId} onChange={(e) => setTrxId(e.target.value)}  className="w-full border rounded-lg p-3 mb-3"/>
                    </div>
                  </form>
                )}

                {selectedTab === "Bank Transfer" && (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-gray-800 p-[10px]">
                      <h2 className="text-lg font-semibold mb-3 p-[10px] bg-indigo-700 text-center text-white">Payment Information</h2>
                      <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                        <h2>GETWAY NAME : BANK TRANSFER</h2>
                        <h2>BANK NAME : PUBALI BANK LIMITED</h2>
                        <h2>BRANCH : BAMNA BRANCH</h2>
                        <h2>ACCOUNT NUMBER : 1146101191473</h2>
                        <h2>ROUTING NUMBER : 175040108</h2>
                        <h2> EXCHENGE RATE : 1 USD = 126 BDT</h2>
                      </div>
                    </div>
                    <div className='bg-gray-800 mt-[10px]'>
                      <h2 className='p-[10px] text-center bg-indigo-800 text-[20px] text-white mb-[10px]'>Payment Summary</h2>
                      <label className='text-[16px] text-white'>Upload Payment Proof</label><br />
                      <input type="file" name="payment_proof" className="w-full bg-white rounded-[5px] mt-[5px] mb-3 border-[1px] p-[10px] border-[#eee]" /><br />
                    </div>
                  </form>
                )}

                {(selectedTab === "Bkash") && (
                  <form>
                    <div className="bg-gray-800 p-[10px]">
                      <h2 className="text-lg font-semibold mb-3 p-[10px] bg-pink-700 text-center text-white">Payment Information</h2>
                      <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                        <h2>GETWAY NAME : MOBILE BANKING</h2>
                        <h2>BANK NAME : BKASH</h2>
                        <h2>PAYMENT CHANNEL : SEND MONEY OR CASH IN</h2>
                        <h2>ACCOUNT TYPE : PERSONAL ACCOUNT</h2>
                        <h2>ACCOUNT NUMBER : 01889921959</h2>
                        <h2> EXCHENGE RATE : 1 USD = 126 BDT</h2>
                      </div>
                    </div>
                    <div>
                      <h2 className='p-[10px] text-center bg-pink-700 text-[20px] text-white mb-[10px]'>Payment Summary</h2>
                      <label className='text-white'>Sender Number</label>
                      <input type="text" name="sender_number" className="w-full border rounded-lg p-3 mb-3"value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)}/>
                      <label className='text-white'>Transaction ID</label>
                      <input type="text" name="transaction_id" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                    </div>
                  </form>
                )}

                {/* Add NAGAD Payment method */}
                {(selectedTab === "Nagad") && (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-gray-800 p-[10px]">
                      <h2 className="text-lg font-semibold mb-3 p-[10px] bg-pink-500 text-center text-white">Payment Information</h2>
                      <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                        <h2>GETWAY NAME : MOBILE BANKING</h2>
                        <h2>BANK NAME : NAGAD</h2>
                        <h2>PAYMENT CHANNEL : SEND MONEY</h2>
                        <h2>ACCOUNT NUMBER : 01889921959</h2>
                        <h2> EXCHENGE RATE : 1 USD = 126 BDT</h2>
                      </div>
                    </div>
                    <div>
                      <h2 className='p-[10px] text-center bg-pink-500 text-[20px] text-white mb-[10px]'>Payment Summary</h2>
                      <label className='text-white'>Sender Number</label>
                      <input type="text" name="nagad_sender_number" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)}className="w-full border rounded-lg p-3 mb-3"  />
                      <label className='text-white'>Transaction ID</label>
                      <input type="text" name="nagad_transaction_id"value={trxId} onChange={(e) => setTrxId(e.target.value)}  className="w-full border rounded-lg p-3 mb-3" />
                    </div>
                  </form>
                )}

                {/* Add Rocket Payment method */}
                {(selectedTab === "Rocket") && (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-gray-800 p-[10px]">
                      <h2 className="text-lg font-semibold mb-3 p-[10px] bg-blue-700 text-center text-white">Payment Information</h2>
                      <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                        <h2>GETWAY NAME : MOBILE BANKING</h2>
                        <h2>BANK NAME : ROCKET</h2>
                        <h2>PAYMENT CHANNEL : SEND MONEY</h2>
                        <h2>ACCOUNT NUMBER : 01889921959-9</h2>
                        <h2> EXCHENGE RATE : 1 USD = 126 BDT</h2>
                      </div>
                    </div>
                    <div>
                      <h2 className='p-[10px] text-center bg-blue-700 text-[20px] text-white mb-[10px]'>Payment Summary</h2>
                      <label className='text-white'>Sender Number</label>
                      <input type="text" name="rocket_sender_number" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)}className="w-full border rounded-lg p-3 mb-3" />
                      <label className='text-white'>Transaction ID</label>
                      <input type="text" name="rocket_transaction_id"value={trxId} onChange={(e) => setTrxId(e.target.value)}  className="w-full border rounded-lg p-3 mb-3" />
                    </div>
                  </form>
                )}

                <label className='text-white'>Amount</label>
                <input type="number" name="amount"value={amount} className="w-full border rounded-lg p-3 mb-3" onChange={(e)=>{set_amount(e.target.value)}} />

                <button className={`w-[40%] m-auto block mt-4 text-white py-3 rounded-lg ${!selectedTab ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={!selectedTab} onClick={handleSubmit}>
                  Confirm Now
                </button>
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Wallet;
