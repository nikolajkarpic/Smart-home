import { Navbar } from './components/navbar/navbar';
import './App.css';
import { ParallaxWelcome } from './components/parallaxWelcome/parallaxWelcome';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ContactMe } from './components/parallaxWelcome/contactMe/contactMe';

function App() {
  return (
    <ParallaxProvider>
      {/* <div className='back'></div> */}
      {/* <ParallaxWelcome /> */}
      <ContactMe />
    </ParallaxProvider >
  );
}

export default App;