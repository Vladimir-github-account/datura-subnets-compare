import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { ChartBarHorizontal, ChartBar, FlipHorizontal, FlipVertical } from '@phosphor-icons/react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart, ChartDataset, Legend, LinearScale, Tooltip } from 'chart.js';
import { options } from '@/app/mocks/chart.mock';
import { useTheme } from '@/app/components/common/buttons/ThemeSwitcher/ThemeContext';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface ChartProps {
  datasets: ChartDataset<"bar">[],
  isStacked: boolean,
  labels: string[],
  defaultAxis: 'x' | 'y',
}

const MultipleBarChart = ({ datasets, labels, defaultAxis, isStacked }: ChartProps) => {
  const { theme } = useTheme();
  const [indexAxis, setIndexAxis] = useState<'x' | 'y'>(defaultAxis);

  return (
    <>
      <Bar
        options={{
          ...options,
          color: theme === 'light' ? '#2f343b' : '#F3F4F6',
          indexAxis,
          scales: {
            y: {
              stacked: isStacked,
              grid: {
                display: indexAxis === 'x',
                color: "rgb(53, 162, 235, 0.15)",
              },
            },
            x: {
              stacked: isStacked,
              grid: {
                color: "rgb(53, 162, 235, 0.15)",
                display: indexAxis === 'y',
              },
            },
          },
        }}
        data={{ labels, datasets }}
      />
      {indexAxis === 'y' && (
        <ChartBarHorizontal
          className='cursor-pointer absolute top-0 right-3'
          size={32}
          data-tooltip-id='chart-axis'
          data-tooltip-delay-show={300}
          data-tooltip-place='bottom-end'
          onClick={() => setIndexAxis('x')}
        />
      )}
      {indexAxis === 'x' && (
        <ChartBar
          className='cursor-pointer absolute top-0 right-3'
          size={32}
          data-tooltip-id='chart-axis'
          data-tooltip-delay-show={300}
          data-tooltip-place='bottom-end'
          onClick={() => setIndexAxis('y')}
        />
      )}
      <ReactTooltip id='chart-axis'>
        <div className='flex gap-2 select-none'>
          {indexAxis === 'x' ? <FlipVertical size={24} /> : <FlipHorizontal size={24} />}
          <span>{indexAxis === 'x' ? 'Horizontal' : 'Vertical'}</span>
        </div>
      </ReactTooltip>
    </>
  );
};

export default MultipleBarChart