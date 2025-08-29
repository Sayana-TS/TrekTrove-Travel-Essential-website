import React, { useState } from "react";

const PaymentSection = ({ method, setMethod, paymentDetails, setPaymentDetails }) => {
  return (
    <div className="bg-[#2f302f] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Payment Method</h2>

      <div className="space-y-3">
        {["cod", "card"].map((m) => (
          <label key={m} className="flex items-center gap-2 text-white">
            <input
              type="radio"
              name="payment"
              value={m}
              checked={method === m}
              onChange={(e) => setMethod(e.target.value)}
              className="accent-yellow-500"
            />
            {m === "cod" ? "Cash on Delivery" : "Credit / Debit Card"}
          </label>
        ))}
      </div>

      {method === "card" && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={paymentDetails.cardName}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cardName: e.target.value })
            }
            className="w-full p-2 rounded bg-[#282928] text-white"
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
            }
            className="w-full p-2 rounded bg-[#282928] text-white"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={paymentDetails.expiry}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
              }
              className="w-full p-2 rounded bg-[#282928] text-white"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
              }
              className="w-full p-2 rounded bg-[#282928] text-white"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
