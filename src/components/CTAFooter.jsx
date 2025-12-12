import { Link } from 'react-router-dom';
import './CTAFooter.css';

/**
 * CTAFooter - Modern navigation CTA block for page bottom
 * Shows navigation buttons in a styled footer section
 */
export default function CTAFooter({ 
  prevLink,
  prevLabel,
  nextLink,
  nextLabel,
  showCodeLinks = true
}) {
  return (
    <footer className="cta-footer">
      <div className="cta-footer__inner">
        <div className="cta-footer__heading">
          <h2>Continue Exploring</h2>
          <p>Navigate the ePortfolio artifacts and code repositories</p>
        </div>

        <div className="cta-footer__nav">
          {/* Primary navigation */}
          <div className="cta-footer__primary">
            {prevLink && (
              <Link to={prevLink} className="cta-btn cta-btn--outline">
                <span className="cta-btn__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </span>
                <span className="cta-btn__text">
                  <span className="cta-btn__label">Previous</span>
                  <span className="cta-btn__title">{prevLabel}</span>
                </span>
              </Link>
            )}

            {nextLink && (
              <Link to={nextLink} className="cta-btn cta-btn--primary">
                <span className="cta-btn__text">
                  <span className="cta-btn__label">Next</span>
                  <span className="cta-btn__title">{nextLabel}</span>
                </span>
                <span className="cta-btn__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>

          {/* Code repository links */}
          {showCodeLinks && (
            <div className="cta-footer__code-links">
              <Link to="/original-code" className="cta-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Original Code
              </Link>
              <Link to="/enhanced-code" className="cta-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Enhanced Code
              </Link>
              <Link to="/" className="cta-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Back to Home
              </Link>
            </div>
          )}
        </div>

        <div className="cta-footer__meta">
          <p>Last updated: February 2025</p>
        </div>
      </div>
    </footer>
  );
}
