import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check, MapPin, Phone, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Order = ({ products = [] }) => {
  const navigate = useNavigate();
  
  // Mock cart data - replace with actual cart state
  const [cartItems] = useState([
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

  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    area: '',
    postalCode: '',
    
    // Payment
    paymentMethod: 'cash_on_delivery',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Order Notes
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 100; // Fixed shipping cost
    return subtotal + shipping;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!orderData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!orderData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!orderData.email.trim()) newErrors.email = 'Email is required';
      if (!orderData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (orderData.phone && !/^[0-9]{11}$/.test(orderData.phone)) {
        newErrors.phone = 'Phone number must be 11 digits';
      }
    }
    
    if (step === 2) {
      if (!orderData.address.trim()) newErrors.address = 'Address is required';
      if (!orderData.city.trim()) newErrors.city = 'City is required';
      if (!orderData.area.trim()) newErrors.area = 'Area is required';
    }
    
    if (step === 3 && orderData.paymentMethod === 'card') {
      if (!orderData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!orderData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!orderData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!orderData.cardName.trim()) newErrors.cardName = 'Card holder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4); // Success step
    }, 3000);
  };

  const steps = [
    { id: 1, title: 'Contact Info', icon: User },
    { id: 2, title: 'Shipping', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Confirmation', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-[#90165942]">
      {/* Header */}
      <div className="bg-[#400E32] text-[#F2CD5C] py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#A61F69] rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">Complete Your Order</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 sm:gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' : 
                      isActive ? 'bg-[#400E32] text-[#F2CD5C]' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                    </div>
                    <span className={`hidden sm:block text-sm font-medium ${
                      isActive ? 'text-[#400E32]' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
              
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#400E32] mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={orderData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={orderData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        value={orderData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        value={orderData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="01XXXXXXXXX"
                        maxLength="11"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#400E32] mb-6">Shipping Address</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                      <textarea
                        value={orderData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="House/Building, Street, Landmark"
                        rows="3"
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <select
                        value={orderData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select City</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                      </select>
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area/Thana *
                      </label>
                      <input
                        type="text"
                        value={orderData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                          errors.area ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter area/thana"
                      />
                      {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={orderData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                      placeholder="Enter postal code (optional)"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#400E32] mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => handleInputChange('paymentMethod', 'cash_on_delivery')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          orderData.paymentMethod === 'cash_on_delivery'
                            ? 'border-[#400E32] bg-[#400E32]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            orderData.paymentMethod === 'cash_on_delivery'
                              ? 'border-[#400E32] bg-[#400E32]'
                              : 'border-gray-300'
                          }`}>
                            {orderData.paymentMethod === 'cash_on_delivery' && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
                            <p className="text-sm text-gray-500">Pay when you receive</p>
                          </div>
                        </div>
                      </div>
                      
                      <div
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          orderData.paymentMethod === 'card'
                            ? 'border-[#400E32] bg-[#400E32]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            orderData.paymentMethod === 'card'
                              ? 'border-[#400E32] bg-[#400E32]'
                              : 'border-gray-300'
                          }`}>
                            {orderData.paymentMethod === 'card' && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                            <p className="text-sm text-gray-500">Pay online now</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details (if card payment selected) */}
                  {orderData.paymentMethod === 'card' && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={orderData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={orderData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={orderData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={orderData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Name as on card"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                    </div>
                  )}

                  {/* Order Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      value={orderData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                      placeholder="Any special instructions for your order..."
                      rows="3"
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Shield className="text-green-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-green-800">Secure Payment</p>
                      <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Order Confirmation */}
              {currentStep === 4 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#400E32] mb-2">Order Placed Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your order. We'll send you a confirmation email shortly.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-[#400E32] mb-2">Order Details:</h3>
                    <p className="text-sm text-gray-600">Order ID: #LIL-{Date.now()}</p>
                    <p className="text-sm text-gray-600">Email: {orderData.email}</p>
                    <p className="text-sm text-gray-600">Phone: {orderData.phone}</p>
                    <p className="text-sm text-gray-600">Payment: {orderData.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Card Payment'}</p>
                  </div>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-[#400E32] text-[#F2CD5C] px-8 py-3 rounded-lg font-semibold hover:bg-[#A61F69] hover:text-white transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 border border-[#400E32] text-[#400E32] rounded-lg font-medium hover:bg-[#400E32] hover:text-[#F2CD5C] transition-all duration-300"
                    >
                      Previous Step
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={nextStep}
                      className="order-1 sm:order-2 flex-1 bg-[#400E32] text-[#F2CD5C] px-6 py-3 rounded-lg font-semibold hover:bg-[#A61F69] hover:text-white transition-all duration-300"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitOrder}
                      disabled={isProcessing}
                      className="order-1 sm:order-2 flex-1 bg-[#400E32] text-[#F2CD5C] px-6 py-3 rounded-lg font-semibold hover:bg-[#A61F69] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-[#F2CD5C] border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 sticky top-6">
              <h3 className="text-lg font-bold text-[#400E32] mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-[#400E32]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatPrice(100)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#400E32] pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-3 bg-[#400E32]/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="text-[#400E32]" size={16} />
                  <span className="text-sm font-medium text-[#400E32]">Delivery Information</span>
                </div>
                <p className="text-xs text-gray-600">
                  Estimated delivery: 3-5 business days within Dhaka, 5-7 days outside Dhaka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
