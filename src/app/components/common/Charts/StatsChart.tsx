import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { ChartPie, Stack, StackPlus, StackMinus } from '@phosphor-icons/react';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { useHomePageChartContext } from '@/app/context/homePageChartContext';
import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';
import { RadioGroup } from '@/app/components/common/RadioGroup/RadioGroup';

interface ChartProps {
  data: RepositoryData[]
}

type StatChartField =
  'Contributors' |
  'Watchers' |
  'Forks' |
  'Stars';

const StatsChart = ({ data }: ChartProps) => {
  const { setHomePageChart } = useHomePageChartContext();
  const [fields, setFields] = useState<StatChartField[]>([
    'Contributors',
    'Watchers',
    'Forks',
    'Stars',
  ]);
  const [isStacked, setIsStacked] = useState(true);
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
  ];

  const onClickField = (e: any) => {
    setFields(prevState => {
        return prevState.includes(e.target.name as StatChartField)
          ? prevState.filter(field => e.target.name as StatChartField !== field)
          : [...prevState, e.target.name as StatChartField]
      }
    );
  }

  return (
    <div className='flex flex-col mb-12'>
      <div className='h-[700px] overflow-auto flex gap-6' suppressHydrationWarning>
        <div className='w-full min-w-[900px] overflow-auto relative'>
          <MultipleBarChart
            datasets={datasets.filter((dataField) => fields.includes(dataField.label as StatChartField))}
            defaultAxis='y'
            labels={labels}
            isStacked={isStacked}
          />
          <Stack
            className='cursor-pointer absolute top-0 right-24'
            size={32}
            data-tooltip-id='chart-stack'
            data-tooltip-delay-show={300}
            data-tooltip-place='bottom-end'
            onClick={() => setIsStacked(prevState => !prevState)}
          />
          <ReactTooltip id='chart-stack'>
            <div className='flex gap-2'>
              {isStacked ? <StackMinus size={24}/> : <StackPlus size={24}/>}
              <span>{isStacked ? 'Unstack' : 'Stack'}</span>
            </div>
          </ReactTooltip>
          <ChartPie
            className='cursor-pointer absolute top-0 right-[52px]'
            size={32}
            data-tooltip-id='chart-pie'
            data-tooltip-delay-show={300}
            data-tooltip-place='bottom-end'
            onClick={() => setHomePageChart('pie')}
          />
        </div>
      </div>
      <RadioGroup
        fields={[
          'Contributors',
          'Watchers',
          'Forks' ,
          'Stars',
        ]}
        inline
        selectedFields={fields}
        onClickField={onClickField}
      />
    </div>
  );
};

export default StatsChart