import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ListAutomationsPage from "./pages/ListAutomationsPage.jsx";
import ViewAutomationPage from "./pages/ViewAutomationPage.jsx";
import CreateAutomationPage from "./pages/CreateAutomationPage.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import PasswordReset from "./pages/auth/PasswordReset.jsx";


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
      }
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
