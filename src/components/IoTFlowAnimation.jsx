import { useEffect, useRef, useState } from 'react';
import { Thermometer, Cpu, Cloud, Smartphone, Monitor } from 'lucide-react';
import './IoTFlowAnimation.css';

/**
 * IoT Flow Animation - Software Engineering Category
 * Visualizes: Smart Thermostat → Edge (ESP32) → Cloud → Phone/Browser
 * with falling binary digits (0s and 1s)
 */
export default function IoTFlowAnimation() {
  const containerRef = useRef(null);
  const [binaryDigits, setBinaryDigits] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Generate falling binary digits
  useEffect(() => {
    if (prefersReducedMotion) return;

    const generateDigit = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const digit = Math.random() > 0.5 ? '1' : '0';
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 4; // 3-7 seconds
      const delay = Math.random() * 0.5;
      const size = 0.6 + Math.random() * 0.6; // 0.6-1.2rem

      return { id, digit, left, duration, delay, size };
    };

    // Initial batch of digits
    const initial = Array.from({ length: 25 }, generateDigit);
    setBinaryDigits(initial);

    // Continuously add new digits
    const interval = setInterval(() => {
      setBinaryDigits(prev => {
        // Remove old digits and add new ones
        const filtered = prev.slice(-40); // Keep max 40 digits
        return [...filtered, generateDigit()];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section className="iot-flow iot-flow--static">
        <div className="iot-flow__container">
          <div className="iot-flow__stage">
            <div className="iot-flow__node iot-flow__node--thermostat">
              <div className="iot-flow__icon-wrapper">
                <Thermometer size={32} />
              </div>
              <span className="iot-flow__label">Smart Thermostat</span>
            </div>
            <div className="iot-flow__connector">→</div>
            <div className="iot-flow__node iot-flow__node--edge">
              <div className="iot-flow__icon-wrapper">
                <Cpu size={32} />
              </div>
              <span className="iot-flow__label">Edge (ESP32)</span>
            </div>
            <div className="iot-flow__connector">→</div>
            <div className="iot-flow__node iot-flow__node--cloud">
              <div className="iot-flow__icon-wrapper">
                <Cloud size={32} />
              </div>
              <span className="iot-flow__label">Cloud</span>
            </div>
            <div className="iot-flow__connector">→</div>
            <div className="iot-flow__node iot-flow__node--clients">
              <div className="iot-flow__icon-wrapper">
                <Smartphone size={28} />
                <Monitor size={28} />
              </div>
              <span className="iot-flow__label">Phone / Browser</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="iot-flow" ref={containerRef}>
      {/* Falling Binary Background */}
      <div className="iot-flow__binary-rain">
        {binaryDigits.map(({ id, digit, left, duration, delay, size }) => (
          <span
            key={id}
            className="iot-flow__digit"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              fontSize: `${size}rem`,
            }}
          >
            {digit}
          </span>
        ))}
      </div>

      {/* Main Flow Container */}
      <div className="iot-flow__container">
        <h3 className="iot-flow__title">IoT Architecture Flow</h3>
        
        <div className="iot-flow__stage">
          {/* Thermostat Node */}
          <div className="iot-flow__node iot-flow__node--thermostat">
            <div className="iot-flow__icon-wrapper">
              <Thermometer size={36} />
              <div className="iot-flow__pulse" />
            </div>
            <span className="iot-flow__label">Smart Thermostat</span>
            <span className="iot-flow__sublabel">DHT22 Sensor</span>
          </div>

          {/* Connection Line 1 */}
          <div className="iot-flow__connection">
            <div className="iot-flow__line" />
            <div className="iot-flow__data-packet iot-flow__data-packet--1" />
            <div className="iot-flow__data-packet iot-flow__data-packet--2" />
          </div>

          {/* Edge Node */}
          <div className="iot-flow__node iot-flow__node--edge">
            <div className="iot-flow__icon-wrapper">
              <Cpu size={36} />
              <div className="iot-flow__pulse" />
            </div>
            <span className="iot-flow__label">Edge Device</span>
            <span className="iot-flow__sublabel">ESP32 + FreeRTOS</span>
          </div>

          {/* Connection Line 2 */}
          <div className="iot-flow__connection">
            <div className="iot-flow__line" />
            <div className="iot-flow__data-packet iot-flow__data-packet--3" />
            <div className="iot-flow__data-packet iot-flow__data-packet--4" />
          </div>

          {/* Cloud Node */}
          <div className="iot-flow__node iot-flow__node--cloud">
            <div className="iot-flow__icon-wrapper">
              <Cloud size={36} />
              <div className="iot-flow__pulse" />
            </div>
            <span className="iot-flow__label">Cloud Backend</span>
            <span className="iot-flow__sublabel">Django + PostgreSQL</span>
          </div>

          {/* Connection Line 3 */}
          <div className="iot-flow__connection">
            <div className="iot-flow__line" />
            <div className="iot-flow__data-packet iot-flow__data-packet--5" />
            <div className="iot-flow__data-packet iot-flow__data-packet--6" />
          </div>

          {/* Client Nodes */}
          <div className="iot-flow__node iot-flow__node--clients">
            <div className="iot-flow__icon-wrapper iot-flow__icon-wrapper--dual">
              <Smartphone size={32} />
              <Monitor size={32} />
            </div>
            <span className="iot-flow__label">Clients</span>
            <span className="iot-flow__sublabel">Phone / Browser</span>
          </div>
        </div>

        {/* Data Flow Labels */}
        <div className="iot-flow__data-labels">
          <span className="iot-flow__data-label">Sensor Data</span>
          <span className="iot-flow__data-label">Telemetry</span>
          <span className="iot-flow__data-label">Dashboard</span>
        </div>
      </div>
    </section>
  );
}
