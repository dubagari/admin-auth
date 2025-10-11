import React, { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Base64
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccess("Product added successfully!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto  p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Product
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />
        <textarea
          id="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        ></textarea>
        <input
          id="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />
        <input
          id="category"
          type="text"
          placeholder="Category"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded-lg bg-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 disabled:bg-slate-500"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && <p className="text-green-500 mt-3">{success}</p>}
    </div>
  );
};

export default ProductForm;
