import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import MentalHealthCheck from "./pages/MentalHealthCheck";
import Support from "./pages/Support";
import Games from "./pages/Games";
import Chatbot from "./pages/Chatbot";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/sonner";
import { Menu, X } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/mental-health-check", label: "Mental Health Check" },
    { path: "/support", label: "Support & Help" },
    { path: "/games", label: "Relaxation Games" },
    { path: "/chatbot", label: "CalmiBot" },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "Contact Us" }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          MindEase
        </Link>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mental-health-check" element={<MentalHealthCheck />} />
          <Route path="/support" element={<Support />} />
          <Route path="/games" element={<Games />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;