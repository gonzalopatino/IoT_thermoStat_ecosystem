import { Link } from 'react-router-dom';
import Section from '../components/Section';
import './Home.css';

// Card data for the navigation grid
const overviewCards = [
  {
    path: '/assessment',
    icon: '📋',
    title: 'Self-Assessment',
    description: 'Professional journey, goals, and skills demonstrated',
    color: 'primary'
  },
  {
    path: '/code-review',
    icon: '🔍',
    title: 'Code Review',
    description: 'Video walkthrough of original code analysis',
    color: 'primary'
  }
];

const artifactCards = [
  {
    path: '/software-engineering',
    icon: '⚙️',
    title: 'Software Engineering',
    description: 'Modular architecture, HAL, and FreeRTOS design',
    color: 'cyan'
  },
  {
    path: '/algorithms',
    icon: '🔄',
    title: 'Algorithms',
    description: 'Finite state machines and hysteresis control',
    color: 'purple'
  },
  {
    path: '/database',
    icon: '🗄️',
    title: 'Databases',
    description: 'Django backend with PostgreSQL telemetry',
    color: 'emerald'
  }
];

const codeCards = [
  {
    path: '/original-code',
    icon: '📦',
    title: 'Original Code',
    description: 'Raspberry Pi Python prototype',
    color: 'gray'
  },
  {
    path: '/enhanced-code',
    icon: '🚀',
    title: 'Enhanced Code',
    description: 'ESP32 FreeRTOS production system',
    color: 'accent'
  }
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__accent" />
        <div className="home-hero__content">
          <span className="home-hero__badge">CS-499 Computer Science Capstone</span>
          <h1 className="home-hero__title">
            <span className="text-gradient">ThermostatRTOS</span>
            <br />ePortfolio
          </h1>
          <p className="home-hero__subtitle">
            A comprehensive transformation from prototype to production—demonstrating 
            software engineering, algorithmic design, and database integration expertise.
          </p>
          <div className="home-hero__cta">
            <Link to="/assessment" className="btn btn--primary">
              Start Exploring
              <span className="btn__icon">→</span>
            </Link>
            <Link to="/code-review" className="btn btn--outline">
              Watch Code Review
            </Link>
          </div>
        </div>
        <div className="home-hero__visual">
          <div className="home-hero__orb home-hero__orb--1" />
          <div className="home-hero__orb home-hero__orb--2" />
          <div className="home-hero__orb home-hero__orb--3" />
        </div>
      </section>

      {/* Overview Cards */}
      <section className="home-section">
        <h2 className="home-section__title">
          <span className="home-section__icon">📌</span>
          Overview
        </h2>
        <div className="card-grid card-grid--2">
          {overviewCards.map((card) => (
            <Link key={card.path} to={card.path} className={`nav-card nav-card--${card.color}`}>
              <span className="nav-card__icon">{card.icon}</span>
              <div className="nav-card__content">
                <h3 className="nav-card__title">{card.title}</h3>
                <p className="nav-card__description">{card.description}</p>
              </div>
              <span className="nav-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Artifact Cards */}
      <section className="home-section">
        <h2 className="home-section__title">
          <span className="home-section__icon">🎯</span>
          Enhancement Artifacts
        </h2>
        <div className="card-grid card-grid--3">
          {artifactCards.map((card) => (
            <Link key={card.path} to={card.path} className={`nav-card nav-card--${card.color}`}>
              <span className="nav-card__icon">{card.icon}</span>
              <div className="nav-card__content">
                <h3 className="nav-card__title">{card.title}</h3>
                <p className="nav-card__description">{card.description}</p>
              </div>
              <span className="nav-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Code Repository Cards */}
      <section className="home-section">
        <h2 className="home-section__title">
          <span className="home-section__icon">💻</span>
          Code Repositories
        </h2>
        <div className="card-grid card-grid--2">
          {codeCards.map((card) => (
            <Link key={card.path} to={card.path} className={`nav-card nav-card--${card.color}`}>
              <span className="nav-card__icon">{card.icon}</span>
              <div className="nav-card__content">
                <h3 className="nav-card__title">{card.title}</h3>
                <p className="nav-card__description">{card.description}</p>
              </div>
              <span className="nav-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <Section title="About This Portfolio" variant="highlight">
        <p>
          This ePortfolio was created to fulfill the requirements of the CS-499 Computer Science 
          Capstone at Southern New Hampshire University. It serves as a comprehensive demonstration 
          of the skills, knowledge, and professional growth I have developed throughout the program.
        </p>
        <p>
          Beyond its academic purpose, this portfolio functions as a professional showcase for 
          employers and collaborators—providing concrete evidence of my ability to take a 
          prototype-level project and systematically transform it into a production-ready system 
          through disciplined engineering, clear documentation, and iterative refinement.
        </p>
      </Section>

      {/* Categories Section */}
      <Section title="Artifact Categories">
        <div className="category-list">
          <div className="category-item">
            <div className="category-item__icon category-item__icon--cyan">⚙️</div>
            <div className="category-item__content">
              <h4>Software Engineering and Design</h4>
              <p>
                The original monolithic Python script was decomposed into a modular, layered 
                architecture running on the ESP32 with FreeRTOS. This category demonstrates 
                proficiency in task-based concurrency, hardware abstraction, configuration 
                management, and maintainable system design.
              </p>
            </div>
          </div>
          <div className="category-item">
            <div className="category-item__icon category-item__icon--purple">🔄</div>
            <div className="category-item__content">
              <h4>Algorithms and Data Structures</h4>
              <p>
                The naive threshold-based control logic was replaced with a formal finite 
                state machine implementing Idle, Heating, Cooling, and Error states. 
                Hysteresis, minimum on/off timing, and deterministic transitions ensure 
                stable, predictable thermostat behavior.
              </p>
            </div>
          </div>
          <div className="category-item">
            <div className="category-item__icon category-item__icon--emerald">🗄️</div>
            <div className="category-item__content">
              <h4>Databases</h4>
              <p>
                A complete backend platform was developed using Django and PostgreSQL. 
                The system supports device registration, hashed API key authentication, 
                telemetry persistence, alert configuration, and a real-time dashboard 
                for remote monitoring and trend analysis.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Navigation Guide */}
      <Section title="How to Navigate This Site">
        <div className="steps-list">
          <div className="step-item">
            <div className="step-item__number">1</div>
            <div className="step-item__content">
              <h4>Professional Self-Assessment</h4>
              <p>
                Begin here to understand my academic journey, professional goals, and 
                the skills demonstrated throughout this capstone project.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-item__number">2</div>
            <div className="step-item__content">
              <h4>Code Review</h4>
              <p>
                Watch the narrated video walkthrough of the original Raspberry Pi 
                thermostat code, which identifies architectural, algorithmic, and 
                reliability issues that informed the enhancement strategy.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-item__number">3</div>
            <div className="step-item__content">
              <h4>Artifact Pages</h4>
              <p>
                Explore the three enhancement categories: Software Engineering and Design, 
                Algorithms and Data Structures, and Databases. Each page contains a 
                detailed narrative explaining the improvements made.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-item__number">4</div>
            <div className="step-item__content">
              <h4>Original and Enhanced Code</h4>
              <p>
                Review the before-and-after code repositories to see the complete 
                transformation from prototype to production-quality system.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
