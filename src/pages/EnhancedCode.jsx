import { Link } from 'react-router-dom';
import Section from '../components/Section';

export default function EnhancedCode() {
  return (
    <>
      <Section title="A. Introduction" variant="highlight">
        <p>
          This page contains links to the enhanced, post-review versions of the thermostat 
          ecosystem. These artifacts demonstrate the improvements made as a result of the 
          code review process, including embedded firmware running on an ESP32 microcontroller 
          and a full-stack backend for telemetry and management.
        </p>
      </Section>

      <Section title="B. Enhanced Project Components">
        <ul className="component-list">
          <li>
            <a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat" target="_blank" rel="noopener noreferrer">ESP32 FreeRTOS Thermostat Firmware (C/C++)</a>
            <p className="text-muted">
              The enhanced firmware runs on an ESP32 microcontroller using FreeRTOS for real-time 
              task management. The architecture separates sensing, control logic, display, networking, 
              and system supervision into independent tasks communicating through queues and mutexes. 
              This modular design directly addresses the software engineering artifact requirements 
              and demonstrates professional embedded systems practices.
            </p>
          </li>
          <li>
            <a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat_Server" target="_blank" rel="noopener noreferrer">Django + PostgreSQL Telemetry Backend</a>
            <p className="text-muted">
              The backend platform provides device registration, API key authentication, telemetry 
              ingestion, alert configuration, and a real-time dashboard. Built with Django and 
              PostgreSQL, it implements a normalized schema for users, devices, and telemetry 
              snapshots. This component fulfills the database artifact requirements and enables 
              cloud connectivity for the thermostat ecosystem.
            </p>
          </li>
          <li>
            <a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat" target="_blank" rel="noopener noreferrer">Shared Data Models, Messages, and APIs</a>
            <p className="text-muted">
              The firmware and backend communicate through a RESTful API using JSON payloads. 
              Telemetry messages include temperature readings, setpoint, heater state, and system 
              mode. Request signing with hashed API keys ensures secure, authenticated communication. 
              These shared protocols demonstrate integration between embedded and backend systems.
            </p>
          </li>
        </ul>
      </Section>

      <Section title="C. Relationship to Artifacts">
        <p>
          Each enhanced component is explained in more detail on the{' '}
          <Link to="/software-engineering">Software Engineering</Link>,{' '}
          <Link to="/algorithms">Algorithms</Link>, and{' '}
          <Link to="/database">Databases</Link> artifact pages. 
          This page serves as a central hub to locate the enhanced code repositories 
          and navigate to the relevant documentation.
        </p>
      </Section>
    </>
  );
}
