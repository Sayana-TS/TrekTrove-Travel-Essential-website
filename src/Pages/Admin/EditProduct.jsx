// src/pages/admin/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    countInStock: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "Products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setFormData(productSnap.data());
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated product
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "Products", id);
      await updateDoc(productRef, {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
      });
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p className="text-gray-400">Loading product...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-[#2a2a2a] p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4 gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-green-400">Edit Product</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
          required
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#333] text-white"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
