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

const ChartFactory = {
  createChart: (type: "bar", data: any) => {
    if (type === "bar") {
      return <Bar data={data} options={{ responsive: true }} />;
    }
    throw new Error("Unsupported chart type");
  },
};


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
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const updateChart = (data: CurrencyData) => {
      if (data[currency]) {
        setChartData({
          labels: [currency],
          datasets: [
            {
              label: "Tipo de Cambio (${currency})",
              data: [data[currency].value],
              backgroundColor: "rgba(249, 180, 5, 1)",


            },
          ],
        });
      }
    };

    currencyObserver.subscribe(updateChart);
  }, []);

  useFetch("/api/currency");

  return <div>
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            titleColor: 'white',
            bodyColor: 'white',
          },
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
          },
        },
      }}
    />
  </div>;;
};

export { Barchart, currencyObserver, useFetch };
