import React from "react";

const RecentOrdersTable = () => {
  // Dummy data
  const orders = [
    { id: "ORD001", customer: "John Doe", status: "Pending", amount: "$120" },
    { id: "ORD002", customer: "Alice Smith", status: "Completed", amount: "$250" },
    { id: "ORD003", customer: "Bob Johnson", status: "Shipped", amount: "$80" },
    { id: "ORD004", customer: "Sarah Lee", status: "Completed", amount: "$400" },
    { id: "ORD005", customer: "David Kim", status: "Cancelled", amount: "$50" },
  ];

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
      <table className="w-full text-gray-300 text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Status</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-800">
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.customer}</td>
              <td
                className={`py-2 ${
                  order.status === "Completed"
                    ? "text-green-400"
                    : order.status === "Pending"
                    ? "text-yellow-400"
                    : order.status === "Cancelled"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {order.status}
              </td>
              <td className="py-2">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
