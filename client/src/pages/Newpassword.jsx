import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Newpassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Extract reset token from URL
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location]);

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      Swal.fire({ icon: "error", title: "Missing Fields", text: "Please fill in all fields." });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Password Mismatch", text: "Passwords do not match." });
      return;
    }

    if (!validatePassword(newPassword)) {
      Swal.fire({ icon: "error", title: "Weak Password", text: "Password must be at least 6 characters." });
      return;
    }

    try {
      const res = await axios.post(`${base_url}/reset-password`, {
        email,
        newPassword,
      });

      Swal.fire({ icon: "success", title: "Password Reset", text: res.data.message }).then(() => {
        navigate("/login"); // Redirect to login page after success
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Something went wrong." });
    }
  };

  return (
    <section>
      <Header />
      <section className="flex font-poppins items-center justify-center min-h-screen bg-[#0b0f33]">
        <div className="w-[100%] text-white text-center">
          <div className="bg-[#161b4c] w-[95%] md:w-[80%] lg:w-[75%] xl:w-[50%] 2xl:w-[30%] p-8 px-[40px] rounded-lg shadow-lg m-auto">
            <h2 className="text-2xl font-bold">Set New Password</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="text-left">
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="text-left">
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md p-3 mt-1"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#4a3aff] py-3 rounded-md font-semibold">Reset Password</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Newpassword;
