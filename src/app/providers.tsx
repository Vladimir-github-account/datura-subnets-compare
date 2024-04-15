'use client'

import { ReactNode } from 'react';
import ThemeProvider from '@/app/components/common/buttons/ThemeSwitcher/ThemeContext';
import { ActiveReposContextProvider } from '@/app/context/activeReposContext';
import { DataContextProvider } from '@/app/context/dataContext';
import { SidebarProvider } from '@/app/context/sidebarContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DataContextProvider>
        <ActiveReposContextProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ActiveReposContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
}
