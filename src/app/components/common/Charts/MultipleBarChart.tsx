import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { options } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { Stack, StackPlus, StackMinus } from '@phosphor-icons/react';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: RepositoryData[]
}

const MultipleBarChart = ({ data }: ChartProps) => {
  const [isStacked, setIsStacked] = useState(false);
  const { contributorsCount, labels, forks, stars, watchers, lastYearCommitsCount } = data.reduce( (acc: any, el: RepositoryData) => (
      {
        contributorsCount: [...acc.contributorsCount, el.contributorsCount],
        labels: [...acc.labels, el.repo.length > 30 ? el.repo.substring(0, 30) + '...' : el.repo],
        forks: [...acc.forks, el.forks],
        stars: [...acc.stars, el.stars],
        watchers: [...acc.watchers, el.watchers],
        lastYearCommitsCount: [...acc.lastYearCommitsCount, el.lastYearCommitsCount],
      }
    ), {
    contributorsCount: [],
    labels: [],
    lastYearCommitsCount: [],
    forks: [],
    stars: [],
    watchers: [],
    }
  );

  const datasets = [
    {
      label: 'Contributors',
      data: contributorsCount,
      borderColor: "rgb(49,253,112)",
      backgroundColor: "rgba(0,255,166,0.8)",
      maxBarThickness: 250,
    },
    {
      label: 'Watchers',
      data: watchers,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: 'Forks',
      data: forks,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: 'Stars',
      data: stars,
      borderColor: "rgb(241,202,48)",
      backgroundColor: "rgba(253, 216, 53, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: 'Number of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
  ];

  return (
    <div className='h-[600px] mb-12 flex gap-6' suppressHydrationWarning>
      <div className='w-full overflow-auto relative'>
        <Bar
          options={{ ...options, scales: {
            y: {
              stacked: isStacked,
              grid: {
                color: "rgb(53, 162, 235, 0.15)",
              },
            },
            x: {
              stacked: isStacked,
              grid: {
                display: false
              },
            },
          }}}
          data={{ labels, datasets }}
          fallbackContent={"Loading..."}
        />
        <Stack
          className='cursor-pointer absolute top-0 right-14'
          size={32}
          data-tooltip-id='chart-stack'
          data-tooltip-delay-show={300}
          data-tooltip-place='bottom-end'
          onClick={() => setIsStacked( prevState => !prevState)}
        />
        <ReactTooltip id='chart-stack'>
          <div className='flex gap-2'>
            {isStacked ? <StackMinus size={24} /> : <StackPlus size={24} />}
            <span>{isStacked ? 'Unstack' : 'Stack'}</span>
          </div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default MultipleBarChart