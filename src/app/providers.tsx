'use client'

import { ReactNode } from 'react';
import ThemeProvider from '@/app/components/common/buttons/ThemeSwitcher/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
