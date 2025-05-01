import { useEffect, useState } from 'react';
import { LogOut, Home, BarChart2, Activity } from 'lucide-react';
import '../style/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items with icons
  const menuItems = [
    { name: 'Home', icon: <Home size={18} /> },
    { name: 'Insights', icon: <BarChart2 size={18} /> },
    { name: 'BMI', icon: <Activity size={18} /> },
  ];

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo">
          <span className="logo-text">Healthify</span>
        </a>

        {/* Navigation */}
        <div className="nav-links">
          {menuItems.map((item, index) => (
            <a key={index} href={`#${item.name.toLowerCase().replace(' ', '-')}`} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </a>
          ))}
          <a href="#logout" className="nav-item logout">
            <span className="nav-icon"><LogOut size={18} /></span>
            <span className="nav-text">Log Out</span>
          </a>
        </div>
      </div>
    </div>
  );
}