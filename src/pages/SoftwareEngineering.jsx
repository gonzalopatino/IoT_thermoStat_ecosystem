import { Link } from 'react-router-dom';
import Section from '../components/Section';
import DiagramViewer from '../components/DiagramViewer';
import PageHero from '../components/PageHero';
import TableOfContents from '../components/TableOfContents';
import KeyTakeaways from '../components/KeyTakeaways';
import ComparisonBlock from '../components/ComparisonBlock';
import CTAFooter from '../components/CTAFooter';

const tocItems = [
  { id: 'overview', label: 'Artifact Overview' },
  { id: 'original-design', label: 'Original Design' },
  { id: 'enhanced-design', label: 'Enhanced Design' },
  { id: 'practices', label: 'Engineering Practices' },
  { id: 'connections', label: 'Connection to Artifacts' },
  { id: 'outcomes', label: 'Course Outcomes' },
  { id: 'diagrams', label: 'Diagrams & Documents' },
];

const keyTakeaways = [
  {
    type: 'original',
    title: 'Original State',
    content: 'Monolithic Python script with tightly coupled logic, hardcoded values, and no separation of concerns.'
  },
  {
    type: 'enhanced',
    title: 'Enhanced State',
    content: 'Modular FreeRTOS architecture with dedicated tasks, HAL abstraction, centralized configuration, and structured logging.'
  },
  {
    type: 'impact',
    title: 'Why It Matters',
    content: 'Professional-grade embedded systems require maintainability, testability, and extensibility that only proper architecture provides.'
  },
  {
    type: 'outcomes',
    title: 'CS-499 Outcomes',
    content: 'Demonstrates Outcomes 1, 2, and 4: collaboration practices, technical communication, and industry-standard techniques.'
  }
];

const comparisonOriginal = [
  'Single Python script handling all logic',
  'Hardcoded GPIO pins and thresholds',
  'No task separation or concurrency',
  'Debug prints scattered throughout',
  'No hardware abstraction layer',
  'Difficult to test individual components'
];

const comparisonEnhanced = [
  'Concurrent FreeRTOS tasks with clear responsibilities',
  'Centralized configuration headers',
  'Task-based architecture with queues and mutexes',
  'Structured, leveled logging system',
  'HAL layer for hardware portability',
  'Modular design enables isolated testing'
];

export default function SoftwareEngineering() {
  return (
    <>
      <PageHero
        artifactType="Artifact 1 of 3"
        title="Software Engineering & Design"
        summary="A comprehensive refactoring of the thermostat system from a monolithic script to a professional-grade embedded architecture using FreeRTOS on ESP32."
        badges={['ESP32', 'FreeRTOS', 'C/C++', 'Embedded Systems', 'Modular Architecture', 'HAL']}
      />

      <TableOfContents items={tocItems} />

      <KeyTakeaways items={keyTakeaways} />

      <Section id="overview" title="Artifact Overview" variant="highlight">
        <p>
          This artifact showcases the software engineering and design practices I applied to transform a basic thermostat project into a professional-grade embedded system. The enhanced thermostat runs on an ESP32 microcontroller using FreeRTOS, featuring a modular task-based architecture that separates sensor reading, control logic, logging, and network communication into distinct, maintainable components. The system demonstrates core software engineering principles including separation of concerns, loose coupling, and cohesive module design.
        </p>
        <p>
          While the thermostat ecosystem includes algorithmic control logic and database integration for telemetry storage, those aspects are covered in their respective artifact pages. This page focuses specifically on the structural decisions, architectural patterns, and engineering practices that make the system robust, testable, and extensible.
        </p>
      </Section>

      <Section id="original-design" title="Original Design (Pre-Enhancement)">
        <p>
          The original thermostat project was developed during CS-350 as an introduction to embedded systems programming. Like many academic projects, it prioritized getting something working over long-term maintainability. The code was largely monolithic, with sensor reading, temperature comparisons, and output control logic intermingled in a single main loop. There was little separation between what the system did and how it interacted with specific hardware peripherals.
        </p>
        <p>
          From a software engineering perspective, this design presented several limitations. Testing individual components was difficult because responsibilities were not isolated. If I wanted to verify that the control logic behaved correctly, I had to run the entire system on actual hardware because the logic was tightly coupled to sensor reading functions. Adding new features meant modifying existing code rather than extending it, which increased the risk of introducing bugs into working functionality.
        </p>
        <p>
          The original project also lacked meaningful configuration management. Values like temperature thresholds and timing intervals were scattered throughout the code as magic numbers. There was no structured logging beyond occasional debug print statements, which made diagnosing issues during operation nearly impossible. These limitations motivated a comprehensive refactoring effort that would address not just the immediate functionality but also the long-term engineering quality of the system.
        </p>
      </Section>

      <ComparisonBlock
        originalTitle="Original Architecture"
        enhancedTitle="Enhanced Architecture"
        original={comparisonOriginal}
        enhanced={comparisonEnhanced}
      />

      <Section id="enhanced-design" title="Enhanced Design and Architecture">
        <p>
          The enhanced thermostat was redesigned from the ground up using FreeRTOS on the ESP32 platform. Instead of a monolithic main loop, the system now operates as a collection of concurrent tasks, each responsible for a specific domain of functionality. This task-based architecture allows each component to operate independently, communicate through well-defined interfaces, and be modified without affecting unrelated parts of the system.
        </p>
        <p>
          The sensor task is responsible solely for reading temperature and humidity values from the hardware sensor at regular intervals. It does not make control decisions or interact with the display. Instead, it publishes updated readings to a shared data structure that other tasks can access. The control task monitors these readings and determines whether heating or cooling actions are needed based on the current setpoint and system state. By isolating control logic from sensor reading, I can modify the control algorithm without touching the sensor code, and I can swap sensors without rewriting the control logic.
        </p>
        <p>
          A dedicated logger task handles all system logging, receiving log messages through a queue and formatting them consistently. This approach replaces scattered print statements with structured, centralized logging that can be configured at build time for different verbosity levels. The heartbeat task monitors system health, feeding a watchdog timer and periodically reporting that all critical tasks are running correctly. If any task fails to respond within expected intervals, the system can take corrective action rather than silently malfunctioning.
        </p>
        <p>
          The Wi-Fi and telemetry task manages network connectivity and communication with the Django backend. It handles connection establishment, reconnection on failure, and the transmission of telemetry data. Importantly, this task does not contain hard-coded endpoint URLs scattered throughout its implementation. Instead, server addresses, API paths, and authentication details are managed through a centralized configuration module that can be updated without modifying the networking code itself.
        </p>
        <p>
          Configuration management was a significant focus of the refactoring effort. All tunable parameters, from temperature thresholds to task timing intervals to server endpoints, are defined in dedicated configuration headers. Hardware abstraction layers isolate GPIO pin assignments and peripheral initialization from the logic that uses those peripherals. This means the same firmware can be adapted to different hardware revisions by modifying configuration files rather than hunting through application code.
        </p>
        <p>
          Error handling was also systematically improved. Instead of ignoring return values or allowing failures to propagate silently, each module now validates inputs, checks operation results, and reports problems through the logging system. Network operations include retry logic with exponential backoff. Sensor reading failures trigger appropriate fallback behavior rather than crashing the system. These practices ensure the thermostat can operate reliably over extended periods without human intervention.
        </p>
      </Section>

      <Section id="practices" title="Software Engineering Practices Demonstrated">
        <p>
          The thermostat project demonstrates several software engineering practices that distinguish professional development from academic exercises. The modular component design means that each source file has a clear, focused responsibility and exposes a well-defined interface to other modules. Internal implementation details are hidden, allowing me to refactor individual components without rippling changes throughout the codebase.
        </p>
        <p>
          Concurrency is managed deliberately through FreeRTOS primitives. Each task runs at an appropriate priority level, with time-critical operations like sensor reading given precedence over less urgent activities like logging. Shared data is protected using mutexes to prevent race conditions, and inter-task communication flows through queues that decouple producers from consumers. The watchdog mechanism ensures that if any task hangs or crashes, the system detects the problem and recovers gracefully.
        </p>
        <p>
          Version control played an essential role throughout development. I used Git to track all changes, working on feature branches that were merged only after the new functionality was tested and reviewed. This branching strategy allowed me to experiment with different approaches without destabilizing the main codebase. Commit messages documented not just what changed but why, creating a historical record that would help any future developer understand the evolution of the design.
        </p>
        <p>
          Logging and observability replaced ad-hoc debugging as the primary diagnostic tool. The structured logging system captures timestamps, severity levels, and source module identifiers with each message. During development, I could enable verbose logging to trace program flow; in production, the system logs only warnings and errors to conserve resources. Telemetry sent to the backend provides remote visibility into system operation, allowing me to monitor deployed devices without physical access.
        </p>
        <p>
          Build configuration separates environment-specific settings from source code. Different build profiles control logging verbosity, enable or disable debug features, and select appropriate server endpoints for development versus production environments. This practice ensures that the same source code can produce builds appropriate for testing, staging, and deployment without manual code modifications.
        </p>
      </Section>

      <Section id="connections" title="Connection to Other Artifacts">
        <p>
          The Software Engineering artifact represents the structural foundation upon which the other artifacts build. The Algorithms artifact examines the control logic that runs within the control task, exploring the state machine design, hysteresis implementation, and timing decisions that determine when heating and cooling activate. That analysis focuses on computational correctness and efficiency rather than the modular structure that contains it.
        </p>
        <p>
          The Database artifact addresses how the Django backend stores and retrieves telemetry data, covering schema design, query optimization, and data integrity. From a software engineering perspective, what matters is that the firmware and backend were designed to communicate through clean, versioned API contracts. The firmware does not embed knowledge of database schemas, and the backend does not assume specific firmware implementation details. This separation allows either side to evolve independently, demonstrating the same principles of loose coupling that guide the firmware's internal architecture.
        </p>
      </Section>

      <Section id="outcomes" title="Course Outcomes Mapping">
        <p>
          <strong>Outcome 1 - Collaboration and Professional Practice:</strong> Throughout this project, I used Git for version control, maintaining a clear branching strategy that separated feature development from stable releases. I documented design decisions in README files and code comments so that other developers could understand not just what the code does but why it was structured that way. When making significant architectural changes, I considered how those changes would affect anyone else working on the project, writing interfaces that were intuitive and self-documenting.
        </p>
        <p>
          <strong>Outcome 2 - Communication and Documentation:</strong> I created architecture diagrams to visualize the task structure and data flow, making complex concurrent interactions understandable at a glance. Code comments explain the purpose of modules and functions without restating the obvious. The project documentation provides setup instructions, configuration guidance, and troubleshooting tips that would allow someone unfamiliar with the project to build and run the system. These artifacts demonstrate my ability to communicate technical concepts clearly to diverse audiences.
        </p>
        <p>
          <strong>Outcome 4 - Well-Founded Techniques and Tools:</strong> The thermostat project applies industry-standard patterns for embedded systems development, including task-based concurrency, hardware abstraction, and modular decomposition. I selected FreeRTOS as the real-time operating system because it is widely used in professional embedded development and provides proven primitives for managing concurrent operations. Build tools, logging frameworks, and testing approaches all reflect practices I would use in a professional engineering environment, demonstrating that I can apply appropriate tools to solve real-world computing problems.
        </p>
      </Section>

      <Section id="diagrams" title="Architecture Diagrams & Documents">
        <p>
          The following diagrams illustrate the enhanced system architecture and component relationships:
        </p>
        
        <DiagramViewer 
          src="/src/assets/diagrams/task-architecture.png" 
          alt="FreeRTOS Task Architecture Diagram showing all concurrent tasks including Sensor, Control, Logger, Heartbeat, and Telemetry tasks with their priorities and inter-task communication through queues and shared resources"
          caption="FreeRTOS Task Architecture — Shows all concurrent tasks, their priorities, and inter-task communication through queues and shared resources."
        />
        
        <DiagramViewer 
          src="/src/assets/diagrams/layered-architecture.png" 
          alt="Firmware Layered Architecture Diagram illustrating the separation between Application layer, Core business logic, Driver interfaces, and Hardware Abstraction Layer"
          caption="Firmware Layered Architecture — Illustrates the separation between Application, Core, Drivers, and HAL layers."
        />
        
        <DiagramViewer 
          src="/src/assets/diagrams/config-hal-structure.png" 
          alt="Configuration and HAL Structure Diagram showing configuration headers and hardware abstraction modules for GPIO, sensors, and peripherals"
          caption="Configuration and HAL Structure — Details the configuration headers and hardware abstraction modules."
        />
        
        <h3>Code Repositories</h3>
        <ul>
          <li><Link to="/original-code">Original Code Repository</Link> — The CS-350 Raspberry Pi implementation</li>
          <li><Link to="/enhanced-code">Enhanced Code Repository</Link> — The refactored ESP32/FreeRTOS implementation</li>
          <li><a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat" target="_blank" rel="noopener noreferrer">GitHub: ESP32 FreeRTOS Thermostat</a></li>
        </ul>
      </Section>

      <CTAFooter
        prevLink="/code-review"
        prevLabel="Code Review"
        nextLink="/algorithms"
        nextLabel="Algorithms"
      />
    </>
  );
}
