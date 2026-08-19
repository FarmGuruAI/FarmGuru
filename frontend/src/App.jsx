import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const handleTimeUpdate = (e) => {
    if (e.target.currentTime >= 1 && !isFading) {
      setIsFading(true);
      setShowIntro(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-full bg-black z-50 flex items-center justify-center"
          >
            <video
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setShowIntro(false)}
              className="w-full h-full object-cover"
            >
              <source src="/seed_v2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={() => setShowIntro(false)}
              className="absolute bottom-10 right-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-6 py-2 rounded-full transition-all duration-300 z-50 cursor-pointer"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Router>
        <div className="min-h-screen bg-soil-dark text-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
