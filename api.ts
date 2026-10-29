
const API_BASE_URL = 'http://localhost:5000'

export interface ApiHealthResponse {
  success: boolean
  message: string
  database: 'connected' | 'disconnected'
}

export interface ApiWelcomeResponse {
  message: string
  status: string
}

export interface Student {
  _id: string
  name: string
  email: string
  department: string
  studyYear: number
  skills: string[]
  completedTopics: number
  totalTopics: number
  createdAt: string
  updatedAt: string
}

export interface CreateStudentData {
  name: string
  email: string
  department: string
  studyYear: number
  skills: string[]
}

export async function checkApiHealth(): Promise<ApiHealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`)

  if (!response.ok) {
    throw new Error('Failed to connect to the PrepTrack backend.')
  }

  return response.json() as Promise<ApiHealthResponse>
}

export async function getApiWelcome(): Promise<ApiWelcomeResponse> {
  const response = await fetch(`${API_BASE_URL}/`)

  if (!response.ok) {
    throw new Error('Failed to fetch the PrepTrack welcome message.')
  }

  return response.json() as Promise<ApiWelcomeResponse>
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/api/students`)
  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to retrieve students.')
  }

  return data.students as Student[]
}

export async function createStudent(
  studentData: CreateStudentData,
): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to register student.')
  }

  return data.student as Student
}

export async function updateStudent(
  id: string,
  studentData: CreateStudentData,
): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update student.')
  }

  return data.student as Student
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete student.')
  }
}
