// import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { options } from '@/app/mocks/chart.mock';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: any
}

const MultipleBarChart = ({ data }: ChartProps) => {
  const { contributorsCount, labels, forks, stars, watchers, subscribers, lastYearCommitsCount } = data.reduce( (acc: any, el: any) => (
      {
        contributorsCount: [...acc.contributorsCount, el.contributorsCount],
        labels: [...acc.labels, el.repo],
        forks: [...acc.forks, el.forks],
        stars: [...acc.stars, el.stars],
        subscribers: [...acc.subscribers, el.subscribers],
        watchers: [...acc.watchers, el.watchers],
        lastYearCommitsCount: [...acc.lastYearCommitsCount, el.lastYearCommitsCount],
      }
    ), {
    contributorsCount: [],
    labels: [],
    lastYearCommitsCount: [],
    forks: [],
    stars: [],
    subscribers: [],
    watchers: [],
    }
  );

  const datasets = [
    {
      label: 'contributorsCount',
      data: contributorsCount,
      borderColor: "rgb(49,253,112)",
      backgroundColor: "rgba(0,255,166,0.5)",
    },
    {
      label: 'forks',
      data: forks,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: 'The number of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.5)",
    },
    {
      label: 'stars',
      data: stars,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: 'subscribers',
      data: subscribers,
      borderColor: "rgb(0,73,220)",
      backgroundColor: "rgba(0,5,253,0.5)",
    },
    {
      label: 'watchers',
      data: watchers,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.5)",
    },
  ];

  return (
    <div className='h-[600px] mb-5' suppressHydrationWarning>
      <Bar options={options} data={{ labels, datasets }} fallbackContent={"Loading..."}/>
    </div>
  );
};

export default MultipleBarChart