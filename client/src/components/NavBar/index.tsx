import "./index.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
	const hasToken = localStorage.getItem("auth-token");
	const hasEmail = localStorage.getItem("email");
	const [isLoggedIn, setIsLoggedIn] = useState(0);
	const [email, setEmail] = useState(0);

	useEffect(() => {
		if (hasToken) {
			setIsLoggedIn(true);
			setEmail(hasEmail);
		}
	}, [hasToken]);

	return (
		<div className="navbar">
			{isLoggedIn ? (
				<>
					<div className="navbar__name-container">{email}</div>
				</>
			) : (
				<div className="navbar__name-container">
					<NavLink to="/login">Log in</NavLink>
				</div>
			)}
			<ul className="navbar__menu">
				<li>
					<NavLink to="/listitems">Items</NavLink>
				</li>
				<li>
					<NavLink to="/contact">Contact</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
