import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import AdminProductDetails from "./adminProductDetails";
import AdminAddProduct from "./adminAddProduct";
import { addToAllProduct } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);
  const [componentSelect, setComponentSelect] = useState("main");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const count = allProduct.length;

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/product/allProduct")
          .then((res) => {
            // console.log(res.data);
            setAllProduct(res.data.products);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProduct();
    allProduct.map((product) => dispatch(addToAllProduct(product)));
    // console.log(allProduct);
  }, [componentSelect]);

  const HandleDelete = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/product/deleteProduct/${productId}`)
        .then((res) => {
          console.log(res.data);
          setAllProduct((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {componentSelect === "main" && (
        <div>
          <div className="mb-4 flex flex-row justify-between items-center">
            <div className="flex justify-evenly items-start bg-white p-6 rounded-xl shadow w-[300px]">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <FiShoppingBag size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold mt-1">{count}</p>
              </div>
            </div>
            <div>
              <button
                className="text-lg p-2 flex items-center justify-center gap-2 text-blue-800 bg-blue-200 hover:bg-blue-300"
                onClick={() => setComponentSelect("addProduct")}
              >
                <IoShirtOutline />
                ADD PRODUCT
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">All Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allProduct.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {product._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p
                          className="text-blue-400 cursor-pointer hover:text-blue-600"
                          onClick={() => {
                            setComponentSelect("details");
                            setSelectedProduct(product);
                          }}
                        >
                          view details{" "}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center gap-1">
                        <button
                          className="text-red-400 hover:bg-red-200 p-1 text-lg"
                          onClick={() => HandleDelete(product._id)}
                        >
                          <MdOutlineDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {componentSelect == "details" && (
        <div>
          <AdminProductDetails
            selectedProduct={selectedProduct}
            setComponentSelect={setComponentSelect}
          />
        </div>
      )}
      {componentSelect == "addProduct" && (
        <div>
          <AdminAddProduct setComponentSelect={setComponentSelect} />
        </div>
      )}
    </>
  );
};

export default AdminProducts;
