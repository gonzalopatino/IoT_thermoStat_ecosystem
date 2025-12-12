import { useEffect, useState, useRef } from 'react';
import { Database, Server, BarChart2, Shield, Clock, Zap } from 'lucide-react';
import './DataFlowAnimation.css';

/**
 * Data Flow Animation - Database Category
 * Visualizes: Telemetry → API → PostgreSQL → Dashboard
 * with animated data rows flowing through
 */
export default function DataFlowAnimation() {
  const [dataRows, setDataRows] = useState([]);
  const [stats, setStats] = useState({ rows: 0, queries: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const idCounter = useRef(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Generate sample data rows
  useEffect(() => {
    if (prefersReducedMotion) return;

    const generateRow = () => {
      const id = idCounter.current++;
      const temp = (68 + Math.random() * 10).toFixed(1);
      const humidity = (40 + Math.random() * 30).toFixed(0);
      const state = ['IDLE', 'HEATING', 'COOLING'][Math.floor(Math.random() * 3)];
      
      return { id, temp, humidity, state, phase: 'api' };
    };

    // Start with initial rows
    setDataRows([generateRow()]);

    const interval = setInterval(() => {
      setDataRows(prev => {
        // Progress existing rows through phases
        const updated = prev.map(row => {
          if (row.phase === 'api') return { ...row, phase: 'db' };
          if (row.phase === 'db') return { ...row, phase: 'dashboard' };
          return { ...row, phase: 'done' };
        }).filter(row => row.phase !== 'done');

        // Add new row
        const newRow = generateRow();
        return [...updated.slice(-4), newRow]; // Keep max 5 rows
      });

      // Update stats
      setStats(prev => ({
        rows: prev.rows + 1,
        queries: prev.queries + 2
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section className="data-flow data-flow--static">
        <div className="data-flow__container">
          <h3 className="data-flow__title">Database Architecture</h3>
          <div className="data-flow__static-grid">
            <div className="data-flow__static-card">
              <Server size={24} />
              <span>Django REST API</span>
            </div>
            <div className="data-flow__static-card">
              <Database size={24} />
              <span>PostgreSQL</span>
            </div>
            <div className="data-flow__static-card">
              <BarChart2 size={24} />
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="data-flow">
      {/* Animated Background Pattern */}
      <div className="data-flow__bg-pattern">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="data-flow__bg-line" style={{ left: `${i * 5}%` }} />
        ))}
      </div>

      <div className="data-flow__container">
        <h3 className="data-flow__title">Real-Time Telemetry Pipeline</h3>

        {/* Pipeline Stages */}
        <div className="data-flow__pipeline">
          {/* API Stage */}
          <div className="data-flow__stage data-flow__stage--api">
            <div className="data-flow__stage-icon">
              <Server size={28} />
              <div className="data-flow__stage-pulse" />
            </div>
            <span className="data-flow__stage-label">REST API</span>
            <span className="data-flow__stage-tech">Django</span>
          </div>

          {/* Connection 1 */}
          <div className="data-flow__connector">
            <div className="data-flow__connector-line" />
            <div className="data-flow__connector-arrow">→</div>
          </div>

          {/* Database Stage */}
          <div className="data-flow__stage data-flow__stage--db">
            <div className="data-flow__stage-icon">
              <Database size={28} />
              <div className="data-flow__stage-pulse" />
            </div>
            <span className="data-flow__stage-label">Database</span>
            <span className="data-flow__stage-tech">PostgreSQL</span>
          </div>

          {/* Connection 2 */}
          <div className="data-flow__connector">
            <div className="data-flow__connector-line" />
            <div className="data-flow__connector-arrow">→</div>
          </div>

          {/* Dashboard Stage */}
          <div className="data-flow__stage data-flow__stage--dashboard">
            <div className="data-flow__stage-icon">
              <BarChart2 size={28} />
              <div className="data-flow__stage-pulse" />
            </div>
            <span className="data-flow__stage-label">Dashboard</span>
            <span className="data-flow__stage-tech">Real-time</span>
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className="data-flow__stream">
          <div className="data-flow__stream-header">
            <span>Telemetry Stream</span>
            <span className="data-flow__stream-indicator">
              <span className="data-flow__stream-dot" />
              Live
            </span>
          </div>
          
          <div className="data-flow__rows">
            {dataRows.map((row) => (
              <div 
                key={row.id} 
                className={`data-flow__row data-flow__row--${row.phase}`}
              >
                <span className="data-flow__row-temp">{row.temp}°F</span>
                <span className="data-flow__row-humidity">{row.humidity}%</span>
                <span className={`data-flow__row-state data-flow__row-state--${row.state.toLowerCase()}`}>
                  {row.state}
                </span>
                <span className="data-flow__row-phase">
                  {row.phase === 'api' && '→ API'}
                  {row.phase === 'db' && '→ DB'}
                  {row.phase === 'dashboard' && '→ UI'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="data-flow__stats">
          <div className="data-flow__stat">
            <Zap size={16} />
            <span className="data-flow__stat-value">{stats.rows}</span>
            <span className="data-flow__stat-label">Records</span>
          </div>
          <div className="data-flow__stat">
            <Clock size={16} />
            <span className="data-flow__stat-value">{stats.queries}</span>
            <span className="data-flow__stat-label">Queries</span>
          </div>
          <div className="data-flow__stat">
            <Shield size={16} />
            <span className="data-flow__stat-value">TLS</span>
            <span className="data-flow__stat-label">Encrypted</span>
          </div>
        </div>

        {/* Features */}
        <div className="data-flow__features">
          <span className="data-flow__feature">HMAC Authentication</span>
          <span className="data-flow__feature">Rate Limiting</span>
          <span className="data-flow__feature">Indexed Queries</span>
          <span className="data-flow__feature">Foreign Keys</span>
        </div>
      </div>
    </section>
  );
}
