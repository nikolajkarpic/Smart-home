import { Navbar } from './components/landingPage/navbar/navbar';
import './App.css';

import SignIn from './containers/signIn/signIn';
import LandingPage from './containers/landingPage/landingPage';

function App() {
  return (
    <>
      {/* <LandingPage></LandingPage> */}
      <SignIn />
    </>
  );
}

export default App;