"use client";
import { useEffect, useState } from 'react';
import { getData } from '@/app/services/github';
import { repos } from '@/app/constants';
import MultipleBarChart from '@/app/components/common/Charts/MultipleBarChart';
import LineChart from '@/app/components/common/Charts/LineChart';

export default function Home() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const promises = repos.map( repo => getData(repo));
    Promise.allSettled(promises).then(data => {
      setData(data.reduce( (acc: any, el) => {
        if (el.status === 'rejected') {
          return acc
        }
        return [...acc, el.value.data]
        }, []
      ))
    })
  }, []);

  return (
    <div className="min-h-screen px-16 py-10" suppressHydrationWarning>
      <MultipleBarChart data={data}/>
      <LineChart data={data}/>
    </div>
  );
}
