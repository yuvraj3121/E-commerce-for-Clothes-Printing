import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
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

  let parsedSizes = sizes;

  if (typeof sizes === "string") {
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in sizes" });
    }
  }

  const productImageLocalPath = req.files?.productImage[0].path;
  const frontDesignLocalPath = req.files?.frontDesign[0].path;
  const backDesignLocalPath = req.files?.backDesign[0].path;

  if (!productImageLocalPath) {
    return res.status(400).json({ message: "Product image is required" });
  }

  const productImage = await uploadOnCloudinary(productImageLocalPath);
  const frontDesign = await uploadOnCloudinary(frontDesignLocalPath);
  const backDesign = await uploadOnCloudinary(backDesignLocalPath);

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
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

export { createProduct };
