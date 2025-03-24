"use client";

import { useFetch } from "@/hooks/useFetch";

export default function TestFetchPage() {
  const { data, loading, error } = useFetch<CurrencyAPIResponse>("/api/convert");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Exchange Rates (Base USD)</h1>
      <ul className="list-disc list-inside">
        {Object.entries(data?.data || {}).map(([currency, info]) => (
          <li key={currency}>
            {currency}: {info.value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

type CurrencyAPIResponse = {
  data: {
    [currencyCode: string]: {
      code: string;
      value: number;
    };
  };
};
