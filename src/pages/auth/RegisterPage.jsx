import { useState } from "react";
import * as Client from "../../lib/client";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [otherNames, setOtherNames] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleRegister(e) {
		e.preventDefault();

		setIsLoading(true);

		// validate the fields
		if (!firstName || !lastName || !email || !password) {
			setError("Please fill in all fields");
			setIsLoading(false);
			return;
		}

		const payload = { firstName, lastName, email, password, phone, otherNames };

		console.log(payload);

		const registrationPromise = Client.register(payload);
		toast.promise(registrationPromise, {
			loading: "Registering user",
			success: "Registered successfully",
			error: "Registration failed",
		});

		registrationPromise.then(() => {
			setError(null);
			setIsLoading(false);
      navigate("/auth/login")
		}).catch(() => {
			setIsLoading(false);
    });
	}

	return (
		<div className="bg-white rounded-2xl shadow-lg text-black w-2/5">
			<div>
				<Toaster />
			</div>

			<div className="px-10 lg:px-20 py-8 lg:py-5">
				{/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

				<h1 className="text-lg lg:text-3xl font-bold tracking-wide">
					Create your account
				</h1>

				<p className="text-gray-400 text-xs lg:text-sm">
					Start automating your payments with AutoCedi
				</p>

				{error && (
					<p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
				)}

				<form className="mt-4 flex flex-col" onSubmit={handleRegister}>
					<div className="flex flex-col">
						<div className="flex flex-col">
							<label className="text-sm lg:text-base font-semibold">
								First Name
							</label>
							<input
								type="text"
                name="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>

						<div>
							<label className="text-sm lg:text-base font-semibold">
								Other Names
							</label>
							<input
								type="text"
                name="otherNames"
								value={otherNames}
								onChange={(e) => setOtherNames(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-sm lg:text-base font-semibold">
								Last Name
							</label>
							<input
								type="text"
                name="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-sm lg:text-base font-semibold">
								Phone Number
							</label>
							<input
								type="tel"
                name="phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-sm lg:text-base font-semibold">
								Email
							</label>
							<input
								type="email"
                name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-sm lg:text-base font-semibold">
								Password
							</label>
							<input
								type="password"
                name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
							/>
						</div>
					</div>

					{!isLoading ? (
						<button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-lg mt-3 px-5 h-11">
							Continue
						</button>
					) : (
						<button
							className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-lg mt-3 h-11 p-8"
							disabled
						>
							Hold on we&apos;re setting up your account...
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
