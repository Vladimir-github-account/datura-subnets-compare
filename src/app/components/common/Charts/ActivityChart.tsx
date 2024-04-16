import { useState } from 'react';
import { ChartBar, ChartLine } from '@phosphor-icons/react';
import { Bar, Line } from 'react-chartjs-2';
import classNames from 'classnames';
import {
  BarElement,
  LineElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { activityChartBarOptions, activityChartLineOptions } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
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
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');
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
      label: 'The number of additions in the last 12 months',
    },
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      data: lastYearDeletionsCount,
      label: 'The number of deletions in the last 12 months',
    },
  ];

  return (
    <div className='h-[500px] mb-5' suppressHydrationWarning>
      <div className='w-full !h-[500px] relative'>
        {chartType === 'bar' && (
          <Bar options={activityChartBarOptions} data={{ labels, datasets }} />
        )}
        {chartType === 'line' && (
          <Line options={activityChartLineOptions} data={{ labels, datasets }} />
        )}
        <ChartLine
          className={classNames('cursor-pointer absolute top-0 right-16', {
            'text-gray-400': chartType === 'line'
          })}
          size={32}
          onClick={() => {
            if (chartType === 'bar'){
              setChartType( prevState => 'line')
            }
          }}
        />
        <ChartBar
          className={classNames('cursor-pointer absolute top-0 right-6', {
            'text-gray-400': chartType === 'bar'
          })}
          size={32}
          onClick={() => {
            if (chartType === 'line'){
              setChartType( prevState => 'bar')
            }
          }}
        />
      </div>
    </div>
  );
};

export default ActivityChart