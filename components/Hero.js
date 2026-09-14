import React, { useState } from 'react';

const Hero = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Replace YOUR_ACCESS_KEY_HERE with your Web3Forms access key
    // You can get one by entering your email at https://web3forms.com/
    formData.append("access_key", "781754c3-2297-44af-a159-08f476b5be78");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center font-sans">
      <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1.05]">
        <span className="block">Breaking News.</span>
        <span className="block text-[#1b7340]">Real-time.</span>
        <span className="block">Automatically.</span>
      </h1>

      <p className="max-w-[600px] text-gray-600 mb-12 mx-auto text-base sm:text-lg font-medium leading-relaxed">
        Pure News watches global markets, tech trends, and personal finance, and shows you the breaking stories you need to know, directly in your inbox. <span className="font-bold text-black">Launching Q4 2026.</span>
      </p>

      <div className="w-full max-w-md mx-auto">
        <p className="text-xs font-mono text-black font-bold uppercase tracking-wider mb-4">
          Join the exclusive beta waitlist
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full sm:w-[280px] px-4 py-3 rounded-md border border-gray-300 font-mono text-sm focus:ring-1 focus:ring-[#1b7340] focus:border-[#1b7340] outline-none transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#1b7340] text-white font-bold rounded-md hover:bg-[#155b33] transition-colors whitespace-nowrap text-sm"
          >
            Get Updates
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-[#1b7340] font-mono font-medium">Thanks for subscribing!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600 font-mono font-medium">Something went wrong.</p>
        )}

        <p className="mt-6 text-xs text-gray-500 font-mono">
          Be first to know when Pure News launches.
        </p>
      </div>
    </div>
  );
};

export default Hero;
