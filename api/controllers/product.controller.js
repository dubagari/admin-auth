import { errorHandler } from "../middleware/error.js";
import Product from "../models/product.model.js";

// Create product (Admin only)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      brand,
      short_description,
      price,
      category,
      image,
    } = req.body;

    if (!name || !description || !price || !image) {
      return next(errorHandler(400, "All fields are required"));
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      brand,
      short_description,
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
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let { q, category, brand, minPrice, maxPrice } = req.query;
    const query = {};

    // 🔍 Text search (name, description, brand, category)
    if (q && q.trim() !== "") {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ];
    }

    // 🏷️ Category filter (multiple comma-separated)
    if (category && category.trim() !== "") {
      const categoryArray = category.split(",").map((c) => c.trim());
      query.category = { $in: categoryArray };
    }

    // 🏢 Brand filter (multiple comma-separated)
    if (brand && brand.trim() !== "") {
      const brandArray = brand.split(",").map((b) => b.trim());
      query.brand = { $in: brandArray };
    }

    // 💰 Price range filter
    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    if (Object.keys(priceFilter).length > 0) query.price = priceFilter;

    const searchTerm = req.query.searchTerm || "";

    // 🧾 Fetch products
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

    // const products = await Product.find().sort({ createdAt: -1 });
    // res.status(200).json({ success: true, products });
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

export const productUpdate = async (req, res, next) => {
  try {
    const proUdate = await Product.findById(req.params.id);

    if (!proUdate) {
      return next(errorHandler(404, "product not found"));
    }

    res.status(200).json(proUdate);
  } catch (error) {
    next(error);
  }
};
