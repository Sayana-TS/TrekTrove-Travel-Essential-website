// src/Components/Common Components/WishlistButton.jsx
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/Slices/wishlistSlice";
import { addWishlistItem, removeWishlistItem } from "../../Firebase/wishlist";

const WishlistButton = ({ product }) => {
  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  const toggleWishlist = async () => {
    if (!user) return alert("Please login to use wishlist");

    if (isInWishlist) {
      await removeWishlistItem(user.uid, product.id);
      dispatch(removeFromWishlist(product.id));
    } else {
      await addWishlistItem(user.uid, product);
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition-colors ${
        isInWishlist ? "bg-red-500 text-white" : "bg-gray-700 text-white hover:bg-red-500"
      }`}
    >
      <Heart size={20} className={isInWishlist ? "fill-white" : ""} />
    </button>
  );
};

export default WishlistButton;
