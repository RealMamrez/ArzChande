import { motion } from 'framer-motion';

const BottomNavbar = ({ currentSection, onNavClick }) => {
  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Source', path: 'source' },
    { name: 'Donate', path: 'donate' }
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 backdrop-blur-lg rounded-full border border-gray-800 px-4"
      >
        <div className="flex items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavClick(item.path)}
              className={`flex flex-col items-center px-6 py-2 text-base transition-colors duration-200 border-none bg-transparent ${
                currentSection === item.path
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="font-medium">{item.name}</span>
              {currentSection === item.path && (
                <motion.div
                  layoutId="bottomNav"
                  className="w-1.5 h-1.5 bg-white rounded-full mt-1"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default BottomNavbar; 