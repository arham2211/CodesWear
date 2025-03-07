import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const MyAcount = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const val = localStorage.getItem("token");
    if (!val) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, []);

  const getEmail = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });
    const a = await res.json();
    setEmail(a.email);
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };
  const fetchData = async () => {
    let data = { token: localStorage.getItem("token") };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let a = await res.json();
    setName(a.username);
    setAddress(a.address);
    setPhone(a.phone);
    setPincode(a.pincode);
  };

  const handleUserSubmit = async () => {
    let data = {
      token: localStorage.getItem("token"),
      address,
      name,
      phone,
      pincode,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let a = await res.json();
    console.log(a);
    if (a.success) {
      toast.success("Successfully Updated Details", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Error in Updating Details", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handlePasswordSubmit = async () => {
    let data = {
      token: localStorage.getItem("token"),
      password,
      cpassword,
      npassword,
    };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let a = await res.json();
    // console.log(a);
    if (a.success) {
      toast.success("Successfully Updated Password", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Error in Updating Password", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setPassword("");
    setCpassword("");
    setNpassword("");
  };
  return (
    <>
      <div className="container m-auto py-12 sm:px-6 px-3 max-w-5xl">
        <Head>
          <title>My Account - CodesWear</title>
          <meta name="description" content="CodesWear.com - Wear the code" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        <div className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          
          <div className="relative px-4 sm:px-8 pt-0 pb-12">
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-3 shadow-lg -mt-12 border-4 border-white">
                <div className="bg-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h1 className="font-bold text-3xl mt-6 mb-10 text-center text-gray-800">
              Update Your Account
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h2 className="font-bold text-2xl text-gray-800">
                  Account Details
                </h2>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="flex flex-wrap -mx-3">
                  <div className="px-3 w-full md:w-1/2">
                    <div className="mb-6 group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={name}
                          type="text"
                          id="name"
                          name="name"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full md:w-1/2">
                    <div className="mb-6 group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Email {user.value && "(Cannot be Updated)"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        {user.value ? (
                          <input
                            func={getEmail()}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            readOnly={true}
                            className="w-full bg-gray-100 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out cursor-not-allowed"
                          />
                        ) : (
                          <input
                            onChange={handleChange}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full">
                    <div className="mb-6 group">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <textarea
                          onChange={handleChange}
                          value={address}
                          id="address"
                          name="address"
                          rows="2"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-6 transition-colors duration-200 ease-in-out resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full md:w-1/2">
                    <div className="mb-6 group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={phone}
                          placeholder="+92"
                          type="phone"
                          id="phone"
                          name="phone"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full md:w-1/2">
                    <div className="mb-6 group">
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        PinCode
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={pincode}
                          placeholder="000000"
                          type="text"
                          id="pincode"
                          name="pincode"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleUserSubmit}
                  className="mt-3 flex items-center justify-center text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 border-0 py-3 px-8 focus:outline-none rounded-lg text-md font-medium transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Save Details</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h2 className="font-bold text-2xl text-gray-800">
                  Change Password
                </h2>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="flex flex-wrap -mx-3">
                  <div className="px-3 w-full md:w-1/3">
                    <div className="mb-6 group">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-2.257-2.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={password}
                          type="password"
                          id="password"
                          name="password"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full md:w-1/3">
                    <div className="mb-6 group">
                      <label htmlFor="npassword" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={npassword}
                          type="password"
                          id="npassword"
                          name="npassword"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 w-full md:w-1/3">
                    <div className="mb-6 group">
                      <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          onChange={handleChange}
                          value={cpassword}
                          type="password"
                          id="cpassword"
                          name="cpassword"
                          className="w-full bg-gray-50 rounded-lg border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 pl-10 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePasswordSubmit}
                  className="mt-3 flex items-center justify-center text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 border-0 py-3 sm:px-8 focus:outline-none rounded-lg text-md font-medium transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Update Password</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAcount;
