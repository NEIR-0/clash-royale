import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
        <Outlet />
    </>
  );
}

export default App;
