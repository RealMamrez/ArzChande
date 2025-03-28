import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserData, logoutUser } from '../services/firebase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          navigate('/login');
          return;
        }

        const data = await getUserData(user.uid);
        setUserData({ ...user, ...data });
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111111]">
        <div className="text-white">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">داشبورد</h1>
              <p className="text-gray-400 mt-2">خوش آمدید {userData?.name || userData?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              خروج
            </button>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-8 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">اطلاعات کاربری</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gray-400 w-24">ایمیل:</span>
                <span>{userData?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-24">نام:</span>
                <span>{userData?.name || 'تنظیم نشده'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-24">تاریخ عضویت:</span>
                <span>
                  {userData?.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString('fa-IR')
                    : 'نامشخص'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">تنظیمات</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>اعلان‌های قیمت</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>نمایش ارزهای دیجیتال</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage; 