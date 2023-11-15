import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import App from "./App.jsx";
import Login from "./views/login.jsx";
import HomePage from "./views/home";
import User from "./views/user";
import MarketCard from "./views/marketCard";
import CoinMarket from "./views/coinMarket";

const auth = () => {
  if (!localStorage.token) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: auth,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "marketCard",
        element: <MarketCard />,
      },
      {
        path: "marketCoin",
        element: <CoinMarket />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
