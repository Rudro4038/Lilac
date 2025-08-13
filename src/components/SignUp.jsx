import React, { useState } from 'react';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [focusedField, setFocusedField] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-[#575b66] bg-opacity-80 p-8 rounded-lg w-full max-w-md mx-auto shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
      <h1 className="text-2xl font-bold mb-8 text-center text-[black]">
        {isLogin ? 'Sign In To Track Orders' : 'Create Your Account'}
      </h1>

      <form className="space-y-5">
        {/* Name field - only shown in signup */}
        <div
          className={`transition-all duration-300 ${!isLogin ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}
        >
          <div className="relative">
            <input
              id="name"
              type="text"
              className="p-3 pt-6 w-full rounded-md bg-[#1a1a1a] border border-[#3a3d47] text-white focus:outline-none focus:border-[#F2CD5C] peer"
              placeholder=" "
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            <label
              htmlFor="name"
              className={`absolute left-3 transition-all duration-200 ${
                focusedField === 'name'
                  ? 'text-[#F2CD5C] text-xs top-2'
                  : ' text-sm top-5'
              } peer-focus:text-xs peer-focus:top-2 peer-focus:text-[#F2CD5C] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2`}
            >
              Full Name
            </label>
          </div>
        </div>

        {/* Email field - shown in both states */}
        <div className="relative">
          <input
            id="email"
            type="email"
            className="p-3 pt-6 w-full rounded-md bg-[#1a1a1a] border border-[#3a3d47] text-white focus:outline-none focus:border-[#F2CD5C] peer"
            placeholder=" "
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
          <label
            htmlFor="email"
            className={`absolute left-3 transition-all duration-200 ${
              focusedField === 'email'
                ? 'text-[#F2CD5C] text-xs top-2'
                : 'text-sm top-5'
            } peer-focus:text-xs peer-focus:top-2 peer-focus:text-[#F2CD5C] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2`}
          >
            Email or phone
          </label>
        </div>

        {/* Password field - shown in both states */}
        <div className="relative">
          <input
            id="password"
            type="password"
            className="p-3 pt-6 w-full rounded-md bg-[#1a1a1a] border border-[#3a3d47] text-white focus:outline-none focus:border-[#F2CD5C] peer"
            placeholder=" "
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
          <label
            htmlFor="password"
            className={`absolute left-3 transition-all duration-200 ${
              focusedField === 'password'
                ? 'text-[#F2CD5C] text-xs top-2'
                : 'text-sm top-5'
            } peer-focus:text-xs peer-focus:top-2 peer-focus:text-[#F2CD5C] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2`}
          >
            Password
          </label>
        </div>

        {/* Phone field - only shown in signup */}
        <div
          className={`transition-all duration-300 ${!isLogin ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}
        >
          <div className="relative">
            <input
              id="phone"
              type="tel"
              className="p-3 pt-6 w-full rounded-md bg-[#1a1a1a] border border-[#3a3d47] text-white focus:outline-none focus:border-[#F2CD5C] peer"
              placeholder=" "
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
            />
            <label
              htmlFor="phone"
              className={`absolute left-3 transition-all duration-200 ${
                focusedField === 'phone'
                  ? 'text-[#F2CD5C] text-xs top-2'
                  : 'text-sm top-5'
              } peer-focus:text-xs peer-focus:top-2 peer-focus:text-[#F2CD5C] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2`}
            >
              Phone Number (Optional)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#400E32] hover:bg-[#521140] text-[#F2CD5C] font-bold py-3 px-4 rounded-md transition duration-200 mt-4"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>

        <div className="text-center pt-3">
          <a href="#" className="text-black block mb-2 hover:underline">
            {isLogin ? 'Forgot password?' : ''}
          </a>
          <button
            type="button"
            onClick={toggleForm}
            className="text-[black] hover:underline font-medium"
          >
            {isLogin
              ? 'Create an account? Sign up'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
