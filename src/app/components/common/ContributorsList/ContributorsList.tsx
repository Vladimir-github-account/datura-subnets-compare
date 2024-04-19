import Image from 'next/image';
import Link from 'next/link';
import { Contributor } from "@/app/interfaces/subnetData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const ContributorsList = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <>
      <h2 className='text-xl text-gray-400'>Contributors</h2>
      <ul>
        {contributors.map((contributor, index) => {
          const labels = contributor.weeks.map(el => new Date(el.w * 1000).toLocaleDateString());

          const data = {
            labels,
            datasets: [
              {
                label: 'Additions',
                data: contributor.weeks.map(el => el.a),
                borderColor: "rgb(49,253,112)",
                backgroundColor: "rgba(0,255,166,0.6)",

              },
              {
                label: 'Deletions',
                data: contributor.weeks.map(el => el.d),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Commits',
                data: contributor.weeks.map(el => el.c),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
          return (
            <li className='flex flex-col gap-3 py-1.5' key={index}>
              <div className='flex items-center gap-3'>
                <Image
                  src={contributor.author.avatar_url || ''}
                  width={40}
                  height={40}
                  alt="Picture of the author"
                />
                <Link href={contributor.author.html_url} passHref={true} target='#'>
                  {contributor.author.login}
                </Link>
              </div>
              <div>
                <p>Total commits: {contributor.total} </p>
                <div className='h-80'>
                  <Line data={data} options={options}/>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}