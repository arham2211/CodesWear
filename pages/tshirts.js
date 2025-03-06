import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";

const Tshirts = ({ products }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Head>
        <title>T-shirts Collection - CodesWear</title>
        <meta
          name="description"
          content="Shop premium coding-themed t-shirts at CodesWear.com - Wear the code"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-700 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-3xl font-bold title-font mb-4 text-gray-900">
              Premium T-shirts Collection
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600">
              Express yourself through code. Our high-quality t-shirts combine
              style and tech passion.
            </p>
          </div>

          <div className="flex justify-center flex-wrap -m-4">
            {Array.from({ length: 12 }).map((_, loopIndex) =>
              Object.keys(products).map((item) => (
                <div
                  key={products[item]._id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full my-2 mx-2 group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <Link
                      passHref={true}
                      className="block relative overflow-hidden flex-grow"
                      href={`/product/${products[item].slug}`}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img
                          alt={products[item].title}
                          className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                          src={products[item].img}
                        />
                        <div className="absolute top-0 right-0 m-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                          New
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-indigo-600 text-xs tracking-widest title-font mb-1 uppercase font-semibold">
                            Premium T-Shirts
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium mb-2">
                            {products[item].title}
                          </h2>
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                            High-quality fabric with comfortable fit for
                            everyday coding adventures.
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-xl text-gray-900">
                              ${products[item].price}
                            </p>
                            <div className="flex space-x-1">
                              {products[item].color.includes("Red") && (
                                <button className="border-2 border-gray-300 bg-red-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Blue") && (
                                <button className="border-2 border-gray-300 bg-blue-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Green") && (
                                <button className="border-2 border-gray-300 bg-green-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Yellow") && (
                                <button className="border-2 border-gray-300 bg-yellow-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Black") && (
                                <button className="border-2 border-gray-300 bg-black rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("White") && (
                                <button className="border-2 border-gray-300 bg-white rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Orange") && (
                                <button className="border-2 border-gray-300 bg-orange-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                              {products[item].color.includes("Purple") && (
                                <button className="border-2 border-gray-300 bg-purple-500 rounded-full w-5 h-5 focus:outline-none hover:scale-110 transition-transform"></button>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {products[item].size.includes("S") && (
                              <span className="border border-gray-300 px-2 py-1 text-xs rounded bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
                                S
                              </span>
                            )}
                            {products[item].size.includes("M") && (
                              <span className="border border-gray-300 px-2 py-1 text-xs rounded bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
                                M
                              </span>
                            )}
                            {products[item].size.includes("L") && (
                              <span className="border border-gray-300 px-2 py-1 text-xs rounded bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
                                L
                              </span>
                            )}
                            {products[item].size.includes("XL") && (
                              <span className="border border-gray-300 px-2 py-1 text-xs rounded bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
                                XL
                              </span>
                            )}
                            {products[item].size.includes("XXL") && (
                              <span className="border border-gray-300 px-2 py-1 text-xs rounded bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
                                XXL
                              </span>
                            )}
                          </div>

                          <div className="mt-4 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                            <span className="text-indigo-600 inline-flex items-center text-sm">
                              View Details
                              <svg
                                className="w-4 h-4 ml-1"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find({ category: "tshirts" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;
