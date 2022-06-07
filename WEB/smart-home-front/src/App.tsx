import { Navbar } from './components/navbar/navbar';
import './App.css';
import { ParallaxWelcome } from './components/parallaxWelcome/parallaxWelcome';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ContactMe } from './components/parallaxWelcome/contactMe/contactMe';
import { InitialLadning } from './components/initaialLanding/initialLanding';
import { WeOffer } from './components/weOffer/weOffer';
import { ContactUs } from './components/contactUs/contactUs';

function App() {
  return (
    <>
      <Navbar />
      <InitialLadning />
      <WeOffer />
      <ContactUs />
    </>
  );
}

export default App;