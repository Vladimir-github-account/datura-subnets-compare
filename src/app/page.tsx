"use client";
import { getData } from '@/app/services/github';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    getData().then( res => {
      console.log(res.data);
    });
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
