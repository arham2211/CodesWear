import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import Link from "next/link";
import { BsFillBagCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";
import Head from "next/head";

const Post = ({ addToCart, product, variants, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(product?.color || "");
  const [size, setSize] = useState(product?.size || "");
  const [availableSizes, setAvailableSizes] = useState([]);
  useEffect(() => {
    if (!error) {
      setColor(product?.color || Object.keys(variants)[0] || "");
      setSize(product?.size || "");
    }
  }, [router.query]);

  const refreshVariant = (newsize, newcolor) => {
    console.log(newcolor);
    const newSlug = variants[newcolor][newsize]["slug"];
    router.push(`/product/${newSlug}`);
    // let url = `http://localhost:3000/product/${variants[newcolor][newsize]["slug"]}`;
    // window.location = url;
  };

  const handleColorClick = (selectedColor) => {
    setColor(selectedColor);
    // Get the first available size for the selected color
    const firstAvailableSize = Object.keys(variants[selectedColor])[0];
    // Set available sizes for the selected color
    setAvailableSizes(Object.keys(variants[selectedColor]));
    // Refresh variant with the first available size
    refreshVariant(firstAvailableSize, selectedColor);
    setSize(firstAvailableSize);
  };

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is seviceable", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setService(false);
      toast.error("Sorry! Pincode not serviceable", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Head>
          <title>{product.title} - CodesWear</title>
          <meta
            name="description"
            content="Shop premium coding-themed t-shirts at CodesWear.com - Wear the code"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <div className="container px-5 pt-24 pb-16 mx-auto max-w-7xl">
          <div className="lg:w-4/5 mx-auto">
            <div className="flex flex-wrap -mx-4">
              {/* Product Image */}
              <div className="lg:w-1/2 w-full px-4 mb-10 lg:mb-0">
                <div className="bg-white rounded-2xl shadow-md p-4 overflow-hidden">
                  <div className="relative group">
                    <img
                      alt={product.title}
                      className="w-full h-auto object-cover object-top rounded-xl transition-transform duration-500 transform group-hover:scale-105"
                      src={product.img}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        CodeSwear Original
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 w-full px-4">
                <div className="bg-white rounded-2xl shadow-md p-8 h-full">
                  <div className="flex items-center">
                    <h2 className="text-sm font-semibold text-indigo-600 tracking-widest uppercase flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      CODESWEAR
                    </h2>

                    {product.availableQty <= 0 && (
                      <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <svg
                          className="mr-1 h-2 w-2 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Out of Stock
                      </span>
                    )}

                    {product.availableQty > 0 && (
                      <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="mr-1 h-2 w-2 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        In Stock
                      </span>
                    )}
                  </div>

                  <h1 className="text-gray-900 text-3xl font-bold mt-3 mb-2">
                    {product.title}
                  </h1>

                  <div className="flex items-center mb-2">
                    <span className="text-indigo-600 text-sm font-medium">
                      {product.size}/{product.color}
                    </span>
                  </div>

                  <div className="h-0.5 w-16 bg-indigo-500 mb-5"></div>

                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <p className="leading-relaxed text-gray-600">
                      {product.desc}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-y-6 pb-6 border-b border-gray-200 mb-6">
                    <div className="flex items-center">
                      <span className="text-gray-800 font-semibold mr-3">
                        Color
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(variants).map((variantColor) => (
                          <button
                            key={variantColor}
                            onClick={() => {
                              handleColorClick(variantColor);
                            }}
                            className={`border-2 rounded-full w-7 h-7 focus:outline-none transition-all duration-200 hover:scale-110 ${
                              color === variantColor
                                ? "border-black scale-110 shadow-md"
                                : "border-gray-300"
                            } ${
                              variantColor === "Black"
                                ? "bg-black"
                                : variantColor === "White"
                                ? "bg-white"
                                : `bg-${variantColor.toLowerCase()}-500`
                            }`}
                            style={{
                              backgroundColor:
                                variantColor === "White"
                                  ? "white"
                                  : variantColor === "Black"
                                  ? "black"
                                  : "",
                            }}
                            title={variantColor}
                            aria-label={`Select ${variantColor} color`}
                          ></button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center md:ml-auto">
                      <span className="text-gray-800 font-semibold mr-3">
                        Size
                      </span>
                      <div className="relative flex">
                        <select
                          value={size}
                          onChange={(e) =>
                            refreshVariant(e.target.value, color)
                          }
                          className="rounded-lg border appearance-none border-gray-300 py-2 pl-4 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base font-medium text-gray-700"
                        >
                          {Object.keys(variants[color]).map((variantSize) => (
                            <option key={variantSize} value={variantSize}>
                              {variantSize}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center mb-8">
                    {product.availableQty <= 0 && (
                      <span className="title-font font-bold text-xl text-red-600 mr-auto mb-4 md:mb-0">
                        Out Of Stock!
                      </span>
                    )}

                    {!product.availableQty <= 0 && (
                      <div className="flex items-end mr-auto mb-4 md:mb-0">
                        <span className="title-font font-bold text-3xl text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                      <button
                        disabled={product.availableQty <= 0 ? true : false}
                        onClick={() => {
                          addToCart(
                            slug,
                            1,
                            product.price,
                            product.title +
                              " (" +
                              product.size +
                              "/" +
                              product.color +
                              ")",
                            product.size,
                            product.color
                          );
                        }}
                        className="flex-1 md:flex-initial disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 border-0 py-3 px-3 focus:outline-none transition-colors duration-300 rounded-lg text-base font-medium shadow-md hover:shadow-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>

                      <Link href="/checkout">
                        <button
                          disabled={product.availableQty <= 0 ? true : false}
                          className="flex-1 w-full md:flex-initial disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 border-0 py-3 px-5 focus:outline-none transition-colors duration-300 rounded-lg text-base font-medium shadow-md hover:shadow-lg"
                        >
                          <BsFillBagCheckFill className="text-md" />
                          <span>Checkout</span>
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="sm:bg-gray-50 sm:p-5 rounded-xl">
                    <h3 className="sm:text-sm text-md font-semibold text-gray-700 mb-3">
                      Check Delivery Availability
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 space-y-4">
                      <div className="relative flex-1">
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
                          onChange={onChangePin}
                          className="w-full bg-white pl-10 pr-4 py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm outline-none text-gray-700 transition-colors duration-200"
                          type="text"
                          placeholder="Enter your pincode"
                        />
                      </div>

                      <button
                        onClick={checkServiceability}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Check
                      </button>
                    </div>

                    <div className="mt-4 h-6">
                      {!service && service != null && (
                        <div className="flex items-center text-red-600 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Sorry! We do not deliver to your pincode
                        </div>
                      )}

                      {service && service != null && (
                        <div className="flex items-center text-green-600 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Yay! We deliver to your pincode
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (!colorSizeSlug[item.color]) {
      // Initialize the color key if it doesn't exist
      colorSizeSlug[item.color] = {};
    }
    // Add size and slug for the current color
    colorSizeSlug[item.color][item.size] = { slug: item.slug };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Post;
