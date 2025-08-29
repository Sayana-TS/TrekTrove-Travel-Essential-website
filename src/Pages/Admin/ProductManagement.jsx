// src/pages/admin/ProductManagement.jsx
import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Travel Backpack",
    price: 120,
    stock: 15,
    category: "Luggage",
  },
  { id: 2, name: "Neck Pillow", price: 25, stock: 40, category: "Accessories" },
  { id: 3, name: "Power Bank", price: 45, stock: 25, category: "Electronics" },
];

const ProductManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-400">
          Product Management
        </h1>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-[#2a2a2a] shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#333] text-gray-300">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                onClick={() => navigate(`/admin/products/${product.id}`)}
                key={product.id}
                className="border-b border-gray-700 hover:bg-[#383838] transition"
              >
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      navigate(`/admin/products/edit/${product.id}`);
                    }}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      alert(`Delete product ${product.name}`);
                      // 🔗 Later: call delete API
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductManagement;
