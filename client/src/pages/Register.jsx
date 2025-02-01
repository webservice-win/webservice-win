import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    whatsappNumber: "",
    telegramId: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.whatsappNumber) errors.whatsappNumber = "WhatsApp Number is required";
    if (!formData.telegramId) errors.telegramId = "Telegram ID is required";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post(`${base_url}/auth/signup`, {
          name: formData.username,
          email: formData.email,
          whatsapp: formData.whatsappNumber,
          telegram: formData.telegramId,
          password: formData.password,
        });

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: res.data.message,
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during registration.",
        });
      }
    } else {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields correctly.",
        icon: "warning",
      });
    }
  };

  return (
   <section>
    <Header/>
    <section className="flex font-poppins w-full items-center justify-center min-h-screen bg-[#0b0f33]">
      {/* Registration Form */}
     <div className="w-[100%] md:w-[90%] px-[10px] lg:w-[80%] xl:w-[80%] 2xl:w-[70%]">
     <div className="bg-[#161b4c] p-8 rounded-lg shadow-lg w-[100%] xl:w-[70%] 2xl:w-[50%] m-auto text-white text-center">
        <h2 className="text-[20px] lg:text-2xl font-bold text-yellow-500">Client Area</h2>
        <p className="text-sm mb-6">Create a New Account</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="text-left">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter your username"
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>
          <div className="text-left">
            <label className="text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter your email"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="text-left">
            <label className="text-sm font-medium">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter your WhatsApp number"
            />
            {formErrors.whatsappNumber && <p className="text-red-500 text-sm">{formErrors.whatsappNumber}</p>}
          </div>
          <div className="text-left">
            <label className="text-sm font-medium">Telegram ID</label>
            <input
              type="text"
              name="telegramId"
              value={formData.telegramId}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter your Telegram ID"
            />
            {formErrors.telegramId && <p className="text-red-500 text-sm">{formErrors.telegramId}</p>}
          </div>
          <div className="text-left relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-12 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <div className="text-left relative">
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Confirm your password"
            />
            <span
              className="absolute right-3 top-12 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full bg-[#4a3aff] py-3 rounded-md font-semibold">Create Account</button>
        </form>
        <div className="mt-4">
          <p className="text-sm">Already have an account? <NavLink to="/login" className="text-blue-400">Login Now</NavLink></p>
        </div>
      </div>
     </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 p-8">
        <img
          src="https://i.ibb.co.com/6RYm41vr/peakpx-1-removebg.png"
          alt="Registration"
          className="w-[80%] 2xl:w-[60%] h-auto object-cover" // Adjusted image size
        />
      </div>
    </section>
    <Footer/>
   </section>
  );
};

export default Register;