import './ComparisonBlock.css';

/**
 * ComparisonBlock - Side-by-side comparison of Original vs Enhanced
 * Two columns on desktop, stacked on mobile
 */
export default function ComparisonBlock({ 
  originalTitle = "Original", 
  enhancedTitle = "Enhanced",
  original = [],
  enhanced = []
}) {
  return (
    <div className="comparison-block">
      <div className="comparison-block__column comparison-block__column--original">
        <div className="comparison-block__header">
          <span className="comparison-block__icon comparison-block__icon--original" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </span>
          <h3 className="comparison-block__title">{originalTitle}</h3>
        </div>
        <ul className="comparison-block__list">
          {original.map((item, index) => (
            <li key={index} className="comparison-block__item">
              <span className="comparison-block__bullet" aria-hidden="true">−</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="comparison-block__divider" aria-hidden="true">
        <div className="comparison-block__arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="comparison-block__column comparison-block__column--enhanced">
        <div className="comparison-block__header">
          <span className="comparison-block__icon comparison-block__icon--enhanced" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </span>
          <h3 className="comparison-block__title">{enhancedTitle}</h3>
        </div>
        <ul className="comparison-block__list">
          {enhanced.map((item, index) => (
            <li key={index} className="comparison-block__item comparison-block__item--enhanced">
              <span className="comparison-block__bullet comparison-block__bullet--enhanced" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
