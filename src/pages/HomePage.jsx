import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const texts = [
    "The ultimate payment automation solution, saving time and reducing manual workload.",
    "Empowering you to create custom automations for efficiency and accuracy.",
    "Streamline payments, simplify transactions, and unlock productivity for your business.",
  ];

  let currentIndex = 0;
  let charIndex = 0;
  let currentText = "";
  const timeout = 100;
  const cleaningTimeout = 50;
  const [displayText, setDisplayText] = useState("");

  const typeText = async () => {
    let pointedText = texts[currentIndex];
    currentText = currentText + pointedText.charAt(charIndex);
    setDisplayText(currentText);
    charIndex = charIndex + 1;

    if (charIndex >= pointedText.length) {
      setTimeout(() => clearText(), 2000);
      return;
    }

    setTimeout(() => typeText(), timeout);
  };

  const clearText = async () => {
    currentText = currentText.slice(0, -1);
    setDisplayText(currentText);

    if (currentText === "") {
      if (currentIndex === texts.length - 1) currentIndex = 0;
      else {
        currentIndex = currentIndex + 1;
      }
      charIndex = 0;
      setTimeout(() => typeText(), 1000);
      return;
    }

    setTimeout(() => clearText(), cleaningTimeout);
  };

  useEffect(() => {
    typeText();
  }, []);

  const HomePageButton = ({ heading, description }) => {
    return (
      <div className="flex flex-col px-5 py-5 border-2 border-black rounded-full w-64 h-56 justify-self-center justify-center place-items-center text-center hover:bg-cyan-100">
        <div className="font-bold text-lg">{heading}</div>
        <div className="font-normal text-xs text-center">{description}</div>
      </div>
    );
  };

  return (
    <div className="h-full w-screen">
      <div className="flex flex-col h-[80vh] items-center place-content-center bg-gradient-to-br from-black to-gray-800 w-full text-white py-24 text-center gap-5">
        <div className="flex flex-row text-2xl md:text-6xl font-extrabold transition-all font-mono text-center justify-items-center ">
          WHY AUTOCEDI ?
        </div>

        <div className="flex flex-row text-xl font-light transition-opacity duration-500 ease-in-out">
          {displayText ? displayText : <br />}
        </div>

        <div className="flex flex-row gap-5 h-16">
          <button className="btn-primary w-48">Learn More</button>
          <button
            className="btn-primary w-48 border-2 border-white bg-transparent text-white hover:bg-black"
            onClick={() => navigate("automations/create")}
          >
            Login
          </button>
        </div>

        <div className="flex flex-row font-bold text-base font-mono">
          <p className="text-xl">
            SOLVING PROBLEMS CONCERNING AUTOMATED PAYMENT IN AFRICA . WITH
            AFRICA . FOR AFRICA - AND BEYOND
          </p>
        </div>
      </div>

      <div className="bg-slate-200 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 content-center place-content-center px-40">
          <HomePageButton
            heading={`Rule Your Transactions`}
            description={`This catchphrase emphasizes the empowerment users gain by having
              control over their transactions through your automated payment
              solution.`}
          />

          <HomePageButton
            heading={`Swift eCedi Payments`}
            description={`Highlight the seamless experience your web application provides
            for users to make transactions using the eCedi digital currency.`}
          />

          <HomePageButton
            heading={`Automate with Trust`}
            description={`This catchphrase communicates trust and confidence in the
            automation capabilities of your solution, assuring users that
            their payments are in reliable hands.`}
          />

          <HomePageButton
            heading={`Transform Payments, Rule by Rule`}
            description={`Emphasize the transformative aspect of your solution, showcasing
            how users can revolutionize their payment processes through the
            creation of personalized rules.`}
          />
        </div>
      </div>

      <div className="flex h-[70vh] place-content-center items-center">
        <img
          className="border border-black rounded-lg h-[35vh] sm:h-[40vh] lg:h-[60vh] shadow-2xl"
          src="assets/automation_ss01.png"
        />
      </div>

      <div className="bg-black h-44">

      </div>
    </div>
  );
}
