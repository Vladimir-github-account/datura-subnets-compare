import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { data, labels, options } from '@/app/mocks/chart.mock';

interface ChartProps {
  activeRange: number
}

const MultipleLineChart = ({ activeRange }: ChartProps) => {
  const chartsLabels = useMemo(() => {
    if (Array.isArray(labels)) {
      return labels.slice(Math.max(labels.length - activeRange, 0))
    }
  }, [labels, activeRange]);

  const chartsData: ChartData<'line'> = useMemo(() => {
    if (Array.isArray(chartsLabels)) {
      return { labels: chartsLabels, ...data }
    }

    return data;
  }, [chartsLabels]);

  return (
    <div className='h-[300px] mb-5'>
      <Line options={options} data={chartsData} fallbackContent={"Loading..."}/>
    </div>
  );
};

export default MultipleLineChart