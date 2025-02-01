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
import bankLogo from "../../assets/bank-logo.png"
import bkashLogo from '../../assets/bkash-logo.png';
import nagadLogo from '../../assets/nagad-logo.png';
import rocketLogo from '../../assets/rocket-logo.png';
import binanceLogo from '../../assets/binance-logo.png';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const Wallet = () => {
  const { activesidebar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info = JSON.parse(localStorage.getItem("user_data"));
  const [activeTab, setActiveTab] = useState("bkash");
  const whatsapp_number = import.meta.env.VITE_WHATSAPP_NUMBER;

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({});
  const [details, set_details] = useState([]);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [file, setFile] = useState(null);
  const [amount, set_amount] = useState();
  const [selectedTab, setSelectedTab] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    axios.get(`${base_url}/user/${user_info._id}`)
      .then((res) => set_details(res.data.data))
      .catch((err) => console.log(err.name));

    axios.get(`${base_url}/admin/payment-methods`)
      .then((res) => setPaymentMethods(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const payment_method = [
    {
      tab_name: "Binance",
      image: binanceLogo
    },
    {
      tab_name: "Bank Transfer",
      image: bankLogo
    },
    {
      tab_name: "Bkash",
      image: bkashLogo
    },
    {
      tab_name: "Nagad",
      image: nagadLogo
    },
    {
      tab_name: "Rocket",
      image: rocketLogo
    },
  ];

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

    setIsLoading(true); // Start loading

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
    } finally {
      set_amount("")
      setTrxId("")
      setIsLoading(false); // Stop loading
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
              <div className="w-full md:w-1/2 shadow  p-[10px] bg-[#3D2BFB]">
                <div className='bg-[#010053] mt-[10px] p-[10px]'>
                  <h1 className="text-[22px] font-semibold mb-3 text-white">Payment Method</h1>
                  {payment_method.map((tab, i) => {
                    const tabBackgrounds = {
                      "Binance": "bg-[#E29700]",
                      "Bank Transfer": "bg-[#004404]",
                      "Bkash": "bg-[#F0047F]",
                      "Nagad": "bg-[#ED1C24]",
                      "Rocket": "bg-[#8F2A85]"
                    };

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer border transition-all duration-200 
                          ${selectedTab === tab.tab_name 
                            ? `border-none text-white ${tabBackgrounds[tab.tab_name] || "bg-gray-200"}`
                            : "border-gray-200 bg-white text-gray-700"}`}
                        onClick={() => setSelectedTab(tab.tab_name)}
                      >
                        <div className='w-full flex justify-between items-center'>
                          <div className="flex items-center">
                            <input type="radio" checked={selectedTab === tab.tab_name} readOnly className="mr-3" />
                            <p className="font-medium">{tab.tab_name}</p>
                          </div>
                          <div>
                            <img className='w-[90px] h-[50px]' src={tab.image} alt="" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 p-[10px]  bg-[#010053]">
                {(selectedTab === "Binance") && (
                  <>
                    <form action="" className='w-full ' onSubmit={handleSubmit}>
                      <div className="bg-[#010053] p-[10px]">
                        <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#E29700] text-center text-white ">Payment Information</h2>
                        <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                          <h2>GETWAY NAME :BINANCE</h2>
                          <h2>BINANCE PAY ID : 942300272</h2>
                        </div>
                        <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই বাইন্যান্স আইডিতে পেমেন্ট করে নিচের হুটস এপস এ স্কেনসট সেন্ড করুন এবং কত ডলার পে করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত
                        কোন সহযোগীতা  প্রয়োজন হলে হুটস এপস যোগাযোগ করবেন 
                        </p>
                        <div className='flex justify-center items-center'>
                          <Link to="https://wa.me/+447414240705" target='_blank' className="px-[20px] py-[8px] rounded-full bg-green-600 inline-flex items-center gap-[5px] text-[15px]">
                            <FaWhatsapp  className='text-white text-[20px]' />
                            <span className='font-poppins text-white '>{whatsapp_number}</span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h2 className='p-[10px] text-center bg-[#E29700] text-[20px] text-white mb-[10px]'>Payment Summery</h2>
                        <label className='text-white'>Transaction ID</label>
                        <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                      </div>
                    </form>
                  </>
                )}
                {selectedTab === "Bank Transfer" && (
                  <>
                    <form action="" onSubmit={handleSubmit}>
                      <div className=" p-[10px]">
                        <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#004404] text-center text-white ">Payment Information</h2>
                        <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                          <h2>GETWAY NAME : BANK TRANSFER</h2>
                          <h2>BANK NAME : PUBALI BANK LIMITED</h2>
                          <h2>BRANCH : BAMNA BRANCH</h2>
                          <h2>ACCOUNT NUMBER : 1146101191473</h2>
                          <h2>ROUTING NUMBER : 175040108</h2>
                        </div>
                      </div>
                      <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই PUBALI BANK LIMITED ACCOUNT এ পেমেন্ট করে নিচের হুটস এপস এ স্কেনসট আপলোড করুন এবং কত ডলার পে 
                      করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
                        </p>
                        <div className='flex justify-center items-center'>
                          <Link to="https://wa.me/+447414240705" target='_blank' className="px-[20px] py-[8px] rounded-full bg-green-600 inline-flex items-center gap-[5px] text-[15px]">
                            <FaWhatsapp  className='text-white text-[20px]' />
                            <span className='font-poppins text-white '>{whatsapp_number}</span>
                          </Link>
                        </div>
                      <div className=' mt-[10px]'>
                        <h2 className='p-[10px] text-center bg-[#004404] text-[20px] text-white mb-[10px]'>Payment Summery</h2>
                        <label className='text-white'>Transaction ID</label>
                        <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                      </div>
                    </form>
                  </>
                )}
                {(selectedTab === "Bkash") && (
                  <>
                    <form action="" onSubmit={handleSubmit}>
                      <div className=" p-[10px]">
                        <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#F0047F] text-center text-white ">Payment Information</h2>
                        <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                          <h2>GETWAY NAME : MOBILE BANKING</h2>
                          <h2>BANK NAME : BKASH</h2>
                          <h2>PAYMENT CHANEL : SEND MONEY OR CASH IN</h2>
                          <h2>ACCOUNT TYPE : PARSONAL ACCOUNT</h2>
                          <h2>ACCOUNT NUMBER : 01889921959</h2>
                        </div>
                      </div>
                      <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই  Bkash ACCOUNT এ পেমেন্ট করে নিচে স্কেনসট আপলোড করুন এবং কত ডলার পে 
                      করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন ।
                        </p>
                        <div className='flex justify-center items-center mb-[10px]'>
                          <Link to="https://wa.me/+447414240705" target='_blank' className="px-[20px] py-[8px] rounded-full bg-green-600 inline-flex items-center gap-[5px] text-[15px]">
                            <FaWhatsapp  className='text-white text-[20px]' />
                            <span className='font-poppins text-white '>{whatsapp_number}</span>
                          </Link>
                        </div>
                      <div>
                        <h2 className='p-[10px] text-center bg-[#F0047F] text-[20px] text-white mb-[10px]'>Payment Summery</h2>
                        <label className='text-white'>Sender Number</label>
                        <input type="text" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                        <label className='text-white'>Transaction ID</label>
                        <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                      </div>
                    </form>
                  </>
                )}
                {(selectedTab === "Nagad") && (
                  <>
                    <form action="" onSubmit={handleSubmit}>
                      <div className=" p-[10px]">
                        <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#ED1C24] text-center text-white ">Payment Information</h2>
                        <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                          <h2>GETWAY NAME : MOBILE BANKING</h2>
                          <h2>BANK NAME : NAGAD</h2>
                          <h2>PAYMENT CHANEL : SEND MONEY OR CASH IN</h2>
                          <h2>ACCOUNT TYPE : PARSONAL ACCOUNT</h2>
                          <h2>ACCOUNT NUMBER : 01889921959</h2>
                        </div>
                      </div>
                      <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই  Nagad ACCOUNT এ পেমেন্ট করে নিচে স্কেনসট আপলোড করুন এবং কত ডলার পে 
                      করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
                        </p>
                        <div className='flex justify-center items-center  mb-[10px]'>
                          <Link to="https://wa.me/+447414240705" target='_blank' className="px-[20px] py-[8px] rounded-full bg-green-600 inline-flex items-center gap-[5px] text-[15px]">
                            <FaWhatsapp  className='text-white text-[20px]' />
                            <span className='font-poppins text-white '>{whatsapp_number}</span>
                          </Link>
                        </div>
                      <div>
                        <h2 className='p-[10px] text-center bg-[#ED1C24] text-[20px] text-white mb-[10px]'>Payment Summery</h2>
                        <label className='text-white'>Sender Number</label>
                        <input type="text" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                        <label className='text-white'>Transaction ID</label>
                        <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                      </div>
                    </form>
                  </>
                )}
                {(selectedTab === "Rocket") && (
                  <>
                    <form action="" onSubmit={handleSubmit}>
                      <div className=" p-[10px]">
                        <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#8F2A85] text-center text-white ">Payment Information</h2>
                        <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                          <h2>GETWAY NAME : MOBILE BANKING</h2>
                          <h2>BANK NAME : ROCKET</h2>
                          <h2>PAYMENT CHANEL : SEND MONEY OR CASH IN</h2>
                          <h2>ACCOUNT TYPE : PARSONAL ACCOUNT</h2>
                          <h2>ACCOUNT NUMBER : 01889921959-9</h2>
                        </div>
                      </div>
                      <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই  Rocket ACCOUNT এ পেমেন্ট করে নিচে স্কেনসট আপলোড করুন এবং কত ডলার পে 
                      করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
                        </p>
                        <div className='flex justify-center items-center mb-[10px]'>
                          <Link to="https://wa.me/+447414240705" target='_blank' className="px-[20px] py-[8px] rounded-full bg-green-600 inline-flex items-center gap-[5px] text-[15px]">
                            <FaWhatsapp  className='text-white text-[20px]' />
                            <span className='font-poppins text-white '>{whatsapp_number}</span>
                          </Link>
                        </div>
                      <div>
                        <h2 className='p-[10px] text-center bg-[#8F2A85] text-[20px] text-white mb-[10px]'>Payment Summery</h2>
                        <label className='text-white'>Sender Number</label>
                        <input type="text" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                        <label className='text-white'>Transaction ID</label>
                        <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
                      </div>
                    </form>
                  </>
                )}
                <label className='text-white'>Amount</label>
                <input type="number" name="amount" value={amount} className="w-full border rounded-lg p-3 mb-3" onChange={(e) => { set_amount(e.target.value) }} />

                <button
                  className={`w-[40%] m-auto block mt-4 text-white py-3 rounded-lg ${!selectedTab ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                  disabled={!selectedTab || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <ClipLoader color="#ffffff" size={20} /> // Show spinner when loading
                  ) : (
                    "Confirm Deposit"
                  )}
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