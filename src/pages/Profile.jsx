import React from "react";

const Profile = () => {
  // Mock data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Branded Glowy Backpack",
      price: 129.99,
      quantity: 1,
      image: "/bag1.png",
    },
    {
      id: 2,
      name: "Leather Wallet",
      price: 49.99,
      quantity: 2,
      image: "/bag1.png",
    },
  ];

  // Mock data for previous orders
  const previousOrders = [
    {
      id: "ORD-1234",
      date: "2025-07-12",
      status: "Delivered",
      items: 3,
      total: 259.97,
    },
    {
      id: "ORD-1189",
      date: "2025-06-28",
      status: "Shipped",
      items: 1,
      total: 129.99,
    },
    {
      id: "ORD-1023",
      date: "2025-06-15",
      status: "Delivered",
      items: 2,
      total: 89.98,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-transparent">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - User Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#400E32] text-[#F2CD5C] flex items-center justify-center text-3xl font-bold mb-4">
                U
              </div>
              <h2 className="text-xl font-semibold text-black">User Name</h2>
              <p className="text-gray-500">user@example.com</p>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Member since</span>
                <span className="text-black">June 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Orders</span>
                <span className="text-black">3</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#400E32] text-[#F2CD5C] py-2 rounded-md hover:bg-[#521140] transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Side - Cart and Previous Orders */}
        <div className="w-full lg:w-2/3">
          {/* Cart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">Your Cart</h2>

            {cartItems.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-black">{item.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <span className="font-semibold text-[#400E32]">
                            Tk {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold text-black">Total</span>
                  <span className="font-bold text-[#400E32] text-xl">
                    Tk  
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <button className="w-full mt-4 bg-[#400E32] text-[#F2CD5C] py-3 rounded-md hover:bg-[#521140] transition-colors">
                  Checkout
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-gray-400">
                  shopping_cart
                </span>
                <p className="mt-2 text-gray-500">Your cart is empty</p>
                <button className="mt-4 px-4 py-2 border border-[#400E32] text-[#400E32] rounded-md hover:bg-[#400E32] hover:text-[#F2CD5C] transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Previous Orders Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-black mb-4">
              Previous Orders
            </h2>

            {previousOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-black">Image</th>
                      <th className="text-left py-3 text-black">Order ID</th>
                      <th className="text-left py-3 text-black">Date</th>
                      <th className="text-left py-3 text-black">Items</th>
                      <th className="text-left py-3 text-black">Total</th>
                      <th className="text-left py-3 text-black">Status</th>
                      <th className="text-left py-3 text-black">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img
                              src="/bag1.png"
                              alt="Order"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 text-black">{order.id}</td>
                        <td className="py-3 text-gray-600">{order.date}</td>
                        <td className="py-3 text-black">{order.items}</td>
                        <td className="py-3 font-medium text-black">
                          Tk {order.total.toFixed(2)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-gray-400">
                  receipt_long
                </span>
                <p className="mt-2 text-gray-500">No previous orders</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
