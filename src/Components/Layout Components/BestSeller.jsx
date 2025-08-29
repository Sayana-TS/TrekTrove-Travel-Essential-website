import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../Common Components/StarRating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/Slices/cartSlice";
import WishlistButton from "../Common Components/WishlistButton";
import { useSelector } from "react-redux";
import { addCartItem } from "../../Firebase/cart";

const products = [
  {
    id: 1,
    name: "Hiking Backpack",
    rating: 4,
    price: 91,
    oldPrice: null,
    badge: null,
    image: "https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg",
  },
  {
    id: 2,
    name: "Hiking Backpack",
    rating: 4,
    price: 82.4,
    oldPrice: 103.9,
    badge: "HOT DEAL",
    image: "https://images.pexels.com/photos/532803/pexels-photo-532803.jpeg",
  },
  {
    id: 3,
    name: "Rucksack",
    tag: "Cruelty-free",
    rating: 4,
    price: 51,
    oldPrice: null,
    badge: null,
    image: "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg",
  },
  {
    id: 4,
    name: "Travel Backpack",
    tag: "Cruelty-free",
    rating: 4,
    price: 52,
    oldPrice: null,
    badge: null,
    image:
      "https://www.lifelongindiaonline.com/cdn/shop/files/1_5d26b324-155f-4975-9e92-e562a8fa110f.jpg?v=1752144986&width=940",
  },
];

function BestSeller() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [activeCategory, setActiveCategory] = useState("Backpacks");
  const categories = ["Backpacks", "Shoes", "Jackets"];

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product)); // local redux
    if (user) {
      await addCartItem(user.uid, { ...product, quantity: 1 });
    }
  };

  return (
    <section id="bestSeller" className="py-16 bg-[#1e1e1e] text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">
          Our <span className="text-[#91b474] italic">best seller.</span>
        </h2>

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
        {products.map((product) => (
          <div key={product.id} className="flex flex-col text-gray-900 group">
            {/* Image Card */}
            <div className="relative w-full h-120 bg-[#f9f9f6] rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Wishlist Button on top-right of image */}
              {/* Wishlist Button on top-right of image */}
              <div className="absolute top-2 right-2">
                <WishlistButton product={product} />
              </div>

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}
              {/* Add to Cart Button */}
              <button
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white font-semibold py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black transition duration-500 ease-in-out"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>

            {/* Content */}
            <div className="p-3 text-center text-white">
              {/* Title */}
              <h3 className="font-medium text-base mt-1">{product.name}</h3>

              {/* Ratings */}
              <div className="flex justify-center items-center gap-1 text-yellow-500 my-2 text-sm">
                {/* {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)} */}
                <StarRating rating={product.rating} />
              </div>

              {/* Price */}
              <div className="text-lg font-semibold">
                {product.oldPrice && (
                  <span className="line-through  mr-2 text-base">
                    ${product.oldPrice}
                  </span>
                )}
                <span className="text-yellow-500">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 border border-white rounded-full hover:bg-[#91b474] hover:text-black hover:border-none transition duration-500 ease-in-out cursor-pointer">
          <Link to="/collections">View all products</Link>
        </button>
      </div>
    </section>
  );
}

export default BestSeller;
