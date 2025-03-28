import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CurrencyCard from '../components/CurrencyCard';
import CurrencyCardSkeleton from '../components/CurrencyCardSkeleton';
import AddCard from '../components/AddCard';
import SearchBar from '../components/SearchBar';
import { getAllCurrencies } from '../services/firebase';

const INITIAL_CURRENCIES = ['USD', 'EUR', 'GBP', 'BTC', 'ETH', 'BNB'];
const STORAGE_KEY = 'userSelectedCurrencies';

const HomeSection = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCurrencies, setSelectedCurrencies] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_CURRENCIES;
  });

  useEffect(() => {
    loadCurrencies();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCurrencies));
  }, [selectedCurrencies]);

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const data = await getAllCurrencies();
      setCurrencies(data);
      setError(null);
    } catch (err) {
      setError('Error loading currencies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrencies(prev => [...prev, currency.code]);
  };

  const handleDeleteCurrency = (currencyCode) => {
    setSelectedCurrencies(prev => prev.filter(code => code !== currencyCode));
  };

  const getAvailableCurrencies = () => {
    return currencies.filter(currency => !selectedCurrencies.includes(currency.code));
  };

  const filteredCurrencies = currencies
    .filter(currency => {
      if (currency.isHidden) return false;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          currency.currency.toLowerCase().includes(searchLower) ||
          currency.code.toLowerCase().includes(searchLower)
        );
      }
      
      return selectedCurrencies.includes(currency.code);
    });

  const shouldShowAddCard = !searchTerm && selectedCurrencies.length < 8;

  return (
    <div className="h-full w-full flex items-center justify-center">
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-[500px] mx-auto"
                >
                  <CurrencyCardSkeleton />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {filteredCurrencies.map((currency, index) => (
                <motion.div
                  key={`${currency.currency}-${currency.code}-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-[500px] mx-auto"
                >
                  <CurrencyCard 
                    {...currency} 
                    onDelete={() => handleDeleteCurrency(currency.code)}
                  />
                </motion.div>
              ))}
              {shouldShowAddCard && (
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: filteredCurrencies.length * 0.1 }}
                  className="w-full max-w-[500px] mx-auto"
                >
                  <AddCard 
                    onCurrencySelect={handleCurrencySelect}
                    availableCurrencies={getAvailableCurrencies()}
                  />
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* No Results Message */}
        {searchTerm && filteredCurrencies.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-400 mt-8"
          >
            No results found
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeSection; 