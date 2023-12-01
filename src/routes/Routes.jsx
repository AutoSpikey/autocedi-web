import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import Root from "../Root";
import AuthLayout from "../pages/auth/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PasswordReset from "../pages/auth/PasswordReset";

const Routes = () => {
	const { token } = useAuth();

	// Define public routes accessible to all users
	const routesForPublic = [
		{
			path: "/",
			element: <Root />,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
			],
		},
	];

	// Define routes accessible only to authenticated users
	const routesForAuthenticatedOnly = [
		{
			path: "/dashboard",
			element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
			children: [
				{
					path: "",
					element: <div>Dashboard Page</div>,
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
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	]);

	// Provide the router configuration using RouterProvider
	return <RouterProvider router={router} />;
};

export default Routes;
