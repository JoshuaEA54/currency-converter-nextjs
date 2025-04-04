import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);

type CurrencyData = Record<string, { value: number }>;

class CurrencyObserver {
  private subscribers: ((data: CurrencyData) => void)[] = [];

  subscribe(callback: (data: CurrencyData) => void): void {
    this.subscribers.push(callback);
  }

  notify(data: CurrencyData): void {
    this.subscribers.forEach((callback) => callback(data));
  }
}

const currencyObserver = new CurrencyObserver();

const useFetch = (url: string) => {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/convert");
        const result = await response.json();

        setData(result.data);
        currencyObserver.notify(result.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
    };
  }, [url]);

  return { data, loading, error };
};


const Barchart = ({ currency }: { currency: string }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Tasas de Cambio",
        data: [] as number[],
        backgroundColor: "rgb(46, 219, 138)",
      },
    ],
  });

  console.log("Currency received in Barchart: ", currency);

  useEffect(() => {
    const updateChart = (bar: CurrencyData) => {
      if (bar[currency]) {
        console.log("Data for selected currency:", bar[currency]);

        setChartData({
          labels: [currency],
          datasets: [
            {
              label: `Tipo de Cambio (${currency}), 1 dolar = ${(bar[currency]?.value || 0).toFixed(2)}`,
              data: [bar[currency]?.value || 0],
              backgroundColor: "rgb(46, 219, 138)",
            },
          ],
        });
      }
    };

    currencyObserver.subscribe(updateChart);
  }, [currency]);

  useFetch("/api/currency");

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              titleColor: "white",
              bodyColor: "white",
            },
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
          },
        }}
      />
    </div>
  );
};


export { Barchart, currencyObserver, useFetch };
