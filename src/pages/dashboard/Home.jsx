import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAutomations } from "../../lib/client";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

const Home = () => {
  const [automations, setAutomations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAutomations()
      .then(setAutomations)
      .catch((error) => toast.error(error.data.message));
  }, []);

  const handleAutomationClick = (automationId) => {
    navigate("/automations/" + automationId);
  };

  const getHumanDateFromNow = (arg) => {
    const argDate = moment(arg);
    const now = moment();
    const text = moment.duration(argDate.diff(now)).humanize(true);
    return text;
  };

  const handleCreateAutomationClick = () => {
    navigate("/automations/create");
  };

  return (
    <div className="min-h-screen flex-col px-64 py-10">
      <div className="flex flex-col gap-y-3">
        <Toaster />
        <h1 className="font-bold text-3xl text-black">Dashboard</h1>
        <p>Welcome to your personal dashboard</p>
      </div>

      <div className="flex flex-col mt-14">
        <h1 className="font-semibold text-xl">Your eCedi Wallet</h1>

        <div className="mt-5 w-full flex flex-row">
          <div className="bg-slate-100 w-2/4 py-10 flex flex-row rounded-lg">
            <div className="w-1/2 px-10 flex flex-col gap-y-3">
              <h1 className="font-semibold">Wallet Balance</h1>
              <p className="text-3xl">GHS 0.00</p>
            </div>

            <div className="border border-slate-400"></div>

            <div className="w-1/2 px-10 flex flex-col gap-y-3">
              <h1 className="font-semibold">Wallet Number</h1>
              <p className="text-2xl">A112233</p>

              <p className="cursor-pointer text-blue-400 mt-5">
                View wallet history
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h1 className="font-semibold text-xl">Automations</h1>

        <div className="flex">
          <button
            className="bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-lg mt-3 px-5 h-11"
            onClick={handleCreateAutomationClick}
          >
            Create Automation
          </button>
        </div>

        <div className="overflow-x-auto mt-5 pr-24">
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
                  onClick={() => handleAutomationClick(automation._id)}
                >
                  <td className="border p-2">{automation.label}</td>
                  <td className="border p-2">
                    {getHumanDateFromNow(automation.createdAt)}
                  </td>
                  <td className="border p-2">
                    {" "}
                    {automation.lastRan
                      ? getHumanDateFromNow(automation.createdAt)
                      : "never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
