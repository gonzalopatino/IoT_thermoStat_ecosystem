import Section from '../components/Section';

export default function Assessment() {
  return (
    <>
      <Section title="Introduction" variant="highlight">
        <p>
          My journey into computer science began long before I enrolled in the program at Southern 
          New Hampshire University. With a foundation in electronics engineering and years of 
          hands-on experience working with embedded systems, I came to this program with a deep 
          appreciation for the intersection of hardware and software. What I sought was a more 
          rigorous understanding of software design, algorithms, and the theoretical underpinnings 
          that separate functional code from truly excellent engineering.
        </p>
        <p>
          Throughout my time in this program, I have grown as a 
          computer scientist; someone capable of analyzing problems systematically, designing 
          solutions thoughtfully, and communicating technical ideas clearly. This ePortfolio 
          represents the culmination of that growth. It brings together artifacts from across 
          my studies, enhanced through the lens of the CS-499 Capstone, to demonstrate mastery 
          of the core competencies expected of a computer science graduate.
        </p>
      </Section>

      <Section title="My Journey Through the Program">
        <p>
          When I began the Computer Science program, I had already spent years writing firmware 
          for microcontrollers and developing hardware-software interfaces. What I lacked was 
          formal training in modern software engineering practices, algorithm design, and the 
          kind of structured thinking that distinguishes quick fixes from maintainable solutions.
        </p>
        <p>
          Courses like CS-250 (Software Development Lifecycle) introduced me to Agile methodologies 
          and the importance of iterative development. CS-260 (Data Structures and Algorithms) 
          fundamentally changed how I approach problems, teaching me to reason about time and space 
          complexity in ways I had never considered. CS-340 (Client/Server Development) and CS-465 
          (Full Stack Development) expanded my understanding of databases, APIs, and web architectures, 
          while CS-350 (Emerging Systems) gave me hands-on experience with embedded systems in an 
          academic context.
        </p>
        <p>
          Each course built upon the last, creating a cohesive body of knowledge that I now apply 
          daily in my professional work. The thermostat project I selected as my capstone artifact 
          is a direct product of this journey; an embedded system that began as a simple temperature 
          controller and has evolved into a sophisticated, networked IoT device with cloud integration.
        </p>
      </Section>

      <Section title="Collaborating in a Team Environment">
        <p>
          Software development is rarely a solitary endeavor, and my experience in this program 
          has reinforced the importance of collaboration. I worked with peers on shared codebases, 
          learning to navigate the complexities of version control, code reviews, and collaborative problem-solving.
        </p>
        <p>
          In my professional work, I apply these lessons daily. I use Git for version control, 
          participate in code reviews, and communicate technical decisions clearly to both technical 
          and non-technical stakeholders. The thermostat project itself demonstrates this collaborative 
          mindset; the codebase is structured to be readable and maintainable by others, with clear 
          documentation, consistent naming conventions, and modular architecture that allows team 
          members to work on different components independently.
        </p>
      </Section>

      <Section title="Communicating with Stakeholders">
        <p>
          One of the most valuable skills I have developed is the ability to translate technical 
          concepts for different audiences. Whether writing documentation for fellow developers, 
          presenting project updates to managers, or explaining system behavior to end users, 
          effective communication is essential.
        </p>
        <p>
          This ePortfolio itself is an exercise in stakeholder communication. It presents technical 
          work in a format accessible to evaluators who may not be familiar with ESP32 development 
          or Django backends. The code review video walks through the original artifact and explains 
          enhancement plans in plain language. Each artifact narrative balances technical depth with 
          clarity, ensuring that the sophistication of the work is evident without being obscured 
          by jargon.
        </p>
      </Section>

      <Section title="Data Structures and Algorithms">
        <p>
          The algorithms and data structures I employ in the thermostat project reflect the 
          analytical thinking developed throughout the program. The control logic uses a 
          finite state machine (FSM) pattern to manage heating and cooling states, ensuring 
          predictable behavior and easy maintenance. Hysteresis is implemented to prevent 
          rapid cycling, a classic control systems concept implemented through careful 
          algorithmic design.
        </p>
        <p>
          On the backend, efficient data retrieval is achieved through proper indexing and 
          query optimization. The telemetry pipeline uses queues to handle asynchronous 
          message processing, ensuring that sensor data flows smoothly from device to database 
          without blocking critical operations. These choices demonstrate not just knowledge of 
          data structures, but the wisdom to apply the right structure to each problem.
        </p>
      </Section>

      <Section title="Software Engineering and Database">
        <p>
          The software engineering enhancements to the thermostat project showcase professional 
          development practices. The firmware is organized into discrete components: sensor drivers, 
          control logic, network handlers, and display managers;each with well-defined interfaces. 
          This modularity enables testing, simplifies debugging, and allows for future extension 
          without disrupting existing functionality.
        </p>
        <p>
          The database design follows similar principles. PostgreSQL was chosen for its reliability 
          and feature set, with Django's ORM providing a clean abstraction layer. The schema is 
          normalized appropriately, with indices on frequently queried columns and foreign key 
          relationships that enforce data integrity. Migrations are version-controlled alongside 
          application code, ensuring that database changes are tracked and reversible.
        </p>
      </Section>

      <Section title="Security">
        <p>
          Security is woven throughout the thermostat project. On the firmware side, 
          communication with the backend uses HTTPS with certificate validation. API 
          endpoints require authentication, and sensitive operations are rate-limited 
          to prevent abuse. The Django backend follows security best practices: CSRF 
          protection, secure session handling, and parameterized queries that prevent 
          SQL injection.
        </p>
        <p>
          Beyond technical measures, I approach security as a mindset. Every feature is 
          evaluated for potential vulnerabilities. User input is never trusted. Error 
          messages are crafted to be helpful without revealing system internals. This 
          security-first thinking, developed through courses like CS-405 (Secure Coding), 
          is evident throughout the enhanced artifact.
        </p>
      </Section>

      <Section title="Summary and Professional Readiness">
        <p>
          The work presented in this ePortfolio demonstrates that I am ready to contribute 
          meaningfully to the field of computer science. The thermostat project showcases 
          not just coding ability, but the full range of skills expected of a modern software 
          professional: system design, algorithm selection, database management, security 
          awareness, and clear communication.
        </p>
        <p>
          As I move forward in my career, I carry with me the lessons learned in this program. 
          I understand that good software is not just functional; it is scalable, maintainable, secure, 
          and designed with both users and fellow developers in mind. I am prepared to work 
          collaboratively, to communicate effectively, and to continue learning as the field 
          evolves. This ePortfolio is not an endpoint, but a milestone; a demonstration of 
          where I am today and a foundation for the growth that lies ahead.
        </p>
      </Section>
    </>
  );
}
