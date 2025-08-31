import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  addToCart,
  clearCart,
} from "../store/Slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../Components/Common Components/GoBackButton";
import {
  getCartItems,
  removeCartItem,
  updateCartQuantity,
} from "../Firebase/cart";
import { showToast } from "../store/Slices/toastSlice"; // ✅ import toast

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load cart items from Firestore on page load
  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then((items) => {
        dispatch(clearCart());
        items.forEach((item) => dispatch(addToCart(item)));
      });
    }
  }, [user, dispatch]);

  // Increase quantity
  const handleIncrease = async (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(increaseQuantity(item.id));
    if (user) await updateCartQuantity(user.uid, item.id, newQuantity);
  };

  // Decrease quantity
  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    dispatch(decreaseQuantity(item.id));
    if (user) await updateCartQuantity(user.uid, item.id, newQuantity);
  };

  // Remove item
  const handleRemove = async (item) => {
    dispatch(removeFromCart(item.id));
    if (user) await removeCartItem(user.uid, item.id);
    dispatch(
      showToast({
        message: `${item.name || item.title} removed from cart`,
        type: "success",
      })
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#282928] w-full min-h-screen mx-auto p-6 px-16">
      <GoBackButton />
      <h1 className="text-3xl text-white font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-5 font-semibold text-gray-300 border-b pb-2 mb-4">
              <p className="col-span-2">Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-5 items-center border-b py-4 gap-4"
              >
                {/* Product */}
                <div className="md:col-span-2 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  {/* <div>
                    <h2 className="font-medium text-white">{item.name}</h2>
                    <p className="text-sm text-gray-400">
                      Estimated delivery: Aug 25 - Aug 27
                    </p>
                  </div> */}
                </div>

                {/* Price */}
                <div className="flex md:block justify-between">
                  <span className="line-through text-gray-500 mr-2">
                    ₹{(item.price * 2).toFixed(2)}
                  </span>
                  <span className="text-orange-500 font-semibold">
                    ₹{item.price.toFixed(2)}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 justify-start md:justify-center">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 border border-gray-600 text-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-2 py-1 border border-gray-600 text-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Total + Remove */}
                <div className="flex items-center justify-between md:justify-start gap-3">
                  <div>
                    <span className="line-through text-gray-500 mr-1">
                      ₹{(item.price * 2 * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-orange-500 font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#2f302f] p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl text-white font-semibold mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span className="text-white">Total</span>
              <span className="text-white">₹{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-white text-black py-3 rounded-lg transition cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
