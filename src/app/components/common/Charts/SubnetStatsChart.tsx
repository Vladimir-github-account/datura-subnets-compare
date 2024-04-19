import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';
import { SubnetData } from '@/app/interfaces/subnetData';
import React, { useState } from 'react';
import { RadioGroup } from '@/app/components/common/RadioGroup/RadioGroup';

interface ChartProps {
  data: SubnetData[]
}
type SubnetStatsField =
  'Watchers' |
  'Forks' |
  'Stars';

const SubnetStatsChart = ({ data }: ChartProps) => {
  const [fields, setFields] = useState<SubnetStatsField[]>([
    'Watchers',
    'Forks',
    'Stars',
  ]);
  const { labels, forks, stars, watchers } = data.reduce( (acc: any, el: SubnetData) => (
      {
        labels: [...acc.labels, el.repo.length > 30 ? el.repo.substring(0, 30) + '...' : el.repo],
        forks: [...acc.forks, el.forks],
        stars: [...acc.stars, el.stars],
        watchers: [...acc.watchers, el.watchers],
      }
    ), {
      labels: [],
      forks: [],
      stars: [],
      watchers: [],
    }
  );

  const datasets = [
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
        return prevState.includes(e.target.name as SubnetStatsField)
          ? prevState.filter(field => e.target.name as SubnetStatsField !== field)
          : [...prevState, e.target.name as SubnetStatsField]
      }
    );
  }

  return (
    <div className='mb-12'>
      <div className='h-[550px] overflow-auto  flex gap-6' suppressHydrationWarning>
        <div className='w-full min-w-[500px] overflow-auto relative'>
          <MultipleBarChart
            datasets={datasets.filter((dataField) => fields.includes(dataField.label as SubnetStatsField))}
            defaultAxis='x'
            labels={labels}
            isStacked={false}
          />
        </div>
      </div>
      <RadioGroup
        fields={[
          'Watchers',
          'Forks',
          'Stars',
        ]}
        inline
        selectedFields={fields}
        onClickField={onClickField}
      />
    </div>
  );
};

export default SubnetStatsChart