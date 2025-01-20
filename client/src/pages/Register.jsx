import React, { useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import login_img from "../assets/login.png";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const Register = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
      const navigate = useNavigate();
      const base_url="http://localhost:8080";
        const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: null, // New state for the profile picture
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for the image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.profilePicture) {
        formDataToSend.append('file', formData.profilePicture);
      }
  
      // Show the progress bar with SweetAlert2
      const swalWithProgress = Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while we submit your data.',
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: () => {
          // You can use Swal.showLoading to show the loading spinner
          Swal.showLoading();
        },
        html: `
          <div>Uploading...</div>
          <progress id="progress-bar" value="0" max="100" style="width: 100%;"></progress>
          <span id="progress-text">0%</span>
        `,
      });
  
      // Axios request with progress tracking
      axios.post(`${base_url}/auth/signup`, formDataToSend, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          document.getElementById('progress-bar').value = progress;
          document.getElementById('progress-text').innerText = `${progress}%`;
        }
      })
      .then((res) => {
        if(res.data.success){
          Swal.close(); // Close progress bar
          Swal.fire({
            title: 'Success!',
            text: 'Your data has been submitted successfully.',
            icon: 'success',
          });
         setTimeout(() => {
           navigate("/login")
         }, 1000);
        }else{
          Swal.close(); // Close progress bar on error
          Swal.fire({
            title: 'Error!',
            text: `${res.data.message}`,
            icon: 'error',
          });
        }

        console.log(res);
      })
      .catch((err) => {
        Swal.close(); // Close progress bar on error
        Swal.fire({
          title: 'Error!',
          text: `${err.name}`,
          icon: 'error',
        });
        console.log(err);
      });
  
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly.',
        icon: 'warning',
      });
    }
  };
  return (
    <section>
      <div className="font-poppins">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-[10px] lg:px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-[#eee] rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* Go Back Button */}
              <div className="mb-4">
                <button
                  className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-blue-600 transition"
                  onClick={handleGoBack}
                >
                  <AiOutlineArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              </div>
         <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="mb-8">
        <h3 className="text-gray-800 text-3xl font-bold">Create Account</h3>
      </div>

      <div>
        <label className="text-gray-800 text-sm mb-2 block">Username</label>
        <div className="relative flex items-center">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <div>
        <label className="text-gray-800 text-sm mb-2 block">Email</label>
        <div className="relative flex items-center">
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="text-gray-800 text-sm mb-2 block">Password</label>
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
            placeholder="Enter your password"
          />
          <div
            className="absolute right-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />
            ) : (
              <AiOutlineEye className="text-gray-500 w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="text-gray-800 text-sm mb-2 block">Profile Picture</label>
        <div className="relative flex items-center">
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
          />

        </div>
      </div>

      <div className="!mt-8">
        <button
          type="submit"
          className="w-full shadow-md py-[12px] px-4 text-sm tracking-wide rounded-lg text-white bg-btncolor1 focus:outline-none"
        >
          Create Account
        </button>
      </div>
      <div className="flex justify-between mt-4 text-sm">
    {/* <a
      href="/forgot-password"
      className="text-blue-600 hover:underline"
    >
      Forgot Password?
    </a> */}
    <NavLink
      to="/login"
      className="text-blue-600 hover:underline"
    >
     Already have an acocunt? Log In
    </NavLink>
  </div>
    </form>
            </div>
            <div className="max-md:mt-8 lg:flex hidden">
              <img src={login_img} className="w-full block" alt="Dining Experience" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
