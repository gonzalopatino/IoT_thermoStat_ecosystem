import { useState, useEffect } from 'react';
import './TableOfContents.css';

/**
 * TableOfContents - Sticky navigation for page sections
 * Responsive: sidebar on desktop, collapsible on mobile
 */
export default function TableOfContents({ items = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <button 
        className="toc__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <span className="toc__toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </span>
        <span>On this page</span>
        <span className={`toc__chevron ${isOpen ? 'toc__chevron--open' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div 
        id="toc-list"
        className={`toc__content ${isOpen ? 'toc__content--open' : ''}`}
      >
        <h2 className="toc__heading">On this page</h2>
        <ul className="toc__list">
          {items.map((item) => (
            <li key={item.id} className="toc__item">
              <a
                href={`#${item.id}`}
                className={`toc__link ${activeId === item.id ? 'toc__link--active' : ''}`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
