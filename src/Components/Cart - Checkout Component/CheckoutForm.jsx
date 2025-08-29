import React, { useState } from "react";

const CheckoutForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to parent Checkout page
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2f302f] p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">Billing Details</h2>

      <div className="space-y-4">
        {["fullName", "email", "address", "city", "zip", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field === "zip" ? "ZIP Code" : field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#282928] text-white"
            required
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 cursor-pointer disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Save & Continue"}
      </button>
    </form>
  );
};

export default CheckoutForm;
