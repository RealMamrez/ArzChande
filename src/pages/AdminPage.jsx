import { useState } from 'react';
import { motion } from 'framer-motion';
import CurrencyManager from '../components/CurrencyManager';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCurrency, setNewCurrency] = useState({
    currency: '',
    code: '',
    value: '',
    flag: '',
    change: 0
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'currencies'), {
        ...newCurrency,
        value: parseFloat(newCurrency.value),
        lastUpdated: new Date().toISOString()
      });
      setNewCurrency({
        currency: '',
        code: '',
        value: '',
        flag: '',
        change: 0
      });
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Error adding new currency');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#1c1c1c] rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add New Currency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Currency Name</label>
                <input
                  type="text"
                  value={newCurrency.currency}
                  onChange={(e) => setNewCurrency({ ...newCurrency, currency: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Currency Code</label>
                <input
                  type="text"
                  value={newCurrency.code}
                  onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Price</label>
                <input
                  type="number"
                  value={newCurrency.value}
                  onChange={(e) => setNewCurrency({ ...newCurrency, value: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Flag (Emoji)</label>
                <input
                  type="text"
                  value={newCurrency.flag}
                  onChange={(e) => setNewCurrency({ ...newCurrency, flag: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Example: 🇺🇸"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-green-600 transition-colors"
            >
              Add Currency
            </button>
          </form>
        )}

        <CurrencyManager />
      </div>
    </div>
  );
};

export default AdminPage; 