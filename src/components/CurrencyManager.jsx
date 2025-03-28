import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS, getAllCurrencies, updateCurrency, deleteCurrency } from '../services/firebase';

const CurrencyManager = ({ onUpdate }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'fiat', 'crypto'
  const [searchTerm, setSearchTerm] = useState('');
  const [newCurrency, setNewCurrency] = useState({
    currency: '',
    code: '',
    value: '',
    flag: '',
    change: 0,
    type: 'fiat',
    isHidden: false
  });

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const data = await getAllCurrencies();
      setCurrencies(data);
      setError(null);
      if (onUpdate) onUpdate();
    } catch (err) {
      setError('Error loading currencies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, COLLECTIONS.CURRENCIES), {
        ...newCurrency,
        value: parseFloat(newCurrency.value),
        lastUpdated: new Date().toISOString()
      });
      setNewCurrency({
        currency: '',
        code: '',
        value: '',
        flag: '',
        change: 0,
        type: 'fiat',
        isHidden: false
      });
      setShowAddForm(false);
      setError(null);
      loadCurrencies();
    } catch (err) {
      setError('Error adding new currency');
      console.error(err);
    }
  };

  const handleUpdate = async (currencyId, updates) => {
    try {
      await updateCurrency(currencyId, updates);
      loadCurrencies();
      setSelectedCurrency(null);
    } catch (err) {
      setError('Error updating currency');
      console.error(err);
    }
  };

  const handleDelete = async (currencyId) => {
    if (window.confirm('Are you sure you want to delete this currency?')) {
      try {
        await deleteCurrency(currencyId);
        loadCurrencies();
        setSelectedCurrency(null);
      } catch (err) {
        setError('Error deleting currency');
        console.error(err);
      }
    }
  };

  const handleToggleVisibility = async (currency) => {
    try {
      await updateCurrency(currency.id, {
        isHidden: !currency.isHidden
      });
      loadCurrencies();
    } catch (err) {
      setError('Error changing currency visibility status');
      console.error(err);
    }
  };

  const filteredCurrencies = currencies
    .filter(currency => {
      if (filter !== 'all') return currency.type === filter;
      return true;
    })
    .filter(currency => {
      const searchLower = searchTerm.toLowerCase();
      return (
        currency.currency.toLowerCase().includes(searchLower) ||
        currency.code.toLowerCase().includes(searchLower)
      );
    });

  if (loading) {
    return (
      <div className="text-center text-white py-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('fiat')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'fiat' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            Fiat Currencies
          </button>
          <button
            onClick={() => setFilter('crypto')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'crypto' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            Cryptocurrencies
          </button>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-[#242424] text-white rounded-lg px-4 py-2 w-full md:w-64"
          />
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            Add Currency
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {(showAddForm || selectedCurrency) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1c1c1c] rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            {selectedCurrency ? 'Edit Currency' : 'Add New Currency'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Currency Name</label>
              <input
                type="text"
                value={selectedCurrency ? selectedCurrency.currency : newCurrency.currency}
                onChange={(e) => selectedCurrency 
                  ? setSelectedCurrency({...selectedCurrency, currency: e.target.value})
                  : setNewCurrency({...newCurrency, currency: e.target.value})
                }
                className="w-full bg-[#242424] text-white rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Currency Code</label>
              <input
                type="text"
                value={selectedCurrency ? selectedCurrency.code : newCurrency.code}
                onChange={(e) => selectedCurrency
                  ? setSelectedCurrency({...selectedCurrency, code: e.target.value})
                  : setNewCurrency({...newCurrency, code: e.target.value})
                }
                className="w-full bg-[#242424] text-white rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Value</label>
              <input
                type="number"
                value={selectedCurrency ? selectedCurrency.value : newCurrency.value}
                onChange={(e) => selectedCurrency
                  ? setSelectedCurrency({...selectedCurrency, value: e.target.value})
                  : setNewCurrency({...newCurrency, value: e.target.value})
                }
                className="w-full bg-[#242424] text-white rounded-lg px-4 py-2"
                required
                step="0.000001"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Flag (Emoji)</label>
              <input
                type="text"
                value={selectedCurrency ? selectedCurrency.flag : newCurrency.flag}
                onChange={(e) => selectedCurrency
                  ? setSelectedCurrency({...selectedCurrency, flag: e.target.value})
                  : setNewCurrency({...newCurrency, flag: e.target.value})
                }
                className="w-full bg-[#242424] text-white rounded-lg px-4 py-2"
                required
                placeholder="Example: 🇺🇸"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Currency Type</label>
              <select
                value={selectedCurrency ? selectedCurrency.type : newCurrency.type}
                onChange={(e) => selectedCurrency
                  ? setSelectedCurrency({...selectedCurrency, type: e.target.value})
                  : setNewCurrency({...newCurrency, type: e.target.value})
                }
                className="w-full bg-[#242424] text-white rounded-lg px-4 py-2"
                required
              >
                <option value="fiat">Fiat Currency</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Visibility Status</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCurrency ? selectedCurrency.isHidden : newCurrency.isHidden}
                  onChange={(e) => selectedCurrency
                    ? setSelectedCurrency({...selectedCurrency, isHidden: e.target.checked})
                    : setNewCurrency({...newCurrency, isHidden: e.target.checked})
                  }
                  className="w-4 h-4 bg-[#242424] rounded border-gray-600"
                />
                <span className="text-gray-400">Hide from website</span>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedCurrency(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              {selectedCurrency ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleUpdate(selectedCurrency.id, selectedCurrency)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedCurrency.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </motion.div>
      )}

      {/* Currency List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCurrencies.map(currency => (
          <motion.div
            key={currency.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedCurrency?.id === currency.id
                ? 'bg-blue-500/20 border border-blue-500'
                : 'bg-[#242424] hover:bg-[#2a2a2a]'
            } ${currency.isHidden ? 'opacity-50' : ''}`}
            onClick={() => setSelectedCurrency(currency)}
          >
            <div className="flex items-center gap-3">
              <img
                src={currency.flag}
                alt={currency.currency}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-white font-medium">{currency.currency}</div>
                <div className="text-gray-400 text-sm">{currency.code}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleVisibility(currency);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    currency.isHidden 
                      ? 'bg-gray-600 hover:bg-gray-500' 
                      : 'bg-green-600 hover:bg-green-500'
                  }`}
                  title={currency.isHidden ? 'Show Currency' : 'Hide Currency'}
                >
                  {currency.isHidden ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
                <span className={`px-2 py-1 rounded ${
                  currency.type === 'crypto' 
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {currency.type === 'crypto' ? 'Crypto' : 'Fiat'}
                </span>
              </div>
            </div>
            <div className="mt-2 text-right">
              <div className="text-white">{currency.value.toLocaleString()}</div>
              <div className={`text-sm ${currency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currency.change}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyManager; 