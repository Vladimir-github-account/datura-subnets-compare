import React, { ChangeEvent, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { pieChartOptions } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { ChartBar } from '@phosphor-icons/react';
import { useHomePageChartContext } from '@/app/context/homePageChartContext';
import RadioButton from '@/app/components/common/buttons/RadioButton/RadioButton';

Chart.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  data: RepositoryData[]
}

const PieChart = ({ data }: ChartProps) => {
  const { setHomePageChart } = useHomePageChartContext();
  const [field, setField] = useState<'Contributors' | 'Watchers' | 'Forks' | 'Stars' | '# of commits in the last 12 months'>('Stars');
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

  const fields = [
    {
      label: 'Contributors',
      data: contributorsCount,
      borderColor: "rgb(57,243,155)",
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
      label: '# of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
  ];

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as 'Contributors' | 'Watchers' | 'Forks' | 'Stars' | '# of commits in the last 12 months';
    switch (name) {
      case 'Contributors':
        setField('Contributors');
        break;
      case 'Watchers':
        setField('Watchers');
        break;
      case 'Forks':
        setField('Forks');
        break;
      case 'Stars':
        setField('Stars');
        break;
      case '# of commits in the last 12 months':
        setField('# of commits in the last 12 months');
        break;
      default:
        break;
    }
  }

  return (
    <div className='h-[600px] mb-12 flex items-center' suppressHydrationWarning>
      <div className='min-w-[300px] p-3'>
        <p>Please select a field</p>
        <div className="grid gap-3">
          <RadioButton
            name="Stars"
            id="Stars"
            value="Stars"
            text="Stars"
            onChange={onChangeField}
            checked={field === 'Stars'}
          />
          <RadioButton
            name="Contributors"
            id="Contributors"
            value="Contributors"
            text="Contributors"
            onChange={onChangeField}
            checked={field === 'Contributors'}
          />
          <RadioButton
            name="Watchers"
            id="Watchers"
            value="Watchers"
            text="Watchers"
            onChange={onChangeField}
            checked={field === 'Watchers'}
          />
          <RadioButton
            name="Forks"
            id="Forks"
            value="Forks"
            text="Forks"
            onChange={onChangeField}
            checked={field === 'Forks'}
          />
          <RadioButton
            name="# of commits in the last 12 months"
            id="# of commits in the last 12 months"
            value="# of commits in the last 12 months"
            text="# of commits in the last 12 months"
            onChange={onChangeField}
            checked={field === '# of commits in the last 12 months'}
          />
        </div>
      </div>
      <div className='w-full h-[600px] overflow-auto relative'>
        <Pie
          options={{
            ...pieChartOptions,
            scales: {
              y: {
                ticks: {
                  display: false,
                },
                grid: {
                  color: "rgb(53, 162, 235, 0.15)",
                },
              },
              x: {
                ticks: {
                  display: false,
                },
                grid: {
                  color: "rgb(53, 162, 235, 0.15)",
                  display: false,
                },
              },
            },
          }}
          data={{ labels, datasets: fields.filter((dataField) => dataField.label === field) }}
        />
        <ChartBar
          className='cursor-pointer absolute top-0 right-3'
          size={32}
          data-tooltip-id='chart-pie'
          data-tooltip-delay-show={300}
          data-tooltip-place='bottom-end'
          onClick={() => setHomePageChart('bar')}
        />
      </div>
    </div>
  );
};

export default PieChart