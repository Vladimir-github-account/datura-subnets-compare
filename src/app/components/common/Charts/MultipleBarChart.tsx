import { useState } from 'react';
import classNames from 'classnames';
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
  const [activeRepos, setActiveRepos] = useState<any>(data);

  const { contributorsCount, labels, forks, stars, watchers, subscribers, lastYearCommitsCount } = activeRepos.reduce( (acc: any, el: any, index: number) => (
      {
        contributorsCount: [...acc.contributorsCount, el.contributorsCount],
        labels: [...acc.labels, el.repo.substring(0,10)],
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
      label: 'Contributors',
      data: contributorsCount,
      borderColor: "rgb(49,253,112)",
      backgroundColor: "rgba(0,255,166,0.5)",
    },
    {
      label: 'Forks',
      data: forks,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: 'Number of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.5)",
    },
    {
      label: 'Stars',
      data: stars,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: 'Subscribers',
      data: subscribers,
      borderColor: "rgb(0,73,220)",
      backgroundColor: "rgba(0,5,253,0.5)",
    },
    {
      label: 'Watchers',
      data: watchers,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.5)",
    },
  ];

  return (
    <div className='h-[600px] mb-12 flex gap-6' suppressHydrationWarning>
      <ul className='min-w-[300px] overflow-auto border border-gray-400 p-2 rounded-md' suppressHydrationWarning>
        <span>Subnets</span>
        {data.map( (el: any, index: number)   => (
          <li
            className={classNames('text-xs border-b border-gray-280 pt-2 mr-1 opacity-35 cursor-pointer hover:ml-2 transition-all select-none', {
              '!opacity-100': activeRepos.find((repo: any) => repo.repo === el.repo),
            })}
            key={el.repo}
            onClick={() => setActiveRepos((prevState: any) => {
              let arr = [...prevState];
              arr.splice(index, 0, el);
              return prevState.find(((repo: any) => repo.repo === el.repo))
                ? prevState.filter((repo: any) => repo.repo !== el.repo)
                : arr;
            })}
          >
            {el.repo}
          </li>
        ))}
      </ul>
      <div className='w-full overflow-auto'>
        <Bar options={options} data={{ labels, datasets }} fallbackContent={"Loading..."}/>
      </div>
    </div>
  );
};

export default MultipleBarChart