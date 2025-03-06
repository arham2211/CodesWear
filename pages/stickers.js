import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";

const Stickers = ({ products }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Head>
        <title>Stickers Collection - CodesWear</title>
        <meta
          name="description"
          content="Shop premium coding-themed t-shirts at CodesWear.com - Wear the code"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-700 body-font">
        <div className="container px-5 py-16 mx-auto">
        IN PROCESS...
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

export default Stickers;
