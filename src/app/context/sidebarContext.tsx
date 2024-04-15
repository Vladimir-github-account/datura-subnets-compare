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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<Context>({
  isOpen: true,
  setIsOpen: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
