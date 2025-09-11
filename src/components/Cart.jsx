import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = ({ products = [] }) => {
  const [cartItems, setCartItems] = useState([
    // Mock data - replace with actual cart state
    {
      id: 1,
      name: "Premium Leather Backpack",
      price: 2500,
      image: "/onlyLilacIcon.png",
      quantity: 1,
      color: "Black"
    },
    {
      id: 2,
      name: "Elegant Wallet",
      price: 800,
      image: "/onlyLilacIcon.png",
      quantity: 2,
      color: "Brown"
    }
  ]);

  const recommendations = [
    { id: 3, name: "Travel Organizer", price: 1200, image: "/onlyLilacIcon.png" },
    { id: 4, name: "Phone Case", price: 400, image: "/onlyLilacIcon.png" },
    { id: 5, name: "Laptop Sleeve", price: 1500, image: "/onlyLilacIcon.png" }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <ShoppingBag className="w-16 h-16 text-[#400E32] mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-[#400E32] mb-2">Your cart is empty</h3>
        <p className="text-gray-600 text-center text-sm mb-6">
          Add some beautiful items to get started
        </p>
        <button className="bg-[#400E32] text-[#F2CD5C] px-6 py-2 rounded-lg font-medium hover:bg-[#A61F69] transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {/* Items Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in cart
          </p>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/onlyLilacIcon.png';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#400E32] text-sm sm:text-base line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  {item.color && (
                    <p className="text-xs text-gray-500 mb-2">Color: {item.color}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#400E32] text-sm sm:text-base">
                      {formatPrice(item.price)}
                    </span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors ml-2"
                      >
                        <Trash2 size={12} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-[#400E32] mb-3 text-sm">You might also like</h3>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/onlyLilacIcon.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#400E32] line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <button className="text-xs bg-[#400E32] text-[#F2CD5C] px-2 py-1 rounded hover:bg-[#A61F69] transition-colors">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary & Checkout */}
      <div className="border-t border-gray-200 pt-4 mt-4 bg-[#f9e19b] -mx-4 px-4 pb-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-[#400E32]">Subtotal</span>
          <span className="font-bold text-lg text-[#400E32]">
            {formatPrice(getTotalPrice())}
          </span>
        </div>
        
        <p className="text-xs text-gray-600 mb-4 text-center">
          Shipping calculated at checkout
        </p>

        {/* Checkout Button */}
        <button className="w-full bg-[#400E32] text-[#F2CD5C] py-3 rounded-lg font-semibold hover:bg-[#A61F69] hover:text-white transition-all duration-300 transform active:scale-95">
          Proceed to Checkout
        </button>
        
        <button className="w-full mt-2 bg-transparent border border-[#400E32] text-[#400E32] py-2 rounded-lg font-medium hover:bg-[#400E32] hover:text-[#F2CD5C] transition-all duration-300">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;