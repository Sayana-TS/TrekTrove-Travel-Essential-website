// src/pages/CollectionDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../Firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import StarRating from "../Components/Common Components/StarRating";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/Slices/cartSlice";
import GoBackButton from "../Components/Common Components/GoBackButton";
import WishlistButton from "../Components/Common Components/WishlistButton";
import { useSelector } from "react-redux";
import {addCartItem} from '../Firebase/cart'

const CollectionDetailPage = () => {
  const { id } = useParams(); // this is collection id (title/id from firestore)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.auth.user);


  const dispatch = useDispatch();

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "Products"),
          where("category", "==", id) // match category field
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = async (product) => {
  const item = {
    id: product.id,
    name: product.title,
    image: product.image,
    price: product.price,
    quantity: 1,
  };
  dispatch(addToCart(item));
  if (user) {
    await addCartItem(user.uid, item);
  }
};


  return (
    <div className="bg-[#282928] min-h-screen px-8 py-12 overflow-hidden">
      <GoBackButton />
      <h2 className="text-3xl font-bold text-white mb-8">{id}</h2>

      {loading ? (
        <p className="text-white text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-white text-lg">
          No products yet in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 group"
            >
              {/* Image div */}
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                {/* Wishlist Button */}
                <div className="absolute top-2 right-2">
                  <WishlistButton product={item} />
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] bg-black text-white font-semibold py-2 rounded-full opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
                >
                  Add to cart
                </button>
              </div>

              {/* Product details */}
              <div className="px-4 py-3 bg-transparent">
                <StarRating rating={item.rate} />
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-yellow-400">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDetailPage;
