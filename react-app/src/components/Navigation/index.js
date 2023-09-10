import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { GiGriffinSymbol } from "react-icons/gi";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<ul className="navigationBar">
				<li>
					<GiGriffinSymbol id="navGriffin" />
					<NavLink exact to="/" className="homeLink">patternica</NavLink>
				</li>
				{!sessionUser ?
					<li>
						<NavLink exact to="/signup" id="navLinks">Get Started</NavLink>
					</li>
					: ''}
				{isLoaded && sessionUser ? (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				) :
					<NavLink exact to="/login" id="loginButton">Login</NavLink>}
			</ul>
		</>
	);
}

export default Navigation;
