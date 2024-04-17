import React, { ChangeEvent, useState } from 'react';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { RadioGroup } from '@/app/components/common/RadioGroup/RadioGroup';
import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';

interface ChartProps {
  data: RepositoryData[]
}

const CommitsActivityChart = ({ data }: ChartProps) => {
  const [field, setField] = useState<'# of commits in the last 12 months'>('# of commits in the last 12 months');
  const {  labels, lastYearCommitsCount } = data.reduce( (acc: any, el: RepositoryData) => (
      {
        labels: [...acc.labels, el.repo.length > 20 ? el.repo.substring(0, 20) + '...' : el.repo],
        lastYearCommitsCount: [...acc.lastYearCommitsCount, el.lastYearCommitsCount],
      }
    ), {
      labels: [],
      lastYearCommitsCount: [],
    }
  );

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as '# of commits in the last 12 months');
  }

  const datasets = [
    {
      label: '# of commits in the last 12 months',
      data: lastYearCommitsCount,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
  ];

  return (
    <div className='h-[600px] mb-12 flex items-center gap-6' suppressHydrationWarning>
      <RadioGroup
        fields={['# of commits in the last 12 months']}
        selectedField={field}
        onChangeField={onChangeField}
      />
      <div className='w-full h-[600px] overflow-auto relative'>
        <MultipleBarChart
          datasets={datasets}
          defaultAxis='x'
          labels={labels}
          isStacked={false}
        />
      </div>
    </div>
  );
};

export default CommitsActivityChart