import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  const { productName, category, price, sizes, colors } = req.body;

  if (!productName || !category || !price || !sizes || !colors) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const frontImageLocalPath = req.files?.frontImage?.[0]?.path;
  const backImageLocalPath = req.files?.backImage?.[0]?.path;

  const frontImage = await uploadOnCloudinary(frontImageLocalPath);
  const backImage = await uploadOnCloudinary(backImageLocalPath);

  const productImage = [
    { side: "Front", url: frontImage.url },
    { side: "Back", url: backImage.url },
  ];

  try {
    const newProduct = await Product.create({
      productName,
      category,
      price,
      productImage,
      sizes,
      colors,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log("6");
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      message: "Products fetched successfully.",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products." });
  }
};

export { createProduct, getAllProducts };
