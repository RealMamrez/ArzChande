import { motion } from 'framer-motion';
import ReactFullpage from '@fullpage/react-fullpage';
import InfiniteScroll from './components/InfiniteScroll';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

// Import sections
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SourceSection from './sections/SourceSection';
import DonateSection from './sections/DonateSection';

// Import flags
import btcFlag from './assets/bitcoin.svg';
import usdFlag from './assets/usd.svg';

function App() {
  const currencies = [
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: 2.02,
      flag: usdFlag
    },
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: -12.02,
      flag: usdFlag
    },
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: 0.02,
      flag: usdFlag
    },
    {
      currency: 'Bitcoin',
      code: 'BTC',
      value: 89203,
      change: -0.25,
      flag: btcFlag
    }
  ];

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="bg-[#121212]">
        {/* Bottom Navigation */}
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
          <div className="bg-[#1c1c1c]/90 backdrop-blur-lg rounded-2xl p-1.5 flex gap-1 sm:gap-2 justify-between sm:justify-start max-w-md mx-auto">
            <button 
              onClick={() => window.fullpage_api.moveTo(1)}
              className="relative px-3 sm:px-6 py-2.5 rounded-xl text-gray-300 hover:text-white transition-colors group flex-1 sm:flex-initial text-center"
            >
              <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">Home</span>
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                initial={false}
                animate={{
                  opacity: window.fullpage_api?.getActiveSection()?.index === 0 ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
            <button 
              onClick={() => window.fullpage_api.moveTo(2)}
              className="relative px-3 sm:px-6 py-2.5 rounded-xl text-gray-300 hover:text-white transition-colors group flex-1 sm:flex-initial text-center"
            >
              <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">About</span>
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                initial={false}
                animate={{
                  opacity: window.fullpage_api?.getActiveSection()?.index === 1 ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
            <button 
              onClick={() => window.fullpage_api.moveTo(3)}
              className="relative px-3 sm:px-6 py-2.5 rounded-xl text-gray-300 hover:text-white transition-colors group flex-1 sm:flex-initial text-center"
            >
              <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">Source</span>
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                initial={false}
                animate={{
                  opacity: window.fullpage_api?.getActiveSection()?.index === 2 ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
            <button 
              onClick={() => window.fullpage_api.moveTo(4)}
              className="relative px-3 sm:px-6 py-2.5 rounded-xl text-gray-300 hover:text-white transition-colors group flex-1 sm:flex-initial text-center"
            >
              <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">Donate</span>
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                initial={false}
                animate={{
                  opacity: window.fullpage_api?.getActiveSection()?.index === 3 ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        <ReactFullpage
          scrollingSpeed={1000}
          scrollHorizontally={true}
          credits={false}
          licenseKey={'gplv3-license'}
          onLeave={(origin, destination, direction) => {
            document.querySelectorAll('.nav-indicator').forEach((el, index) => {
              if (index === destination.index) {
                el.style.opacity = '1';
              } else {
                el.style.opacity = '0';
              }
            });
          }}
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <HomeSection currencies={currencies} />
                <AboutSection />
                <SourceSection />
                <DonateSection />
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </>
  );
}

export default App;
