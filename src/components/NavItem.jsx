import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function NavItem({ to, label }) {
	return (
		<NavLink className="m-2 p-2 hover:bg-slate-100 " to={to}>
			{label}
		</NavLink>
	);
}

NavItem.propTypes = {
	label: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};
