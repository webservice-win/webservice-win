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
  const [activeTab, setActiveTab] = useState("bkash");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({});
  // // Fetch payment methods from the backend
          // ---------------all-websites--------------
const [details,set_details]=useState([]);
const my_details=()=>{
    axios.get(`${base_url}/user-order/${user_info._id}`)
    .then((res)=>{
        if(res.data.success){
          set_details(res.data.data);
        }
    }).catch((err)=>{
        console.log(err.name)
    })
};
useEffect(()=>{
  my_details()
},[]);
  const fetchPaymentMethods = async () => {
    axios.get(`${base_url}/admin/payment-methods`)
    .then((res)=>{
      setPaymentMethods(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    // Fetch payment methods from backend when the component mounts
  
    fetchPaymentMethods();
  }, []);


  // useEffect(() => {
  //   // Simulate fetching data (replace this with your API call)
  //   setPaymentMethods([
  //     {
  //       _id: "67955dd054e4da6f641969af",
  //       gatewayName: "Bkash",
  //       currency: "BDT",
  //       rate: "126",
  //       minAmount: 2323,
  //       maxAmount: 2323,
  //       fixedCharge: 2323,
  //       percentCharge: 23,
  //       depositInstruction: "Please use your bKash wallet to send the amount.",
  //       requiredFields: [
  //         { name: "amount", label: "Amount", type: "number", required: true },
  //         { name: "senderNumber", label: "Sender Number", type: "text", required: true },
  //         { name: "transactionId", label: "Transaction ID", type: "text", required: true },
  //       ],
  //       image: "1737842128840_wallpaperflare.com_wallpaper (1).jpg",
  //     },
  //     {
  //       _id: "67955dd054e4da6f641969b0",
  //       gatewayName: "Nagad",
  //       currency: "BDT",
  //       rate: "126",
  //       minAmount: 1000,
  //       maxAmount: 5000,
  //       fixedCharge: 50,
  //       percentCharge: 15,
  //       depositInstruction: "Send the payment via Nagad and provide your details.",
  //       requiredFields: [
  //         { name: "amount", label: "Amount", type: "number", required: true },
  //         { name: "email", label: "Email", type: "email", required: false },
  //         { name: "transactionId", label: "Transaction ID", type: "text", required: true },
  //       ],
  //       image: "nagad_image.jpg",
  //     },
  //     {
  //       _id: "67955dd054e4da6f641969b1",
  //       gatewayName: "Rocket",
  //       currency: "BDT",
  //       rate: "126",
  //       minAmount: 500,
  //       maxAmount: 3000,
  //       fixedCharge: 30,
  //       percentCharge: 10,
  //       depositInstruction: "Use Rocket to deposit and confirm your transaction details.",
  //       requiredFields: [
  //         { name: "amount", label: "Amount", type: "number", required: true },
  //         { name: "file", label: "Upload File", type: "file", required: false },
  //       ],
  //       image: "rocket_image.jpg",
  //     },
  //   ]);
  // }, []);

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
    const activeMethod = paymentMethods.find(
      (method) => method.gatewayName.toLowerCase() === activeTab
    );
  
    if (!activeMethod) {
      return (
        <div className="text-center text-gray-400">
          <p>No payment method selected.</p>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-800 w-full text-gray-300 p-4 rounded-md">
        <h3 className="text-xl font-bold text-white mb-4">{activeMethod.gatewayName}</h3>
        {/* <p className="mb-4">
          <span className="font-bold">Currency:</span> {activeMethod.currency}
        </p>
        <p className="mb-4">
          <span className="font-bold">Exchange Rate:</span> {activeMethod.rate}
        </p>
        <p className="mb-4">
          <span className="font-bold">Minimum Amount:</span> {activeMethod.minAmount}
        </p>
        <p className="mb-4">
          <span className="font-bold">Maximum Amount:</span> {activeMethod.maxAmount}
        </p>
        <p className="mb-4">
          <span className="font-bold">Fixed Charge:</span> {activeMethod.fixedCharge}
        </p>
        <p className="mb-4">
          <span className="font-bold">Percentage Charge:</span> {activeMethod.percentCharge}
        </p> */}
        <div>
          <h4 className="font-bold text-lg text-white mb-2">Deposit Instructions:</h4>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: activeMethod.depositInstruction }}
          />
        </div>
        <div className="mt-6">
          <h4 className="font-bold text-lg text-white mb-2">User Data Requirements:</h4>
          {activeMethod.userData.map((field) => (
            <div key={field._id.$oid} className="mb-4">
              <label className="block text-sm font-medium text-gray-200">
                {field.label}{" "}
                {field.isRequired === "required" && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={field.label}
                required={field.isRequired === "required"}
              />
            </div>
          ))}
        </div>
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
      <p className="text-blue-400 text-2xl font-bold">${details.deposit_balance} USD</p>
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
        <div className="flex w-full">
    {/* Sidebar Tabs */}
  
    {/* Tab Content */}
    <div className="w-full pl-4">
     
      {renderTabContent()}
    </div>
  </div>
      </div>
    </div>
        </section>
      </section>
    </section>
  );
};

export default Wallet;
