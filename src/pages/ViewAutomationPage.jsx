import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAutomationById } from "../lib/client";

export default function ViewAutomationPage() {
	let { automationId } = useParams();
	const [automation, setAutomation] = useState(null);

	useEffect(() => {
		getAutomationById(automationId).then(setAutomation);
	}, [automationId]);

	return (
		<>
			<div>
				ViewAutomationPage {automationId} <p>{JSON.stringify(automation)}</p>
			</div>
		</>
	);
}
