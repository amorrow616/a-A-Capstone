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
			<div className="navigationBar">
				<div className="navLeft">
					<GiGriffinSymbol id="navGriffin" />
					<NavLink exact to="/" className="homeLink">patternica</NavLink>
				</div>
				<div className="centerLinks">
					<ul className="navLinks">
						<li>
							{!sessionUser ?
								<NavLink exact to="/signup" id="getStarted">Get Started</NavLink>
								: ''}
						</li>
						<li>{!sessionUser ? <NavLink exact to="/" id="learnMore">Learn More</NavLink> : ''}</li>
					</ul>
				</div>
				{isLoaded && sessionUser ? (
					<ProfileButton user={sessionUser} />
				) :
					<NavLink exact to="/login" id="loginButton">Login</NavLink>}
			</div>
		</>
	);
}

export default Navigation;
