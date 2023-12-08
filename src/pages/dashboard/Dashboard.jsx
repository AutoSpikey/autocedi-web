import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAutomations, getCurrentUser, getWallet } from "../../lib/client";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

function Dashboard() {
  const [automations, setAutomations] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const currentHour = new Date().getHours();

  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((error) => toast.error(error.data.message));

    getWallet()
      .then(setWallet)
      .catch((error) => toast.error(error.data.message));

    getAutomations()
      .then(setAutomations)
      .catch((error) => toast.error(error.data.message));
  }, []);

  const handleAutomationClick = (automationId) => {
    navigate(`/dashboard/automations/${automationId}`);
  };

  const getHumanDateFromNow = (arg) => {
    const argDate = moment(arg);
    const now = moment();
    const text = moment.duration(argDate.diff(now)).humanize(true);
    return text;
  };

  const getHumanDateFromUnix = (arg) => {
    if(!arg) return "never";
    const argDate = moment.unix(arg/1000);
    const now = moment();
    const text = moment.duration(argDate.diff(now)).humanize(true);
    return text
  }

  const handleCreateAutomationClick = () => {
    navigate("/dashboard/automations/create");
  };

  return (
    <div className="min-h-screen flex-col lg:px-48 md:px-20 px-5 lg:py-10 py-5">
      <div className="flex flex-col lg:gap-y-3 gap-y-1">
        <Toaster />
        <h1 className="font-bold lg:text-3xl text-xl text-black">
          {greeting}, {user?.firstName}
        </h1>
        <p className="lg:text-base text-xs text-gray-400">
          Welcome to your personal dashboard
        </p>
      </div>

      <div className="flex flex-col lg:mt-10 mt-5">
        <h1 className="font-semibold lg:text-xl text-lg">Your eCedi Wallet</h1>

        <div className="lg:mt-5 mt-3 w-full flex flex-row">
          <div className="bg-slate-100 lg:py-10 py-5 flex flex-row rounded-lg w-full md:w-auto">
            <div className="lg:px-14 md:px-10 px-5 flex flex-col lg:gap-y-3 gap-y-2">
              <h1 className="font-semibold lg:text-base text-sm">
                Wallet Balance
              </h1>
              <p className="lg:text-3xl text-xl">
                GHS <span className="font-semibold">{wallet?.balance}</span>
              </p>
            </div>

            <div className="border border-slate-400"></div>

            <div className="lg:px-14 md:px-10 px-5 flex flex-col lg:gap-y-3 gap-y-2">
              <h1 className="font-semibold lg:text-base text-sm">
                Wallet Number
              </h1>
              <p className="lg:text-3xl text-base font-semibold">
                {wallet?.id}
              </p>

              <p className="cursor-pointer text-blue-400 lg:mt-5 mt-3 lg:text-base text-sm font-semibold">
                View wallet history
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h1 className="font-semibold lg:text-xl text-lg">Automations</h1>

        <div className="flex">
          <button
            className="bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-lg mt-3 px-5 h-11 lg:text-base text-sm"
            onClick={handleCreateAutomationClick}
          >
            Create Automation
          </button>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Label</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Last Ran</th>
              </tr>
            </thead>
            <tbody>
              {automations.map((automation, index) => (
                <tr
                  key={automation._id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 cursor-pointer hover:bg-blue-100"
                      : "bg-white cursor-pointer hover:bg-blue-100"
                  }
                  onClick={() => handleAutomationClick(automation?.oid)}
                >
                  <td className="border p-2">{automation.label}</td>
                  <td className="border p-2">
                    {getHumanDateFromNow(automation.createdAt)}
                  </td>
                  <td className="border p-2">
                    {getHumanDateFromUnix(automation.lastRan) ?? "never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
