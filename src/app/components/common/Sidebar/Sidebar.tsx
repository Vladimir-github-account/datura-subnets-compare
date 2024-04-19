'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';
import classNames from 'classnames';
import { CheckCircle, SortAscending, SortDescending, SquareHalf } from '@phosphor-icons/react';
import { repos } from '@/app/constants';
import { getData } from '@/app/services/github';
import { getStats } from '@/app/services/stats';
import { SidebarListItem } from '@/app/components/common/Sidebar/SidebarListItem';
import { RepositoryData } from '@/app/interfaces/repositoryData';

// Context
import { useDataContext } from '@/app/context/dataContext';
import { useActiveReposContext } from '@/app/context/activeReposContext';
import { useSidebarContext } from '@/app/context/sidebarContext';
import { useDataLoadingContext } from '@/app/context/dataLoadingContext';
import { useStatsLoadingContext } from '@/app/context/statsLoadingContext';

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'default', label: 'Default' },
  { value: 'stars', label: 'Stars' },
  { value: 'watchers', label: 'Watchers' },
  { value: 'forks', label: 'Forks' },
  { value: 'contributorsCount', label: 'Contributors' },
  { value: 'weekCommitsCount', label: 'Last week commits' },
  { value: 'lastMonthCommitsCount', label: 'Last month commits' },
  { value: 'lastThreeMonthsCommitsCount', label: 'Last 3 months commits' },
  { value: 'lastYearCommitsCount', label: 'Last year commits' },
  { value: 'lastYearAdditionsCount', label: 'Last year additions' },
  { value: 'lastYearDeletionsCount', label: 'Last year deletions' },
];

export const Sidebar = () => {
  const { isDataLoading, setIsDataLoading } = useDataLoadingContext();

  const { data, setData } = useDataContext();
  const { activeRepos, setActiveRepos } = useActiveReposContext();
  const { isOpen, setIsOpen } = useSidebarContext();
  const { isStatsLoading, setIsStatsLoading } = useStatsLoadingContext();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  const handleChange = (option: any) => {
    setSelectedOption(option);
    if (option.value === 'default') {
      setActiveRepos(data);
    }
  };

  useEffect(() => {
    if (!data.length) {
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

              setData(prevState => prevState.map((el, index) => ({...el, ...successData[index]})));
              setActiveRepos(prevState=> prevState.map((el: any, index: number) => ({...el, ...successData[index]})));
            })
            .finally(() => setIsStatsLoading(false));
        })
        .finally(() => setIsDataLoading(false));
    }

  }, []);

  useEffect(() => {
    if (sortOrder === 'ASC') {
      setActiveRepos(prevState =>
        [...prevState].sort((a: any, b: any) => a[selectedOption.value] - b[selectedOption.value])
      );
    } else {
      setActiveRepos(prevState =>
        [...prevState].sort((a: any, b: any) => b[selectedOption.value] - a[selectedOption.value])
      );
    }
  }, [sortOrder, selectedOption]);

  return (
    <div
      className={classNames('fixed top-0 bottom-0 overflow-auto bg-secondary-background transition-all duration-300 ease-in-out', {
        'w-12': !isOpen,
        'w-72': isOpen
      })}
      suppressHydrationWarning
    >
      <SquareHalf
        suppressHydrationWarning
        className='absolute top-3 right-3 cursor-pointer'
        role='button'
        size={26}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <>
          <div className='border-b border-gray-100 border-opacity-60'>
            <h2 className='text-2xl my-6 ml-3.5'>Subnets</h2>
          </div>
          <div suppressHydrationWarning className='flex items-center pt-3 px-3 gap-4'>
            <Select
              isDisabled={isStatsLoading || isDataLoading}
              instanceId='sort-select'
              className='w-full font-medium text-[#2f343b]'
              value={selectedOption}
              onChange={handleChange}
              options={options}
            />
            {sortOrder === 'ASC' ? (
              <SortAscending
                className={classNames('cursor-pointer', {
                  'text-gray-400': selectedOption.value === 'default'
                })}
                data-tooltip-id='sort-order'
                data-tooltip-delay-show={300}
                data-tooltip-place='bottom-end'
                size={30}
                onClick={() => {
                  if (selectedOption.value !== 'default'){
                    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
                  }
                }}
              />
            ) : (
              <SortDescending
                className={classNames('cursor-pointer', {
                  'text-gray-400': selectedOption.value === 'default'
                })}
                data-tooltip-id='sort-order'
                data-tooltip-delay-show={300}
                data-tooltip-place='bottom-end'
                size={30}
                onClick={() => {
                  if (selectedOption.value !== 'default'){
                    setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC')
                  }
                }}
              />
            )}
            {selectedOption.value !== 'default' && (
              <Tooltip id='sort-order'>
                Change order
              </Tooltip>
            )}
          </div>
          <div className={classNames(
            'flex justify-between items-center pt-3 px-3 text-gray-400', {
              '!text-primary': activeRepos.length === data.length
            })}>
        <span className='text-md' suppressHydrationWarning>
          {activeRepos.length === data.length ? 'Deselect all' : 'Select all'}
        </span>
            <CheckCircle
              className='cursor-pointer'
              size={30}
              weight={activeRepos.length === data.length ? 'fill' : 'regular'}
              onClick={() => setActiveRepos(activeRepos.length === data.length ? [] : data)}
            />
          </div>
          <ul className='pl-3 py-2 rounded-md'>
            {data.map((el: RepositoryData, index: number) => (
              <SidebarListItem
                activeRepos={activeRepos}
                itemData={el}
                itemIndex={index}
                key={el.repo}
                setActiveRepos={setActiveRepos}
                sortOrder={sortOrder}
                sortingField={selectedOption.value}
              />
            ))}
            <Tooltip id="list-item-tooltip" />
          </ul>
        </>
      )}
    </div>
  );
}