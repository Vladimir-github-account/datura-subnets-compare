import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { ChartBar } from '@phosphor-icons/react';
import { pieChartOptions } from '@/app/mocks/chart.mock';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { RadioGroup } from '@/app/components/common/RadioGroup/RadioGroup';
import { useHomePageChartContext } from '@/app/context/homePageChartContext';

Chart.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  data: RepositoryData[]
}

const PieChart = ({ data }: ChartProps) => {
  const { setHomePageChart } = useHomePageChartContext();
  const [field, setField] = useState<'Contributors' | 'Watchers' | 'Forks' | 'Stars'>('Stars');
  const { contributorsCount, labels, forks, stars, watchers } = data.reduce( (acc: any, el: RepositoryData) => (
      {
        contributorsCount: [...acc.contributorsCount, el.contributorsCount],
        labels: [...acc.labels, el.repo.length > 30 ? el.repo.substring(0, 30) + '...' : el.repo],
        forks: [...acc.forks, el.forks],
        stars: [...acc.stars, el.stars],
        watchers: [...acc.watchers, el.watchers],
      }
    ), {
      contributorsCount: [],
      labels: [],
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
    },
    {
      label: 'Watchers',
      data: watchers,
      borderColor: "rgb(255, 99, 44)",
      backgroundColor: "rgba(255, 99, 44, 0.8)",
    },
    {
      label: 'Forks',
      data: forks,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
    {
      label: 'Stars',
      data: stars,
      borderColor: "rgb(241,202,48)",
      backgroundColor: "rgba(253, 216, 53, 0.8)",
    },
  ];

  const onClickField = (e: any) => {
    setField(e.target.name as 'Contributors' | 'Watchers' | 'Forks' | 'Stars');
  }

  return (
    <div className='h-[600px] mb-12 flex items-center' suppressHydrationWarning>
      <RadioGroup
        fields={['Contributors', 'Watchers', 'Forks', 'Stars']}
        selectedFields={[field]}
        onClickField={onClickField}
      />
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
          className='cursor-pointer absolute top-0 right-[52px]'
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