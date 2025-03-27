const CurrencyCard = ({ currency, code, value, change, flag }) => {
  return (
    <div className="bg-[#1c1c1c] p-4 rounded-xl w-full max-w-[280px]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img src={flag} alt={currency} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-white font-medium">{currency}</div>
            <div className="text-gray-400 text-sm">{code}</div>
          </div>
        </div>
        <div className={`${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '▲' : '▼'}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-2">
        ${value.toLocaleString()}
        <span className="text-sm text-gray-400 ml-1">
          {code === 'BTC' ? 'DOLLAR' : 'TOMAN'}
        </span>
      </div>
      <div className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'} mb-3`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
        BUY/SELL
      </button>
    </div>
  );
};

export default CurrencyCard; 