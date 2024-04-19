'use client'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { getSubnetInfo } from '@/app/services/subnetInfo';
import ThemeSwitcherComponent from '@/app/components/common/buttons/ThemeSwitcher/ThemeSwitcher';
import { HomePageWrapper } from '@/app/components/common/wrappers/HomePageWrapper';
import { Loading } from '@/app/components/common/Loading/Loading';
import SubnetStatsChart from '@/app/components/common/Charts/SubnetStatsChart';
import { SubnetData } from '@/app/interfaces/subnetData';

// Context
import { useSidebarContext } from '@/app/context/sidebarContext';

const defaultSubnetData: SubnetData = {
  forks: 0,
  stars: 0,
  watchers: 0,
  repo: '',
  description: '',
  healthPercentage: 0,
  contributors: [],
}

export default function SubnetPage({ params }: { params: { subnet: string[] } }) {
  const subnet = params.subnet.join('/')
  const { isOpen } = useSidebarContext();
  const [subnetData, setSubnetData] = useState<SubnetData>(defaultSubnetData);
  const [isSubnetDataLoading, setIsSubnetDataLoading] = useState<boolean>(true);

  useEffect(() => {
    getSubnetInfo(subnet).then(res => {
      setSubnetData(res.data);
      setIsSubnetDataLoading(false)
    })
  }, []);

  return (
    <HomePageWrapper>
      {isSubnetDataLoading && <Loading />}
      {!isSubnetDataLoading && (
        <div className={classNames('pr-12 py-8 transition-all duration-300 ease-in-out', {
          'pl-72': isOpen,
          'pl-12': !isOpen
        })}>
          <div className='fixed top-4 right-3'>
            <ThemeSwitcherComponent/>
          </div>
          <div className='flex flex-col gap-3.5 pl-5 py-3.5 mb-3 text-gray-500'>
            <h2 className='text-2xl text-gray-400'>{subnet}</h2>
            <p className='text-md'>
              {subnetData.description}
            </p>
            <SubnetStatsChart data={[subnetData]}/>
            <h2 className='text-xl text-gray-400'>Info</h2>
            <p>Health percentage: {subnetData.healthPercentage}</p>
            {subnetData.documentation && (
              <Link href={subnetData.documentation} passHref={true} target='#'>
                Documentation: {subnetData.documentation}
              </Link>
            )}
            {subnetData.contributors.length > 0 && (
              <>
                <h2 className='text-xl text-gray-400'>Contributors</h2>
                <ul>
                  {subnetData.contributors.map((contributor, index) => (
                    <li className='flex items-center gap-3 py-1.5' key={index}>
                      <Image
                        src={contributor.avatar_url || ''}
                        width={40}
                        height={40}
                        alt="Picture of the author"
                      />
                      <Link href={contributor.html_url} passHref={true} target='#'>
                        {contributor.login}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </HomePageWrapper>
  );
}
