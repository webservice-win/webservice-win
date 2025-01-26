import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Checkout = () => {
  const [selectedTab, setSelectedTab] = useState("Bank Transfer");
  const [amount, setAmount] = useState("");
  const conversionRate = 125; // Example conversion rate for USD to BDT
  const processingChargeRate = 0.02; // Example processing charge rate (2%)
  const [site,site_name]=useState("");
  const [price,set_price]=useState();
  const {id}=useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const tabs = [
    { id: "Bank Transfer", label: "Bank Transfer", logo: "https://goldsnova.com/assets/images/gateway/678d4895e80b21737312405.png" },
    { id: "Bkash", label: "Bkash", logo: "https://goldsnova.com/assets/images/gateway/678d6bd41c50b1737321428.png" },
    { id: "Nagad", label: "Nagad", logo: "https://goldsnova.com/assets/images/gateway/678d73ec0db361737323500.png" },
  ];
  const [searchParams] = useSearchParams();
  const calculateProcessingCharge = () => {
    return parseFloat(amount) * processingChargeRate || 0;
  };

  const calculateTotal = () => {
    return parseFloat(amount) + calculateProcessingCharge() || 0;
  };

  const calculateInBDT = () => {
    return calculateTotal() * conversionRate || 0;
  };

  useEffect(()=>{
    if(id==1){
       site_name("Single License Script")
       set_price(299)
    }else if(id==2){
      site_name("Unlimited License Script")
      set_price(2999)
    }else if(id==3){
      site_name("Completed Betting Website")
      set_price(1800)
    }
  },[]);
  console.log(searchParams.get("product_id"))
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
  return (
    <section className='font-poppins'>
        <Header/>
    
        {/* ----------------------------- */}
      <section className="w-full flex bg-[#F9FBFC] justify-center items-center py-[80px]">
      <div className='w-[50%]'>
      <div className="w-[100%] flex ">
        
      {/* Left Tabs */}
      <div className="w-full md:w-1/2 bg-white  shadow p-4">
      <h1 className='text-[22px] font-[500] mb-[7px]'>Checkout</h1>
      <p>{webiste_details?.title}</p>
      <p className='text-[18px] mb-[5px]'>{site}</p>
      <p className='text-[18px] font-[500] mb-[20px]'>Price : {price}$</p>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer 
              ${selectedTab === tab.id ? "bg-blue-100 border-l-4 border-blue-500" : "bg-gray-50"}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                checked={selectedTab === tab.id}
                readOnly
                className="mr-3"
              />
              <p className="text-gray-700">{tab.label}</p>
            </div>
            <img src={tab.logo} alt={tab.label} className="w-10 h-10" />
          </div>
        ))}
      </div>
      {/* Right Content */}
      <div className="w-full md:w-1/2 bg-white shadow p-6 ml-0 md:ml-4">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => set_price(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span className="absolute right-3 top-3 text-gray-500">$</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Processing Charge</span>
            <span>{calculateProcessingCharge().toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Total</span>
            <span>{calculateTotal().toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-sm mb-2 font-semibold">
            <span>Conversion</span>
            <span>1 USD = {conversionRate} BDT</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>In BDT</span>
            <span>{calculateInBDT().toFixed(2)}</span>
          </div>
        </div>
        <NavLink to={`/confirm-order/${selectedTab}?product_id=${searchParams.get("product_id")}&price=${price}`}>
        <button
          className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Confirm Deposit
        </button>
        </NavLink>
  
        <p className="text-xs text-gray-500 mt-3 text-center">
          Ensuring your funds grow safely through our secure deposit process with world-class payment options.
        </p>
      </div>
    </div>
      </div>
      </section>
      <Footer/>
    </section>
  )
}

export default Checkout

