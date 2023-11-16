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
import Register from "./views/register";
import MainFeatures from "./views/mainFeatures";
import Admin from "./views/admin";
import ChangeUser from "./views/changeUser";

// google
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "mainpages",
        element: <MainFeatures />,
        loader: auth,
        children: [
          {
            path: "",
            element: <HomePage />,
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
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "changeUser",
            element: <ChangeUser />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="56194176726-t64gmqi99vsf02in6fsjqaqg0vnuiq97.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
