"use client";

import { useState, useEffect } from "react";
import { Barchart, currencyObserver } from "@/components/Barchart";
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
    const loadStateFromLocalStorage = () => {
      const savedState = localStorage.getItem("currencyConverterState");
      if (savedState) {
        const { amount, fromCurrency, toCurrency, result } = JSON.parse(savedState);
        setAmount(amount || "");
        setFromCurrency(fromCurrency || "");
        setToCurrency(toCurrency || "");
        setResult(result || null);
      }
    };

    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    const saveStateToLocalStorage = () => {
      const state = {
        amount,
        fromCurrency,
        toCurrency,
        result,
      };
      localStorage.setItem("currencyConverterState", JSON.stringify(state));
    };

    saveStateToLocalStorage();
  }, [amount, fromCurrency, toCurrency, result]);

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

  useEffect(() => {
    if (currencies.length > 0) {
      if (!currencies.includes(fromCurrency)) {
        setFromCurrency(currencies[0]);
      }
      if (!currencies.includes(toCurrency)) {
        setToCurrency(currencies[1] || currencies[0]);
      }
    }
  }, [currencies]);

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

          currencyObserver.notify(data.data);
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        Currency Converter
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">

        <div className="flex-1 w-full flex justify-center md:justify-start">
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Exchange Rates Chart
            </h2>
            <Barchart currency={fromCurrency} />
          </div>
        </div>

        <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md w-full md:w-96">
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
        </div>

        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Exchange Rates Chart
            </h2>
            <Barchart currency={toCurrency} />
          </div>
        </div>

      </div>
    </div>

  );
}