// src/pages/admin/AddProduct.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/Slices/toastSlice"; // ✅ toast

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    countInStock: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        const categoryList = querySnapshot.docs.map(doc => doc.data().title);
        setCategories(categoryList);
      } catch (err) {
        console.error(err);
        dispatch(showToast({ message: "Failed to fetch categories.", type: "error" }));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", "travel_products_unsigned");
    const folderName = formData.category || "Uncategorized";
    cloudForm.append("folder", `Travel E-commerce website/Products/${folderName}`);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpblgnluu/image/upload",
      { method: "POST", body: cloudForm }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;
      if (formData.image instanceof File) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      const productData = {
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        description: formData.description,
        image: imageUrl,
        rate: 0,
      };

      await addDoc(collection(db, "Products"), productData);

      dispatch(showToast({ message: `"${formData.title}" added successfully!`, type: "success" })); // ✅ toast
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      dispatch(showToast({ message: "Failed to add product.", type: "error" })); // ✅ toast
    }
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
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Add New Product
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#2a2a2a] border border-gray-700 p-6 rounded-2xl shadow-xl space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Product Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price & Stock */}
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
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                placeholder="e.g. 100"
                className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
          </div>

          {/* Image */}
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
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 px-6 py-2 rounded-lg transition shadow-md transform hover:scale-105"
            >
              <Save size={18} />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
