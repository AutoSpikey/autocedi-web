import { useState } from "react";
import TextInput from "./components/TextInput";

export default function AutomationsPage() {
	const [trigger, setTrigger] = useState("");
	const [condition, setCondition] = useState("");
	const [action, setAction] = useState("");


	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="flex content-center h-full">
			<form onSubmit={handleSubmit}>
                <TextInput label="Trigger" state={trigger} setState={setTrigger} id="trigger" name="trigger"/>
                <TextInput label="Condition" state={condition} setState={setCondition} id="condition" name="condition"/>
                <TextInput label="Action" state={action} setState={setAction} id="action" name="action"/>
				<div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
