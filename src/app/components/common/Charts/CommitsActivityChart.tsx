import React, { ChangeEvent, useState } from 'react';
import { RepositoryData } from '@/app/interfaces/repositoryData';
import { RadioGroup } from '@/app/components/common/RadioGroup/RadioGroup';
import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';

interface ChartProps {
  data: RepositoryData[]
}

type CommitActivityField =
  '# of commits in the last 12 months' |
  '# of commits in the last 4 weeks' |
  '# of commits in the last week' |
  '# of commits in the last 3 months';

const CommitsActivityChart = ({ data }: ChartProps) => {
  const [field, setField] = useState<CommitActivityField>('# of commits in the last week');
  const { labels, lastYearCommitsCount, lastMonthCommitsCount, lastThreeMonthsCommitsCount, weekCommitsCount } = data.reduce( (acc: any, el: RepositoryData) => (
      {
        labels: [...acc.labels, el.repo.length > 20 ? el.repo.substring(0, 20) + '...' : el.repo],
        weekCommitsCount: [...acc.weekCommitsCount, el.weekCommitsCount],
        lastMonthCommitsCount: [...acc.lastMonthCommitsCount, el.lastMonthCommitsCount],
        lastThreeMonthsCommitsCount: [...acc.lastThreeMonthsCommitsCount, el.lastThreeMonthsCommitsCount],
        lastYearCommitsCount: [...acc.lastYearCommitsCount, el.lastYearCommitsCount],
      }
    ), {
      labels: [],
      lastMonthCommitsCount: [],
      weekCommitsCount: [],
      lastThreeMonthsCommitsCount: [],
      lastYearCommitsCount: [],
    }
  );

  const chartLabels = labels.filter((label, index) => {
    if (field === '# of commits in the last week') {
      return weekCommitsCount[index] !== 0;
    }
    if (field === '# of commits in the last 4 weeks'){
      return lastMonthCommitsCount[index] !== 0;
    }
    if (field === '# of commits in the last 3 months'){
      return lastThreeMonthsCommitsCount[index] !== 0;
    }
    if (field === '# of commits in the last 12 months'){
      return lastYearCommitsCount[index] !== 0;
    }
  })

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as CommitActivityField);
  }

  const datasets = [
    {
      label: '# of commits in the last week',
      data: weekCommitsCount.filter(el => el !== 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: '# of commits in the last 4 weeks',
      data: lastMonthCommitsCount.filter(el => el !== 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: '# of commits in the last 3 months',
      data: lastThreeMonthsCommitsCount.filter(el => el !== 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
    {
      label: '# of commits in the last 12 months',
      data: lastYearCommitsCount.filter(el => el !== 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      maxBarThickness: 250,
    },
  ];

  return (
    <div className='h-[800px] mb-12 flex items-center gap-6' suppressHydrationWarning>
      <RadioGroup
        fields={[
          '# of commits in the last week',
          '# of commits in the last 4 weeks',
          '# of commits in the last 3 months',
          '# of commits in the last 12 months',
        ]}
        selectedField={field}
        onChangeField={onChangeField}
      />
      <div className='w-full h-[800px] min-w-[900px] overflow-auto relative'>
        <MultipleBarChart
          datasets={datasets.filter((dataField) => dataField.label === field)}
          defaultAxis='x'
          labels={chartLabels}
          isStacked={false}
        />
      </div>
    </div>
  );
};

export default CommitsActivityChart