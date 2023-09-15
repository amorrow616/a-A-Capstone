import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import { GiGriffinSymbol } from "react-icons/gi";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="signUpForm">
        <h1><GiGriffinSymbol id="signupGriffin" /> patternica</h1>
        <form onSubmit={handleSubmit} id="signUpForm">
          {/* <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul> */}
          {errors.map((error) => (
            error.includes('username') ?
              <p id="errorP">{error.slice(11)}</p> : ''
          ))}
          <label id="signupInputs">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='e.g., HabbitRabbit'
              required
            />
          </label>
          {errors.map((error) => (
            error.includes('email') ?
              <p id="errorP">{error.slice(8)}</p> : ''
          ))}
          <label id="signupInputs">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='e.g., gryphon@example.com'
              required
            />
          </label>
          {errors.map((error) => (
            error.includes('password') ?
              <p id="errorP">{error.slice(11)}</p> : ''
          ))}
          <label id="signupInputs">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='e.g., ******************'
              required
            />
          </label>
          {password !== confirmPassword ? <p id="errorP">Confirm Password field must be the same as the Password field</p> : ''}
          <label id="signupInputs">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Make sure it's the same password!"
              required
            />
          </label>
          <p className="homePageP">By clicking the button below, you are indicating that you have read and agree to the Terms of Service and Privacy Policy.</p>
          <button type="submit" id="signupSubmit">Join Patternica</button>
        </form>
        <NavLink exact to="/login" id="noAccount">Already have a Patternica account? <b>Log in.</b></NavLink>
      </div>
    </>
  );
}

export default SignupFormPage;
