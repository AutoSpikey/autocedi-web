import { useState } from "react";
import Cron from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { postAutomation } from "../../lib/client";
import { constructPayload } from "../../lib/automation";
import { toast } from "react-hot-toast";
import cronStrue from "cronstrue";
import { useNavigate } from "react-router-dom"

export default function CreateAutomationPage() {
	const navigate = useNavigate();

	const [label, setLabel] = useState("");

	const [triggerField, setTriggerField] = useState("");
	const [triggerType, setTriggerType] = useState("");
	const [triggerAmount, setTriggerAmount] = useState("");
	const [triggerCron, setTriggerCron] = useState("");

	const [payField, setPayField] = useState("");
	const [payValue, setPayValue] = useState("");

	const [account, setAccount] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		let payload = constructPayload({
			label,
			triggerField,
			triggerType,
			triggerAmount,
			triggerCron,
			payField,
			payValue,
			account
		});

		const automationPromise = postAutomation(payload)

		toast.promise(automationPromise, {
			loading: "Creating...",
			success: "Automation created successfully",
			error: "Could not create Automation",
		});

		automationPromise
			.then(() => navigate("/dashboard/automations"))
			.catch(() => {})
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full">
			<h1 className="text-3xl m-8">Create Automation</h1>

			<form onSubmit={handleSubmit} className="w-full max-w-3xl">

				{/* Label */}
				<div className="m-4">
					<label className="block mb2">Label</label>
					<input
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						className="block w-full p-3 rounded border border-gray-300 mx-1"
						placeholder="Enter a label"
					/>
				</div>

				{/* Trigger Type */}
				<div className="m-4">
					<label className="block mb2">Start</label>
					<select
						className="block w-full p-3 rounded border border-gray-300"
						value={triggerType}
						onChange={(e) => {
							setTriggerType(e.target.value);
							if(triggerType === "receive") setTriggerField("amount")
						}}
					>
						<option value="" disabled>
							Choose a trigger
						</option>
						<option value="receive">When I Receive Money</option>
						<option value="time">At a Specific Time</option>
					</select>
				</div>

				{/* Trigger field and value */}
				<div className="m-4">
					{triggerType === "time" && (
						<div className="m-8">
							<Cron value={triggerCron} setValue={cronString => {
								setTriggerField("cron")
								setTriggerCron(cronString)
							}} />
							<p className="text-slate-700 text-sm">
								{triggerCron
									? (<>the automation will happen <span className="font-bold">{cronStrue.toString(triggerCron)}</span></>)
									: ""}
							</p>
						</div>
					)}

					{triggerType === "receive" && (
						<div className="flex flex-row">
							<select
								className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
								value={triggerField}
								onChange={(e) => setTriggerField(e.target.value)}
							>
								<option value="amount">Of Amount</option>
								<option value="sender">From Sender</option>
							</select>
							<input
								placeholder={"leave empty for any " + triggerField}
								value={triggerAmount}
								onChange={(e) => setTriggerAmount(e.target.value)}
								className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							/>
						</div>
					)}
				</div>

				{/* Action */}
				<div className="m-4">
					<label className="block mb2">Pay</label>
					<div className="flex flex-row">
						<select
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							value={payField}
							onChange={(e) => setPayField(e.target.value)}
						>
							<option value="" disabled>
								select...
							</option>
							<option value="amount">Specified Amount</option>
							<option value="percentage of balance">
								Percentage of Balance
							</option>
							{triggerType == "receive" && (
								<option value="percentage of received amount">
									Percentage of received amount
								</option>
							)}
						</select>

						<input
							value={payValue}
							onChange={(e) => setPayValue(e.target.value)}
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							placeholder={"value" + (payField && payField === "amount" ? " in cedis" : " as percentage")}
						/>

						<input
							value={account}
							onChange={(e) => setAccount(e.target.value)}
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							placeholder="wallet id here"
						/>
					</div>
				</div>

				<div className="m-4 text-right">
					<button
						type="submit"
						className="w-1/2 p-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
