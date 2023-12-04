import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import Root from "../Root";
import AuthLayout from "../pages/auth/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PasswordReset from "../pages/auth/PasswordReset";
import useAuth from "../provider/useAuth";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateAutomationPage from "../pages/automations/CreateAutomationPage";
import ListAutomationsPage from "../pages/automations/ListAutomationsPage";
import ViewAutomationPage from "../pages/automations/ViewAutomationPage";
import Home from "../pages/dashboard/Home";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <HomePage />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/auth/*",
      element: <Navigate to="/dashboard" />, // Wrap the component in ProtectedRoute
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "home",
          element: <Home />,
          //   errorElement: <ErrorPage />,
          //   children: [
          //     {
          //       path: "",
          //       element: <Home />,
          //     },
          //   ],
        },
        {
          path: "automations/create",
          element: <CreateAutomationPage />,
        },
        {
          path: "automations",
          element: <ListAutomationsPage />,
        },
        {
          path: "automations/:id",
          element: <ViewAutomationPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
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
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [...routesForPublic, ...routesForAuthenticatedOnly],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: !token ? routesForNotAuthenticatedOnly : [],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
