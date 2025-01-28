import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // For the alert box
import axios from 'axios'; // For API requests

const Checkout = () => {
  const [selectedTab, setSelectedTab] = useState("Bank Transfer");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [site, setSiteName] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const conversionRate = 125;

  useEffect(() => {
    if (id == 1) {
      setSiteName("Single License Script");
      setPrice(299);
    } else if (id == 2) {
      setSiteName("Unlimited License Script");
      setPrice(2999);
    } else if (id == 3) {
      setSiteName("Completed Betting Website");
      setPrice(1800);
    }
  }, [id]);

  const finalPayment = Math.max(price - amount, 0);

  // Validate form
  const validateForm = () => {
    if (!senderNumber || !trxId || !file) {
      return false;
    }
    return true;
  };

  // Handle the Pay Now button click
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

    const formData = new FormData();
    formData.append('senderNumber', senderNumber);
    formData.append('trxId', trxId);
    formData.append('file', file);
    formData.append('product_id', searchParams.get("product_id"));
    formData.append('price', finalPayment);
    formData.append('customer_id', user_info._id); // Assuming `user_info` is defined globally
    formData.append('provider_name', selectedTab);
    formData.append('product_name', site);

    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/product-order`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your payment has been processed successfully.",
      });

      // Optionally reset the form
      setSenderNumber('');
      setTrxId('');
      setFile(null);
      setShowModal(false); // Close the modal
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
      <Header />
      <section className="w-full flex bg-[#F9FBFC] justify-center items-center py-[80px]">
        <div className="w-[70%] flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full md:w-1/2 bg-white shadow p-6 rounded-lg">
            <h1 className="text-[22px] font-semibold mb-3">Deposit</h1>
            {[
              { id: "Bank Transfer", label: "Bank Transfer", logo: "https://goldsnova.com/assets/images/gateway/678d4895e80b21737312405.png" },
              { id: "Bkash", label: "Bkash", logo: "https://goldsnova.com/assets/images/gateway/678d6bd41c50b1737321428.png" },
              { id: "Nagad", label: "Nagad", logo: "https://goldsnova.com/assets/images/gateway/678d73ec0db361737323500.png" },
            ].map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer border ${selectedTab === tab.id ? "border-blue-500 bg-blue-100" : "border-gray-200"}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <div className="flex items-center">
                  <input type="radio" checked={selectedTab === tab.id} readOnly className="mr-3" />
                  <p className="text-gray-700 font-medium">{tab.label}</p>
                </div>
                <img src={tab.logo} alt={tab.label} className="w-10 h-10" />
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 bg-white shadow p-6 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-sm mb-2 font-semibold">
                <span>Total Price</span>
                <span>{price.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm mb-2 font-semibold text-red-600">
                <span>Due Payment</span>
                <span>{finalPayment.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm mb-2 font-bold text-blue-600">
                <span>Due In BDT</span>
                <span>{(finalPayment * conversionRate).toFixed(2)} BDT</span>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => setShowModal(true)}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </section>

      {/* Modal for transaction details */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
            <p className="mb-4">Please review and submit your payment details.</p>

            <form onSubmit={handlePayNow}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Sender's Number</label>
                <input
                  type="text"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default Checkout;
