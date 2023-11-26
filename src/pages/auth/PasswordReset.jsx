import { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handlePasswordReset(e) {
    e.preventDefault();

    setIsLoading(true);

    // validate the fields
    if ( !email ) {
      setError("Please fill in the email field");
      setIsLoading(false);
      return;
    }

    const response = await fetch("auth/passwordreset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // const data = await response.json()

    if (response.ok) {
      setEmail("");
      setError(null);
      setIsLoading(false);
    } 
    // if passwprd reset fails
    else {
        const errorData = await response.json();
        setError(errorData.message || "Reset failed");
        setIsLoading(true);
    }

    
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg text-black w-2/5">
      <div className="px-10 lg:px-20 py-8 lg:py-5">
        {/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

        <h1 className="text-lg lg:text-3xl font-bold tracking-wide">
          Enter Email
        </h1>

        {/* <p className="text-gray-400 text-xs lg:text-sm">
          Start automating your payments with AutoCedi
        </p> */}

        {error && (
          <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
        )}

        <form className="mt-4 flex flex-col" onSubmit={handlePasswordReset}>
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
          </div>

          {!isLoading ? (
            <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3 px-5">
              Reset
            </button>
          ) : (
            <button
              className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3 opacity-50"
              disabled
            >
              Resetting...
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
