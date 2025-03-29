"use client";

import { useState, useEffect } from "react";
import { Barchart } from "@/components/Barchart";
import {
  AmountInput,
  CurrencySelect,
  SwapButton,
  ConvertButton,
  ResultDisplay,
} from "@/components/CurrencyComponents";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("/api/convert");
        const data = await response.json();

        if (data && data.data) {
          setCurrencies(Object.keys(data.data));
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

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
      <AmountInput amount={amount} setAmount={setAmount} />
      <CurrencySelect
        label="From"
        selectedCurrency={fromCurrency}
        setCurrency={setFromCurrency}
        currencies={currencies}
      />
      <SwapButton handleSwap={handleSwap} />
      <CurrencySelect
        label="To"
        selectedCurrency={toCurrency}
        setCurrency={setToCurrency}
        currencies={currencies}
      />
      <ConvertButton handleConvert={handleConvert} />
      <ResultDisplay result={result} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Exchange Rates Chart</h2>
        <Barchart />
      </div>
    </div>
  );
}