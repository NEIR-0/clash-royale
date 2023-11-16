import React from "react";
import { ThemeProvider } from "../context/darkLightMode";
import Login from "../views/login";

const CoverLogin = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

export default CoverLogin;
