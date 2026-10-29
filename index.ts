import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import studentRoutes from './studentRoutes'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use('/api/students', studentRoutes)

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the PrepTrack API!',
    status: 'Server is running',
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'PrepTrack backend is healthy',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

async function startServer() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing. Check your server/.env file.')
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected successfully!')

    app.listen(PORT, () => {
      console.log(`PrepTrack server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  }
}

startServer()