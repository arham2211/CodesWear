import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Reset = () => {
  const router = useRouter();
  const [urltoken, setUrltoken] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, email: queryEmail } = router.query;

  useEffect(() => {
    if (token) {
      setUrltoken(token);
    }
  }, [token]);

  const sendEmail = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setEmail("");

      if (data.success) {
        toast.success("Password reset email sent!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "cpassword") {
      setCpassword(value);
    } else if (name === "npassword") {
      setNpassword(value);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = localStorage.getItem("email");
      const data = { email, cpassword, npassword };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response.success) {
        toast.success("Successfully Updated Password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/login");
          localStorage.removeItem("email");
        }, 3000);
      } else {
        toast.error("Error in Updating Password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-100 via-purple-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      <Head>
        <title>Reset Password - CodesWear</title>
        <meta name="description" content="CodesWear.com - Wear the Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-3xl sm:px-12 backdrop-blur-sm bg-opacity-80 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(76,29,149,0.2)]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <img
                  className="relative h-28 w-auto transition-transform duration-700 group-hover:scale-110"
                  src="/CWcircle.png"
                  alt="CodesWear Logo"
                />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-300 underline decoration-2 decoration-indigo-400 underline-offset-2 hover:decoration-purple-400"
              >
                Login
              </Link>
            </p>
          </div>

          {!urltoken ? (
            <form onSubmit={sendEmail} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors duration-200"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                      transition-all duration-300 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full flex justify-center py-3 px-4 
                    border border-transparent rounded-xl shadow-lg 
                    text-base font-medium text-white 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Sending Email..." : "Continue"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="npassword"
                  className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors duration-200"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="npassword"
                    name="npassword"
                    type="password"
                    value={npassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                      transition-all duration-300 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors duration-200"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    value={cpassword}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                      transition-all duration-300 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full flex justify-center py-3 px-4 
                    border border-transparent rounded-xl shadow-lg 
                    text-base font-medium text-white 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Updating Password..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reset;