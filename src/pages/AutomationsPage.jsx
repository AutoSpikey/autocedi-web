import { useState } from "react";
import TextInput from "../components/TextInput";
import Cron from "react-js-cron";
import 'react-js-cron/dist/styles.css'

export default function AutomationsPage() {
	const [trigger, setTrigger] = useState("");
	const [condition, setCondition] = useState("");
	const [action, setAction] = useState("");
	const [cron, setCron] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const bind = (e, s) => s(e.target.value);

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			
			<form onSubmit={handleSubmit} className="w-full max-w-sm">
				<div className="m-4" onChange={(e) => bind(e, setTrigger)} value={trigger}>
					<label className="block mb2">Trigger</label>
					<select className="block w-full p-3 rounded border border-gray-300">
						<option value="" disabled selected >Choose a trigger</option>
						<option value="receive">When I Receive Money</option>
						<option value="time">At a Specific Time</option>
					</select>
				</div>

				{trigger === "time" && (
					<div className="m-4">
						<Cron 
							value={cron}
							setValue={setCron}
						/>
					</div>
				)}

				{trigger === "receive" && (
					<div className="m-4 flex flex-row">
						<select className="block w-1/2 p-3 rounded border border-gray-300 mx-1">
							<option value="any">Any payment</option>
							<option value="amount">Of Amount</option>
							<option value="reference">With Reference</option>
							<option value="sender">From Sender</option>
						</select>
						<input className="block w-1/2 p-3 rounded border border-gray-300 mx-1" />
					</div>
				)}

				<TextInput
					label="Condition"
					state={condition}
					setState={setCondition}
					id="condition"
					name="condition"
				/>
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
