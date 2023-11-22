import { useEffect, useState } from "react";
import { getAutomations } from "../lib/client";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

	const handleCreateAutomationClick = () => {
		navigate("/automations/create");
	};

	return (
		<div className="min-h-screen items-center justify-center flex flex-col">
			<Toaster />
			<h1 className="text-3xl p-4">Automations</h1>
			<div>
				<button
					className="w-full p-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
					onClick={handleCreateAutomationClick}
				>
					Create
				</button>
			</div>
			<table className="table-auto border min-h-[60%]">
				<thead>
					<tr>
						<th>Trigger Type</th>
						<th>Condition Field</th>
						<th>Condition Type</th>
						<th>Condition Value</th>
						<th>Pay Type</th>
						<th>Pay Value</th>
						<th>Account Type</th>
						<th>Account Info</th>
					</tr>
				</thead>
				<tbody>
					{automations.map((automation) => (
						<tr
							key={automation._id}
							className="cursor-pointer hover:bg-slate-100"
							onClick={() => handleAutomationClick(automation._id)}
						>
							<td className="p-4">{automation.trigger.type}</td>
							<td className="p-4">
								{automation.conditions[0]?.conditionField ?? ""}
							</td>
							<td className="p-4">
								{automation.conditions[0]?.conditionType ?? ""}
							</td>
							<td className="p-4">
								{automation.conditions[0]?.conditionValue ?? ""}
							</td>
							<td className="p-4">{automation.actions[0]?.type ?? ""}</td>
							<td className="p-4">{automation.actions[0]?.value ?? ""}</td>
							<td className="p-4">
								{automation.actions[0]?.accountType ?? ""}
							</td>
							<td className="p-4">
								{automation.actions[0]?.accountInfo ?? ""}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
