'use client'

import { ReactNode } from 'react';
import ThemeProvider from '@/app/components/common/buttons/ThemeSwitcher/ThemeContext';
import { ActiveReposContextProvider } from '@/app/context/activeReposContext';
import { DataContextProvider } from '@/app/context/dataContext';
import { SidebarProvider } from '@/app/context/sidebarContext';
import { HomePageChartProvider } from '@/app/context/homePageChartContext';
import { StatsLoadingContextProvider } from '@/app/context/dataLoadingContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DataContextProvider>
        <ActiveReposContextProvider>
          <StatsLoadingContextProvider>
            <SidebarProvider>
              <HomePageChartProvider>
                {children}
              </HomePageChartProvider>
            </SidebarProvider>
          </StatsLoadingContextProvider>
        </ActiveReposContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
}
