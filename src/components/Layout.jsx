import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="site-layout">
      <Nav />
      
      {/* Main Content */}
      <main className="site-main">
        <div className="site-content">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
