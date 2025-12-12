import './Section.css';

/**
 * Section - Content section with optional anchor ID and variants
 * @param {string} id - Optional anchor ID for TOC navigation
 * @param {string} title - Section heading
 * @param {string} variant - 'default' | 'highlight'
 * @param {string} headingLevel - 'h2' | 'h3' for proper heading hierarchy
 */
export default function Section({ 
  id, 
  title, 
  variant = 'default', 
  headingLevel = 'h2',
  children 
}) {
  const className = variant === 'highlight' 
    ? 'section section--highlight' 
    : 'section section--default';
  
  const HeadingTag = headingLevel;
  
  return (
    <section id={id} className={className}>
      {title && (
        <HeadingTag className="section-title">
          {id && (
            <a href={`#${id}`} className="section-anchor" aria-label={`Link to ${title} section`}>
              #
            </a>
          )}
          {title}
        </HeadingTag>
      )}
      {children}
    </section>
  );
}
