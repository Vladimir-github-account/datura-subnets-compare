import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RepositoryData } from '@/app/interfaces/repositoryData';

export const SidebarListItem = ({
  activeRepos,
  itemData,
  itemIndex,
  setActiveRepos,
  sortingField,
  sortOrder
}: {
  activeRepos: RepositoryData[];
  itemData: RepositoryData;
  itemIndex: number;
  setActiveRepos: Dispatch<SetStateAction<RepositoryData[]>>;
  sortingField: string;
  sortOrder: 'ASC' | 'DESC';
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
        if (sortingField === 'default') {
          arr.splice(itemIndex, 0, itemData);
        } else {
          if (sortOrder === 'ASC') {
            arr = [...arr, itemData].sort((a: any, b: any) => a[sortingField] - b[sortingField]);
          } else {
            arr = [...arr, itemData].sort((a: any, b: any) => b[sortingField] - a[sortingField])
          }
        }
        return prevState.find(((repo: any) => repo.repo === itemData.repo))
          ? prevState.filter((repo: any) => repo.repo !== itemData.repo)
          : arr;
      })
    }}
  >
    {itemData.repo}
  </li>
}