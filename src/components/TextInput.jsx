import PropTypes from 'prop-types';

export default function TextInput({label, name, id, state, setState}) {
	return (
		<div className="flex flex-row p-2">
			<label className="m-2">{ label }</label>
			<input
				type="text"
				id={id}
				value={state}
				name={name}
				className="border-black border rounded"
				onChange={(e) => setState(e.target.value)}
			></input>
		</div>
	);
}

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
  };
