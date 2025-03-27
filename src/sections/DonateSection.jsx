import { motion } from 'framer-motion';

const DonateSection = () => {
  return (
    <div className="section">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            Donate
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            We truly appreciate your support for <span className="text-green-500">ArzChande</span>! Your encouragement helps us continue 
            providing real-time exchange rates, market insights, and valuable financial tools.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Donate Now
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent 45%, white 50%, transparent 55%)',
                backgroundSize: '250% 100%',
                animation: 'shine 1.5s infinite'
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DonateSection; 