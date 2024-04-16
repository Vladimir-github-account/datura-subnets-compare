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
  homePageChart: 'bar' | 'pie';
  setHomePageChart: Dispatch<SetStateAction<'bar' | 'pie'>>;
};

export const HomePageChartContext = createContext<Context>({
  homePageChart: 'bar',
  setHomePageChart: () => {},
});

export const HomePageChartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [homePageChart, setHomePageChart] = useState<'bar' | 'pie'>('bar');
  const value = useMemo(() => ({ homePageChart, setHomePageChart }), [homePageChart]);

  return (
    <HomePageChartContext.Provider value={value}>{children}</HomePageChartContext.Provider>
  );
};

export const useHomePageChartContext = () => useContext(HomePageChartContext);
