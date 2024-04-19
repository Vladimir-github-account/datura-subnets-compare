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

type Context = {
  isDataLoading: boolean;
  setIsDataLoading: Dispatch<SetStateAction<boolean>>;
};

export const DataLoadingContext = createContext<Context>({
  isDataLoading: true,
  setIsDataLoading: () => {},
});

export const DataLoadingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const value = useMemo(() => ({ isDataLoading, setIsDataLoading }), [isDataLoading]);

  return (
    <DataLoadingContext.Provider value={value}>{children}</DataLoadingContext.Provider>
  );
};

export const useDataLoadingContext = () => useContext(DataLoadingContext);
