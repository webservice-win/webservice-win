import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import loginImage from "../assets/login.png";

const Login = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire({ icon: "error", title: "Missing Fields", text: "Please enter your email and password." });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({ icon: "error", title: "Invalid Email", text: "Please enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      Swal.fire({ icon: "error", title: "Weak Password", text: "Password must be at least 6 characters long." });
      return;
    }

    try {
      const res = await axios.post(`${base_url}/auth/login`, { email, password });
      if (res.data.success) {
        Swal.fire({ icon: "success", title: "Login Successful", text: res.data.message });
        localStorage.setItem("token", res.data.jwtToken);
        localStorage.setItem("user_data", JSON.stringify(res.data.admin_data));
        setTimeout(() => {
          navigate(res.data.admin_data.role === "admin" ? "/dashboard" : "/user-dashboard");
        }, 1000);
      } else {
        Swal.fire({ icon: "error", title: "Login Failed", text: res.data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex font-poppins items-center justify-center min-h-screen bg-[#0b0f33]">
      <div className="bg-[#161b4c] p-8 rounded-lg shadow-lg max-w-md w-full text-white text-center">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="text-sm mb-6">Login</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="text-left">
            <label className="text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="text-left relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
              placeholder="Enter password"
            />
            <span
              className="absolute right-3 top-12 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button type="submit" className="w-full bg-[#4a3aff] py-3 rounded-md font-semibold">LOGIN</button>
        </form>
        {/* <div className="mt-4">
          <NavLink to="/forgot-password" className="text-blue-400 text-sm">Forgot Password?</NavLink>
        </div> */}
      </div>
    </section>
  );
};

export default Login;
