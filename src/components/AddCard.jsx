import { useState } from 'react';
import CurrencySelectModal from './CurrencySelectModal';

const AddCard = ({ onCurrencySelect, availableCurrencies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-[#1c1c1c] p-6 rounded-xl w-full aspect-[1.65] hover:shadow-xl transition-all duration-300 hover:bg-[#242424] relative overflow-hidden group border-l-4 border-l-blue-500 ripple-bg cursor-pointer"
        data-ripple-color="blue"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="text-white text-lg font-medium">Add Currency</div>
              <div className="text-gray-400 text-sm">New</div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-400 text-sm">
              Add your desired cryptocurrency or currency
            </p>
          </div>
        </div>
      </div>

      <CurrencySelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableCurrencies={availableCurrencies}
        onSelect={onCurrencySelect}
      />
    </>
  );
};

export default AddCard; 