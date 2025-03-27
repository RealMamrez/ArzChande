import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CurrencyCard from '../components/CurrencyCard';
import AddCard from '../components/AddCard';
import SearchBar from '../components/SearchBar';

const HomeSection = ({ currencies: initialCurrencies }) => {
  const [currencies, setCurrencies] = useState(initialCurrencies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(currency => 
    currency.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          ArzChande?
        </motion.h1>

        <SearchBar onSearch={setSearchTerm} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5"
        >
          {filteredCurrencies.map((currency, index) => (
            <motion.div
              key={`${currency.currency}-${currency.code}-${index}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full max-w-[500px] mx-auto"
            >
              <CurrencyCard {...currency} />
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: filteredCurrencies.length * 0.1 }}
            className="w-full max-w-[500px] mx-auto"
          >
            <AddCard />
          </motion.div>
        </motion.div>

        {/* No Results Message */}
        {searchTerm && filteredCurrencies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-400 mt-8"
          >
            No results found for "{searchTerm}"
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeSection; 