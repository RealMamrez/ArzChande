import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SourceSection from './sections/SourceSection';
import DonateSection from './sections/DonateSection';
import BottomNavbar from './components/BottomNavbar';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const sections = ['home', 'about', 'source', 'donate'];
    
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIndex = sections.indexOf(currentSection);
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        const nextSection = sections[nextIndex];
        setCurrentSection(nextSection);
        document.getElementById(nextSection).scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isScrolling]);

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#111111] min-h-screen overflow-x-hidden">
      <main className="relative">
        <section id="home" className="section flex items-center justify-center">
          <HomeSection />
        </section>
        
        <section id="about" className="section flex items-center justify-center">
          <AboutSection />
        </section>
        
        <section id="source" className="section flex items-center justify-center">
          <SourceSection />
        </section>
        
        <section id="donate" className="section flex items-center justify-center">
          <DonateSection />
        </section>
      </main>

      <BottomNavbar currentSection={currentSection} onNavClick={handleNavClick} />
    </div>
  );
};

export default App;
