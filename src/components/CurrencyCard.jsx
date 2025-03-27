const CurrencyCard = ({ currency, code, value, change, flag }) => {
  return (
    <div className="bg-[#1c1c1c] p-6 rounded-2xl w-full max-w-[320px] hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#242424]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img src={flag} alt={currency} className="w-12 h-12 rounded-full" />
          <div>
            <div className="text-white text-lg font-semibold">{currency}</div>
            <div className="text-gray-400 text-base">{code}</div>
          </div>
        </div>
        <div className={`${change > 0 ? 'text-green-500' : 'text-red-500'} text-xl`}>
          {change > 0 ? '▲' : '▼'}
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-3">
        ${value.toLocaleString()}
        <span className="text-sm text-gray-400 ml-2">
          {code === 'BTC' ? 'DOLLAR' : 'TOMAN'}
        </span>
      </div>
      <div className={`text-base ${change > 0 ? 'text-green-500' : 'text-red-500'} mb-4`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium transition-colors duration-300">
        BUY/SELL
      </button>
    </div>
  );
};

export default CurrencyCard; 