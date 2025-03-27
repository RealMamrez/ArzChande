import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PriceAlert from './PriceAlert';

const CurrencyCard = ({ currency, code, value, change, flag }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previousHighValue, setPreviousHighValue] = useState(value);
  const [showConfetti, setShowConfetti] = useState(false);
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

  useEffect(() => {
    if (value > previousHighValue) {
      setPreviousHighValue(value);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [value, previousHighValue]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-[#1c1c1c] p-6 rounded-xl w-full aspect-[1.5] hover:shadow-xl transition-all duration-300 hover:bg-[#242424] relative overflow-hidden group border-l-4 ${borderClass} ripple-bg`}
      data-ripple-color={rippleColor}
    >
      {showConfetti && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                top: '50%',
                left: '50%',
                scale: 0
              }}
              animate={{
                top: ['50%', `${Math.random() * 100}%`],
                left: ['50%', `${Math.random() * 100}%`],
                scale: [0, 1, 0],
                backgroundColor: [
                  '#22c55e',
                  '#3b82f6',
                  '#ef4444',
                  '#f59e0b',
                  '#8b5cf6'
                ][Math.floor(Math.random() * 5)]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </motion.div>
      )}

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
            <img 
              src={flag} 
              alt={currency} 
              className="w-10 h-10 rounded-full transition-transform duration-500 hover:rotate-360"
            />
            <div>
              <div className="text-white text-lg font-medium">{currency}</div>
              <div className="text-gray-400 text-sm">{code}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PriceAlert currency={{ currency, code, value }} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div 
            key={value}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg animate-wave" 
              style={{ 
                opacity: isHovered ? 0.1 : 0,
                transition: 'opacity 0.3s ease'
              }} 
            />
            <motion.span
              key={`${value}-${isPositive}`}
              initial={{ color: isPositive ? '#22c55e' : '#ef4444' }}
              animate={{ color: '#ffffff' }}
              transition={{ duration: 2 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r"
                initial={{ 
                  background: isPositive 
                    ? 'linear-gradient(90deg, #22c55e 0%, #22c55e 100%)' 
                    : 'linear-gradient(90deg, #ef4444 0%, #ef4444 100%)'
                }}
                animate={{ 
                  background: 'linear-gradient(90deg, transparent 0%, transparent 100%)'
                }}
                transition={{ duration: 2 }}
                style={{ mixBlendMode: 'overlay' }}
              />
              ${value.toLocaleString()}
            </motion.span>
            <span className="text-sm text-gray-400">
              {code === 'BTC' ? 'DOLLAR' : 'TOMAN'}
            </span>
          </motion.div>
          <div className={`flex items-center gap-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <div 
              className={`flex items-center gap-1 text-sm font-medium transform transition-transform duration-200 ${
                isHovered ? 'translate-x-1' : 'translate-x-0'
              }`}
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
            </div>
            {/* Mini Chart with Animation */}
            <div className={`h-6 flex items-end gap-0.5 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {[20, 40, 60, 80, 100].map((height, index) => (
                <div
                  key={index}
                  className={`w-1 bg-current rounded-t transition-all duration-300 delay-${index * 100}`}
                  style={{ 
                    height: `${(height * 24) / 100}px`,
                    opacity: height / 100 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard; 