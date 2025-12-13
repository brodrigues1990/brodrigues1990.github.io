"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const darkTheme: ThemeColors = {
  primary: "#10b981", // green-500
  secondary: "#34d399", // green-400
  accent: "#059669", // green-600
  background: "#000000",
  foreground: "#ffffff",
  muted: "#6b7280", // gray-500
};

const lightTheme: ThemeColors = {
  primary: "#059669", // green-600
  secondary: "#10b981", // green-500
  accent: "#047857", // green-700
  background: "#f9fafb", // gray-50
  foreground: "#111827", // gray-900
  muted: "#9ca3af", // gray-400
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      
      // Update body background
      document.body.style.backgroundColor = theme === "dark" ? "#000000" : "#f9fafb";
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = theme === "dark" ? darkTheme : lightTheme;

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
