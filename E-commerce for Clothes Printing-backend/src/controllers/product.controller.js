import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  console.log("1");
  const {
    productName,
    category,
    price,
    productImage,
    frontDesignText,
    backDesignText,
    printLocation,
    sizes,
    color,
    quantity,
  } = req.body;

  if (
    !productName ||
    !category ||
    !price ||
    !sizes ||
    !color ||
    !quantity ||
    !productImage
  ) {
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

  let parsedProductImage = productImage;
  if (typeof productImage === "string") {
    try {
      parsedProductImage = JSON.parse(productImage);
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON in productImage" });
    }
  }

  let parsedPrintLocation = printLocation;
  if (typeof printLocation === "string") {
    try {
      parsedPrintLocation = JSON.parse(printLocation);
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON in printLocation" });
    }
  }

  console.log("3");

  const frontDesignImageLocalPath = req.files?.frontDesignImage?.[0]?.path;
  const backDesignImageLocalPath = req.files?.backDesignImage?.[0]?.path;
  console.log("req.files:", req.files);

  console.log("4");
  const frontDesignImage = await uploadOnCloudinary(frontDesignImageLocalPath);
  const backDesignImage = await uploadOnCloudinary(backDesignImageLocalPath);
  console.log("5");

  try {
    const newProduct = await Product.create({
      productName,
      category,
      price,
      productImage: parsedProductImage,
      frontDesignImage: frontDesignImage?.url || "",
      backDesignImage: backDesignImage?.url || "",
      frontDesignText,
      backDesignText,
      printLocation: parsedPrintLocation,
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
