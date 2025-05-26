import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import download from "downloadjs";
import { toPng } from "html-to-image";

const VendorProductDesign = ({ setViewDesign, productId }) => {
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const handleDownload = () => {
    if (canvasRef.current) {
      toPng(canvasRef.current)
        .then((dataUrl) => {
          download(dataUrl, "custom-tshirt.png");
        })
        .catch((err) => {
          console.error("Failed to download image", err);
        });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/userProduct/getProductById/${productId}`
        );
        // console.log(res.data);
        setProduct(res.data.product);
        setImage(res.data.product.productImage[0].url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  //   console.log(product);

  return (
    <div className="h-screen bg-white">
      <div className="flex">
        <h1 className="font-bold text-lg mb-6 w-[50%] text-right">
          Product Design
        </h1>
        <div className="w-[50%] text-right">
          <button
            className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50 "
            onClick={() => setViewDesign(false)}
          >
            {"< "}Back
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <div ref={canvasRef}>
            <img
              src={image}
              alt=""
              className="h-[500px] w-full object-contain bg-gray-100"
            />
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <button
              className="px-2 py-1 hover:bg-blue-300 bg-blue-200 hover:text-blue-900"
              onClick={() => setImage(product?.productImage[0].url)}
            >
              Front
            </button>
            <button
              className="px-2 py-1 hover:bg-blue-300 bg-blue-200 hover:text-blue-900"
              onClick={() => setImage(product?.productImage[1].url)}
            >
              Back
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 p-2 bg-green-200 hover:text-green-900 hover:bg-green-300"
          >
            Download
          </button>
        </div>
        <div className=" w-full p-2">
          {product?.printLocation?.includes("front") && (
            <div>
              <h3 className="text-lg">Front Design</h3>
              <div className="grid grid-cols-3 gap-2">
                {product?.frontDesignImage && (
                  <img
                    src={product?.frontDesignImage}
                    className="h-[200px] w-full bg-gray-100 cursor-pointer object-contain"
                    onClick={(e) => {
                      setImage(e.target.src);
                    }}
                  />
                )}
                {product?.frontDesignText && (
                  <div className="h-full bg-gray-100">
                    <h2 className=" mt-2">Text</h2>
                    <h2 className="mt-2">{product?.frontDesignText}</h2>
                  </div>
                )}
                {product?.customizedFrontImage && (
                  <div className="h-[200px] object-contain bg-gray-100 flex justify-center">
                    <img
                      src={product?.customizedFrontImage}
                      className="h-[200px] cursor-pointer"
                      onClick={(e) => {
                        setImage(e.target.src);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {product?.printLocation?.includes("back") && (
            <div>
              <h3>Back Design</h3>
              <div className="grid grid-cols-3 gap-2">
                {product?.backDesignImage && (
                  <img
                    src={product?.backDesignImage}
                    className="h-[200px] w-full cursor-pointer object-contain bg-gray-100"
                    onClick={(e) => {
                      setImage(e.target.src);
                    }}
                  />
                )}
                {product?.backDesignText && (
                  <div className="h-full bg-gray-100">
                    <h2 className=" mt-2">Text</h2>
                    <h2 className="mt-2">{product?.backDesignText}</h2>
                  </div>
                )}
                {product?.customizedFrontImage && (
                  <div className="h-[200px] object-contain bg-gray-100 flex justify-center">
                    <img
                      src={product?.customizedBackImage}
                      className="h-[200px] cursor-pointer"
                      onClick={(e) => {
                        setImage(e.target.src);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProductDesign;
