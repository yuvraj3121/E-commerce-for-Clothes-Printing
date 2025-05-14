import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  console.log("1");
  const {
    productName,
    category,
    price,
    printLocation,
    sizes,
    color,
    quantity,
  } = req.body;

  if (!productName || !category || !price || !sizes || !color || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("2");

  let parsedSizes = sizes;

  if (typeof sizes === "string") {
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in sizes" });
    }
  }
  console.log("3");

  const productImageLocalPath = req.files?.productImage?.[0]?.path;
  const frontDesignLocalPath = req.files?.frontDesign?.[0]?.path;
  const backDesignLocalPath = req.files?.backDesign?.[0]?.path;
  console.log("req.files:", req.files);

  if (!productImageLocalPath) {
    return res.status(400).json({ message: "Product image is required" });
  }
  console.log("4");

  const productImage = await uploadOnCloudinary(productImageLocalPath);
  const frontDesign = await uploadOnCloudinary(frontDesignLocalPath);
  const backDesign = await uploadOnCloudinary(backDesignLocalPath);
  console.log("5");

  try {
    const newProduct = await Product.create({
      productName,
      category,
      price,
      productImage: productImage.url || "",
      frontDesign: frontDesign.url || "",
      backDesign: backDesign.url || "",
      printLocation,
      sizes: parsedSizes,
      color,
      quantity,
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

export { createProduct };
