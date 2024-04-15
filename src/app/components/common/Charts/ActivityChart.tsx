import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

import { activityChartOptions } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface ChartProps {
  data: RepositoryData[]
}

const ActivityChart = ({ data }: ChartProps) => {
  const { labels, lastYearAdditionsCount, lastYearDeletionsCount } = data.reduce( (acc: any, el: any) => (
      {
        labels: [...acc.labels, el.repo.length > 30 ? el.repo.substring(0, 30) + '...' : el.repo],
        lastYearAdditionsCount: [...acc.lastYearAdditionsCount, el.lastYearAdditionsCount],
        lastYearDeletionsCount: [...acc.lastYearDeletionsCount, el.lastYearDeletionsCount],
      }
    ), {
      labels: [],
      lastYearAdditionsCount: [],
      lastYearDeletionsCount: [],
    }
  );

  const datasets = [
    {
      borderColor: "rgb(49,253,112)",
      backgroundColor: "rgba(0,255,166,0.8)",
      data: lastYearAdditionsCount,
      // fill: true,
      label: 'The number of additions in the last 12 months',
      // tension: 0.1,
    },
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      data: lastYearDeletionsCount,
      // fill: true,
      label: 'The number of deletions in the last 12 months',
      // tension: 0.1,
    },
  ];

  return (
    <div className='h-[500px] mb-5' suppressHydrationWarning>
      <Bar options={activityChartOptions} data={{ labels, datasets }} fallbackContent={"Loading..."}/>
    </div>
  );
};

export default ActivityChart