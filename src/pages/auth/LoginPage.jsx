import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState();

  async function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true);

    // validate the fields
    if ( !email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const response = await fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // const data = await response.json()

    if (response.ok) {
      setEmail("");
      setPassword("");
      setError(null);
      setIsLoading(false);
    }

    // if register fails
  }
  // oh wow

  return (
    <div className="bg-white rounded-2xl shadow-lg text-black ">
      <div className="px-10 lg:px-20 py-8 lg:py-5">
        {/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

        <h1 className="text-lg lg:text-3xl font-bold tracking-wide">
          Login Here
        </h1>

        {/* <p className="text-gray-400 text-xs lg:text-sm">
          Start automating your payments with AutoCedi
        </p> */}

        {error && (
          <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
        )}

        <form className="mt-4 flex flex-col" onSubmit={handleLogin}>
          <div className="flex flex-col">
            
            <div className="flex flex-col">
              <label className="text-sm lg:text-base font-semibold">
                Email
              </label>
              <input
                type="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 lg:mb-3 mt-2 p-2 lg:p-2 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
              />
            </div>
          </div>

          {!isLoading ? (
            <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3 px-5">
              Login
            </button>
          ) : (
            <button
              className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
              disabled
            >
              Logging In...
            </button>
          )}
          <div className="text-center mt-4">
            <a href="/auth/passwordreset" className="text-blue-500 hover:underline">Forgot Password?</a>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
