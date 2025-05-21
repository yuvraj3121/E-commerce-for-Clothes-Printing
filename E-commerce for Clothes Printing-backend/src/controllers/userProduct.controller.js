import { userProduct } from "../models/userProduct.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createUserProduct = async (req, res) => {
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

  // console.log(productImage);

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
  const totalQuantity = parsedSizes.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  // console.log(sizes);

  console.log("3");

  const frontDesignImageLocalPath = req.files?.frontDesignImage?.[0]?.path;
  const backDesignImageLocalPath = req.files?.backDesignImage?.[0]?.path;
  const customizedFrontImageLocalPath =
    req.files?.customizedFrontImage?.[0]?.path;
  const customizedBackImageLocalPath =
    req.files?.customizedBackImage?.[0]?.path;
  // console.log("req.files:", req.files);
  // console.log("front path:", req.files?.frontDesignImage?.[0]?.path);
  // console.log("back path:", req.files?.backDesignImage?.[0]?.path);

  console.log("4");

  let frontDesignImage = null;
  let backDesignImage = null;
  let customizedFrontImage = null;
  let customizedBackImage = null;

  if (frontDesignImageLocalPath) {
    frontDesignImage = await uploadOnCloudinary(frontDesignImageLocalPath);
  }
  if (backDesignImageLocalPath) {
    backDesignImage = await uploadOnCloudinary(backDesignImageLocalPath);
  }
  if (customizedFrontImageLocalPath) {
    customizedFrontImage = await uploadOnCloudinary(
      customizedFrontImageLocalPath
    );
  }
  if (customizedBackImageLocalPath) {
    customizedBackImage = await uploadOnCloudinary(
      customizedBackImageLocalPath
    );
  }

  console.log("5");
  // console.log("Creating product with:", {
  //   productName,
  //   category,
  //   price: Number(price),
  //   productImage: parsedProductImage,
  //   frontDesignImage: frontDesignImage?.url || "",
  //   backDesignImage: backDesignImage?.url || "",
  //   frontDesignText,
  //   backDesignText,
  //   customizedFrontImage: customizedFrontImage?.url || null,
  //   customizedBackImage: customizedBackImage?.url || null,
  //   printLocation: parsedPrintLocation,
  //   sizes: parsedSizes,
  //   color,
  //   quantity: totalQuantity,
  // });

  try {
    const newProduct = await userProduct.create({
      productName,
      category,
      price: Number(price),
      productImage: parsedProductImage,
      frontDesignImage: frontDesignImage?.url || "",
      backDesignImage: backDesignImage?.url || "",
      frontDesignText,
      backDesignText,
      customizedFrontImage: customizedFrontImage?.url || null,
      customizedBackImage: customizedBackImage?.url || null,
      printLocation: parsedPrintLocation,
      sizes: parsedSizes,
      color,
      quantity: totalQuantity,
    });

    res.status(201).json({
      message: "User Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("6");
    res
      .status(500)
      .json({ message: "Error creating user product", error: error.message });
  }
};

const deleteUserProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await userProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

export { createUserProduct, deleteUserProduct };
