import { Bar } from 'react-chartjs-2';
import { options } from '@/app/mocks/chart.mock';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { RepositoryData } from '@/app/interfaces/repositoryData';

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
  const { contributorsCount, labels, forks, stars, watchers, lastYearCommitsCount } = data.reduce( (acc: any, el: RepositoryData) => (
      {
        contributorsCount: [...acc.contributorsCount, el.contributorsCount],
        labels: [...acc.labels, el.repo.substring(0,10)],
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
    },
    {
      label: 'Forks',
      data: forks,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
    {
      label: 'Number of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: 'Stars',
      data: stars,
      borderColor: "rgb(241,202,48)",
      backgroundColor: "rgba(253, 216, 53, 0.8)",
    },
    {
      label: 'Watchers',
      data: watchers,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.8)",
      // borderColor: "rgb(0,73,220)",
      // backgroundColor: "rgba(21,50,239,0.8)",
    },
  ];

  return (
    <div className='h-[600px] mb-12 flex gap-6' suppressHydrationWarning>
      <div className='w-full overflow-auto'>
        <Bar options={options} data={{ labels, datasets }} fallbackContent={"Loading..."}/>
      </div>
    </div>
  );
};

export default MultipleBarChart