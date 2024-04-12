'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeEnum } from "./theme.types";

type ThemeContextType = {
  theme: ThemeEnum;
  toggleTheme: () => void;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultTheme = typeof window !== "undefined" ? window.localStorage.getItem('theme') || ThemeEnum.light : ThemeEnum.light;
  const [theme, setTheme] = useState<ThemeEnum>(defaultTheme as ThemeEnum);

  useEffect(() => {
    if (
      window.localStorage.getItem('theme') === ThemeEnum.dark ||
      (!window.localStorage.getItem('theme') &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add(ThemeEnum.dark);
      localStorage.setItem('theme', ThemeEnum.dark);
    } else {
      document.documentElement.classList.remove(ThemeEnum.dark);
      localStorage.setItem('theme', ThemeEnum.light);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light;
    document.documentElement.classList.toggle(ThemeEnum.dark, newTheme === ThemeEnum.dark);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;