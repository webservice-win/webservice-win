import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Forgetpassword = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // To track successful submission
  const [isLoading, setIsLoading] = useState(false); // New state to track loading
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({ icon: "error", title: "Missing Field", text: "Please enter your email." });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({ icon: "error", title: "Invalid Email", text: "Please enter a valid email address." });
      return;
    }

    // Show loading spinner
    setIsLoading(true);

    try {
      const res = await axios.post(`${base_url}/forgot-password`, { email });

      // Show success alert
    //   Swal.fire({ icon: "success", title: "Email Sent", text: res.data.message });

      // Hide form and show success message after success
      setIsSubmitted(true);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Something went wrong." });
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Header />
      <section className="flex font-poppins items-center justify-center min-h-screen bg-[#0b0f33]">
        <div className="w-[100%] text-white text-center">
          <div className="bg-[#161b4c] w-[95%] md:w-[80%] lg:w-[75%] xl:w-[50%] 2xl:w-[30%] p-8 px-[40px] rounded-lg shadow-lg m-auto">
            {isSubmitted ? (
              // Beautiful Success Box
              <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
                <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full shadow-md">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-400 mt-4">Success!</h2>
                <p className="mt-2 text-gray-300 text-center">
                  A password reset link has been sent to your email. Please check your inbox.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              // Form
              <>
                <h2 className="text-2xl font-bold">Forget Password</h2>
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
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-md font-semibold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#4a3aff] hover:bg-[#3c2ab2]'}`}
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Forgetpassword;
