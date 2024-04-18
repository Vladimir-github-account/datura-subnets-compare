'use client'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getData } from '@/app/services/github';
import { getStats } from '@/app/services/stats';
import { repos } from '@/app/constants';
import ActivityChart from '@/app/components/common/Charts/ActivityChart';
import ThemeSwitcherComponent from '@/app/components/common/buttons/ThemeSwitcher/ThemeSwitcher';
import PieChart from '@/app/components/common/Charts/PieChart';
import StatsChart from '@/app/components/common/Charts/StatsChart';
import CommitsActivityChart from '@/app/components/common/Charts/CommitsActivityChart';
import { HomePageWrapper } from '@/app/components/common/wrappers/HomePageWrapper';

// Context
import { useDataContext } from '@/app/context/dataContext';
import { useActiveReposContext } from '@/app/context/activeReposContext';
import { useSidebarContext } from '@/app/context/sidebarContext';
import { useHomePageChartContext } from '@/app/context/homePageChartContext';
import { useStatsLoadingContext } from '@/app/context/dataLoadingContext';

export default function Home() {
  const { data, setData } = useDataContext();
  const { activeRepos,setActiveRepos } = useActiveReposContext();
  const { homePageChart } = useHomePageChartContext();
  const { isOpen } = useSidebarContext();
  const { isStatsLoading, setIsStatsLoading } = useStatsLoadingContext();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);


  useEffect(() => {
    const promises = repos.map( repo => getData(repo));
    Promise.allSettled(promises)
      .then(data => {
        const successData = data.reduce( (acc: any, el) => {
            if (el.status === 'rejected') {
              return acc
            }
            return [...acc, el.value.data]
          }, []
        );

        setData(successData);
        setActiveRepos(successData);
      })
      .finally(() => setIsDataLoading(false));
  }, []);

  useEffect(() => {
    if (data.length && isStatsLoading) {
      const statsPromises = repos.map( repo => getStats(repo));
      Promise.allSettled(statsPromises)
        .then(responseData => {
          const successData = responseData.reduce( (acc: any, el) => {
              if (el.status === 'rejected') {
                return acc
              }
              return [...acc, el.value.data]
            }, []
          );

          setData(data.map((el, index) => ({...el, ...successData[index]})));
          setActiveRepos(data.map((el, index) => ({...el, ...successData[index]})));
        })
        .finally(() => setIsStatsLoading(false));
    }
  }, [data.length, isStatsLoading]);

  return (
    <HomePageWrapper>
      {isDataLoading && (
        <div className='pl-72 min-h-screen flex justify-center items-center' role="status" suppressHydrationWarning>
          <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {data && data.length > 0 && (
        <div className={classNames('pr-12 py-8 transition-all duration-300 ease-in-out', {
          'pl-72': isOpen,
          'pl-12': !isOpen
        })}>
          <div className='fixed top-4 right-3'>
            <ThemeSwitcherComponent/>
          </div>
          <h2 className='pl-5 py-3.5 mb-3 text-xl text-gray-500'>Stats</h2>
          {homePageChart === 'bar' && <StatsChart data={activeRepos}/>}
          {homePageChart === 'pie' && <PieChart data={activeRepos}/>}
          <h2 className='pl-5 py-3.5 mb-3 text-xl text-gray-500'>Activity</h2>
          {isStatsLoading ? (
            <div className='flex justify-center items-center' role="status" suppressHydrationWarning>
              <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                   viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <CommitsActivityChart data={activeRepos}/>
              <ActivityChart data={activeRepos}/>
            </>
          )}
        </div>
      )}
    </HomePageWrapper>
  );
}
