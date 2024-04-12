'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { RepositoryData } from "@/app/interfaces/repositoryData";

type Context = {
  activeRepos: RepositoryData[];
  setActiveRepos: Dispatch<SetStateAction<RepositoryData[]>>;
};

export const ActiveReposContext = createContext<Context>({
  activeRepos: [],
  setActiveRepos: () => {},
});

export const ActiveReposContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeRepos, setActiveRepos] = useState<RepositoryData[]>([]);
  const value = useMemo(() => ({ activeRepos, setActiveRepos }), [activeRepos]);

  return (
    <ActiveReposContext.Provider value={value}>{children}</ActiveReposContext.Provider>
  );
};

export const useActiveReposContext = () => useContext(ActiveReposContext);
