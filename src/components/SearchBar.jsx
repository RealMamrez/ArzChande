import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-xl mx-auto mb-8"
    >
      <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        {/* Search Icon */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: isFocused ? 5 : 0 }}
          className="absolute right-6 text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search currency..."
          className="w-full bg-[#1c1c1c] text-white pr-10 pl-20 py-4 rounded-2xl outline-none transition-all duration-300 placeholder-gray-500
                   border-2 border-transparent focus:border-purple-500/50 focus:bg-[#242424]"
          style={{ direction: 'ltr' }}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute left-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Focus Ring */}
        <motion.div
          initial={false}
          animate={{
            scale: isFocused ? 1 : 0.98,
            opacity: isFocused ? 1 : 0
          }}
          className="absolute inset-0 rounded-2xl bg-purple-500/20 -z-10"
        />
      </div>

      {/* Search Effect */}
      <motion.div
        initial={false}
        animate={{
          scale: [1, 1.05, 1],
          opacity: searchTerm ? [0.5, 0, 0] : 0
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="absolute inset-0 rounded-2xl bg-purple-500/20 -z-20"
      />
    </motion.div>
  );
};

export default SearchBar; 