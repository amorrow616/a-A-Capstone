import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePageRender from "./components/HomePage";
import MainPage from "./components/MainPage";
import LearnMore from "./components/LearnMore";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/tasks">
            <MainPage />
          </Route>
          <Route exact path="/learnmore">
            <LearnMore />
          </Route>
          <Route exact path="/">
            <HomePageRender />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
