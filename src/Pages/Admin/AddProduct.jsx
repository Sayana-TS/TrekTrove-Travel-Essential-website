import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit route
  const location = useLocation();

  // detect mode based on route
  const isEditMode = location.pathname.includes("/edit");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Simulated fetch for edit mode (replace with real API later)
  useEffect(() => {
    if (isEditMode && id) {
      // Example: pretend we fetched this product
      const existingProduct = {
        name: "Wireless Headphones",
        category: "Electronics",
        price: "49.99",
        stock: "120",
        description: "High quality wireless headphones with noise cancellation.",
        image: "https://via.placeholder.com/150",
      };
      setFormData(existingProduct);
      setPreview(existingProduct.image);
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log("Updating Product:", id, formData);
      // 🔗 call update API
    } else {
      console.log("New Product:", formData);
      // 🔗 call create API
    }
    navigate("/admin/products");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#2a2a2a] border border-gray-700 p-6 rounded-2xl shadow-xl space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block mb-1 text-gray-300">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-300">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Price & Stock side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-300">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 49.99"
                className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g. 100"
                className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-300">Product Image</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 bg-[#1e1e1e] border border-gray-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#252525] hover:border-green-500 transition">
                <Upload size={18} className="text-green-400" />
                <span className="text-gray-300">Choose File</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border-2 border-green-500 shadow-md transition transform hover:scale-105"
                />
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description about the product..."
              className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 px-6 py-2 rounded-lg transition shadow-md transform hover:scale-105"
            >
              <Save size={18} />
              {isEditMode ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
