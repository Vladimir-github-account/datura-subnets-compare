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
  isStatsLoading: boolean;
  setIsStatsLoading: Dispatch<SetStateAction<boolean>>;
};

export const StatsLoadingContext = createContext<Context>({
  isStatsLoading: true,
  setIsStatsLoading: () => {},
});

export const StatsLoadingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);
  const value = useMemo(() => ({ isStatsLoading, setIsStatsLoading }), [isStatsLoading]);

  return (
    <StatsLoadingContext.Provider value={value}>{children}</StatsLoadingContext.Provider>
  );
};

export const useStatsLoadingContext = () => useContext(StatsLoadingContext);
