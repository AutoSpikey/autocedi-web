<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ListAutomationsPage from "./pages/automations/ListAutomationsPage.jsx";
import ViewAutomationPage from "./pages/automations/ViewAutomationPage.jsx";
import CreateAutomationPage from "./pages/automations/CreateAutomationPage.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import PasswordReset from "./pages/auth/PasswordReset.jsx";
import Home from "./pages/dashboard/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "passwordreset",
        element: <PasswordReset />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "automations",
        element: <ListAutomationsPage />,
      },
      {
        path: "automations/create",
        element: <CreateAutomationPage />,
      },
      {
        path: "automations/:automationId",
        element: <ViewAutomationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
>>>>>>> main
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)