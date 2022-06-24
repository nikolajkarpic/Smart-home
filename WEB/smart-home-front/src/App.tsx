import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar } from './components/landingPage/navbar/navbar';
import './App.css';

import SignInPage from './containers/signInPage/signIn';
import LandingPage from './containers/landingPage/landingPage';
import { SignUpPage } from './containers/signUpPage/signUpPage';
import SmartHomeAppPage from "./containers/smartHomeAppPage/smartHomeAppPage";
import CreateSmartHomePage from "./containers/createSmartHomePage/createSmartHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/app" element={<SmartHomeAppPage />} />
        <Route path='/createSmartHome' element={<CreateSmartHomePage />} />
      </Routes>
    </>
  );
}

export default App;