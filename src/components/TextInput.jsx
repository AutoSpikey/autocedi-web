import PropTypes from 'prop-types';

export default function TextInput({label, name, id, state, setState}) {
	return (
		<div className="m-4">
			<label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{ label }</label>
			<input
				type="text"
				id={id}
				value={state}
				name={name}
				className="block w-full p-3 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
