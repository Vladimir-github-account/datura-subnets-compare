import classNames from 'classnames';
import { CheckCircle, SquareHalf } from '@phosphor-icons/react';
import { useDataContext } from '@/app/context/dataContext';
import { useActiveReposContext } from '@/app/context/activeReposContext';
import { useSidebarContext } from '@/app/context/sidebarContext';
import { SidebarListItem } from '@/app/components/common/Sidebar/SidebarListItem';
import { RepositoryData } from '@/app/interfaces/repositoryData';

export const Sidebar = () => {
  const { data } = useDataContext();
  const { activeRepos, setActiveRepos } = useActiveReposContext();
  const { isOpen, setIsOpen } = useSidebarContext();

  return (
    <div
      className={classNames('fixed top-0 bottom-0 overflow-auto bg-secondary-background', {
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
          <ul className='px-3 py-2 rounded-md'>
            {data.map((el: RepositoryData, index: number) => (
              <SidebarListItem
                activeRepos={activeRepos}
                itemData={el}
                itemIndex={index}
                key={el.repo}
                setActiveRepos={setActiveRepos}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}