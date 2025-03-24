'use client';

import { useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type CurrencyAPIResponse = {
  data: {
    [currencyCode: string]: {
      code: string;
      value: number;
    };
  };
};

export default function TestLocalStoragePage() {
  const { data } = useFetch<CurrencyAPIResponse>('/api/convert');
  const [simulatedData, setSimulatedData] = useLocalStorage<CurrencyAPIResponse>('simulatedRates', data ?? { data: {} });

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      const nuevaData = {
        data: { ...data.data }
      };

      for (const currency in nuevaData.data) {
        const original = data.data[currency].value;
        const variation = original * ((Math.random() - 0.5) * 0.02); 
        nuevaData.data[currency].value = parseFloat((original + variation).toFixed(4));
      }

      setSimulatedData(nuevaData);
    }, 60000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasas de Cambio Simuladas</h2>
      <ul className="list-disc list-inside">
        {Object.entries(simulatedData?.data || {}).map(([currency, info]) => (
          <li key={currency}>
            {currency}: {info.value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
