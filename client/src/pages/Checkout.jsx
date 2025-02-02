import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useParams, useSearchParams,Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import bankLogo from '../assets/bank-logo.png';
import bkashLogo from '../assets/bkash-logo.png';
import nagadLogo from '../assets/nagad-logo.png';
import rocketLogo from '../assets/rocket-logo.png';
import binanceLogo from '../assets/binance-logo.png';
import { FaWhatsapp } from "react-icons/fa";
const Checkout = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [site, setSiteName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user_data"));
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const conversionRate = 125;
  const [product, set_product] = useState([]);
  const product_Id = searchParams.get("product_id");
  const navigate = useNavigate();
  const whatsapp_number = import.meta.env.VITE_WHATSAPP_NUMBER;
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
  ]
  useEffect(() => {
    axios.get(`${base_url}/admin/single-website/${product_Id}`)
      .then((res) => {
        if (res.data.success) {
          set_product(res.data.data);
        }
      })
      .catch((err) => console.log(err.name));
  }, []);

  useEffect(() => {
    if (id == 1) setSiteName("Single License Script"), setPrice(product.singleLicense);
    else if (id == 2) setSiteName("Unlimited License Script"), setPrice(product.unlimitedLicense);
    else if (id == 3) setSiteName("Completed Betting Website"), setPrice(product.bettinglicense);
  }, [product]);

  const finalPayment = Math.max(price - amount, 0);

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!selectedTab) return Swal.fire('Error', 'Please select a payment method.', 'error');
    if (amount > price) return Swal.fire('Error', 'Amount cannot exceed total price.', 'error');
    if (selectedTab !== "Bank Transfer" && (!trxId)) return Swal.fire('Error', 'Please fill all required fields.', 'error');

    setLoading(true);

    try {
      // const formData = new FormData();
      // formData.append("product_id", product_Id);
      // formData.append("product_price", price);
      // formData.append("customer_id", user_info._id);
      // formData.append("provider_name", selectedTab);
      // formData.append("payeer_number", senderNumber || ""); // Optional
      // formData.append("transiction", trxId || ""); // Optional
      // formData.append("product_name", site);
      // formData.append("due_payment", finalPayment);
      // formData.append("paid", amount);

      if (file) {
        formData.append("image", file); // Attach the image if available
      }
      console.log(trxId)
      await axios.post(`${base_url}/product-order`, {
        product_id: product_Id,
        product_price: price,
        customer_id: user_info._id,
        customer_name:user_info.name,
        customer_email:user_info.email,
        provider_name: selectedTab,
        product_name:product.title,
        due_payment: finalPayment,
        package_name:site,
        paid:amount ,
        payeer_number: senderNumber || "",
        transaction: trxId || ""
      })
        .then((res) => {
          console.log(res)
          navigate("/user-dashboard/my-order")
        }).catch((err) => {
          console.log(err)
        })

      Swal.fire('Success', 'Order confirmed successfully!', 'success');
      navigate("/my-order")
    } catch (error) {
      Swal.fire('Error', 'Payment failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="font-poppins">
      <Header />
      <section className="w-full flex bg-[#F9FBFC] justify-center items-center py-[80px] gap-[20px] lg:flex-row ">
        <div className="w-[97%] lg:w-[70%] flex md:flex-row gap-6 flex-col">

          {/* Left Section */}
          <div className="w-full md:w-1/2  shadow  p-[10px] bg-[#3D2BFB]">
            <div className='p-6 bg-[#010053]'>
              <h1 className='text-center text-white font-[500] text-[22px] p-[10px] bg-indigo-800'>Order Details</h1>
              <h1 className='text-[20px] text-white mt-[20px]'>{product.title}</h1>
              <div className='flex justify-between items-center py-[10px]'>
                <h2 className='text-[18px] font-[500] text-white'>{site}</h2>
                <h2 className='text-[20px] font-[600] text-white'>${price}</h2>
              </div>
            </div>
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
          <div className="w-full md:w-1/2 p-[10px] bg-[#010053] ">
            {(selectedTab === "Binance") && (
              <>
                <form action="" className='w-full ' onSubmit={handlePayNow}>
                  <div className="bg-[#010053] p-[10px]">
                    <h2 className="text-lg font-semibold mb-3 p-[10px] bg-[#E29700] text-center text-white ">Payment Information</h2>
                    <div className='text-center py-[10px] text-yellow-500 text-[20px] font-[500] space-y-2'>
                      <h2>GETWAY NAME :BINANCE</h2>
                      <h2>BINANCE PAY ID : 942300272</h2>
                    </div>
                    <p className='text-white px-[20px] py-[10px]'>বি:দ্র: এই বাইন্যান্স আইডিতে পেমেন্ট করে নিচের হুটস এপস এ স্কেনসট সেন্ড করুন এবং কত ডলার পে করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত
                    কোন সহযোগীতা  প্রয়োজন হলে হুটস এপস যোগাযোগ করবেন 
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
                <form action="" onSubmit={handlePayNow}>
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
                  করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
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
                <form action="" onSubmit={handlePayNow}>
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
                  করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন ।
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
                <form action="" onSubmit={handlePayNow}>
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
                  করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
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
                <form action="" onSubmit={handlePayNow}>
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
                  করলেন সেটি লিখুন  পেমেন্ট সংক্রান্ত  কোন সহযোগীতা  প্রয়োজন হলে  হুটস এপস যোগাযোগ করবেন । 
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
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border rounded-lg p-3 mb-3" />
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-sm font-semibold">
                <span className='text-[18px] text-white'>TOTAL AMOUNT</span>
                <span className='text-[18px] text-white'>{price} USD</span>
              </div>
              <div className="flex justify-between text-sm font-semibold ">
                <span className='text-[18px] text-white mt-[10px]'>EXCHENGE RATE : </span>
                <span className='text-[18px] text-white mt-[10px]'>1 USD = 126 BDT</span>
              </div>
              <div className="flex justify-between text-sm font-semibold ">
                <span className='text-[18px] text-yellow-500 mt-[10px]'>DUE AMOUNT</span>
                <span className='text-[18px] text-yellow-500 mt-[10px]'>{finalPayment} USD</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-blue-600">
                <span className='text-[18px] text-yellow-500 mt-[10px]'>DUE BDT AMOUNT </span>
                <span className='text-[18px] text-yellow-500 mt-[10px]'>{(finalPayment * conversionRate).toFixed(2)} BDT</span>
              </div>
            </div>
            <button className={`w-[40%] m-auto block mt-4 text-white py-3 rounded-lg ${!selectedTab ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={handlePayNow} disabled={!selectedTab}>
              Pay Now
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Checkout;