import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PageHero from '../components/PageHero';
import TableOfContents from '../components/TableOfContents';
import KeyTakeaways from '../components/KeyTakeaways';
import CTAFooter from '../components/CTAFooter';

const tocItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'video', label: 'Code Review Video' },
  { id: 'findings', label: 'Summary of Findings' },
  { id: 'issues', label: 'Key Issues Identified' },
  { id: 'enhancements', label: 'Planned Enhancements' },
  { id: 'reflection', label: 'Professional Reflection' },
];

const keyTakeaways = [
  {
    type: 'original',
    title: 'What Was Reviewed',
    content: 'Original CS-350 Raspberry Pi thermostat: a single Python script with monolithic architecture.'
  },
  {
    type: 'enhanced',
    title: 'Issues Found',
    content: '6 major issues identified: architecture, algorithms, maintainability, reliability, security, and persistence.'
  },
  {
    type: 'impact',
    title: 'Why It Matters',
    content: 'Systematic code review established the roadmap for all three artifact enhancements in the capstone.'
  },
  {
    type: 'outcomes',
    title: 'Professional Value',
    content: 'Mirrors industry practice where peer reviews are essential for producing high-quality, maintainable systems.'
  }
];

export default function CodeReview() {
  return (
    <>
      <PageHero
        artifactType="Foundation"
        title="Code Review"
        summary="A structured, professional analysis of the original CS-350 thermostat identifying architectural, algorithmic, and reliability issues that guided all capstone enhancements."
        badges={['Code Analysis', 'Architecture Review', 'Quality Assessment', 'Enhancement Planning']}
      />

      <TableOfContents items={tocItems} />

      <KeyTakeaways items={keyTakeaways} />

      <Section id="introduction" title="Code Review Introduction" variant="highlight">
        <p>
          The purpose of this code review was to perform a structured, professional analysis of the original CS-350 thermostat artifact running on a Raspberry Pi using Python. The review focused on identifying weaknesses in architecture, reliability, readability, algorithmic behavior, and long-term maintainability. This evaluation served as the foundation for the enhancements implemented in the CS-499 capstone, guiding the redesign of both the embedded firmware and the backend data platform.
        </p>
      </Section>

      <Section id="video" title="Code Review Video">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/56SD_WsoBfo?start=24"
            title="Code Review Video: Narrated walkthrough of the original Raspberry Pi thermostat code"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-muted">
          <em>This video contains a narrated walkthrough of the original Raspberry Pi code, pointing out architectural limitations, algorithmic issues, and opportunities for improvement discovered during the review process.</em>
        </p>
      </Section>

      <Section id="findings" title="Summary of Review Findings">
        <p>
          The review revealed that while the original thermostat prototype achieved functional temperature control, it suffered from several deficiencies that would prevent it from operating reliably or scaling beyond a classroom demonstration. The code was implemented as a single Python script responsible for sensing, decision-making, output control, and timing. This monolithic structure made the system difficult to extend, test, or reason about.
        </p>
        <p>
          Although the original version included a basic hysteresis mechanism, the algorithmic design was still reactive and lacked formal structure. Error handling was minimal, configuration values were hardcoded, and no provisions existed for persistence, telemetry, or security. These limitations are common in early embedded systems assignments but stand in the way of building a resilient product. The review established a clear roadmap for enhancing the system into a robust, maintainable thermostat platform.
        </p>
      </Section>

      <Section id="issues" title="Key Issues Identified">
        <h3>1. Monolithic Architecture</h3>
        <p>
          The original implementation placed sensing, temperature evaluation, GPIO output control, UI display behavior, and timing functions inside a single script. This tight coupling made the code fragile, as a change in one part of the system risked unintended consequences elsewhere. The lack of layering, hardware abstraction, or modular design made the system nearly impossible to scale or refactor. Professional embedded systems require clear component boundaries, which the prototype lacked.
        </p>
        
        <h3>2. Limited Algorithmic Structure</h3>
        <p>
          The control algorithm relied on direct comparisons between the current temperature and the setpoint. While a small hysteresis gap reduced cycling, the design still lacked a formal state machine, minimum on/off times, or structured transition rules. This simplicity made the system prone to edge-case errors and did not support predictable behavior under changing environmental conditions. Without a clearer algorithmic foundation, control behavior remained fragile and difficult to maintain.
        </p>
        
        <h3>3. Maintainability and Readability Gaps</h3>
        <p>
          The code contained several magic numbers, including timing intervals, thresholds, and GPIO pin assignments. These values were scattered throughout the script with little explanation. Function names did not consistently convey purpose, and comments were sparse. Such issues complicate debugging, onboarding, and future development. Professional practice requires that code be readable and self-explanatory to support long-term maintainability.
        </p>
        
        <h3>4. Reliability Concerns</h3>
        <p>
          The original design assumed that all operations would succeed without interruption. Sensor reads, temperature parsing, and GPIO operations lacked error handling or fallback mechanisms. There were no retries, no validation of incoming data, and no behavior defined for hardware anomalies or unexpected states. In a deployed system, these omissions would create unacceptable points of failure.
        </p>
        
        <h3>5. Lack of Security Considerations</h3>
        <p>
          Although network communication was not part of the CS-350 assignment, the artifact still lacked basic validation and trust boundaries. Any step toward IoT functionality would expose vulnerabilities, as the original design had no authentication, no verification of input data, and no protection from malformed or malicious requests. Modern systems must prioritize secure design from the outset.
        </p>
        
        <h3>6. No Data Persistence or Telemetry Model</h3>
        <p>
          The original system operated entirely in-memory, with no mechanism to store historical data or expose telemetry for analysis. This prevented the system from supporting long-term trend tracking, energy analytics, or remote monitoring. Without a data model or backend integration, the prototype was locked into a single-device, short-lived operating mode.
        </p>
      </Section>

      <Section id="enhancements" title="Planned Enhancements">
        <p>
          Each issue identified in the code review directly influenced the enhancement strategy across all three artifact categories in the capstone.
        </p>
        
        <h3>Software Engineering and Design Enhancements</h3>
        <p>
          The system was decomposed into modular components, each responsible for a single domain: sensing, control logic, logging, Wi-Fi networking, display management, and system supervision. The enhanced version runs on an ESP32 using FreeRTOS tasks, queues, and mutexes to create a clean, maintainable architecture. Configuration values moved into structured files to eliminate hardcoded constants.
        </p>
        
        <h3>Algorithms and Data Structures Enhancements</h3>
        <p>
          The simplistic control loop was replaced with a formal finite state machine that defines Idle, Heating, Cooling, and Error states with clear transitions. Improved hysteresis logic, minimum run/off times, and deterministic timing intervals were added to support stable operation. Error conditions now drive the system into a safe state rather than causing undefined behavior.
        </p>
        
        <h3>Database and Backend Enhancements</h3>
        <p>
          To address the lack of persistence, a complete backend was developed using Django and PostgreSQL. Device registrations, user accounts, hashed API keys, telemetry snapshots, and alert settings form a secure, normalized schema. The backend supports authentication, long-term data storage, trend visualization, and real-time dashboards. This transforms the system from an isolated prototype into a cloud-connected IoT platform.
        </p>
      </Section>

      <Section id="reflection" title="Professional Reflection">
        <p>
          Performing this code review was one of the most valuable stages of the capstone experience. It required me to step back and evaluate my earlier work objectively, identifying not only what functioned poorly but also why those issues mattered. The exercise reinforced the importance of separation of concerns, defensive programming, and algorithmic rigor. It highlighted how quickly technical debt accumulates when architecture and documentation are deprioritized.
        </p>
        <p>
          This review also mirrored professional engineering practice, where peer code reviews are essential for producing maintainable, high-quality systems. By reviewing my own earlier work through this lens, I gained a deeper appreciation for structured design, testability, and long-term maintainability. The insights gained shaped every enhancement implemented in this project and strengthened my engineering discipline. I now recognize systematic code review as an indispensable part of building reliable software and an essential habit to carry into industry settings.
        </p>
      </Section>

      <CTAFooter
        prevLink="/assessment"
        prevLabel="Self-Assessment"
        nextLink="/software-engineering"
        nextLabel="Software Engineering"
      />
    </>
  );
}
