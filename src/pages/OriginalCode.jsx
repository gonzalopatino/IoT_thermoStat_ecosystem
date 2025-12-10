import { Link } from 'react-router-dom';
import Section from '../components/Section';

export default function OriginalCode() {
  return (
    <>
      <Section title="A. Introduction" variant="highlight">
        <p>
          This page contains links to the original, pre-enhancement versions of the thermostat 
          project components. These artifacts represent the baseline codebase used during the 
          code review process and serve as the foundation for all subsequent enhancements 
          documented in this ePortfolio.
        </p>
      </Section>

      <Section title="B. Original Project Components">
        <ul className="component-list">
          <li>
            <a href="https://github.com/gonzalopatino/iot_thermostat_v1" target="_blank" rel="noopener noreferrer">Original Thermostat Application (CS-350 Python)</a>
            <p className="text-muted">
              The original thermostat was implemented as a Python script running on a Raspberry Pi. 
              It used a simple polling loop to read temperature data from a sensor, compare it against 
              a fixed setpoint, and control a GPIO pin to simulate heater activation. This monolithic 
              implementation served as the baseline artifact evaluated during the code review.
            </p>
          </li>
          <li>
            <a href="https://github.com/gonzalopatino/iot_thermostat_v1" target="_blank" rel="noopener noreferrer">Original Control Logic Module</a>
            <p className="text-muted">
              The control logic in the original project relied on direct threshold comparisons with 
              a basic hysteresis gap to reduce cycling. There was no formal state machine, no minimum 
              on/off timing enforcement, and no structured error handling. This reactive approach 
              represented the algorithmic baseline identified for enhancement.
            </p>
          </li>
          <li>
            <a href="https://github.com/gonzalopatino/iot_thermostat_v1" target="_blank" rel="noopener noreferrer">Original Data Handling and Logging Implementation</a>
            <p className="text-muted">
              The original system operated entirely in memory with no persistent storage or telemetry 
              capability. Temperature readings and system state were printed to the console but not 
              logged or transmitted. This lack of data persistence was a key limitation addressed 
              in the database enhancement.
            </p>
          </li>
        </ul>
      </Section>

      <Section title="C. Notes for Evaluators">
        <p>
          This page allows evaluators to inspect the pre-enhancement code that served as the 
          starting point for this capstone project. For detailed discussion of the issues 
          identified and the rationale for enhancements, please refer to the{' '}
          <Link to="/code-review">Code Review</Link> page and the individual 
          artifact pages (<Link to="/software-engineering">Software Engineering</Link>,{' '}
          <Link to="/algorithms">Algorithms</Link>, and <Link to="/database">Databases</Link>).
        </p>
      </Section>
    </>
  );
}
