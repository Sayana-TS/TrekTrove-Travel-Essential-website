// src/pages/admin/ProductManagement.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/Slices/toastSlice"; // ✅ toast

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(showToast({ message: "Failed to fetch products.", type: "error" }));
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Delete product
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteDoc(doc(db, "Products", id));
        setProducts(products.filter((product) => product.id !== id)); 
        dispatch(showToast({ message: `"${name}" deleted successfully.`, type: "success" }));
      } catch (error) {
        console.error("Error deleting product:", error);
        dispatch(showToast({ message: `Failed to delete "${name}".`, type: "error" }));
      }
    }
  };

  return (
    <>
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
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                  key={product.id}
                  className="border-b border-gray-700 hover:bg-[#383838] transition"
                >
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">{product.countInStock}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id, product.title); // ✅ pass title for toast
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductManagement;
