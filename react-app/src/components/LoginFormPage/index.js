import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { GiGriffinSymbol } from "react-icons/gi";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/tasks" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = () => {
    const email = 'demo@aa.io';
    const password = 'password';

    dispatch(login(email, password));
  }
  return (
    <>
      <div className="loginForm">
        <h1><GiGriffinSymbol id="signupGriffin" /> patternica</h1>
        <form onSubmit={handleSubmit}>
          {errors.length ? <p id="errorP">Invalid Credentials</p> : ''}
          <label id="loginInputs">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </label>
          <label id="loginInputs">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </label>
          <button type="submit" id="loginSubmit">Login</button>
        </form>
        <button onClick={demoUser} id="demoUser">Demo User</button>
        <NavLink exact to="/signup" id="noAccount">Don't have a Patternica account? <b>Sign up.</b></NavLink>
      </div>
    </>
  );
}

export default LoginFormPage;
