import { useEffect, useState } from "react";
import { getAutomations } from "../../lib/client";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function ListAutomationsPage() {
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
		<div className="min-h-screen items-center flex flex-col">
			<Toaster />

			<div className="w-2/3 items-center flex flex-col space-y-10">
				<h1 className="text-3xl p-4">Automations</h1>

				<div className="flex flex-row p-y-8 justify-between w-full">
					<div></div>
					<button
						className="w-48 p-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
						onClick={handleCreateAutomationClick}
					>
						Create Automation
					</button>
				</div>
				<div className="w-full rounded">
					<table className="w-full border-1 rounded-lg shadow-sm">
						<thead className="border-b-4 bg-blue-50 uppercase text-sm text-gray-600">
							<tr className="content-start">
								<th className="p-4 text-left">Label</th>
								<th className="p-4 text-left">Created</th>
								<th className="p-4 text-left">Last Ran</th>
							</tr>
						</thead>
						<tbody>
							{automations.map((automation) => (
								<tr
									key={automation._id}
									className="border-b-2 cursor-pointer hover:bg-gray-100 m-4"
									onClick={() => handleAutomationClick(automation._id)}
								>
									<td className="p-4">{automation.label}</td>
									<td className="p-4">
										{getHumanDateFromNow(automation.createdAt)}
									</td>
									<td className="p-4">
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
}
