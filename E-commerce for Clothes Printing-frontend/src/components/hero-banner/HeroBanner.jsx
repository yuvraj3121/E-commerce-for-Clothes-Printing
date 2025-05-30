import React from "react";

const HeroBanner = () => {
  return (
    <section className="w-full text-white h-[400px] flex items-center justify-center">
      <div
        className="text-center p-6 rounded-lg h-[300px] w-[1000px] flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/poster.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
};

export default HeroBanner;
