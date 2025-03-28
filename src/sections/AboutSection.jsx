import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="section min-h-screen flex items-center py-20">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            About ArzChande?
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            <span className="text-green-500">ArzChande</span> is your go-to platform for{' '}
            <span className="text-blue-500">real-time</span> exchange rates of fiat currencies and cryptocurrencies. 
            We provide <span className="text-blue-500">up-to-the-minute</span> price updates, market trends, and analytical insights 
            to help you make informed financial decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection; 