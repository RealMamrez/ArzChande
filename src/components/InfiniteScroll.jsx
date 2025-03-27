import { motion } from 'framer-motion';

const InfiniteScroll = () => {
  const items = [
    {
      title: 'About ArzChande?',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '#about'
    },
    {
      title: 'Source Code',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: 'https://github.com/yourusername/arzchand'
    },
    {
      title: 'Donate',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '#donate'
    }
  ];

  // دو برابر کردن آیتم‌ها برای ایجاد افکت اسکرول بی‌نهایت
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-[#1c1c1c] py-8 overflow-hidden">
      <motion.div
        animate={{
          x: [0, -50],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          },
        }}
        className="flex gap-8"
      >
        {duplicatedItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            className="flex items-center gap-3 px-6 py-3 bg-[#242424] rounded-full hover:bg-[#2a2a2a] transition-colors duration-300 group min-w-max"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 group-hover:text-blue-300"
            >
              {item.icon}
            </motion.div>
            <span className="text-gray-300 group-hover:text-white font-medium">
              {item.title}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll; 