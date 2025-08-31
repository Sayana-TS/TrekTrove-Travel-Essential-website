import React, { useState } from "react";
import CheckoutForm from "../Components/Cart - Checkout Component/CheckoutForm";
import OrderSummary from "../Components/Cart - Checkout Component/OrderSummary";
import PaymentSection from "../Components/Cart - Checkout Component/PaymentSection";
import GoBackButton from "../Components/Common Components/GoBackButton";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { clearUserCart } from "../Firebase/cart";
import { showToast } from "../store/Slices/toastSlice"; // 👈 import showToast

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // 👈 add dispatch
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (shippingInfo) => {
    if (!user) {
      dispatch(
        showToast({ message: "Please login to place an order", type: "error" })
      );
      return;
    }

    // If card payment, ensure all card fields are filled
    if (
      paymentMethod === "card" &&
      (!paymentDetails.cardName ||
        !paymentDetails.cardNumber ||
        !paymentDetails.expiry ||
        !paymentDetails.cvv)
    ) {
      dispatch(
        showToast({ message: "Please fill in all card details", type: "error" })
      );
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        items: cartItems,
        subtotal,
        shipping: 0,
        total: subtotal,
        shippingInfo,
        paymentMethod,
        paymentDetails: paymentMethod === "card" ? paymentDetails : {},
        status: "pending",
        createdAt: serverTimestamp(),
      };

      // Save order to Firestore
      await addDoc(collection(db, "Orders"), orderData);

      // Clear user cart after placing the order
      await clearUserCart(user.uid);

      // Success toast
      dispatch(
        showToast({ message: "Order placed successfully!", type: "success" })
      );
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error("Error placing order:", error);

      // Error toast
      dispatch(
        showToast({
          message: "Something went wrong, try again!",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#282928] p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <GoBackButton />

        <h1 className="text-3xl font-bold text-white mb-6 text-center md:text-left">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Form + Payment */}
          <div className="md:col-span-2 space-y-6 bg-[#1e1e1e] p-6 rounded-xl shadow-lg">
            <CheckoutForm onSubmit={handlePlaceOrder} loading={loading} />
            <PaymentSection
              method={paymentMethod}
              setMethod={setPaymentMethod}
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
            />
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-1 bg-[#1e1e1e] p-6 rounded-xl shadow-lg h-fit">
            <OrderSummary cartItems={cartItems} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
