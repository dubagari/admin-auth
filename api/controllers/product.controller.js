import { errorHandler } from "../middleware/error.js";
import Product from "../models/product.model.js";

// Create product (Admin only)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !image) {
      return next(errorHandler(400, "All fields are required"));
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      userRef: req.user.id, // from verifyAdmin middleware
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin only)
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return next(errorHandler(404, "Product not found"));
    res
      .status(200)
      .json({ success: true, message: "Updated successfully", updated });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return next(errorHandler(404, "Product not found"));
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
