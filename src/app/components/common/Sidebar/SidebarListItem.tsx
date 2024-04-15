import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RepositoryData } from '@/app/interfaces/repositoryData';

export const SidebarListItem = ({
  activeRepos,
  itemData,
  itemIndex,
  setActiveRepos,
}: {
  activeRepos: RepositoryData[];
  itemData: RepositoryData;
  itemIndex: number;
  setActiveRepos: Dispatch<SetStateAction<RepositoryData[]>>;
}) => {
  const isSelected = activeRepos.find((repo: any) => repo.repo === itemData.repo)

  return <li
    className={classNames('text-xs mb-6 mr-1 opacity-80 text-gray-400 cursor-pointer hover:ml-2 transition-all select-none', {
      '!opacity-100 !text-primary': isSelected,
    })}
    data-tooltip-class-name='text-xs'
    data-tooltip-content={isSelected ? 'Click to deselect' : 'Click to select'}
    data-tooltip-id="list-item-tooltip"
    data-tooltip-place="bottom-end"
    data-tooltip-delay-show={600}
    onClick={() => {
      setActiveRepos((prevState: any) => {
        let arr = [...prevState];
        arr.splice(itemIndex, 0, itemData);
        return prevState.find(((repo: any) => repo.repo === itemData.repo))
          ? prevState.filter((repo: any) => repo.repo !== itemData.repo)
          : arr;
      })
    }}
  >
    {itemData.repo}
  </li>
}