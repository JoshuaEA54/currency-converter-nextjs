import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables} from "chart.js";

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
        const response = await fetch(url);
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


const Barchart = () => {
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
      setChartData({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Tasas de Cambio",
            data: Object.values(data).map((currency) => currency.value),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };

    currencyObserver.subscribe(updateChart);
  }, []);

  useFetch("/api/currency");

  return <div>{ChartFactory.createChart("bar", chartData)}</div>;
};

export { Barchart, currencyObserver, useFetch };
