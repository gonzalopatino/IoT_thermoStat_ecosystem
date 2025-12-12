import { Link } from 'react-router-dom';
import { 
  Layers, 
  RotateCcw, 
  Workflow, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle, 
  FileCode 
} from 'lucide-react';
import Section from '../components/Section';
import DiagramViewer from '../components/DiagramViewer';
import PageHero from '../components/PageHero';
import TableOfContents from '../components/TableOfContents';
import KeyTakeaways from '../components/KeyTakeaways';
import ComparisonBlock from '../components/ComparisonBlock';
import CTAFooter from '../components/CTAFooter';
import FSMAnimation from '../components/FSMAnimation';

const tocItems = [
  { id: 'overview', label: 'Artifact Overview' },
  { id: 'original-approach', label: 'Original Approach' },
  { id: 'enhanced-design', label: 'Enhanced Design' },
  { id: 'complexity', label: 'Complexity & Data Structures' },
  { id: 'correctness', label: 'Correctness & Reliability' },
  { id: 'outcomes', label: 'Course Outcomes' },
  { id: 'diagrams', label: 'Diagrams & Code' },
];

const keyTakeaways = [
  {
    type: 'original',
    title: 'Original State',
    content: 'Simple polling loop with direct comparisons, no state memory, and rapid cycling behavior.'
  },
  {
    type: 'enhanced',
    title: 'Enhanced State',
    content: 'Formal FSM with 4 states, table-driven transitions, hysteresis, and timing constraints.'
  },
  {
    type: 'impact',
    title: 'Why It Matters',
    content: 'Deterministic O(1) control decisions, equipment protection through min run times, and provable correctness.'
  },
  {
    type: 'outcomes',
    title: 'CS-499 Outcomes',
    content: 'Demonstrates Outcomes 3, 4, and 5: algorithmic problem-solving, innovative techniques, and reliability mindset.'
  }
];

const comparisonOriginal = [
  'Direct temperature comparison each cycle',
  'No formal state representation',
  'Rapid on-off cycling near setpoint',
  'No minimum run/off time protection',
  'Reactive with no memory of past decisions',
  'Edge-case prone behavior'
];

const comparisonEnhanced = [
  'Table-driven FSM with defined transitions',
  'Four explicit states: Idle, Heating, Cooling, Error',
  'Hysteresis dead band prevents cycling',
  'Minimum run/off times protect equipment',
  'State persistence enables sophisticated control',
  'Exhaustively testable, provably correct'
];

export default function Algorithms() {
  return (
    <>
      <PageHero
        artifactType="Artifact 2 of 3"
        title="Algorithms & Data Structures"
        summary="The computational foundation of thermostat control: a formal finite state machine with hysteresis, timing constraints, and O(1) deterministic operation."
        badges={['FSM', 'Hysteresis', 'State Machine', 'O(1) Complexity', 'Real-Time', 'Embedded']}
      />

      <FSMAnimation />

      <TableOfContents items={tocItems} />

      <KeyTakeaways items={keyTakeaways} />

      <Section id="overview" title="Artifact Overview" icon={<Layers size={20} />} variant="highlight">
        <p>
          This artifact examines the algorithmic foundations of my thermostat control system, focusing on the computational logic that governs temperature regulation, state transitions, and system responsiveness. The enhanced design replaces a simplistic polling approach with a formal finite state machine, hysteresis-based decision making, and carefully chosen data structures that ensure deterministic, efficient operation on resource-constrained embedded hardware.
        </p>
        <p>
          While the Software Engineering artifact addresses the modular architecture and the Database artifact covers telemetry storage, this page focuses specifically on the algorithms and data structures that make the thermostat behave correctly, efficiently, and reliably under all operating conditions.
        </p>
      </Section>

      <Section id="original-approach" title="Original Algorithmic Approach" icon={<RotateCcw size={20} />}>
        <p>
          The original CS-350 thermostat used a straightforward polling loop to manage temperature control. Every iteration of the main loop would read the current temperature, compare it directly against a setpoint, and immediately activate or deactivate heating or cooling based on whether the reading was above or below the target. This approach had the virtue of simplicity but suffered from several algorithmic deficiencies that became apparent during extended operation.
        </p>
        <p>
          The most significant problem was rapid cycling. Because the algorithm made decisions on every sensor reading without any notion of state persistence, the system would oscillate rapidly when the temperature hovered near the setpoint. A reading of 71.9 degrees would activate heating, but as soon as the temperature reached 72.1 degrees, heating would stop. Seconds later, the temperature would drift back down, and heating would resume. This rapid on-off cycling stresses HVAC equipment, wastes energy, and creates an uncomfortable environment.
        </p>
        <p>
          The original approach also lacked any formal state representation. There was no distinction between an idle state, an actively heating state, or an error condition. The system simply reacted to the current reading without considering what it had been doing moments before. This made it impossible to implement more sophisticated behaviors like minimum run times for compressors or delayed restarts after power interruptions. The algorithm was purely reactive with no memory of past decisions.
        </p>
      </Section>

      <ComparisonBlock
        originalTitle="Original Algorithm"
        enhancedTitle="Enhanced Algorithm"
        original={comparisonOriginal}
        enhanced={comparisonEnhanced}
      />

      <Section id="enhanced-design" title="Enhanced Algorithmic Design" icon={<Workflow size={20} />}>
        <p>
          The enhanced thermostat implements a formal finite state machine with four primary states: Idle, Heating, Cooling, and Error. Each state represents a distinct operational mode with its own set of permissible transitions. The system can only move between states according to defined rules, which eliminates the chaotic behavior of the original polling approach and provides a clear mental model for reasoning about system behavior.
        </p>
        <p>
          State transitions are governed by a table-driven model rather than scattered conditional logic. A transition table defines, for each current state and input condition, what the next state should be and what actions to perform during the transition. This approach centralizes all transition logic in one place, making it easy to verify correctness, add new states, or modify transition rules without hunting through dispersed if-else chains. The table-driven design also enables straightforward testing: I can enumerate all possible state-input combinations and verify that each produces the expected outcome.
        </p>
        <p>
          Hysteresis is a critical algorithmic enhancement that prevents rapid cycling. Instead of a single setpoint, the system maintains upper and lower thresholds that create a dead band around the target temperature. Heating activates only when the temperature falls below the lower threshold and continues until the temperature exceeds the upper threshold. This means the system must move through the entire dead band before changing direction, which dramatically reduces cycling frequency and provides more stable temperature control.
        </p>
        <p>
          The timing model adds another layer of algorithmic sophistication. Rather than evaluating conditions on every sensor reading, the control task operates on a defined evaluation interval. Sensor readings are sampled frequently to maintain accuracy, but control decisions are made at a slower cadence that matches the thermal dynamics of real spaces. Additionally, minimum run times and minimum off times prevent equipment damage by ensuring that compressors and heating elements are not cycled more frequently than their specifications allow.
        </p>
        <p>
          Error handling is integrated into the state machine itself. If sensor readings become unavailable or fall outside plausible ranges, the system transitions to an Error state rather than continuing to make control decisions based on invalid data. The Error state has its own transition rules that govern how and when the system can return to normal operation, ensuring that recovery happens in a controlled, predictable manner.
        </p>
      </Section>

      <Section id="complexity" title="Complexity and Data Structures" icon={<BarChart3 size={20} />}>
        <p>
          The data structures supporting the control algorithm were selected for both efficiency and clarity. Sensor readings are stored in a shared structure that includes not just the current values but also timestamps and validity flags. This structure is protected by a mutex to prevent race conditions when the sensor task updates readings while the control task evaluates them. The overhead of mutex acquisition is minimal and predictable, which is essential for real-time operation.
        </p>
        <p>
          Inter-task communication uses FreeRTOS queues, which provide thread-safe, bounded buffers for passing messages between tasks. Queues decouple producers from consumers, allowing the sensor task to post readings without blocking on the control task and vice versa. The queue implementation provides constant-time insertion and removal operations, and the bounded size prevents memory exhaustion if one task falls behind.
        </p>
        <p>
          The state machine transition table is implemented as a constant array that maps state-input pairs to next states and actions. Lookup is constant time since both the current state and input condition can be used as array indices. This approach is more efficient than a chain of conditionals and scales linearly in code size as new states or inputs are added, rather than requiring combinatorial explosion of if-else branches.
        </p>
        <p>
          Overall time complexity for each control evaluation cycle is O(1). The system reads from a fixed-size sensor structure, performs a constant-time table lookup, and updates a fixed-size state structure. There are no loops that iterate over growing data sets and no recursion. Space complexity is similarly constant: the system allocates fixed-size structures at initialization and does not perform dynamic memory allocation during operation. This deterministic resource usage is critical for embedded systems that must run indefinitely without memory leaks or fragmentation.
        </p>
      </Section>

      <Section id="correctness" title="Algorithmic Correctness, Efficiency, and Reliability" icon={<ShieldCheck size={20} />}>
        <p>
          Algorithmic correctness is ensured through the formal structure of the finite state machine. Because all valid transitions are explicitly enumerated in the transition table, invalid state changes are impossible by construction. I verified correctness by systematically testing each state with each possible input condition and confirming that the resulting state and actions matched the specification. This exhaustive testing is feasible precisely because the algorithm is structured to have a finite, enumerable set of behaviors.
        </p>
        <p>
          Efficiency considerations drove several design decisions. The polling interval for control evaluation was tuned to balance responsiveness against unnecessary computation. Evaluating too frequently wastes CPU cycles on decisions that will almost always result in no state change, while evaluating too infrequently makes the system sluggish. The chosen interval reflects the thermal time constants of typical indoor spaces, where temperatures change gradually and sub-second responsiveness provides no practical benefit.
        </p>
        <p>
          Reliability is built into the algorithm through defensive design. The Error state provides a safe fallback when sensor data is unavailable or implausible. Hysteresis prevents the mechanical wear associated with rapid cycling. Minimum run times protect compressors from short-cycling damage. These are not add-on features but integral parts of the algorithm that were designed in from the beginning. The result is a control system that can operate continuously for months or years without degradation or unexpected behavior.
        </p>
        <p>
          The algorithmic design also supports extensibility. Adding a new state, such as a Defrost mode for heat pump operation, requires adding a row to the transition table and defining the new state's behavior. The existing states and transitions remain unchanged, reducing the risk of introducing bugs into working functionality. This extensibility demonstrates that careful upfront algorithmic design pays dividends throughout the system's lifecycle.
        </p>
      </Section>

      <Section id="outcomes" title="Course Outcomes Mapping" icon={<CheckCircle size={20} />}>
        <p>
          <strong>Outcome 3 - Designing and Evaluating Computing Solutions:</strong> This artifact demonstrates my ability to design computing solutions that solve problems using algorithmic principles and computer science practices. The finite state machine provides a mathematically grounded approach to control logic, replacing ad-hoc conditionals with a formal model that can be analyzed for correctness and completeness. The hysteresis algorithm solves the practical problem of rapid cycling while the timing model ensures decisions are made at appropriate intervals. Each algorithmic choice was evaluated against alternatives and selected based on its fitness for the embedded systems context.
        </p>
        <p>
          <strong>Outcome 4 - Innovative Techniques and Tools:</strong> The thermostat demonstrates innovative application of classical computer science techniques to an embedded control problem. The table-driven state machine is a well-established pattern, but applying it to thermostat control with integrated hysteresis and timing constraints required creative adaptation. I used the ESP-IDF framework and FreeRTOS primitives as tools to implement these algorithms efficiently, selecting queue structures and synchronization mechanisms that matched the requirements of real-time operation. The result is a system that applies proven techniques in a novel context.
        </p>
        <p>
          <strong>Outcome 5 - Security Mindset and Reliability:</strong> While security in the traditional sense applies more to network communication, the algorithmic design embodies a reliability mindset that parallels security thinking. The Error state ensures that invalid inputs do not propagate into control decisions. Bounds checking on sensor readings prevents implausible values from causing erratic behavior. The deterministic nature of the state machine means that system behavior is predictable and auditable. These safeguards demonstrate an understanding that robust systems must anticipate and handle abnormal conditions, not just optimize for the happy path.
        </p>
      </Section>

      <Section id="diagrams" title="Algorithm Diagrams & Code" icon={<FileCode size={20} />}>
        <p>
          The following diagrams illustrate the finite state machine and data flow architecture:
        </p>
        
        <DiagramViewer 
          src="/diagrams/fsm-diagram.png" 
          alt="Thermostat Control Finite State Machine Diagram showing four states (Idle, Heating, Cooling, Error) with labeled transitions including temperature thresholds, hysteresis conditions, and error triggers"
          caption="Thermostat Control Finite State Machine — Shows the four states (Idle, Heating, Cooling, Error) and all valid transitions with their triggering conditions."
        />
        
        <DiagramViewer 
          src="/diagrams/control-data-flow.png" 
          alt="Control Data Flow Diagram illustrating sensor input processing through validation, state machine evaluation, and control output generation with timing constraints"
          caption="Control Data Flow — Illustrates the flow of data from sensor input through state evaluation to control output."
        />
        
        <h3>Code Repositories</h3>
        <ul>
          <li><Link to="/original-code">Original Code Repository</Link> — The CS-350 Raspberry Pi implementation</li>
          <li><Link to="/enhanced-code">Enhanced Code Repository</Link> — The refactored ESP32/FreeRTOS implementation</li>
          <li><a href="https://github.com/gonzalopatino/ESP32_FreeRTOS_Thermostat" target="_blank" rel="noopener noreferrer">GitHub: ESP32 FreeRTOS Thermostat</a></li>
        </ul>
      </Section>

      <CTAFooter
        prevLink="/software-engineering"
        prevLabel="Software Engineering"
        nextLink="/database"
        nextLabel="Database"
      />
    </>
  );
}
