"use client";

import { useState } from "react";
import { Barchart } from "@/components/Barchart";
import { currencyObserver } from "@/components/Barchart";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/convert");
      const data = await response.json();
      console.log("API response:", data);
      

      if (data && data.data) {
        const fromRate = data.data[fromCurrency]?.value;
        const toRate = data.data[toCurrency]?.value;
        
        if (fromRate && toRate) {
          const convertedAmount = (
            (parseFloat(amount) / fromRate) *
            toRate
          ).toFixed(2);
          setResult(`${convertedAmount} ${toCurrency}`);
        } else {
          setResult("Conversion rates not available");
        }
      } else {
        setResult("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      setResult("Error fetching conversion rates");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-900 text-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 text-black"
          placeholder="Amount"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fromCurrency" className="block text-sm font-medium mb-2">
          From
        </label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 text-black"
        >
          <option value="">Select...</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Agregar las restantes */}
        </select>
      </div>
      <div className="mb-4 text-center">
        <button
          onClick={handleSwap}
          className="text-blue-900 bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-200"
        >
          ↔ Swap
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="toCurrency" className="block text-sm font-medium mb-2">
          To
        </label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 text-black"
        >
          <option value="">Select...</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleConvert}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium"
        >
          Convert
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{result || "Result will appear here"}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Exchange Rates Chart</h2>
        <Barchart currency={fromCurrency} />
        <Barchart currency={toCurrency} />
      </div>
    </div>
  );
}