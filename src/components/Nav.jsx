import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Nav.css';

const navItems = [
  { path: '/', label: 'Home', exact: true },
  { path: '/assessment', label: 'Self-Assessment' },
  { path: '/code-review', label: 'Code Review' },
];

const artifactItems = [
  { path: '/software-engineering', label: 'Software Engineering', icon: '⚙️' },
  { path: '/algorithms', label: 'Algorithms', icon: '🔄' },
  { path: '/database', label: 'Databases', icon: '🗄️' },
];

const codeItems = [
  { path: '/original-code', label: 'Original Code' },
  { path: '/enhanced-code', label: 'Enhanced Code' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`nav-header ${isScrolled ? 'nav-header--scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo / Brand */}
        <NavLink to="/" className="nav-brand">
          <span className="nav-brand__icon">GP</span>
          <div className="nav-brand__text">
            <span className="nav-brand__name">Gonzalo Patino</span>
            <span className="nav-brand__subtitle">CS-499 ePortfolio</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <div className="nav-group">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-divider" />

          <div className="nav-group nav-group--artifacts">
            {artifactItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link nav-link--artifact ${isActive ? 'nav-link--active' : ''}`
                }
              >
                <span className="nav-link__icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-divider" />

          <div className="nav-group">
            {codeItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link nav-link--code ${isActive ? 'nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`nav-mobile-toggle ${isMobileMenuOpen ? 'nav-mobile-toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="nav-mobile-toggle__bar" />
          <span className="nav-mobile-toggle__bar" />
          <span className="nav-mobile-toggle__bar" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile ${isMobileMenuOpen ? 'nav-mobile--open' : ''}`}>
        <div className="nav-mobile__section">
          <span className="nav-mobile__label">Overview</span>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `nav-mobile__link ${isActive ? 'nav-mobile__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-mobile__section">
          <span className="nav-mobile__label">Artifacts</span>
          {artifactItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-mobile__link ${isActive ? 'nav-mobile__link--active' : ''}`
              }
            >
              <span className="nav-mobile__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-mobile__section">
          <span className="nav-mobile__label">Code</span>
          {codeItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-mobile__link ${isActive ? 'nav-mobile__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
