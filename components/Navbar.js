import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const accountBtnRef = useRef(null);
  const cartRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, accountBtnRef]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && dropdown) {
        setDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdown]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleCart = () => {
    if (cartRef.current.classList.contains("translate-x-full")) {
      cartRef.current.classList.remove("translate-x-full");
      cartRef.current.classList.add("translate-x-0");
    } else {
      cartRef.current.classList.remove("translate-x-0");
      cartRef.current.classList.add("translate-x-full");
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg py-4 px-5 md:px-3 lg:px-10 mx-auto flex items-center justify-between">
      {/* <div className="max-w-7xl mx-auto flex items-center justify-between"> */}
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="mr-3 bg-white p-2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={45}
              className="cursor-pointer"
              priority
            />
          </div>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex gap-2 lg:gap-10 text-lg font-bold">
          <Link
            href="/tshirts"
            className="text-white hover:text-yellow-200 transition-colors relative group"
          >
            T-shirts
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/hoodies"
            className="text-white hover:text-yellow-200 transition-colors relative group"
          >
            Hoodies
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/glasses"
            className="text-white hover:text-yellow-200 transition-colors relative group"
          >
            Glasses
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/mugs"
            className="text-white hover:text-yellow-200 transition-colors relative group"
          >
            Mugs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/stickers"
            className="text-white hover:text-yellow-200 transition-colors relative group"
          >
            Stickers
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
      {/* </div> */}

      <div className="flex items-center gap-2 sm:gap-6">
        {user.value ? (
          <div className="relative">
            <button
              ref={accountBtnRef}
              onClick={toggleDropdown}
              className="text-white focus:outline-none hover:text-yellow-200 transition-colors"
              aria-label="Account Menu"
            >
              <MdAccountCircle className="text-3xl drop-shadow-md" />
            </button>
            {dropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg py-2 text-gray-800 border border-gray-100 overflow-hidden"
              >
                <Link
                  href="/myaccount"
                  className="block px-4 py-3 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">My Account</span>
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-3 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">Orders</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-indigo-600 px-5 py-2 rounded-full font-medium hover:bg-yellow-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
        )}

        <button
          onClick={toggleCart}
          className="relative bg-indigo-700 text-white p-2.5 rounded-full hover:bg-indigo-800 transition-all duration-300 transform hover:scale-110"
          aria-label="Shopping Cart"
        >
          <AiOutlineShoppingCart className="text-2xl" />
          {Object.keys(cart).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-bold">
              {Object.keys(cart).length}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart Sidebar */}
      {/* <div
        ref={cartRef}
        className="fixed top-0 right-0 sm:w-96 h-full bg-white shadow-2xl p-6 transition-transform duration-300 ease-in-out transform translate-x-full z-50"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center">
          <FaShoppingCart className="mr-2" /> Shopping Cart
        </h2>
        <button
          onClick={toggleCart}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Close Cart"
        >
          <AiFillCloseCircle />
        </button>

        <div className="h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
          {Object.keys(cart).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-8xl text-gray-200">🛒</div>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {Object.keys(cart).map((k) => (
                <li
                  key={k}
                  className="flex justify-between items-center border-b pb-4 group"
                >
                  <div className="flex-1 font-medium group-hover:text-indigo-600 transition-colors">
                    {cart[k].name}
                    <div className="text-gray-500 text-sm">
                      ${cart[k].price} × {cart[k].qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                    <button
                      onClick={() => removeFromCart(k, 1, cart[k].price)}
                      className="text-indigo-600 hover:text-red-500 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <AiFillMinusCircle className="text-xl" />
                    </button>
                    <span className="font-medium w-6 text-center">
                      {cart[k].qty}
                    </span>
                    <button
                      onClick={() => addToCart(k, 1, cart[k].price)}
                      className="text-indigo-600 hover:text-green-500 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <AiFillPlusCircle className="text-xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-indigo-700 font-bold text-xl">
                ${subTotal}
              </span>
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <Link href="/checkout">
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={Object.keys(cart).length === 0}
            >
              <BsFillBagCheckFill /> Checkout
            </button>
          </Link>
          {Object.keys(cart).length > 0 && (
            <button
              onClick={clearCart}
              className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-all duration-300 font-medium"
            >
              Empty Cart
            </button>
          )}
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;
