import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();

  // If "buy now" was used, this will have a product
  const buyNowItem = location.state?.buyNowItem;

  // Pick which list to render
  const items = buyNowItem ? [buyNowItem] : cartItems;

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="bg-[#2f302f] text-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between border-b border-gray-600 pb-2"
          >
            <span>
              {item.name || item.title} (x{item.quantity})
            </span>
            <span>₹{Number(item.price) * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
