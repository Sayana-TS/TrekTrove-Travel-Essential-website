import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import GoBackButton from "../../Components/Common Components/GoBackButton";

const AdminProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "Products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Delete product from Firestore
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Products", productId));
      alert("Product deleted successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Try again!");
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-red-500 text-center">Product not found</p>;
  }

  return (
    <>
      <GoBackButton />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4 md:mb-0">
          Product Details
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition shadow-md transform hover:scale-105"
          >
            <Pencil size={18} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 transition shadow-md transform hover:scale-105"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {/* Product Info Card */}
      <div className="bg-[#2A2A2A] p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 hover:shadow-[#3a3a3a]/50 transition duration-300">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-80 h-80 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between text-white space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p>
              <span className="font-semibold text-gray-400">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Price:</span> ₹{product.price}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Stock:</span> {product.countInStock}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Description:</span>{" "}
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              Product ID: <span className="text-gray-200">{product.id}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductDetail;
