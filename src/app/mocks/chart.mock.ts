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

export const activityChartOptions: ChartOptions<"bar"> = {
  elements: {
    line: {
      borderJoinStyle: 'round'
    }
  },
  scales: {
    y: {
      grid: {
        color: "rgb(53, 162, 235, 0.15)"
      },
    },
    x: {
      stacked: true,
      grid: {
        display: false
      },
    },
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
