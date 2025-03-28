import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CurrencyList = ({ currencies, onCurrencyClick }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'fiat', 'crypto'

  const filteredCurrencies = currencies.filter(currency => {
    if (filter === 'all') return true;
    return currency.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">لیست ارزها</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            همه
          </button>
          <button
            onClick={() => setFilter('fiat')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'fiat' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            ارزهای فیات
          </button>
          <button
            onClick={() => setFilter('crypto')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'crypto' ? 'bg-blue-500 text-white' : 'bg-[#242424] text-gray-400'
            }`}
          >
            ارزهای دیجیتال
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCurrencies.map((currency) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-[#1c1c1c] rounded-xl p-4 cursor-pointer ${
              currency.type === 'crypto' ? 'border border-blue-500' : ''
            }`}
            onClick={() => onCurrencyClick(currency)}
          >
            <div className="flex items-center gap-3">
              <img
                src={currency.flag}
                alt={currency.currency}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="text-white font-semibold">{currency.currency}</h3>
                <p className="text-gray-400 text-sm">{currency.code}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white text-lg">
                {currency.value.toLocaleString()} تومان
              </p>
              <p className={`text-sm ${currency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currency.change >= 0 ? '+' : ''}{currency.change}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyList; 