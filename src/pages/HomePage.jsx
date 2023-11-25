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

  return (
    <div className="bg-black h-screen w-full text-white px-16">
      <div className="flex flex-row gap-5 justify-center h-full">
        <div className="flex flex-col justify-center basis-1/2 gap-7">
          <div className="text-2xl md:text-5xl font-extrabold transition-all font-mono">
            WHY AUTOCEDI ?
          </div>

          <div className="text-lg transition-opacity duration-500 ease-in-out h-14 w-4/5">
            {displayText ? displayText : ""}
          </div>

          <div className="flex flex-row gap-5 h-16">
            <button className="btn-primary w-48">Learn More</button>
            <button className="btn-primary w-48 border-2 border-white bg-black text-white hover:bg-transparent"
              onClick={()=>navigate('automations/create')}
            >
              Create Automation
            </button>
          </div>

          <div className="font-bold text-base font-mono">
            <p>SOLVING PROBLEMS CONCERNING AUTOMATED PAYMENT</p>
            <p>IN AFRICA . WITH AFRICA . FOR AFRICA - AND BEYOND</p>
          </div>
        </div>

        <div className="flex basis-1/2">

        </div>
      </div>
    </div>
  );
}
