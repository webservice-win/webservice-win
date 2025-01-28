import React,{useState} from 'react'
import { FaTrophy, FaUserFriends, FaChartBar, FaMoneyBillWave, FaHeadset } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
const Achievementmodel = ({data}) => {
    const base_url= import.meta.env.VITE_API_KEY_Base_URL;
    const [isPopupVisible, setPopupVisible] = useState(false);

  const handleViewClick = () => {
    setPopupVisible(true);
  };
  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  return (
    <div>

<div className="flex flex-col bg-[#010053] border-[3px] border-white  justify-between rounded-md p-6">
            <span className="text-[30px] w-[70px] h-[70px] bg-white text-indigo-700 flex justify-center items-center rounded-full">
              <FaTrophy />
            </span>
            <div className="space-y-2">
              <h3 className="font-bold text-[20px] lg:text-[25px] text-white mt-[15px]">{data.title}</h3>
              <p className="text-sm text-muted-foreground text-white">{data.description}</p>
              <button
                onClick={handleViewClick}
                className="px-[30px] py-[12px] bg-[#2563EB] mt-[30px] text-white rounded-[5px]"
              >
                View
              </button>
            </div>
          </div>
          {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#010053] border-white border-[3px] p-6 rounded-lg h-auto shadow-lg w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">  
            <h3 className="text-lg font-bold mb-4 text-white">{data.title}</h3>
            <img
              src={`${base_url}/images/${data.image}`}
              alt="Gallery"
              className="w-[100%] h-[500px] m-auto border-[3px] border-white rounded-md"
            />
            <button
              onClick={handleCloseClick}
              className="mt-4 px-[20px] text-[22px] absolute top-[10%] right-[20%] py-[10px] bg-indigo-700 text-white rounded-md"
            >
              <IoCloseOutline/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievementmodel;
