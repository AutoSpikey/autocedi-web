import { useState } from "react";

export default function ConditionField() {
    const [conditionField, setConditionField] = useState("");
	const [conditionType, setConditionType] = useState("");
	const [conditionValue, setConditionValue] = useState("");

  return (
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

							{["reference"].includes(conditionField) && (
								<option value="has">contains</option>
							)}
						</select>
						<input
							onChange={(e) => setConditionValue(e.target.value)}
							value={conditionValue}
							placeholder="value"
							className="block w-1/3 p-3 rounded border border-gray-300 mx-1"
						/>
					</div>
				</div>
  )
}
