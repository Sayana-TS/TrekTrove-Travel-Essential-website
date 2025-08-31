import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/Slices/cartSlice";
import WishlistButton from "../Components/Common Components/WishlistButton";
import { FiArrowLeft } from "react-icons/fi";
import StarRating from "../Components/Common Components/StarRating";
import { db } from "../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { addCartItem } from "../Firebase/cart";
import { showToast } from "../store/Slices/toastSlice"; // 👈 import showToast

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryText = queryParams.get("q")?.toLowerCase() || "";

  const user = useSelector((state) => state.auth.user);

  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Add to cart (Redux + Firebase + Toast)
  const handleAddToCart = async (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    if (user) {
      await addCartItem(user.uid, { ...product, quantity: 1 });
    }

    // ✅ Show toast after adding to cart
    dispatch(
      showToast({ message: `${product.title} added to cart!`, type: "success" })
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!queryText) return;

      try {
        const productsRef = collection(db, "Products");
        const snapshot = await getDocs(productsRef);

        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔹 Client-side search
        const results = allProducts.filter(
          (item) =>
            item.title?.toLowerCase().includes(queryText) ||
            item.description?.toLowerCase().includes(queryText) ||
            item.category?.toLowerCase().includes(queryText)
        );

        setFilteredItems(results);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [queryText]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-400 mb-6 hover:text-green-500"
      >
        <FiArrowLeft />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-8 text-green-400">
        Search Results for "{queryText}"
      </h1>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading results...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No products found. Try another search!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#2A2A2A] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                className="w-full h-48 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-white">
                      {item.title}
                    </h2>
                    <StarRating rating={item.rating || 0} />
                  </div>
                  <p className="text-green-400 font-medium mt-1">
                    ₹{item.price}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.category || "Misc"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <WishlistButton product={item} />
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
