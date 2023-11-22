import { useState } from "react";
import Cron from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { postAutomation } from "../lib/client";
import { constructPayload } from "../lib/automation";
import { Toaster, toast } from "react-hot-toast";


export default function CreateAutomationPage() {
	const [trigger, setTrigger] = useState("");

	const [cron, setCron] = useState("");
	const [receiveType, setReceiveType] = useState("any");
	const [receiveValue, setReceiveValue] = useState("");

	const [conditionField, setConditionField] = useState("");
	const [conditionType, setConditionType] = useState("");
	const [conditionValue, setConditionValue] = useState("");

	const [payType, setPayType] = useState("");
	const [payValue, setPayValue] = useState("");

	const [payAccountType, setPayAccountType] = useState("");
	const [payAccountInfo, setPayAccountInfo] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		let payload = constructPayload(
			trigger,
			cron,
			receiveType,
			receiveValue,
			conditionField,
			conditionType,
			conditionValue,
			payType,
			payValue,
			payAccountType,
			payAccountInfo
		);

		toast.promise(postAutomation(payload), {
			loading: "Creating...",
			success: "Automation created successfully",
			error: "Could not create Automation",
		});

	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full">
			<div>
				<Toaster />
			</div>
			<h1 className="text-3xl m-8">Create Automation</h1>

			<form onSubmit={handleSubmit} className="w-full max-w-2xl">
				<div className="m-4">
					<label className="block mb2">Start</label>
					<select
						className="block w-full p-3 rounded border border-gray-300"
						value={trigger}
						onChange={(e) => setTrigger(e.target.value)}
					>
						<option value="" disabled>
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
								onChange={(e) => setReceiveType(e.target.value)}
							>
								<option value="any">Any payment</option>
								<option value="amount">Of Amount</option>
								<option value="reference">With Reference</option>
								<option value="sender">From Sender</option>
							</select>
							<input
								disabled={receiveType === "any"}
								value={receiveValue}
								onChange={(e) => setReceiveValue(e.target.value)}
								className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							/>
						</div>
					)}
				</div>

				<div className="m-4">
					<label className="block mb2">Check if</label>
					<div className="flex flex-row">
						<select
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							value={conditionField}
							onChange={(e) => setConditionField(e.target.value)}
						>
							<option value="" disabled>
								Type
							</option>
							<option value="balance">Balance</option>
							<option value="amount">Amount</option>
							<option value="reference">Reference</option>
						</select>
						<select
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
							value={conditionType}
							onChange={(e) => setConditionType(e.target.value)}
						>
							<option value="" disabled>
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

							{
								// FIXME: when select switches to this, onChange is not triggered,
								// so conditionField is not set to this.
								["reference"].includes(conditionField) && (
									<option value="has">contains</option>
								)
							}
						</select>
						<input
							onChange={(e) => setConditionValue(e.target.value)}
							value={conditionValue}
							placeholder="value"
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
						/>
					</div>
				</div>

				<div className="m-4">
					<label className="block mb2">Pay</label>
					<div className="flex flex-row">
						<select
							className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							value={payType}
							onChange={(e) => setPayType(e.target.value)}
						>
							<option value="" disabled>
								select...
							</option>
							<option value="amount">Specified Amount</option>
							<option value="percentage of balance">
								Percentage of Balance
							</option>
							{trigger == "receive" && (
								<option value="percentage of received amount">
									Percentage of received amount
								</option>
							)}
						</select>

						<input
							value={payValue}
							onChange={(e) => setPayValue(e.target.value)}
							className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							placeholder="value"
						/>
					</div>
				</div>

				<div className="m-4">
					<label className="block mb2">To</label>{" "}
					<div className="flex flex-row">
						<select
							className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							value={payAccountType}
							onChange={(e) => setPayAccountType(e.target.value)}
						>
							<option value="" disabled>
								select...
							</option>
							<option value="ecedi">eCedi Wallet</option>
							<option value="bank">Bank Account</option>
						</select>
						<input
							value={payAccountInfo}
							onChange={(e) => setPayAccountInfo(e.target.value)}
							className="block w-1/2 p-3 rounded border border-gray-300 mx-1"
							placeholder="value"
						/>{" "}
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
