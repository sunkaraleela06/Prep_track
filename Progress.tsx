
import { Link } from 'react-router-dom'

const learningGoals = [
  {
    title: 'Programming Fundamentals',
    description: 'Variables, conditions, loops, and functions',
    progress: 70,
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Arrays, strings, linked lists, stacks, and queues',
    progress: 45,
  },
  {
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript, and React',
    progress: 60,
  },
  {
    title: 'Database Management',
    description: 'SQL, queries, and database fundamentals',
    progress: 30,
  },
  {
    title: 'Interview Preparation',
    description: 'Communication, aptitude, and mock interviews',
    progress: 20,
  },
]

function Progress() {
  const overallProgress = Math.round(
    learningGoals.reduce((total, goal) => total + goal.progress, 0) /
      learningGoals.length,
  )

  const completedGoals = learningGoals.filter(
    (goal) => goal.progress === 100,
  ).length

  return (
    <main style={pageStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Home
      </Link>

      <p style={eyebrowStyle}>YOUR LEARNING JOURNEY</p>
      <h1 style={headingStyle}>Track Your Progress</h1>
      <p style={descriptionStyle}>
        Review your preparation goals, monitor your learning, and identify
        the areas that need more attention.
      </p>

      <section style={overviewStyle}>
        <div style={overviewCardStyle}>
          <span style={labelStyle}>Overall progress</span>
          <strong style={numberStyle}>{overallProgress}%</strong>
          <div style={trackStyle}>
            <div
              style={{
                ...barStyle,
                width: `${overallProgress}%`,
              }}
            />
          </div>
        </div>

        <div style={overviewCardStyle}>
          <span style={labelStyle}>Learning areas</span>
          <strong style={numberStyle}>{learningGoals.length}</strong>
          <p style={smallTextStyle}>Areas in your preparation plan</p>
        </div>

        <div style={overviewCardStyle}>
          <span style={labelStyle}>Completed areas</span>
          <strong style={numberStyle}>
            {completedGoals}/{learningGoals.length}
          </strong>
          <p style={smallTextStyle}>Areas that reached 100%</p>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={sectionHeadingStyle}>Your learning goals</h2>
        <p style={descriptionStyle}>
          These are example progress values. Update them as you learn.
        </p>

        <div style={goalsContainerStyle}>
          {learningGoals.map((goal) => (
            <article key={goal.title} style={goalCardStyle}>
              <div style={goalHeaderStyle}>
                <div>
                  <h3 style={goalTitleStyle}>{goal.title}</h3>
                  <p style={smallTextStyle}>{goal.description}</p>
                </div>
                <strong style={percentageStyle}>{goal.progress}%</strong>
              </div>

              <div
                style={trackStyle}
                role="progressbar"
                aria-label={`${goal.title} progress`}
                aria-valuenow={goal.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  style={{
                    ...barStyle,
                    width: `${goal.progress}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={tipStyle}>
        <h2 style={sectionHeadingStyle}>Keep moving forward!</h2>
        <p style={descriptionStyle}>
          Set a small daily goal, practice consistently, and review your
          progress every week. Consistency matters more than speed.
        </p>
        <Link to="/practice" style={buttonStyle}>
          Practice Coding →
        </Link>
      </section>
    </main>
  )
}

const pageStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '3rem 1.5rem',
  color: '#1f2937',
  fontFamily: 'Arial, sans-serif',
}

const backLinkStyle = {
  color: '#5b43d6',
  textDecoration: 'none',
  fontWeight: 600,
}

const eyebrowStyle = {
  marginTop: '3rem',
  color: '#5b43d6',
  fontWeight: 700,
  letterSpacing: '2px',
  fontSize: '0.8rem',
}

const headingStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  marginBottom: '0.75rem',
}

const descriptionStyle = {
  color: '#6b7280',
  lineHeight: 1.7,
}

const overviewStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginTop: '2rem',
}

const overviewCardStyle = {
  padding: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '14px',
  background: '#ffffff',
}

const labelStyle = {
  display: 'block',
  color: '#6b7280',
  marginBottom: '0.75rem',
}

const numberStyle = {
  display: 'block',
  fontSize: '2rem',
  color: '#5b43d6',
  marginBottom: '0.75rem',
}

const smallTextStyle = {
  color: '#6b7280',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  marginBottom: 0,
}

const trackStyle = {
  height: '9px',
  background: '#e5e7eb',
  borderRadius: '20px',
  overflow: 'hidden',
}

const barStyle = {
  height: '100%',
  background: '#6d5ae6',
  borderRadius: '20px',
  transition: 'width 0.3s ease',
}

const sectionHeadingStyle = {
  fontSize: '1.5rem',
  marginBottom: '0.75rem',
}

const goalsContainerStyle = {
  display: 'grid',
  gap: '1rem',
  marginTop: '1.5rem',
}

const goalCardStyle = {
  padding: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  background: '#ffffff',
}

const goalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '1rem',
  marginBottom: '1rem',
}

const goalTitleStyle = {
  fontSize: '1.05rem',
  margin: '0 0 0.4rem',
}

const percentageStyle = {
  color: '#5b43d6',
  fontSize: '1.1rem',
}

const tipStyle = {
  marginTop: '3rem',
  padding: '2rem',
  borderRadius: '16px',
  background: '#f5f3ff',
}

const buttonStyle = {
  display: 'inline-block',
  marginTop: '0.75rem',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  background: '#5b43d6',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 600,
}

export default Progress
