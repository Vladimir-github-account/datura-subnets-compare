import classNames from 'classnames';
import { useDataContext } from '@/app/context/dataContext';
import { useActiveReposContext } from '@/app/context/activeReposContext';
import { CheckCircle } from '@phosphor-icons/react';

export const Sidebar = () => {
  const { data } = useDataContext();
  const { activeRepos, setActiveRepos } = useActiveReposContext();

  return (
    <div className='fixed top-0 bottom-0 w-72 overflow-auto bg-secondary-background' suppressHydrationWarning>
      <div className='border-b border-gray-100 border-opacity-60'>
        <h2 className='text-2xl my-6 ml-3.5'>Subnets</h2>
      </div>
      <div
        className={classNames(
          'flex justify-between items-center pt-3 px-3 text-gray-400', {
            '!text-primary': activeRepos.length === data.length
          }
        )}
      >
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
        {data.map((el: any, index: number) => (
          <li
            className={classNames('text-xs pb-6 mr-1 opacity-80 text-gray-400 cursor-pointer hover:ml-2 transition-all select-none', {
              '!opacity-100 !text-primary': activeRepos.find((repo: any) => repo.repo === el.repo),
            })}
            key={el.repo}
            onClick={() => setActiveRepos((prevState: any) => {
              let arr = [...prevState];
              arr.splice(index, 0, el);
              return prevState.find(((repo: any) => repo.repo === el.repo))
                ? prevState.filter((repo: any) => repo.repo !== el.repo)
                : arr;
            })}
          >
            {el.repo}
          </li>
        ))}
      </ul>
    </div>
  );
}