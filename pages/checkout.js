import React, { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

const Checkout = ({
  user,
  cart,
  clearCart,
  subTotal,
  addToCart,
  removeFromCart,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [disabled, setDisabled] = useState(true);

  const getEmail = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });
    const a = await res.json();
    setFormData((prev) => ({
      ...prev,
      email: a.email,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getEmail();
    if (token) fetchData();
  }, []);

  useEffect(() => {
    console.log(formData);
    const isValid = Object.values(formData).every((val) => val.length > 3);
    setDisabled(!isValid);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [formData]);

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setFormData((prev) => ({
        ...prev,
        state: pinJson[pin][1],
        city: pinJson[pin][0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      getPincode(value);
    }
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    const data = {
      cart,
      subTotal,
      oid,
      ...formData,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const a = await res.json();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    if (a.success) {
      const userConfirmed = confirm(
        "Are you sure you want to proceed with the payment?"
      );
      if (userConfirmed) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/confirmation`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oid }),
          }
        );

        const data = await res.json();
        if (data.success) {
          alert("Payment Confirmed! Thank you.");
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
          });
          clearCart();
          router.push(data.redirectUrl);
        } else {
          console.error("Error:", data.error);
        }
      }
    } else {
      alert("Payment cancelled. " + (a.error || "An unknown error occurred."));
      setFormData((prev) => ({
        ...prev,
        phone: "",
        pincode: "",
        city: "",
        state: "",
      }));
      router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`);
    }
  };

  const fetchData = async () => {
    let data = { token: localStorage.getItem("token") };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let a = await res.json();
    setFormData((prev) => ({
      ...prev,
      name: a.username || "",
      address: a.address || "",
      phone: a.phone || "",
      pincode: a.pincode || "",
    }));

    if (a.pincode) getPincode(a.pincode);
  };
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <Head>
          <title>Checkout - CodesWear</title>
          <meta
            name="description"
            content="Complete your purchase at CodesWear.com - Wear the code"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
          >
            Checkout
          </motion.h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="hidden sm:block bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              {/* Step 1: Delivery */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-indigo-600" : "bg-indigo-200"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      currentStep >= 1 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    1
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  Delivery
                </span>
              </div>

              {/* Connector between Step 1 and Step 2 */}
              <div
                className={`flex-1 h-1 ${
                  currentStep >= 2 ? "bg-indigo-600" : "bg-indigo-200"
                } mx-2`}
              ></div>

              {/* Step 2: Review */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-indigo-600" : "bg-indigo-200"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      currentStep >= 2 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    2
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  Review
                </span>
              </div>

              {/* Connector between Step 2 and Step 3 */}
              <div
                className={`flex-1 h-1 ${
                  currentStep >= 3 ? "bg-indigo-600" : "bg-indigo-200"
                } mx-2`}
              ></div>

              {/* Step 3: Payment */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? "bg-indigo-600" : "bg-indigo-200"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      currentStep >= 3 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    3
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  Payment
                </span>
              </div>
            </div>
          </div>

          {/* Conditional Rendering of Sections */}
          {currentStep === 1 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Delivery Details Section */}
            </motion.section>
          )}

          {currentStep === 2 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Cart Review Section */}
            </motion.section>
          )}

          {currentStep === 3 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Payment Section */}
            </motion.section>
          )}

          {/* Delivery Details Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Delivery Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      {user.value ? (
                        <input
                          value={formData.email}
                          type="email"
                          id="email"
                          name="email"
                          readOnly={true}
                          className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                        />
                      ) : (
                        <input
                          onChange={handleChange}
                          value={formData.email}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0300-0000000"
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Street address, apartment, suite, etc."
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal/ZIP Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="123456"
                      className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="California"
                      className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Cart Review Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Review Cart Items
              </h2>
            </div>

            <div className="p-6">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Add some products to your cart to proceed with checkout
                  </p>
                </div>
              ) : (
                <div>
                  <ul className="divide-y divide-gray-200">
                    {Object.keys(cart).map((k) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-4 sm:flex items-center justify-between"
                      >
                        <div className="flex items-center mb-3 sm:mb-0">
                          <div className="w-16 h-14 sm:h-16 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-medium text-gray-900">
                              {cart[k].name}
                            </p>
                            <div className="flex mt-1 text-sm text-gray-500">
                              {cart[k].size && (
                                <span className="mr-2">
                                  Size: {cart[k].size}
                                </span>
                              )}
                              {cart[k].variant && (
                                <span>Color: {cart[k].variant}</span>
                              )}
                            </div>
                            <p className="mt-1 text-sm font-medium text-indigo-600">
                              ${cart[k].price}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center items-center space-x-3 bg-gray-100 rounded-lg p-1 mx-auto w-28 sm:mx-0 sm:w-32">
                          <button
                            onClick={() =>
                              removeFromCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant
                              )
                            }
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <MinusCircle size={18} />
                          </button>
                          <span className="font-medium text-gray-800 w-6 text-center">
                            {cart[k].qty}
                          </span>
                          <button
                            onClick={() =>
                              addToCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant
                              )
                            }
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <PlusCircle size={18} />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subTotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={disabled}
              onClick={initiatePayment}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <CreditCard size={20} />
                <span>Proceed to Payment</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
