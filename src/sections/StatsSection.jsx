import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaDownload } from 'react-icons/fa';

const StatsSection = () => {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    downloads: 0,
    loading: true
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/arzchande/arzchande');
        const data = await response.json();
        
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          downloads: 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubStats();
    // Update stats every 5 minutes
    const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      icon: <FaStar className="w-6 h-6 text-yellow-400" />,
      label: 'Stars',
      value: stats.stars
    },
    {
      icon: <FaCodeBranch className="w-6 h-6 text-blue-400" />,
      label: 'Forks',
      value: stats.forks
    },
    {
      icon: <FaDownload className="w-6 h-6 text-green-400" />,
      label: 'Downloads',
      value: stats.downloads
    }
  ];

  return (
    <section className="py-20 bg-[#1c1c1c]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">GitHub Stats</h2>
          <p className="text-gray-400">Real-time statistics from our GitHub repository</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#242424] rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {stats.loading ? '...' : stat.value.toLocaleString()}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/arzchande/arzchande"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#242424] text-white px-6 py-3 rounded-lg hover:bg-[#333] transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 