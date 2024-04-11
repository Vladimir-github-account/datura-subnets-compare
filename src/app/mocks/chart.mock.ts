import { ChartOptions } from "chart.js";

export const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          size: 14
        },
      },
      position: "bottom" as const,
    },
  },
};

export const lineOptions: ChartOptions<"line"> = {
  elements: {
    line: {
      borderJoinStyle: 'round'
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          size: 14
        },
      },
      position: "bottom" as const,
    },
  },
};
