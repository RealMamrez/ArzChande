import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SourceSection from './sections/SourceSection';
import DonateSection from './sections/DonateSection';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import BottomNavbar from './components/BottomNavbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <div className="bg-[#111111] min-h-screen overflow-x-hidden">
            <main className="relative">
              <section id="home" className="section flex items-center justify-center">
                <HomeSection />
              </section>
              
              <section id="about" className="section flex items-center justify-center">
                <AboutSection />
              </section>
              
              <section id="source" className="section flex items-center justify-center">
                <SourceSection />
              </section>
              
              <section id="donate" className="section flex items-center justify-center">
                <DonateSection />
              </section>
            </main>

            <BottomNavbar />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
