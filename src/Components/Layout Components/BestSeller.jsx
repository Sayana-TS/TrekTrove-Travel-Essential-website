import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/Slices/cartSlice";
import WishlistButton from "../Common Components/WishlistButton";
import { addCartItem } from "../../Firebase/cart";
import StarRating from "../Common Components/StarRating";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { showToast } from "../../store/Slices/toastSlice"; // 👈 import showToast

function BestSeller() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch categories + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Products"));
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Extract unique categories
        const uniqueCategories = [...new Set(productList.map((p) => p.category))];

        // Pick 3 random categories
        const shuffled = uniqueCategories.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setCategories(selected);
        setActiveCategory(selected[0]); // default first one
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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

  // Filter products for active category and pick top 4 by rating
  let filteredProducts = products
    .filter((p) => p.category === activeCategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Ensure exactly 4 cards (pad with null placeholders if needed)
  while (filteredProducts.length < 4) {
    filteredProducts.push(null);
  }

  return (
    <section id="bestSeller" className="py-16 bg-[#1e1e1e] text-white">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">
          Our <span className="text-[#91b474] italic">best seller.</span>
        </h2>

        {/* Category buttons */}
        <div className="flex justify-center gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 rounded-full transition 
              ${
                activeCategory === cat
                  ? "bg-[#91b474] text-black"
                  : "bg-gray-700 text-white hover:bg-[#91b474] hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16 cursor-pointer">
        {filteredProducts.map((product, index) =>
          product ? (
            <div key={product.id} className="flex flex-col text-gray-900 group">
              {/* Image Card */}
              <div className="relative w-full h-120 bg-[#f9f9f6] rounded-xl overflow-hidden">
                <img
                  onClick={() => navigate(`/product/${product.id}`)}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Wishlist */}
                <div className="absolute top-2 right-2">
                  <WishlistButton product={product} />
                </div>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.badge}
                  </span>
                )}

                {/* Add to Cart */}
                <button
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white font-semibold py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>

              {/* Content */}
              <div className="p-3 text-center text-white">
                <h3 className="font-medium text-base mt-1">{product.title}</h3>
                <div className="flex justify-center items-center gap-1 text-yellow-500 my-2 text-sm">
                  <StarRating rating={product.rating} />
                </div>
                <div className="text-lg font-semibold">
                  {product.oldPrice && (
                    <span className="line-through mr-2 text-base">
                      ${product.oldPrice}
                    </span>
                  )}
                  <span className="text-yellow-500">${product.price}</span>
                </div>
              </div>
            </div>
          ) : (
            // Placeholder card
            <div
              key={`placeholder-${index}`}
              className="flex flex-col justify-center items-center bg-gray-800 rounded-xl h-120 text-gray-400 border border-dashed"
            >
              <span className="text-sm">🚀 Coming Soon</span>
            </div>
          )
        )}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 border border-white rounded-full hover:bg-[#91b474] hover:text-black hover:border-none transition duration-500 ease-in-out">
          <Link to="/collections">View all products</Link>
        </button>
      </div>
    </section>
  );
}

export default BestSeller;
