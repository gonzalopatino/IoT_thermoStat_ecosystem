import { Link } from 'react-router-dom';
import Section from '../components/Section';
import DiagramViewer from '../components/DiagramViewer';

export default function Database() {
  return (
    <>
      {/* Evaluator Guidance Banner */}
      <Section title="Evaluator Guide" variant="highlight">
        <p>
          <strong>For Evaluators:</strong> This page presents the Databases artifact, demonstrating PostgreSQL schema design, Django ORM integration, API authentication, and secure data handling practices. Links to original and enhanced code repositories are available in the navigation sidebar and at the bottom of this page. Database diagrams including the ERD and telemetry pipeline are provided in the Related Schema section below.
        </p>
      </Section>

      <Section title="Artifact Overview" variant="highlight">
        <p>
          This artifact demonstrates the database design and data management practices I implemented to support the thermostat ecosystem's backend infrastructure. The enhanced system uses PostgreSQL as its relational database, accessed through Django's ORM, to provide persistent storage for device telemetry, user accounts, device registrations, and alert configurations. Proper database design transforms the thermostat from an isolated embedded device into a connected system capable of historical analysis, trend visualization, and intelligent alerting.
        </p>
        <p>
          While the Software Engineering artifact addresses the overall system architecture and the Algorithms artifact examines the control logic, this page focuses specifically on how data is modeled, stored, validated, and queried. The design decisions documented here ensure data integrity, enable efficient retrieval, and protect sensitive information from unauthorized access or corruption.
        </p>
      </Section>

      <Section title="Original Data Handling Approach">
        <p>
          The original CS-350 thermostat project had no database component whatsoever. Sensor readings existed only in memory during program execution and were lost when the device powered down or restarted. There was no mechanism for storing historical temperature data, no way to track setpoint changes over time, and no persistent record of heating or cooling cycles. The system operated entirely in the present moment with no concept of data persistence.
        </p>
        <p>
          This absence of persistent storage created significant limitations. Without historical data, trend analysis was impossible. I could not answer questions like whether the house was getting colder over the past week or how often the heating system ran during a cold snap. There was no way to detect gradual equipment degradation or identify patterns that might indicate problems. Every restart meant starting from scratch with no memory of previous operation.
        </p>
        <p>
          The original approach also lacked any concept of data ownership, access control, or validation. Since there was no database, there were no users, no devices registered in a central system, and no boundaries preventing one user from accessing another's data. The data model, such as it was, existed implicitly in the structure of variables rather than being explicitly designed. There was no schema, no normalization, and no constraints to ensure data quality or consistency.
        </p>
      </Section>

      <Section title="Enhanced Database Design">
        <p>
          The enhanced thermostat ecosystem includes a Django backend with PostgreSQL that implements a properly normalized relational schema. I designed the database around core entities that reflect the real-world objects and relationships in the system: Users who own and manage devices, Devices that represent physical thermostats, Telemetry Snapshots that capture point-in-time readings, Device API Keys that authenticate device communication, and Alert Settings that define notification thresholds.
        </p>
        <p>
          The User model leverages Django's built-in authentication system, providing secure password hashing, session management, and the foundation for access control. Each Device belongs to exactly one User through a foreign key relationship, establishing clear ownership boundaries. When a user queries for devices or telemetry, the system automatically filters results to show only data they own, preventing unauthorized access to other users' information.
        </p>
        <p>
          Telemetry Snapshots form the largest table in the system, storing temperature readings, humidity values, setpoints, and system state at regular intervals. Each snapshot references its parent Device through a foreign key, ensuring referential integrity. Timestamps are stored in a normalized format that supports timezone-aware queries and consistent ordering regardless of when or where the data was recorded.
        </p>
        <p>
          Device API Keys provide secure authentication for device-to-backend communication. Rather than storing keys as plaintext, the system stores only cryptographic hashes. When a device authenticates, the provided key is hashed and compared against the stored hash. This approach means that even if the database were compromised, attackers could not extract usable API keys. Each key is associated with exactly one device, and keys can be revoked and regenerated without affecting other devices.
        </p>
        <p>
          Alert Settings allow users to configure notification thresholds for each device. These records reference both the Device and User, enabling flexible alerting rules. The schema supports multiple alert types and thresholds per device, with constraints ensuring that threshold values fall within sensible ranges. Foreign key relationships guarantee that alerts cannot exist for deleted devices.
        </p>
      </Section>

      <Section title="Data Management and Querying">
        <p>
          Data ingestion follows a structured pipeline that validates, normalizes, and stores incoming telemetry. When a device posts a reading to the ingestion endpoint, the system first authenticates the request using the hashed API key. It then validates that all required fields are present and that values fall within plausible ranges. Timestamps are normalized to UTC before storage. Only after passing all validation checks is the data written to the database, ensuring that corrupt or malformed readings never pollute the dataset.
        </p>
        <p>
          Rate limiting protects the ingestion endpoint from abuse. Each device is permitted a maximum number of submissions per time window, preventing runaway firmware bugs or malicious actors from flooding the database with spurious records. The rate limiter operates at the API layer, rejecting excess requests before they reach the database, which conserves both compute and storage resources.
        </p>
        <p>
          Query endpoints support the dashboard and charting features that make telemetry data useful. Users can retrieve recent readings for real-time display, query historical ranges for trend analysis, or aggregate data into hourly or daily summaries for long-term visualization. These queries are optimized through strategic indexing on the columns most frequently used in filters and sorts, particularly device identifiers and timestamps.
        </p>
        <p>
          Pagination prevents large result sets from overwhelming either the server or the client. Rather than returning thousands of records in a single response, the API returns pages of manageable size with cursors for fetching subsequent pages. This approach keeps response times consistent regardless of how much historical data has accumulated and allows clients to load data progressively as users scroll through charts or tables.
        </p>
        <p>
          Storage quotas track usage per device and per user, enforcing limits that prevent any single account from consuming disproportionate resources. When a device approaches its quota, the system can optionally prune the oldest records to make room for new ones, or it can reject new submissions until the user upgrades their allocation. These quotas are enforced at the application layer with efficient count queries that leverage the same indices used for data retrieval.
        </p>
      </Section>

      <Section title="Security and Reliability Considerations">
        <p>
          Security is woven throughout the database design rather than bolted on as an afterthought. API keys are never stored in plaintext; only their cryptographic hashes exist in the database. This means that database backups, logs, and debugging sessions never expose credentials that could be used to impersonate devices. Key rotation is supported through the administrative interface, allowing users to revoke compromised keys without disrupting other devices.
        </p>
        <p>
          Authorization is enforced at every access point. The Django ORM's queryset filtering ensures that users can only retrieve records they own. Administrative endpoints require elevated privileges and are protected by additional authentication checks. There is no way for a regular user to query another user's devices or telemetry, even by manipulating request parameters, because the filtering happens at the query construction level rather than just at the presentation layer.
        </p>
        <p>
          Input validation prevents malformed or malicious data from entering the database. Every field in every request is validated against expected types, ranges, and formats before any database operation occurs. Timestamps must parse correctly. Temperature readings must fall within physically plausible bounds. Device names must conform to length and character restrictions. Invalid submissions are rejected with clear error messages that help legitimate users correct mistakes while revealing nothing useful to attackers.
        </p>
        <p>
          The Django ORM uses parameterized queries exclusively, which eliminates SQL injection vulnerabilities by construction. User-supplied values are never interpolated directly into query strings; they are always passed as parameters that the database driver handles safely. This protection applies to all queries, whether simple lookups or complex aggregations, providing defense in depth against one of the most common classes of database attacks.
        </p>
        <p>
          Error handling follows defensive patterns that prevent sensitive information from leaking in error responses. Database connection failures, constraint violations, and unexpected exceptions are caught and logged internally while returning generic error messages to clients. This approach aids debugging through comprehensive server-side logs while denying attackers the detailed error information they might use to probe for vulnerabilities.
        </p>
      </Section>

      <Section title="Course Outcomes Mapping">
        <p>
          <strong>Outcome 3 - Designing and Evaluating Computing Solutions:</strong> This artifact demonstrates my ability to design computing solutions using sound database modeling principles. I analyzed the data requirements of the thermostat ecosystem, identified the entities and relationships that needed to be represented, and designed a normalized schema that balances query efficiency against storage overhead. The choice of relational modeling over document storage reflects an evaluation of the data's structure and access patterns, selecting the approach best suited to the application's needs.
        </p>
        <p>
          <strong>Outcome 4 - Innovative Techniques and Tools:</strong> The database implementation leverages industry-standard tools including PostgreSQL and Django's ORM. PostgreSQL provides robust transaction support, sophisticated indexing options, and proven reliability at scale. Django's ORM translates Pythonic model definitions into efficient SQL, handles migrations that evolve the schema over time, and provides an administrative interface for data inspection and management. I selected these tools based on their fitness for the problem domain and their widespread use in professional web development.
        </p>
        <p>
          <strong>Outcome 5 - Security Mindset:</strong> Security considerations permeate the database design. API key hashing protects credentials even if the database is compromised. Authorization checks ensure users access only their own data. Input validation rejects malformed requests before they can affect stored data. Rate limiting prevents denial-of-service through excessive submissions. Parameterized queries eliminate SQL injection. Together, these measures demonstrate a security mindset that anticipates threats and builds defenses into the system's foundation rather than treating security as an optional add-on.
        </p>
      </Section>

      <Section title="Related Schema & Documents">
        <p>
          Supporting materials for this artifact:
        </p>
        <h4>Database Diagrams</h4>
        
        <DiagramViewer 
          src="/src/assets/diagrams/db-erd.png" 
          alt="Database Entity-Relationship Diagram"
          caption="Database Entity-Relationship Diagram — Shows the normalized schema including User, Device, DeviceAPIKey, TelemetrySnapshot, and DeviceAlertSettings entities with their relationships."
        />
        
        <DiagramViewer 
          src="/src/assets/diagrams/telemetry-pipeline.png" 
          alt="Telemetry Ingestion Pipeline Diagram"
          caption="Telemetry Ingestion Pipeline — Illustrates the complete data flow from ESP32 sensor reading through API authentication, validation, and database storage."
        />
        
        <h4>Code Repositories</h4>
        <ul>
          <li><Link to="/original-code">Original Code Repository</Link></li>
          <li><Link to="/enhanced-code">Enhanced Code Repository</Link></li>
          <li><a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat" target="_blank" rel="noopener noreferrer">GitHub: ESP32 FreeRTOS Thermostat</a></li>
          <li><a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat_Server" target="_blank" rel="noopener noreferrer">GitHub: Django Backend Server</a></li>
        </ul>
      </Section>

      {/* Evaluator Navigation */}
      <Section title="Evaluator Navigation">
        <p>Continue exploring the ePortfolio:</p>
        <nav aria-label="Artifact navigation">
          <ul className="evaluator-nav">
            <li><Link to="/">Back to Home</Link></li>
            <li><Link to="/assessment">Professional Self-Assessment</Link></li>
            <li><Link to="/code-review">Code Review</Link></li>
            <li><Link to="/software-engineering">Software Engineering</Link></li>
            <li><Link to="/algorithms">Algorithms</Link></li>
            <li><Link to="/database">Database</Link></li>
            <li><Link to="/original-code">Original Code</Link></li>
            <li><Link to="/enhanced-code">Enhanced Code</Link></li>
          </ul>
        </nav>
        <p className="meta-updated">
          <em>Last updated: February 2025</em>
        </p>
      </Section>
    </>
  );
}
