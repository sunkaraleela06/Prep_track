
import { useState } from 'react'
import { Link } from 'react-router-dom'

const problems = [
  {
    id: 1,
    title: 'Sum of Two Numbers',
    topic: 'Basic Programming',
    difficulty: 'Easy',
    description: 'Given two numbers, calculate and print their sum.',
    url: 'https://www.hackerrank.com/domains/algorithms',
  },
  {
    id: 2,
    title: 'Reverse a String',
    topic: 'Strings',
    difficulty: 'Easy',
    description: 'Write a program to reverse the characters in a string.',
    url: 'https://leetcode.com/problems/reverse-string/',
  },
  {
    id: 3,
    title: 'Two Sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    description: 'Find two array elements whose sum equals a target value.',
    url: 'https://leetcode.com/problems/two-sum/',
  },
  {
    id: 4,
    title: 'Valid Parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    description: 'Check whether the brackets in a string are balanced.',
    url: 'https://leetcode.com/problems/valid-parentheses/',
  },
  {
    id: 5,
    title: 'Binary Search',
    topic: 'Searching',
    difficulty: 'Easy',
    description: 'Find a target element in a sorted array efficiently.',
    url: 'https://leetcode.com/problems/binary-search/',
  },
  {
    id: 6,
    title: 'Climbing Stairs',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    description: 'Find the number of ways to reach the top of a staircase.',
    url: 'https://leetcode.com/problems/climbing-stairs/',
  },
]

function Practice() {
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [completed, setCompleted] = useState<number[]>([])

  const topics = ['All', ...new Set(problems.map((problem) => problem.topic))]

  const filteredProblems =
    selectedTopic === 'All'
      ? problems
      : problems.filter((problem) => problem.topic === selectedTopic)

  function toggleCompleted(id: number) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((problemId) => problemId !== id)
        : [...current, id],
    )
  }

  return (
    <main style={pageStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Home
      </Link>

      <p style={eyebrowStyle}>BUILD YOUR CODING SKILLS</p>
      <h1 style={headingStyle}>Coding Practice</h1>
      <p style={descriptionStyle}>
        Practice programming problems, explore different topics, and prepare
        for technical interviews.
      </p>

      <div style={summaryStyle}>
        <div>
          <span style={summaryLabelStyle}>Total problems</span>
          <strong style={summaryNumberStyle}>{problems.length}</strong>
        </div>
        <div>
          <span style={summaryLabelStyle}>Completed</span>
          <strong style={summaryNumberStyle}>
            {completed.length}/{problems.length}
          </strong>
        </div>
        <div>
          <span style={summaryLabelStyle}>Progress</span>
          <strong style={summaryNumberStyle}>
            {Math.round((completed.length / problems.length) * 100)}%
          </strong>
        </div>
      </div>

      <label style={filterLabelStyle}>
        Filter by topic
        <select
          value={selectedTopic}
          onChange={(event) => setSelectedTopic(event.target.value)}
          style={selectStyle}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <div style={gridStyle}>
        {filteredProblems.map((problem) => {
          const isCompleted = completed.includes(problem.id)

          return (
            <article key={problem.id} style={cardStyle}>
              <div style={cardTopStyle}>
                <span style={tagStyle}>{problem.difficulty}</span>
                <span style={topicStyle}>{problem.topic}</span>
              </div>

              <h2 style={problemHeadingStyle}>{problem.title}</h2>
              <p style={descriptionStyle}>{problem.description}</p>

              <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                style={buttonStyle}
              >
                Solve Problem ↗
              </a>

              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleCompleted(problem.id)}
                />
                Mark as completed
              </label>
            </article>
          )
        })}
      </div>

      <p style={noticeStyle}>
        Note: Completed problem selections are stored in this page's current
        session only. They reset when the page is refreshed.
      </p>
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

const summaryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '1rem',
  margin: '2rem 0',
  padding: '1.5rem',
  background: '#f5f3ff',
  borderRadius: '14px',
}

const summaryLabelStyle = {
  display: 'block',
  color: '#6b7280',
  marginBottom: '0.5rem',
}

const summaryNumberStyle = {
  fontSize: '1.6rem',
  color: '#5b43d6',
}

const filterLabelStyle = {
  display: 'grid',
  gap: '0.5rem',
  maxWidth: '320px',
  fontWeight: 600,
}

const selectStyle = {
  padding: '0.8rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  background: '#ffffff',
  font: 'inherit',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.25rem',
  marginTop: '1.5rem',
}

const cardStyle = {
  padding: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '14px',
  background: '#ffffff',
  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
}

const cardTopStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.5rem',
}

const tagStyle = {
  padding: '0.3rem 0.7rem',
  borderRadius: '20px',
  background: '#dcfce7',
  color: '#166534',
  fontSize: '0.8rem',
  fontWeight: 600,
}

const topicStyle = {
  color: '#6b7280',
  fontSize: '0.85rem',
}

const problemHeadingStyle = {
  fontSize: '1.2rem',
  marginTop: '1rem',
}

const buttonStyle = {
  display: 'inline-block',
  marginTop: '0.5rem',
  padding: '0.7rem 1rem',
  borderRadius: '8px',
  background: '#5b43d6',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 600,
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1.25rem',
  color: '#374151',
  cursor: 'pointer',
}

const noticeStyle = {
  marginTop: '2rem',
  color: '#6b7280',
  fontSize: '0.9rem',
  lineHeight: 1.6,
}

export default Practice
