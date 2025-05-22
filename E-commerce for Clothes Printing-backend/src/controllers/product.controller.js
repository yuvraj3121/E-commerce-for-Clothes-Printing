import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  const { productName, category, price, sizes, colors } = req.body;

  if (!productName || !category || !price || !sizes || !colors) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newSizes = JSON.parse(req.body.sizes);
  const newColors = JSON.parse(req.body.colors);

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
      sizes: newSizes,
      colors: newColors,
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

const updateProduct = async (req, res) => {
  const { productName, category, price, sizes, colors } = req.body;
  const { id } = req.params;

  if (!productName && !category && !price && !sizes && !colors && !req.files) {
    return res.status(400).json({ message: "No data provided for update." });
  }

  try {
    const updates = {};

    if (productName) updates.productName = productName;
    if (category) updates.category = category;
    if (price) updates.price = price;
    if (sizes) updates.sizes = JSON.parse(sizes);
    if (colors) updates.colors = JSON.parse(colors);

    if (req.files) {
      const frontImageLocalPath = req.files?.frontImage?.[0]?.path;
      const backImageLocalPath = req.files?.backImage?.[0]?.path;

      const frontImage = frontImageLocalPath
        ? await uploadOnCloudinary(frontImageLocalPath)
        : null;
      const backImage = backImageLocalPath
        ? await uploadOnCloudinary(backImageLocalPath)
        : null;

      if (frontImage || backImage) {
        updates.productImage = [];
        if (frontImage)
          updates.productImage.push({ side: "Front", url: frontImage.url });
        if (backImage)
          updates.productImage.push({ side: "Back", url: backImage.url });
      }
    }

    // console.log(updates);

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating product.", details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

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

export { createProduct, getAllProducts, deleteProduct, updateProduct };
