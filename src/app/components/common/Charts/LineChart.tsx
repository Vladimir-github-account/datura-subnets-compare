import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

import { lineOptions } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface ChartProps {
  data: RepositoryData[]
}

const LineChart = ({ data }: ChartProps) => {
  const sortedData = [...data].sort( (a: any, b: any) => a.lastYearAdditionsCount - b.lastYearAdditionsCount );
  const { labels, lastYearAdditionsCount, lastYearDeletionsCount } = sortedData.reduce( (acc: any, el: any) => (
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
      backgroundColor: "rgba(0,255,72,0.5)",
      borderColor: "rgb(30,225,90)",
      data: lastYearAdditionsCount,
      fill: true,
      label: 'The number of additions in the last 12 months',
      tension: 0.1,
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgb(255, 99, 132)",
      data: lastYearDeletionsCount,
      fill: true,
      label: 'The number of deletions in the last 12 months',
      tension: 0.1,
    },
  ];

  return (
    <div className='h-[500px] mb-5' suppressHydrationWarning>
      <Line options={lineOptions} data={{ labels, datasets }} fallbackContent={"Loading..."}/>
    </div>
  );
};

export default LineChart