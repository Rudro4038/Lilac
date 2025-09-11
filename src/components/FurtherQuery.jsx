import React, { useState } from 'react';

const FurtherQuery = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // You can add your submit logic here
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 py-6 bg-[#23182b] rounded-2xl shadow-lg border border-[#400E32] flex flex-col justify-center h-fit">
      <h2 className="text-xl sm:text-2xl font-bold text-left mb-2 text-white tracking-wide">Didn't find your answer?</h2>
      <p className="text-gray-400 mb-6 text-sm">Don't hesitate to contact us</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-3 bg-[#18151c] text-gray-200 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A61F69] transition"
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 bg-[#18151c] text-gray-200 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A61F69] transition"
          autoComplete="off"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={4}
          className="w-full px-4 py-3 bg-[#18151c] text-gray-200 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A61F69] transition resize-none"
        />
        <button
          type="submit"
          className="mt-2 w-40 py-3 bg-white text-[#23182b] font-semibold rounded-full shadow transition hover:bg-[#A61F69] hover:text-white"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default FurtherQuery;