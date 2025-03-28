import { motion } from 'framer-motion';

const CurrencyCardSkeleton = () => {
  return (
    <div className="bg-[#1c1c1c] rounded-xl p-6 h-[160px] relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#242424] animate-pulse" />
        <div>
          <div className="h-4 w-32 bg-[#242424] rounded animate-pulse mb-2" />
          <div className="h-3 w-16 bg-[#242424] rounded animate-pulse" />
        </div>
      </div>
      <div>
        <div className="h-6 w-40 bg-[#242424] rounded animate-pulse mb-2" />
        <div className="h-4 w-20 bg-[#242424] rounded animate-pulse" />
      </div>
      
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          animation: 'shimmer 2s infinite',
        }}
      />
    </div>
  );
};

export default CurrencyCardSkeleton; 