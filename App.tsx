
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './App.css'
import {
  checkApiHealth,
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  type Student,
} from './api'

import Jobs from './pages/Jobs'
import Practice from './pages/Practice'
import Progress from './pages/Progress'
import Login from "./pages/Login";

const features = [
  {
    icon: '💼',
    title: 'Explore Opportunities',
    description:
      'Discover internships and job openings that match your career goals.',
    link: 'Explore Jobs',
    path: '/jobs',
  },
  {
    icon: '💻',
    title: 'Practice Coding',
    description:
      'Strengthen your programming skills and prepare for technical interviews.',
    link: 'Start Practicing',
    path: '/practice',
  },
  {
    icon: '📈',
    title: 'Track Your Progress',
    description:
      'Monitor your preparation, record achievements, and stay motivated.',
    link: 'View Progress',
    path: '/progress',
  },
]

function App() {
  const location = useLocation()
  if (location.pathname === "/login") {
  return <Login />;
}

  const [connectionStatus, setConnectionStatus] = useState<
    'checking' | 'connected' | 'disconnected'
  >('checking')

  const [students, setStudents] = useState<Student[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [studyYear, setStudyYear] = useState('2')
  const [skills, setSkills] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadStudents() {
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load student records.',
      )
    } finally {
      setStudentsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    async function verifyConnection() {
      try {
        const health = await checkApiHealth()

        if (isActive) {
          setConnectionStatus(
            health.success && health.database === 'connected'
              ? 'connected'
              : 'disconnected',
          )
        }
      } catch {
        if (isActive) {
          setConnectionStatus('disconnected')
        }
      }
    }

    void verifyConnection()
    void loadStudents()

    return () => {
      isActive = false
    }
  }, [])

  function clearForm() {
    setName('')
    setEmail('')
    setDepartment('')
    setStudyYear('2')
    setSkills('')
    setEditingId(null)
  }

  function handleEdit(student: Student) {
    setName(student.name)
    setEmail(student.email)
    setDepartment(student.department)
    setStudyYear(String(student.studyYear))
    setSkills(student.skills.join(', '))
    setEditingId(student._id)
    setMessage('')
    setError('')

    document.getElementById('register')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    const studentData = {
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      studyYear: Number(studyYear),
      skills: skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    }

    try {
      if (editingId) {
        const updatedStudent = await updateStudent(editingId, studentData)

        setStudents((current) =>
          current.map((student) =>
            student._id === updatedStudent._id
              ? updatedStudent
              : student,
          ),
        )
        setMessage('Student details updated successfully!')
      } else {
        const newStudent = await createStudent(studentData)

        setStudents((current) => [
          newStudent,
          ...current.filter((student) => student._id !== newStudent._id),
        ])
        setMessage('Student registered successfully!')
      }

      clearForm()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'The operation failed.',
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(student: Student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}'s record? This cannot be undone.`,
    )

    if (!confirmed) return

    setMessage('')
    setError('')

    try {
      await deleteStudent(student._id)

      setStudents((current) =>
        current.filter((item) => item._id !== student._id),
      )

      if (editingId === student._id) {
        clearForm()
      }

      setMessage(`${student.name}'s record was deleted successfully.`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete student.',
      )
    }
  }

  // Show the requested feature page when its URL is opened.
  if (location.pathname === '/jobs') return <Jobs />
  if (location.pathname === '/practice') return <Practice />
  if (location.pathname === '/progress') return <Progress />

  // Homepage
  return (
    <div className="app" id="home">
      <header className="navbar">
        <Link className="logo" to="/" aria-label="PrepTrack home">
          <span className="logo-icon">P</span>
          <span>PrepTrack</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link className="active-link" to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#students">Students</a>
        </nav>

        <a className="nav-cta" href="#register">
          Get Started <span aria-hidden="true">→</span>
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="announcement">
              <span className="announcement-dot" />
              YOUR JOURNEY TO YOUR DREAM CAREER STARTS HERE
            </div>

            <h1>
              Prepare Today.
              <br />
              <span>Get Placed Tomorrow.</span>
            </h1>

            <p className="hero-description">
              One platform to prepare for placements, discover career
              opportunities, practice coding, and track your progress
              towards your dream job.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#register">
                Start Your Journey <span aria-hidden="true">→</span>
              </a>
              <a className="secondary-button" href="#features">
                Discover PrepTrack
              </a>
            </div>

            <div className="hero-note">
              <span aria-hidden="true">✓</span>
              Built for students. Designed for success.
            </div>

            <p
              role="status"
              aria-live="polite"
              style={{ fontSize: '0.9rem', marginTop: '1rem' }}
            >
              {connectionStatus === 'checking'
                ? '⏳'
                : connectionStatus === 'connected'
                  ? '🟢'
                  : '🔴'}{' '}
              Backend and database:{' '}
              <strong>
                {connectionStatus === 'checking'
                  ? 'Checking connection...'
                  : connectionStatus === 'connected'
                    ? 'Connected'
                    : 'Disconnected'}
              </strong>
            </p>
          </div>

          <div
            className="hero-visual"
            aria-label="Placement preparation overview"
          >
            <div className="visual-glow" />

            <div className="dashboard-preview">
              <div className="preview-header">
                <div>
                  <p className="preview-eyebrow">YOUR DASHBOARD</p>
                  <h2>Keep moving forward!</h2>
                </div>
                <div className="profile-avatar">S</div>
              </div>

              <div className="welcome-card">
                <div>
                  <p className="welcome-label">YOUR NEXT CHAPTER</p>
                  <h3>Your dream job is worth preparing for.</h3>
                  <p>Small steps today. Big opportunities tomorrow.</p>
                </div>
                <div className="welcome-emoji" aria-hidden="true">🎯</div>
              </div>

              <div className="preview-stats">
                <div className="stat-card">
                  <span className="stat-icon purple">⌘</span>
                  <p>Skills to build</p>
                  <strong>Keep learning</strong>
                </div>
                <div className="stat-card">
                  <span className="stat-icon green">✓</span>
                  <p>Daily goal</p>
                  <strong>Stay consistent</strong>
                </div>
              </div>

              <div className="preview-bottom">
                <div className="progress-symbol">↗</div>
                <div>
                  <strong>Every day is progress.</strong>
                  <p>Your placement journey starts here.</p>
                </div>
              </div>
            </div>

            <div className="floating-card floating-top">
              <span className="floating-icon">🚀</span>
              <div>
                <strong>Dream big</strong>
                <p>Work towards it</p>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span className="floating-icon">⭐</span>
              <div>
                <strong>Your future</strong>
                <p>Starts with you</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-label">YOUR PLACEMENT TOOLKIT</span>
            <h2>Everything you need to move forward.</h2>
            <p>
              Build your skills, explore opportunities, and take charge
              of your placement preparation.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.path} className="feature-link">
                  {feature.link} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="register"
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '4rem 1.5rem',
          }}
        >
          <div className="section-heading">
            <span className="section-label">JOIN PREPTRACK</span>
            <h2>{editingId ? 'Edit Student Details' : 'Student Registration'}</h2>
            <p>
              {editingId
                ? 'Update the details below and save your changes.'
                : 'Enter your details to create your placement preparation profile.'}
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            style={{
              display: 'grid',
              gap: '1rem',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              background: '#ffffff',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            }}
          >
            <label>
              Full name
              <input
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
                style={inputStyle}
              />
            </label>

            <label>
              Department
              <input
                required
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                placeholder="e.g. CSE, AIML, ECE"
                style={inputStyle}
              />
            </label>

            <label>
              Study year
              <select
                value={studyYear}
                onChange={(event) => setStudyYear(event.target.value)}
                style={inputStyle}
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </label>

            <label>
              Skills (separate with commas)
              <input
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                placeholder="Python, Java, React"
                style={inputStyle}
              />
            </label>

            <button type="submit" disabled={loading} style={primaryButtonStyle}>
              {loading
                ? 'Please wait...'
                : editingId
                  ? 'Save Changes'
                  : 'Register Student'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  clearForm()
                  setMessage('')
                  setError('')
                }}
                style={secondaryButtonStyle}
              >
                Cancel Editing
              </button>
            )}

            {message && (
              <p role="status" style={{ color: 'green', margin: 0 }}>
                {message}
              </p>
            )}

            {error && (
              <p role="alert" style={{ color: '#dc2626', margin: 0 }}>
                {error}
              </p>
            )}
          </form>
        </section>

        <section
          id="students"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem 1.5rem 5rem',
          }}
        >
          <div className="section-heading">
            <span className="section-label">STUDENT DIRECTORY</span>
            <h2>Registered Students ({students.length})</h2>
            <p>Student profiles saved in the PrepTrack database.</p>
          </div>

          {studentsLoading ? (
            <p>Loading student records...</p>
          ) : students.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No students registered yet. Use the form above to add the first student.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {students.map((student) => (
                <article
                  key={student._id}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: '#ffffff',
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>{student.name}</h3>
                  <p>{student.email}</p>
                  <p>
                    <strong>Department:</strong> {student.department}
                  </p>
                  <p>
                    <strong>Study year:</strong> {student.studyYear}
                  </p>
                  <p>
                    <strong>Skills:</strong>{' '}
                    {student.skills.length
                      ? student.skills.join(', ')
                      : 'Not added'}
                  </p>
                  <p>
                    <strong>Topics completed:</strong>{' '}
                    {student.completedTopics}/{student.totalTopics}
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(student)}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(student)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div>
            <span className="section-label">YOUR FUTURE, YOUR PLAN</span>
            <h2>Turn your preparation into opportunity.</h2>
          </div>
          <p>
            PrepTrack brings your placement preparation into one place
            so you can focus on learning, growing, and becoming
            interview-ready.
          </p>
        </section>
      </main>

      <footer className="footer">
        <Link className="logo footer-logo" to="/">
          <span className="logo-icon">P</span>
          <span>PrepTrack</span>
        </Link>
        <p>Learn consistently. Prepare confidently. Grow continuously.</p>
        <span className="copyright">© 2026 PrepTrack</span>
      </footer>
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box' as const,
  marginTop: '0.4rem',
  padding: '0.8rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  font: 'inherit',
  background: '#ffffff',
}

const primaryButtonStyle = {
  padding: '0.9rem 1rem',
  border: 'none',
  borderRadius: '8px',
  background: '#5b43d6',
  color: '#ffffff',
  fontWeight: 600,
  cursor: 'pointer',
}

const secondaryButtonStyle = {
  padding: '0.8rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  background: '#ffffff',
  color: '#374151',
  fontWeight: 600,
  cursor: 'pointer',
}

const editButtonStyle = {
  flex: 1,
  padding: '0.65rem',
  border: 'none',
  borderRadius: '7px',
  background: '#e0e7ff',
  color: '#3730a3',
  fontWeight: 600,
  cursor: 'pointer',
}

const deleteButtonStyle = {
  flex: 1,
  padding: '0.65rem',
  border: 'none',
  borderRadius: '7px',
  background: '#fee2e2',
  color: '#b91c1c',
  fontWeight: 600,
  cursor: 'pointer',
}

export default App
