import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';
import { SubnetData } from '@/app/interfaces/subnetData';

interface ChartProps {
  data: SubnetData[]
}

const SubnetStatsChart = ({ data }: ChartProps) => {
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

  return (
    <div className='h-[600px] overflow-auto mb-12 flex gap-6' suppressHydrationWarning>
      <div className='w-full min-w-[500px] overflow-auto relative'>
        <MultipleBarChart
          datasets={datasets}
          defaultAxis='x'
          labels={labels}
          isStacked={false}
          isDisplayLegend
        />
      </div>
    </div>
  );
};

export default SubnetStatsChart