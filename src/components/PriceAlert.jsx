import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PriceAlert = ({ currency }) => {
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertPrice, setAlertPrice] = useState('');
  const [alertType, setAlertType] = useState('above');

  const handleSetAlert = (e) => {
    e.preventDefault();
    if (!alertPrice) return;

    const price = parseFloat(alertPrice);
    const currentPrice = currency.value;

    const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    const newAlert = {
      id: Date.now(),
      currency: currency.currency,
      targetPrice: price,
      type: alertType,
      currentPrice
    };
    alerts.push(newAlert);
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));

    toast.success(
      `Alert set for ${currency.currency} when price goes ${alertType} ${price.toLocaleString()} ${currency.code}`, 
      {
        style: {
          background: '#1c1c1c',
          color: '#fff',
          border: '1px solid #333'
        },
        icon: '🔔'
      }
    );

    setShowAlertForm(false);
    setAlertPrice('');
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAlertForm(true)}
        className="text-gray-400 hover:text-gray-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {showAlertForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute -top-7 -right-8 z-50"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              className="bg-[#1c1c1c] rounded-xl shadow-xl border border-gray-800 overflow-hidden w-[300px]"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSetAlert} className="flex flex-col p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Alert Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAlertType('above')}
                        className={`p-1 rounded-lg border text-sm ${
                          alertType === 'above'
                            ? 'border-green-500/50 bg-green-500/10 text-green-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        } transition-colors`}
                      >
                        Above
                      </button>
                      <button
                        type="button"
                        onClick={() => setAlertType('below')}
                        className={`p-1 rounded-lg border text-sm ${
                          alertType === 'below'
                            ? 'border-red-500/50 bg-red-500/10 text-red-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        } transition-colors`}
                      >
                        Below
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Target Price ({currency.code})</label>
                    <input
                      type="number"
                      value={alertPrice}
                      onChange={(e) => setAlertPrice(e.target.value)}
                      placeholder="Enter price..."
                      className="w-full bg-[#242424] text-white px-3 py-1.5 rounded-lg text-sm outline-none
                               border-2 border-transparent focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setShowAlertForm(false)}
                    className="flex-1 px-3 py-1 rounded-lg border border-gray-700 text-gray-400 
                             hover:bg-gray-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 py-1 rounded-lg bg-purple-500 text-white 
                             hover:bg-purple-600 transition-colors text-sm"
                  >
                    Set
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceAlert; 