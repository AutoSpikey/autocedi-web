import useAuth from "../provider/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const { token, setToken } = useAuth();
	const navigate = useNavigate();

	return (
		<nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 flex h-14 items-center justify-between border-b border-zinc-200">
				<a href="/" className="flex z-40 font-semibold">
					<img width="32px" height="32px" src="/logo-light.png" />
					<span>autocedi</span>
				</a>
				<div className="hidden items-center space-x-4 sm:flex">
					{token ? (
						<button
							className="px-8"
							onClick={() => {
								setToken();
								navigate();
							}}
						>
							Log Out
						</button>
					) : (
						<a href="/auth/login" className="px-8">
							Log In
						</a>
					)}

					<a
						href={token ? "/dashboard" : "/auth/register"}
						className="inline-flex btn-primary items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black-900 h-11 rounded-md px-8"
					>
						Get started{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="ml-2 h-5 w-5"
						>
							<path d="M5 12h14"></path>
							<path d="m12 5 7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</div>
			{/* TODO: add mobile navbar */}
		</nav>
	);
}
