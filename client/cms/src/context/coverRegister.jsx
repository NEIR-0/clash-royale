import React from "react";
import { ThemeProvider } from "../context/darkLightMode";
import Register from "../views/register";

const CoverRegister = () => {
  return (
    <ThemeProvider>
      <Register />
    </ThemeProvider>
  );
};

export default CoverRegister;
