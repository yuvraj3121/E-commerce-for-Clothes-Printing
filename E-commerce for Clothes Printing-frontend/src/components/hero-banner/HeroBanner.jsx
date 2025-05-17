import React from "react";

const HeroBanner = () => {
  return (
    <section className="w-full bg-[url('/path-to-your-banner-image.jpg')] bg-cover bg-center text-white h-[400px] flex items-center justify-center">
      <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Summer Polo Collection
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Premium quality polo t-shirts starting at just ₹399
        </p>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
