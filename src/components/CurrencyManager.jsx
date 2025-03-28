import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllCurrencies, updateCurrencyPrice, updateCurrency } from '../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';

const CurrencyManager = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [newFlagUrl, setNewFlagUrl] = useState('');
  const [newCurrency, setNewCurrency] = useState({
    currency: '',
    code: '',
    value: '',
    flag: '',
    change: 0,
    type: 'fiat'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const data = await getAllCurrencies();
      setCurrencies(data);
      setError(null);
    } catch (err) {
      setError('خطا در دریافت لیست ارزها');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCurrency || !newPrice) return;

    try {
      await updateCurrencyPrice(selectedCurrency.id, parseFloat(newPrice));
      await loadCurrencies();
      setNewPrice('');
      setSelectedCurrency(null);
    } catch (err) {
      setError('خطا در به‌روزرسانی قیمت');
      console.error(err);
    }
  };

  const handleFlagUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCurrency || !newFlagUrl) return;

    try {
      await updateCurrency(selectedCurrency.id, {
        flag: newFlagUrl
      });
      await loadCurrencies();
      setNewFlagUrl('');
      setSelectedCurrency(null);
    } catch (err) {
      setError('خطا در به‌روزرسانی تصویر');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, COLLECTIONS.CURRENCIES), {
        ...newCurrency,
        value: parseFloat(newCurrency.value),
        lastUpdated: new Date().toISOString(),
        type: newCurrency.type || 'fiat'
      });
      setNewCurrency({
        currency: '',
        code: '',
        value: '',
        flag: '',
        change: 0,
        type: 'fiat'
      });
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('خطا در افزودن ارز جدید');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-12">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6">مدیریت ارزها</h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* لیست ارزها */}
          <div className="bg-[#1c1c1c] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">لیست ارزها</h3>
            <div className="space-y-4">
              {currencies.map(currency => (
                <motion.div
                  key={currency.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedCurrency?.id === currency.id
                      ? 'bg-blue-500/20 border border-blue-500'
                      : 'bg-[#242424] hover:bg-[#2a2a2a]'
                  }`}
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
                  </div>
                  <div className="mt-2 text-right">
                    <div className="text-white">{currency.value}</div>
                    <div className={`text-sm ${currency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {currency.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* فرم به‌روزرسانی */}
          <div className="bg-[#1c1c1c] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {selectedCurrency ? 'به‌روزرسانی ارز' : 'لطفاً یک ارز انتخاب کنید'}
            </h3>

            {selectedCurrency && (
              <div className="space-y-6">
                {/* فرم به‌روزرسانی قیمت */}
                <form onSubmit={handlePriceUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">قیمت جدید</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: 50000"
                      step="0.01"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                  >
                    به‌روزرسانی قیمت
                  </button>
                </form>

                {/* فرم به‌روزرسانی پرچم */}
                <form onSubmit={handleFlagUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">URL تصویر پرچم</label>
                    <input
                      type="url"
                      value={newFlagUrl}
                      onChange={(e) => setNewFlagUrl(e.target.value)}
                      className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: https://example.com/flag.png"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-colors"
                  >
                    به‌روزرسانی تصویر
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#1c1c1c] rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">افزودن ارز جدید</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">نام ارز</label>
                <input
                  type="text"
                  value={newCurrency.currency}
                  onChange={(e) => setNewCurrency({ ...newCurrency, currency: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: دلار آمریکا"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">کد ارز</label>
                <input
                  type="text"
                  value={newCurrency.code}
                  onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: USD"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">قیمت ارز</label>
                <input
                  type="number"
                  value={newCurrency.value}
                  onChange={(e) => setNewCurrency({ ...newCurrency, value: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: 50000"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">URL تصویر پرچم</label>
                <input
                  type="url"
                  value={newCurrency.flag}
                  onChange={(e) => setNewCurrency({ ...newCurrency, flag: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: https://example.com/flag.png"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">نوع ارز</label>
                <select
                  value={newCurrency.type || 'fiat'}
                  onChange={(e) => setNewCurrency({ ...newCurrency, type: e.target.value })}
                  className="w-full bg-[#242424] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fiat">فیات</option>
                  <option value="crypto">ارز دیجیتال</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-green-600 transition-colors"
            >
              افزودن ارز
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default CurrencyManager; 