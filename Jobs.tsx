
import { Link } from 'react-router-dom'

const jobs = [
  {
    role: 'Software Development Intern',
    company: 'Example Technology Company',
    type: 'Internship',
    skills: 'JavaScript, React, Problem Solving',
    eligibility: 'Students interested in frontend or full-stack development',
    url: 'https://internshala.com/',
  },
  {
    role: 'Python Developer',
    company: 'Example Software Company',
    type: 'Entry Level',
    skills: 'Python, SQL, Data Structures',
    eligibility: 'Students with Python programming fundamentals',
    url: 'https://www.linkedin.com/jobs/',
  },
  {
    role: 'Data Science Intern',
    company: 'Example Analytics Company',
    type: 'Internship',
    skills: 'Python, Pandas, Machine Learning',
    eligibility: 'Students interested in data analysis and machine learning',
    url: 'https://internshala.com/',
  },
]

function Jobs() {
  return (
    <main style={pageStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Home
      </Link>

      <p style={eyebrowStyle}>CAREER OPPORTUNITIES</p>
      <h1 style={headingStyle}>Explore Jobs & Internships</h1>
      <p style={descriptionStyle}>
        Discover opportunities, understand the required skills, and prepare
        for your next career step.
      </p>

      <div style={noticeStyle}>
        These are sample opportunities for demonstration. Use the links to
        explore current listings; availability and eligibility may vary.
      </div>

      <div style={gridStyle}>
        {jobs.map((job) => (
          <article key={job.role} style={cardStyle}>
            <span style={tagStyle}>{job.type}</span>
            <h2 style={jobHeadingStyle}>{job.role}</h2>
            <p style={companyStyle}>{job.company}</p>

            <p>
              <strong>Skills:</strong> {job.skills}
            </p>
            <p>
              <strong>Who can apply:</strong> {job.eligibility}
            </p>

            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              style={buttonStyle}
            >
              Explore Opportunities →
            </a>
          </article>
        ))}
      </div>
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
  maxWidth: '700px',
}

const noticeStyle = {
  margin: '1.5rem 0',
  padding: '1rem',
  borderRadius: '10px',
  background: '#f3f0ff',
  lineHeight: 1.6,
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.25rem',
  marginTop: '2rem',
}

const cardStyle = {
  padding: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '14px',
  background: '#ffffff',
  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
  lineHeight: 1.6,
}

const tagStyle = {
  display: 'inline-block',
  padding: '0.3rem 0.7rem',
  borderRadius: '20px',
  background: '#ede9fe',
  color: '#5b43d6',
  fontSize: '0.8rem',
  fontWeight: 600,
}

const jobHeadingStyle = {
  fontSize: '1.25rem',
  marginBottom: '0.4rem',
}

const companyStyle = {
  color: '#6b7280',
}

const buttonStyle = {
  display: 'inline-block',
  marginTop: '0.75rem',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  background: '#5b43d6',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 600,
}

export default Jobs
