import React, { useContext, useState,useEffect} from 'react';
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
import Swal from "sweetalert2";

const Wallet = () => {
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // const [paymentMethods, setPaymentMethods] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info = JSON.parse(localStorage.getItem("user_data"));

  // // Fetch payment methods from the backend
  // const fetchPaymentMethods = async () => {
  //   try {
  //     const response = await axios.get(`${base_url}/admin/payment-methods`);
  //     setPaymentMethods(response.data); // Store the fetched data in state
  //   } catch (error) {
  //     console.error('Error fetching payment methods:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch payment methods from backend when the component mounts
  
  //   fetchPaymentMethods();
  // }, []);
  const [activeTab, setActiveTab] = useState("bkash");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Simulate fetching data (replace this with your API call)
    setPaymentMethods([
      {
        _id: "67955dd054e4da6f641969af",
        gatewayName: "Bkash",
        currency: "BDT",
        rate: "126",
        minAmount: 2323,
        maxAmount: 2323,
        fixedCharge: 2323,
        percentCharge: 23,
        depositInstruction: "Please use your bKash wallet to send the amount.",
        requiredFields: [
          { name: "amount", label: "Amount", type: "number", required: true },
          { name: "senderNumber", label: "Sender Number", type: "text", required: true },
          { name: "transactionId", label: "Transaction ID", type: "text", required: true },
        ],
        image: "1737842128840_wallpaperflare.com_wallpaper (1).jpg",
      },
      {
        _id: "67955dd054e4da6f641969b0",
        gatewayName: "Nagad",
        currency: "BDT",
        rate: "126",
        minAmount: 1000,
        maxAmount: 5000,
        fixedCharge: 50,
        percentCharge: 15,
        depositInstruction: "Send the payment via Nagad and provide your details.",
        requiredFields: [
          { name: "amount", label: "Amount", type: "number", required: true },
          { name: "email", label: "Email", type: "email", required: false },
          { name: "transactionId", label: "Transaction ID", type: "text", required: true },
        ],
        image: "nagad_image.jpg",
      },
      {
        _id: "67955dd054e4da6f641969b1",
        gatewayName: "Rocket",
        currency: "BDT",
        rate: "126",
        minAmount: 500,
        maxAmount: 3000,
        fixedCharge: 30,
        percentCharge: 10,
        depositInstruction: "Use Rocket to deposit and confirm your transaction details.",
        requiredFields: [
          { name: "amount", label: "Amount", type: "number", required: true },
          { name: "file", label: "Upload File", type: "file", required: false },
        ],
        image: "rocket_image.jpg",
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const method = paymentMethods.find(
      (method) => method.gatewayName.toLowerCase() === activeTab
    );
    if (!method) return false;

    for (let field of method.requiredFields) {
      if (field.required && !formData[field.name]) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: `${field.label} is required!`,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const method = paymentMethods.find(
      (method) => method.gatewayName.toLowerCase() === activeTab
    );
  
    if (!method) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Payment method not found!",
      });
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("customer_id", user_info._id); // Add customer ID
    formDataToSend.append("gatewayName", method.gatewayName); // Include gatewayName
    formDataToSend.append("customer_name",user_info.name)
    method.requiredFields.forEach((field) => {
      if (formData[field.name]) {
        if (field.type === "file") {
          formDataToSend.append(field.name, formData[field.name]); // Add file if present
        } else {
          formDataToSend.append(field.name, formData[field.name]); // Add other fields
        }
      }
    });
  
    try {
      const response = await axios.post(`${base_url}/deposit`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Deposit request submitted successfully!",
      });
  
      // Reset form after successful submission
      setFormData({});
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the deposit.",
      });
      console.error("Deposit submission error:", error);
    }
  };
  
  
  const renderTabContent = () => {
    const method = paymentMethods.find(
      (method) => method.gatewayName.toLowerCase() === activeTab
    );

    if (!method) return <p className="text-sm text-gray-400">Loading payment methods...</p>;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">{method.gatewayName} Deposit</h3>
        <p className="text-sm text-gray-400 mb-2">{method.depositInstruction}</p>
        {method.requiredFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Confirm Deposit
        </button>
      </div>
    );
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Userdashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Userheader />
        <section className="w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]">
        <div className="bg-[#0E1335] ww-full max-w-4xl mx-auto p-6 py-[50px] rounded-2xl shadow-lg mb-[30px] text-center">
      <h3 className="text-white text-[20px] lg:text-[22px] font-medium mb-2">My Balance</h3>
      <p className="text-blue-400 text-2xl font-bold">$0.50 USD</p>
      {/* <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Deposit
        </button>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-50">
          Withdraw
        </button>
      </div> */}
    </div>
    <div className="bg-[#0B0D2E] text-white w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-lg">
      {/* Deposit Amount Box */}
      <div className="bg-gray-800 text-gray-300 p-4 rounded-md mb-6">
        <h3 className="text-lg font-bold text-white mb-2">Deposit Amount</h3>
        <p className="text-sm mb-2">Enter the amount you want to deposit, and ensure it falls within the specified limits.</p>
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleInputChange}
            placeholder="Enter deposit amount"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Tabs */}
        <div className="w-1/3 border-r border-gray-700 pr-4">
          <h2 className="text-lg font-bold mb-4">Payment Methods</h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method._id}
                onClick={() => setActiveTab(method.gatewayName.toLowerCase())}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === method.gatewayName.toLowerCase()
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {method.gatewayName}
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        <div className="w-2/3 pl-4">
          <div className="bg-gray-800 text-gray-300 p-4 rounded-md mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Deposit Instructions</h3>
            <p className="text-sm mb-2">
              Please ensure the details provided are accurate to avoid any delays. Different payment methods have specific steps and requirements.
            </p>
            <ul className="list-disc list-inside text-sm">
              <li>Verify your payment account details before submitting.</li>
              <li>Follow the steps for the selected payment method carefully.</li>
              <li>Contact support if you encounter any issues.</li>
            </ul>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
        </section>
      </section>
    </section>
  );
};

export default Wallet;
