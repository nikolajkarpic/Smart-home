import { Navbar } from './components/navbar/navbar';
import './App.css';
import { ParallaxWelcome } from './components/parallaxWelcome/parallaxWelcome';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <ParallaxProvider>
      {/* <div className='back'></div> */}
      <ParallaxWelcome />

    </ParallaxProvider >
  );
}

export default App;