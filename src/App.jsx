import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import DonateSection from './sections/DonateSection';
import SourceSection from './sections/SourceSection';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <Routes>
          <Route path="/" element={
            <>
              <HomeSection />
              <AboutSection />
              <SourceSection />
              <DonateSection />
            </>
          } />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
