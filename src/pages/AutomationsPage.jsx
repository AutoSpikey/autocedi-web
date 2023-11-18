import { useState } from "react";
import TextInput from "../components/TextInput";
import Cron from "react-js-cron";
import "react-js-cron/dist/styles.css";

export default function AutomationsPage() {
	const [trigger, setTrigger] = useState("");
	const [conditionField, setConditionField] = useState("");
	const [conditionType, setConditionType] = useState("");
	const [conditionValue, setConditionValue] = useState("");

	const [action, setAction] = useState("");
	const [cron, setCron] = useState("");
	const [receiveType, setReceiveType] = useState("any");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const bind = (e, s) => s(e.target.value);

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<form onSubmit={handleSubmit} className="w-full max-w-xl">
				<div className="m-4">
					<label className="block mb2">Trigger</label>
					<select
						className="block w-full p-3 rounded border border-gray-300"
						value={trigger}
						onChange={(e) => bind(e, setTrigger)}
					>
						<option value="" disabled selected>
							Choose a trigger
						</option>
						<option value="receive">When I Receive Money</option>
						<option value="time">At a Specific Time</option>
					</select>
				</div>

				<div className="m-4">
					{trigger === "time" && <Cron value={cron} setValue={setCron} />}

					{trigger === "receive" && (
						<div className="flex flex-row">
							<select
								className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
								value={receiveType}
								onChange={(e) => bind(e, setReceiveType)}
							>
								<option value="any">Any payment</option>
								<option value="amount">Of Amount</option>
								<option value="reference">With Reference</option>
								<option value="sender">From Sender</option>
							</select>
							<input
								disabled={receiveType === "any"}
								className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							/>
						</div>
					)}
				</div>

				<div className="m-4">
					<label className="block mb2">Condition</label>
					<div className="flex flex-row">
						<select
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							value={conditionField}
							onChange={(e) => bind(e, setConditionField)}
						>
							<option value="" disabled selected>
								Type
							</option>
							<option value="balance">Balance</option>
							<option value="amount">Amount</option>
							<option value="reference">Reference</option>
						</select>
						<select
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							value={conditionType}
							onChange={(e) => bind(e, setConditionType)}
						>
							<option value="" disabled selected>
								Compare
							</option>
							{["balance", "amount"].includes(conditionField) && (
								<option value="eq">equal to</option>
							)}
							{["balance", "amount"].includes(conditionField) && (
								<option value="gt">greater than</option>
							)}
							{["balance", "amount"].includes(conditionField) && (
								<option value="gte">greater than or equal to</option>
							)}
							{["balance", "amount"].includes(conditionField) && (
								<option value="lt">less than</option>
							)}
							{["balance", "amount"].includes(conditionField) && (
								<option value="lte">less than or equal to</option>
							)}
							{["reference"].includes(conditionField) && (
								<option value="has">contains</option>
							)}
						</select>
						<input
							onChange={(e) => bind(e, setConditionValue)}
							value={conditionValue}
							placeholder="value"
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
						/>
					</div>
				</div>

				<TextInput
					label="Action"
					state={action}
					setState={setAction}
					id="action"
					name="action"
				/>
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
