// src/pages/Products.jsx
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import ReviewSection from "../Components/Layout Components/ReviewSection";
import StarRating from "../Components/Common Components/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/Slices/cartSlice";
import GoBackButton from "../Components/Common Components/GoBackButton";
import { addCartItem, updateCartQuantity } from "../Firebase/cart";

const Products = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Fetch product data (real-time)
  useEffect(() => {
    const productRef = doc(db, "Products", productId);
    const unsubscribe = onSnapshot(productRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setProductData({ id: snap.id, ...data });
        setSelectedImage(data.image);
      } else {
        setProductData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [productId]);

  // Add to cart handler
  const handleAddToCart = async (product) => {
    const item = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity,
    };

    dispatch(addToCart(item));

    if (user) {
      // Check if item already exists in cart
      const existingItem = await addCartItem(user.uid, item); // addCartItem will overwrite, we can adjust later
      await updateCartQuantity(user.uid, item.id, item.quantity);
    }
  };

  if (loading)
    return (
      <div className="bg-[#282928] min-h-screen flex items-center justify-center text-white">
        <p>Loading product...</p>
      </div>
    );
  if (!productData)
    return (
      <div className="bg-[#282928] min-h-screen flex items-center justify-center text-white">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );

  return (
    <div className="w-full mx-auto p-6 bg-[#282928]">
      <GoBackButton />
      <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-lg shadow-md">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={productData.title}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="flex gap-2">
            {[productData.image].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${productData.title} ${idx}`}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer border"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white">{productData.title}</h1>
          <StarRating rating={Number(productData.rate) || 0} size="1.2em" />
          <p className="text-gray-400 text-sm">
            {typeof productData.rate === "number"
              ? productData.rate.toFixed(1)
              : "No rating yet"}
          </p>
          <p className="text-xl font-semibold text-white">
            ₹{productData.price}
          </p>
          <p
            className={
              productData.countInStock > 0 ? "text-green-600" : "text-red-600"
            }
          >
            {productData.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-white">{productData.description}</p>

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-2 border-white text-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span className="text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleAddToCart(productData)}
              className="flex-1 bg-black text-white py-3 rounded hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { buyNowItem: { ...productData, quantity } },
                })
              }
              className="flex-1 border py-3 rounded text-white hover:bg-black hover:border-none hover:text-white transition-all duration-300 cursor-pointer"
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ReviewSection productId={productData.id} />
      </div>
    </div>
  );
};

export default Products;
