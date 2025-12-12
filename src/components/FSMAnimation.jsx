import { useEffect, useState } from 'react';
import { Power, Flame, Snowflake, AlertTriangle, ArrowRight } from 'lucide-react';
import './FSMAnimation.css';

/**
 * FSM Animation - Algorithms Category
 * Visualizes the thermostat finite state machine with animated state transitions
 */
export default function FSMAnimation() {
  const [activeState, setActiveState] = useState('idle');
  const [transitionPath, setTransitionPath] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const states = [
    { id: 'idle', label: 'IDLE', Icon: Power, color: 'gray' },
    { id: 'heating', label: 'HEATING', Icon: Flame, color: 'red' },
    { id: 'cooling', label: 'COOLING', Icon: Snowflake, color: 'cyan' },
    { id: 'error', label: 'ERROR', Icon: AlertTriangle, color: 'yellow' },
  ];

  const transitions = [
    { from: 'idle', to: 'heating', label: 'T < Tset - H' },
    { from: 'idle', to: 'cooling', label: 'T > Tset + H' },
    { from: 'heating', to: 'idle', label: 'T ≥ Tset' },
    { from: 'cooling', to: 'idle', label: 'T ≤ Tset' },
    { from: 'heating', to: 'error', label: 'Sensor Fail' },
    { from: 'cooling', to: 'error', label: 'Sensor Fail' },
    { from: 'idle', to: 'error', label: 'Sensor Fail' },
    { from: 'error', to: 'idle', label: 'Recovery' },
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animate through states
  useEffect(() => {
    if (prefersReducedMotion) return;

    const sequence = ['idle', 'heating', 'idle', 'cooling', 'idle', 'error', 'idle'];
    let index = 0;

    const interval = setInterval(() => {
      const currentState = sequence[index];
      const nextIndex = (index + 1) % sequence.length;
      const nextState = sequence[nextIndex];
      
      // Find transition
      const transition = transitions.find(t => t.from === currentState && t.to === nextState);
      if (transition) {
        setTransitionPath(transition);
        setTimeout(() => {
          setActiveState(nextState);
          setTimeout(() => setTransitionPath(null), 500);
        }, 500);
      }
      
      index = nextIndex;
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const getStatePosition = (stateId) => {
    switch (stateId) {
      case 'idle': return { x: 50, y: 30 };
      case 'heating': return { x: 20, y: 70 };
      case 'cooling': return { x: 80, y: 70 };
      case 'error': return { x: 50, y: 90 };
      default: return { x: 50, y: 50 };
    }
  };

  if (prefersReducedMotion) {
    return (
      <section className="fsm-animation fsm-animation--static">
        <div className="fsm-animation__container">
          <h3 className="fsm-animation__title">Finite State Machine</h3>
          <div className="fsm-animation__states-grid">
            {states.map((state) => (
              <div key={state.id} className={`fsm-animation__state-card fsm-animation__state-card--${state.color}`}>
                <state.Icon size={24} />
                <span>{state.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="fsm-animation">
      {/* Background Grid */}
      <div className="fsm-animation__grid-bg" />

      <div className="fsm-animation__container">
        <h3 className="fsm-animation__title">Thermostat Finite State Machine</h3>
        
        {/* State Machine Visualization */}
        <div className="fsm-animation__diagram">
          {/* SVG Connections */}
          <svg className="fsm-animation__connections" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Idle to Heating */}
            <path 
              d="M 45 35 Q 30 50 25 60" 
              className={`fsm-animation__path ${transitionPath?.from === 'idle' && transitionPath?.to === 'heating' ? 'fsm-animation__path--active' : ''}`}
            />
            {/* Idle to Cooling */}
            <path 
              d="M 55 35 Q 70 50 75 60" 
              className={`fsm-animation__path ${transitionPath?.from === 'idle' && transitionPath?.to === 'cooling' ? 'fsm-animation__path--active' : ''}`}
            />
            {/* Heating to Idle */}
            <path 
              d="M 30 60 Q 35 45 45 32" 
              className={`fsm-animation__path ${transitionPath?.from === 'heating' && transitionPath?.to === 'idle' ? 'fsm-animation__path--active' : ''}`}
            />
            {/* Cooling to Idle */}
            <path 
              d="M 70 60 Q 65 45 55 32" 
              className={`fsm-animation__path ${transitionPath?.from === 'cooling' && transitionPath?.to === 'idle' ? 'fsm-animation__path--active' : ''}`}
            />
            {/* To Error */}
            <path 
              d="M 50 38 L 50 80" 
              className={`fsm-animation__path fsm-animation__path--error ${transitionPath?.to === 'error' ? 'fsm-animation__path--active' : ''}`}
            />
            {/* Error to Idle */}
            <path 
              d="M 45 82 Q 40 60 45 35" 
              className={`fsm-animation__path fsm-animation__path--recovery ${transitionPath?.from === 'error' && transitionPath?.to === 'idle' ? 'fsm-animation__path--active' : ''}`}
            />
          </svg>

          {/* State Nodes */}
          {states.map((state) => {
            const pos = getStatePosition(state.id);
            const isActive = activeState === state.id;
            
            return (
              <div
                key={state.id}
                className={`fsm-animation__state fsm-animation__state--${state.color} ${isActive ? 'fsm-animation__state--active' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="fsm-animation__state-inner">
                  <state.Icon size={28} />
                  <span className="fsm-animation__state-label">{state.label}</span>
                </div>
                {isActive && <div className="fsm-animation__state-ring" />}
              </div>
            );
          })}
        </div>

        {/* Transition Info */}
        <div className="fsm-animation__info">
          <div className="fsm-animation__current-state">
            Current State: <span className={`fsm-animation__state-badge fsm-animation__state-badge--${states.find(s => s.id === activeState)?.color}`}>
              {activeState.toUpperCase()}
            </span>
          </div>
          {transitionPath && (
            <div className="fsm-animation__transition-info">
              <span>{transitionPath.from.toUpperCase()}</span>
              <ArrowRight size={16} />
              <span>{transitionPath.to.toUpperCase()}</span>
              <span className="fsm-animation__transition-label">({transitionPath.label})</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="fsm-animation__legend">
          <span className="fsm-animation__legend-item">
            <span className="fsm-animation__legend-dot fsm-animation__legend-dot--gray" />
            Idle
          </span>
          <span className="fsm-animation__legend-item">
            <span className="fsm-animation__legend-dot fsm-animation__legend-dot--red" />
            Heating
          </span>
          <span className="fsm-animation__legend-item">
            <span className="fsm-animation__legend-dot fsm-animation__legend-dot--cyan" />
            Cooling
          </span>
          <span className="fsm-animation__legend-item">
            <span className="fsm-animation__legend-dot fsm-animation__legend-dot--yellow" />
            Error
          </span>
        </div>
      </div>
    </section>
  );
}
