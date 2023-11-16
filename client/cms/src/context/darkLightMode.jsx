import { useState } from "react";
import { createContext } from "react";

const useTheme = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleThame = () => {
    setTheme((last) => (last === "light" ? "dark" : "light"));
  };

  return <useTheme.Provider value={{ theme, handleThame }}>{children}</useTheme.Provider>;
};

export { ThemeProvider, useTheme };
