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
  data: RepositoryData[];
  setData: Dispatch<SetStateAction<RepositoryData[]>>;
};

export const DataContext = createContext<Context>({
  data: [],
  setData: () => {},
});

export const DataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<RepositoryData[]>([]);
  const value = useMemo(() => ({ data, setData }), [data]);

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
