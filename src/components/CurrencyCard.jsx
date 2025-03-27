import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PriceAlert from './PriceAlert';

const CurrencyCard = ({ currency, code, value, change, flag }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = change > 0;
  const gradientClass = isPositive 
    ? 'from-green-500/10 to-transparent' 
    : 'from-red-500/10 to-transparent';
  const borderClass = isPositive
    ? 'border-l-green-500'
    : 'border-l-red-500';
  const rippleColor = isPositive ? 'green' : 'red';

  // Check price alerts
  useEffect(() => {
    const checkAlerts = () => {
      const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
      const currentPrice = value;

      alerts.forEach((alert, index) => {
        if (alert.currency === currency) {
          const shouldTrigger = 
            (alert.type === 'above' && currentPrice >= alert.targetPrice) ||
            (alert.type === 'below' && currentPrice <= alert.targetPrice);

          if (shouldTrigger) {
            // Show alert notification
            toast(
              `${currency} price is now ${alert.type === 'above' ? 'above' : 'below'} ${alert.targetPrice.toLocaleString()} ${code}!`,
              {
                icon: '🚨',
                style: {
                  background: '#1c1c1c',
                  color: '#fff',
                  border: '1px solid #333'
                }
              }
            );

            // Remove triggered alert
            alerts.splice(index, 1);
            localStorage.setItem('priceAlerts', JSON.stringify(alerts));
          }
        }
      });
    };

    checkAlerts();
  }, [currency, code, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-[#1c1c1c] p-6 rounded-xl w-full aspect-[1.5] hover:shadow-xl transition-all duration-300 hover:bg-[#242424] relative overflow-hidden group border-l-4 ${borderClass} ripple-bg cursor-pointer`}
      data-ripple-color={rippleColor}
    >
      {/* Shine Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(45deg, transparent 45%, white 50%, transparent 55%)',
          backgroundSize: '250% 100%',
          animation: isHovered ? 'shine 1.5s infinite' : 'none'
        }}
      />

      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-50`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <motion.img 
              src={flag} 
              alt={currency} 
              className="w-10 h-10 rounded-full"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <div>
              <div className="text-white text-lg font-medium">{currency}</div>
              <div className="text-gray-400 text-sm">{code}</div>
            </div>
          </div>
          <PriceAlert currency={{ currency, code, value }} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div 
            className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            ${value.toLocaleString()}
            <span className="text-sm text-gray-400">
              {code === 'BTC' ? 'DOLLAR' : 'TOMAN'}
            </span>
          </motion.div>
          <div className={`flex items-center gap-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <motion.div 
              className="flex items-center gap-1 text-sm font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v11a1 1 0 11-2 0V8H5a1 1 0 110-2h6a1 1 0 011 1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 13a1 1 0 01-1 1H5a1 1 0 110-2h6a1 1 0 011 1zm0-8a1 1 0 01-1 1H5a1 1 0 110-2h6a1 1 0 011 1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-bold">{Math.abs(change)}%</span>
              <span className="text-xs">24h</span>
            </motion.div>
            {/* Mini Chart with Animation */}
            <div className={`h-6 flex items-end gap-0.5 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {[20, 40, 60, 80, 100].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(height * 24) / 100}px` }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`w-1 bg-current rounded-t`}
                  style={{ opacity: height / 100 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrencyCard; 