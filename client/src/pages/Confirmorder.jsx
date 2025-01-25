import React, { useState,useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Confirmorder = () => {
  const [senderNumber, setSenderNumber] = useState("");
  const [searchParams] = useSearchParams();
  const [trxId, setTrxId] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info=JSON.parse(localStorage.getItem("user_data"));
  const {provider}=useParams()
  console.log(provider)
  const [webiste_details,set_deatils]=useState([]);

  const get_oursite = () => {
    axios
      .get(`${base_url}/admin/single-website-details/${searchParams.get("product_id")}`)
      .then((res) => {
        if (res.data.success) {
          set_deatils(res.data.data);
          console.log(res.data)
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_oursite();
  }, []);
  const validateForm = () => {
    const errors = {};

    // Validate senderNumber (must be 11 digits)
    if (!senderNumber) {
      errors.senderNumber = "Sender's Bkash number is required.";
    } else if (!/^\d{11}$/.test(senderNumber)) {
      errors.senderNumber = "Sender's Bkash number must be 11 digits.";
    }

    // Validate trxId (cannot be empty)
    if (!trxId) {
      errors.trxId = "TRXID is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields correctly.",
      });
      return; // Stop submission if validation fails
    }

    // const payload = {
    //   senderNumber,
    //   trxId,
    // };

    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/product-order`,{product_id:searchParams.get("product_id"), product_price:searchParams.get("price"),customer_id:user_info._id,provider_name:provider,payeer_number:senderNumber,transiction:trxId,product_name:webiste_details.title});
  
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your payment has been processed successfully.",
      });

      // Optionally reset the form
      setSenderNumber("");
      setTrxId("");
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Failed to process payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="font-poppins">
        <Header/>
           <section className="px-[20px] py-[60px]">
           <div className="w-[50%] m-auto bg-gray-100 flex justify-center items-center">
           <form
      className="w-full bg-white rounded-lg shadow-lg p-6"
      onSubmit={handlePayNow}
    >
      {/* Top Message */}
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
        <p>
          You are requesting <strong>${searchParams.get("price")}.00 USD</strong> to deposit.
          Please pay <strong>55,500 BDT</strong> for successful payment.
        </p>
      </div>

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
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-3 rounded-lg transition`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
    </div>
           </section>
        <Footer/>
    </section>
  );
};

export default Confirmorder;
