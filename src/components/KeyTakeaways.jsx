import './KeyTakeaways.css';

/**
 * KeyTakeaways - Visual summary cards for artifact pages
 * Shows Original, Enhanced, Why It Matters, and Outcomes
 */
export default function KeyTakeaways({ items = [] }) {
  const icons = {
    original: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    enhanced: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    impact: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    outcomes: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  };

  const getIcon = (type) => icons[type] || icons.original;

  return (
    <div className="key-takeaways">
      <h2 className="key-takeaways__title">Key Takeaways</h2>
      <div className="key-takeaways__grid">
        {items.map((item, index) => (
          <article 
            key={index} 
            className={`takeaway-card takeaway-card--${item.type || 'default'}`}
          >
            <div className="takeaway-card__icon" aria-hidden="true">
              {getIcon(item.type)}
            </div>
            <h3 className="takeaway-card__heading">{item.title}</h3>
            <p className="takeaway-card__content">{item.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
