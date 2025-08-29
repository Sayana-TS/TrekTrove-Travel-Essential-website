import { useSelector, useDispatch } from "react-redux";
import GoBackButton from "../Components/Common Components/GoBackButton";
import { addToCart } from "../store/Slices/cartSlice";
import { removeFromWishlist, addToWishlist, clearWishlist } from "../store/Slices/wishlistSlice";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { getWishlistItems, addWishlistItem, removeWishlistItem } from "../Firebase/wishlist";
import {addCartItem} from '../Firebase/cart'

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getWishlistItems(user.uid).then(items => {
        dispatch(clearWishlist()); // clear local state before loading
        items.forEach(item => dispatch(addToWishlist(item)));
      });
    }
  }, [user, dispatch]);

  const handleAddToCart = async (item) => {
  dispatch(addToCart(item)); // redux
  if (user) {
    await addCartItem(user.uid, { ...item, quantity: 1 });
  }
};

  const handleRemove = async (id) => {
    if (user) await removeWishlistItem(user.uid, id);
    dispatch(removeFromWishlist(id));
  };

  const handleAddToWishlist = async (item) => {
    if (user) await addWishlistItem(user.uid, item);
    dispatch(addToWishlist(item));
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      <GoBackButton />
      <h1 className="text-3xl font-bold mb-8 text-green-400">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400 text-lg">
          Your wishlist is empty. Add some products you love! ❤️
        </p>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-[#2A2A2A] flex items-center justify-between p-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-16 h-16 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg shadow-md" />
              </div>
              <div className="flex-1 px-4">
                <h2 className="font-semibold text-lg text-white">{item.name || item.title}</h2>
                <p className="text-green-400 font-medium">₹{item.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleRemove(item.id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full text-sm font-medium transition-all">
                  <Heart className="w-4 h-4 fill-white" />
                  Remove
                </button>
                <button onClick={() => handleAddToCart(item)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-full text-sm font-medium transition-all">
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
