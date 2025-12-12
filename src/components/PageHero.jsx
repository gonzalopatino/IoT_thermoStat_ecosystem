import './PageHero.css';

/**
 * PageHero - A modern hero section for artifact pages
 * Features title, summary, and metadata badges
 */
export default function PageHero({ 
  title, 
  subtitle,
  summary, 
  badges = [],
  artifactType
}) {
  return (
    <header className="page-hero">
      <div className="page-hero__accent" />
      <div className="page-hero__content">
        {artifactType && (
          <span className="page-hero__artifact-type">{artifactType}</span>
        )}
        <h1 className="page-hero__title">
          <span>{title}</span>
        </h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {summary && <p className="page-hero__summary">{summary}</p>}
        
        {badges.length > 0 && (
          <div className="page-hero__badges" role="list" aria-label="Technology tags">
            {badges.map((badge, index) => (
              <span key={index} className="badge" role="listitem">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
