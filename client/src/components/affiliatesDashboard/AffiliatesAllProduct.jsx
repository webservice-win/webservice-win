// import affiliatImg from "../../assets/affiliatesDa.png";
// Import Swiper React components
import React,{useState,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AffiliatesAllProduct = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info = JSON.parse(localStorage.getItem("user_data"));
  const [videos, set_tutorials] = useState([]);
  // Replace with your backend base URL
  const userId = JSON.parse(localStorage.getItem("user_data"))._id;
  const get_tutorial = () => {
    axios
      .get(`${base_url}/all-tutorials`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.success) {
          set_tutorials(res.data.data);
          console.log(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };
  useEffect(() => {
    get_tutorial();
  }, []);
  const [transiction,set_transiction]=useState([])
  const fetchDeposits = async () => {
    axios.get(`${base_url}/deposit/${user_info._id}`)
    .then((res)=>{
      set_transiction(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  };
    useEffect(() => {
      fetchDeposits();
    }, []);
  return (
    <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-[20px]">
            {videos?.slice(0,3).map((video) => (
                <div key={video._id} className="flex bg-[#AB1E1E] rounded-[5px] overflow-hidden flex-col items-center">
                    {/* Video Container */}
                    <div className="w-full bg-red-500 relative">
                        {/* YouTube iframe */}
                        <iframe
                            src={video.tutorial_link}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48"
                        ></iframe>
                    </div>

                    {/* Video Title */}
                   {
                    video.title.length > 20 ?  <p className="mt-2 text-[18px] font-semibold p-[10px] text-white">{video.title.slice(0,20)}...</p>: <p className="mt-2 text-[18px] font-semibold p-[10px] text-white">{video.title}</p>
                   }
                </div>
            ))}
        </div>
        <div className="border-2 border-red-500 border-dotted px-2 pt-3">
        <div className="bg-[#222222] py-3">
          <h1 className="text-2xl font-bold text-center text-white">
            Transiction History
          </h1>
        </div>
        <table className="min-w-full bg-white border border-gray-200 overflow-hidden">
        <thead className="text-xs text-white uppercase bg-gradient-to-r from-indigo-600 to-indigo-700 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">
              Date
            </th>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">
              Amount
            </th>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">
              Provider
            </th>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">
              Transaction
            </th>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold border-r border-gray-200 dark:border-gray-700">
              Status
            </th>
            <th className="px-6 py-[15px] text-left text-[17px] font-semibold">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {transiction.map((deposit, index) => (
            <tr
              key={deposit._id}
              className={`${
                index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
              } border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <td className="px-6 py-2 text-[16px] font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
                {new Date(deposit.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-2 text-[16px] font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
                ${deposit.amount}
              </td>
              <td className="px-6 py-2 text-[16px] font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
                {deposit.gatewayName}
              </td>
              <td className="px-6 py-2 text-[16px] font-medium text-gray-700 dark:text-white border-r border-gray-200 dark:border-gray-700">
                {deposit.transactionId}
              </td>
              <td className="px-6 py-2 text-[16px] font-medium border-r border-gray-200 dark:border-gray-700">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    deposit.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : deposit.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : deposit.status === "failed"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {deposit.status}
                </span>
              </td>
              <td className="px-6 py-2 text-[16px] font-medium text-gray-700 dark:text-white">
                <NavLink to={`/deposit-invoice/${deposit._id}`}>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-[16px] font-medium rounded-lg hover:bg-indigo-700 transition">
                    Details
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AffiliatesAllProduct;
