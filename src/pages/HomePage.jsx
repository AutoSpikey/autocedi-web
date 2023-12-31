import { useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";

export default function HomePage() {
  const texts = [
    "Pay your tithes as soon as your salary hits",
    "Never forget to send money to your loved ones",
    "Pay your rent without having to think about it",
    "Never miss a payment on your loans"
  ];

	return (
		<div className="v-full w-full align-middle min-h-screen">
			<div className="mx-auto w-full max-w-screen-xl h-full  px-2.5 md:px-20 mb-12 mt-14 sm:mt-20 flex flex-col items-center justify-center text-center">
      <img
            width={"128px"} 
            className="m-8"
            src="logo-labelled-light.png"
          />
				
				<h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl m-8">
					Super Flexible{" "}
					<span className="text-blue-600">Automated Payments</span> with your{" "}
					<span className="text-yellow-300">eCedi</span>.
				</h1>

				<div className="flex flex-row text-xl font-light transition-opacity duration-500 ease-in-out mt-10 max-w-prose text-zinc-700 sm:text-lg">
          <TypewriterComponent
            options={{
              strings: texts,
              autoStart: true,
              loop: true,
              deleteSpeed: 5,
              delay:17
            }}
          />
				</div>

				<a
					className="inline-flex btn-primary m-8 items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black-900 h-11 rounded-md px-8 mt-5"
					href="/auth/register"
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

			<div className="mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mt-16 flow-root sm:mt-24">
					<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
						<img
							className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
							src="/assets/automation_ss01.png"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
