import { motion, AnimatePresence } from 'framer-motion';

const CurrencySelectModal = ({ isOpen, onClose, availableCurrencies, onSelect }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#1c1c1c] rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Add Currency</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid gap-4">
            {availableCurrencies.map((currency) => (
              <motion.button
                key={currency.code}
                onClick={() => {
                  onSelect(currency);
                  onClose();
                }}
                className="flex items-center gap-4 p-4 bg-[#242424] rounded-lg hover:bg-[#2a2a2a] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={currency.flag}
                  alt={currency.currency}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">{currency.currency}</div>
                  <div className="text-gray-400 text-sm">{currency.code}</div>
                </div>
                <div className="text-gray-400">
                  {currency.type === 'crypto' ? 'Crypto' : 'Fiat'}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CurrencySelectModal; 