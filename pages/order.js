import { useRouter } from "next/router";
import React from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const MyOrder = ({ order }) => {
  const products = order.products;
  
  return (
    <section className="text-gray-600 body-font overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Head>
        <title>Order Details - CodesWear</title>
        <meta name="description" content="CodesWear.com - Wear the code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-12 lg:py-8 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm title-font text-indigo-600 font-bold tracking-widest">
                  CODESWEAR.COM
                </h2>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                  Order Confirmed
                </span>
              </div>
              
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-bold mb-4 border-b pb-4">
                Order ID: <span className="text-indigo-600">#{order.orderId}</span>
              </h1>
              
              <p className="leading-relaxed mb-6 text-gray-600">
                Your order has been successfully placed and will be shipped soon.
                Thank you for shopping with us!
              </p>

              <div className="overflow-x-auto bg-gray-50 rounded-lg mb-8">
                <table className="w-full mb-0">
                  <thead className="bg-indigo-50 border-b border-indigo-100">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-indigo-800">Description</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-indigo-800">Quantity</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-indigo-800">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(products).map((key) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-50" key={key}>
                        <td className="text-gray-700 py-3 px-4 font-medium">{products[key].name}</td>
                        <td className="text-center text-gray-700 py-3 px-4">
                          {products[key].qty}
                        </td>
                        <td className="text-right text-gray-700 py-3 px-4 font-medium">
                          ${products[key].price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200">
                <span className="title-font font-bold text-2xl text-gray-900 mb-4 sm:mb-0">
                  Total: <span className="text-indigo-600">${order.amount}</span>
                </span>
                <button className="text-white bg-indigo-600 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-700 rounded-lg transition-colors duration-300 shadow-md flex items-center font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Track Order
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:h-auto h-64 rounded-xl overflow-hidden shadow-lg">
            <img
              alt="Order confirmation"
              className="w-full h-full object-cover object-center"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;