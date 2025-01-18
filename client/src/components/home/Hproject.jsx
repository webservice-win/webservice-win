import React,{useState,useEffect} from 'react'
import bg1 from "../../assets/gradient.png"
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import Swal from 'sweetalert2';
const Hproject = () => {
    const base_url="https://admin-api.oraclesoft.org";
 const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the video popup
  const togglePopup = () => setIsOpen(!isOpen);
    // --------admission form------------
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    profession: '',
    location: '',
    schedule: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.profession) errors.profession = 'Profession is required';
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.schedule) errors.schedule = 'Schedule is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(`${base_url}/admin/add-admission`, formData);
        Swal.fire({
          title: 'Success!',
          text: 'Your admission form has been submitted.',
          icon: 'success',
        });
        setFormData({
          name: '',
          phone: '',
          profession: '',
          location: '',
          schedule: '',
        });
                      setIsOpen(false)

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue submitting the form.',
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill all the required fields.',
        icon: 'warning',
      });
    }
  };

  const toggleScheduleDropdown = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleScheduleChange = (value) => {
    setFormData({ ...formData, schedule: value });
    setIsScheduleOpen(false);
  };
   // ---------------all-courses--------------
    const [isLoading, setIsLoading] = useState(true);
const [courses,set_courses]=useState([]);
 const get_category = () => {
    setIsLoading(true);  // Step 2: Set loading state to true before fetching data
    axios
      .get(`${base_url}/admin/all-courses`)
      .then((res) => {
        if (res.data.success) {
          set_courses(res.data.data);
          setIsLoading(false);  // Step 3: Set loading state to false after data is fetched
        }
      })
      .catch((err) => {
        console.log(err.name);
        setIsLoading(false);  // Ensure loading state is set to false if there's an error
      });
  };

  useEffect(() => {
    get_category();
  }, []);

    useEffect(()=>{
        get_category()
    },[]);
    useEffect(() => {
  // Lock scrolling when the modal is open
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // Clean up on unmount or when modal is closed
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isModalOpen]);
  return (
    <>
    {
      courses.length > 0 ? <section className='w-full  relative h-auto bg-gradient-to-r from-blue-500 to-purple-500 px-[20px] md:px-[30px] lg:px-[50px] xl:px-[100px] py-[30px] lg:py-[50px] '>
         {/* -----------------------bg1-------------- */}
                 {/* <div className='absolute top-0 left-[-40%] '>
                  <img className='w-[60%] z-[1]' src={bg1} alt="" />
                 </div> */}
         {/* ------------------bg1-------------- */}
    <div className='flex justify-center items-center'>
        <h1 className='px-[20px] lg:px-[25px]  rounded-full font-bangla_font text-center w-auto text-[16px] lg:text-[30px] py-[8px] lg:py-[10px] bg-color2 border-[3px] border-white text-white'>
          আমাদের কোর্স সমূহ
        </h1>
      </div>
      {/* -------------------box------------------- */}
       <section className='pt-[30px] lg:pt-[50px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[25px] z-[100]'>
{
  courses.map((data)=>{
    return(
<div className='p-[7px] bg-white hover:shadow-lg group rounded-[10px] transition-all duration-200 overflow-hidden '>
      <div className='w-full h-[200px] lg:h-[300px] overflow-hidden rounded-[10px]'>
        <img className='w-full h-full rounded-[10px] group-hover:scale-[1.1] transition-all duration-200' src={`${base_url}/images/${data.image}`} alt="" />
      </div>
      <div className='p-[10px] lg:p-[15px] font-poppins'>
       {
        data.title.length >60 ?  <h2 className='text-[20px] mb-[5px] lg:text-[22px]  lg:mb-[15px] font-[600] font-bangla_font'>{data.title.slice(0,60)}...</h2>: <h2 className='text-[20px] lg:text-[22px] mb-[5px] lg:mb-[15px] font-[600] font-bangla_font'>{data.title}</h2>
       }
        <div className='flex justify-between items-center mb-[8px] lg:mb-[15px]'>
          <h2 className='text-[14px] lg:text-[16px] font-[500] text-neutral-600'>{data.total_reviews} reviews</h2>
          <h2 className='text-[14px] lg:text-[16px] font-[500] text-neutral-600'>{data.total_students} Students</h2>
        </div>
        <div className=''>
          <div className='flex justify-between items-center w-full'>
            <h2 className='text-[15px] lg:text-[17px] font-[600] text-neutral-800'>Online:{data.online_price}$</h2>
            <h2 className='text-[15px] lg:text-[17px] font-[600] text-neutral-800'>Offline:{data.offline_price}$</h2>
            <button
              className='border-[2px] lg:block hidden border-red-400 text-red-500 text-[15px] cursor-pointer px-[20px] py-[10px] font-[500] rounded-[5px] hover:bg-red-400 hover:text-white transition-all duration-150'
              onClick={() => setIsOpen(true)}>
              Admission
            </button>
          </div>
          <button
            className='border-[2px] lg:hidden mt-[20px] w-full border-red-400 text-red-500 text-[15px] cursor-pointer px-[20px] py-[10px] font-[500] rounded-[5px] hover:bg-red-400 hover:text-white transition-all duration-150'
            onClick={() => setIsOpen(true)}>
            Admission
          </button>
        </div>
      </div>

      {/* Modal */}
            {isOpen && (
        <div className="fixed inset-0 font-poppins z-[100] bg-black bg-opacity-75 flex items-center justify-center ">
     <div className="bg-white p-8 rounded-lg w-[90%] max-w-[600px] z-[100]">
        <h2 className="text-[20px] lg:text-[24px] font-[600] mb-4 text-center">Admission Form</h2>
        <form onSubmit={handleSubmit} className='z-[100]'>
          <div className="mb-2">
            <label className="block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2 relative ">
            <label className="block">Schedule</label>
            <div className="relative">
              <div
                onClick={toggleScheduleDropdown}
                className="w-full p-2 border rounded mt-[4px] cursor-pointer"
              >
                {formData.schedule || 'Select Schedule'}
              </div>
              {isScheduleOpen && (
                <div className="absolute left-0 w-full mt-2 bg-white border rounded">
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleScheduleChange('Online')}
                  >
                    Online
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleScheduleChange('Offline')}
                  >
                    Offline
                  </div>
                </div>
              )}
            </div>
            {formErrors.schedule && <p className="text-red-500 text-sm">{formErrors.schedule}</p>}
          </div>

          <div className="flex justify-center gap-[20px] mt-[5px]">
            <button type="submit" onClick={()=>{setIsOpen(false)}} className="w-full py-2  lg:py-3 bg-red-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="w-full py-2 lg:py-3 bg-green-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
        <div className="absolute top-0 right-0 p-4">
          <button
            className="text-red-500 font-bold text-[25px]"
            onClick={() => setIsOpen(false)}
          >
            <IoClose/>
          </button>
        </div>
      </div>
        </div>
      )}
      {/* { isModalOpen && (
    <div className="fixed top-0 z-[1000] font-poppins left-0 w-full h-full bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-[90%] max-w-[600px] z-[100]">
        <h2 className="text-[24px] font-[600] mb-4 text-center">Admission Form</h2>
        <form onSubmit={handleSubmit} className='z-[100]'>
          <div className="mb-2">
            <label className="block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2">
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-[4px]"
            />
          </div>

          <div className="mb-2 relative">
            <label className="block">Schedule</label>
            <div className="relative">
              <div
                onClick={toggleScheduleDropdown}
                className="w-full p-2 border rounded mt-[4px] cursor-pointer"
              >
                {formData.schedule || 'Select Schedule'}
              </div>
              {isScheduleOpen && (
                <div className="absolute left-0 w-full mt-2 bg-white border rounded">
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleScheduleChange('Online')}
                  >
                    Online
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleScheduleChange('Offline')}
                  >
                    Offline
                  </div>
                </div>
              )}
            </div>
            {formErrors.schedule && <p className="text-red-500 text-sm">{formErrors.schedule}</p>}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full py-2 bg-red-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
        <div className="absolute top-0 right-0 p-4">
          <button
            className="text-red-500 font-bold text-lg"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
      )} */}
    </div>
    )
  })
}

       </section>
       {
    courses.length > 3 ?    <div className="flex w-full items-center justify-center mt-[50px] z-[10]">
              <button className='px-[30px] py-[12px] text-white bg-indigo-800 border-[2px] border-white font-poppins text-[16px]'>Load more</button>
         </div>:""
     }

<div className="flex items-center justify-center mt-[50px] lg:mt-[80px]">
  {/* Left Line */}
  <div className="flex-grow border-t-[1px] border-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 sm:border-t-[1px]" />

  {/* Left Dots */}
  <div className="flex items-center space-x-1 mx-3 sm:space-x-2 md:space-x-3 lg:space-x-4">
    <span className="h-[3px] w-[3px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[6px] w-[6px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[10px] w-[10px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
  </div>

  {/* Center Diamond */}
  <div className="relative flex items-center justify-center mx-3 sm:mx-5 md:mx-7">
    {/* Outer Diamond */}
    <div className="w-8 h-8 border-[1px] border-gradient-to-r from-indigo-500 to-indigo-700 transform rotate-45 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
    {/* Inner Indigo Diamond */}
    <div className="absolute w-4 h-4 bg-gradient-to-r from-indigo-600 to-indigo-800 transform rotate-45 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
  </div>

  {/* Right Dots */}
  <div className="flex items-center space-x-1 mx-3 sm:space-x-2 md:space-x-3 lg:space-x-4">
    <span className="h-[12px] w-[12px] bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[10px] w-[10px] bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[8px] w-[8px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[6px] w-[6px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-125" />
    <span className="h-[3px] w-[3px] bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full transition-all duration-300 transform hover:scale-125" />
  </div>

  {/* Right Line */}
  <div className="flex-grow border-t-[1px] border-gradient-to-l from-indigo-400 via-indigo-500 to-indigo-600 sm:border-t-[1px]" />
</div>










    </section>:""
    }
    </>
  )
}

export default Hproject