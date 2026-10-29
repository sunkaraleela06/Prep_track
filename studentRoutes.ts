
import { Router } from 'express'
import mongoose from 'mongoose'
import Student from './models/Student'

const router = Router()

// GET: Retrieve all student records
router.get('/', async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })
    res.json({ success: true, count: students.length, students })
  } catch {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students.',
    })
  }
})

// POST: Register a student profile
router.post('/', async (req, res) => {
  try {
    const { name, email, department, studyYear, skills } = req.body

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      typeof department !== 'string' ||
      !department.trim() ||
      !Number.isInteger(studyYear) ||
      studyYear < 1 ||
      studyYear > 4
    ) {
      res.status(400).json({
        success: false,
        message:
          'Provide a name, email, department, and study year from 1 to 4.',
      })
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
      return
    }

    if (
      !Array.isArray(skills) ||
      !skills.every((skill: unknown) => typeof skill === 'string')
    ) {
      res.status(400).json({
        success: false,
        message: 'Skills must be a list of text values.',
      })
      return
    }

    const student = await Student.create({
      name: name.trim(),
      email: normalizedEmail,
      department: department.trim(),
      studyYear,
      skills: skills.map((skill: string) => skill.trim()).filter(Boolean),
    })

    res.status(201).json({
      success: true,
      message: 'Student registered successfully.',
      student,
    })
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        success: false,
        message: 'A student with this email already exists.',
      })
      return
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'ValidationError'
    ) {
      res.status(400).json({
        success: false,
        message: 'The student details did not pass validation.',
      })
      return
    }

    res.status(500).json({
      success: false,
      message: 'Failed to register student.',
    })
  }
})

// PUT: Update an existing student
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, department, studyYear, skills } = req.body

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid student ID.',
      })
      return
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      typeof department !== 'string' ||
      !department.trim() ||
      !Number.isInteger(studyYear) ||
      studyYear < 1 ||
      studyYear > 4 ||
      !Array.isArray(skills) ||
      !skills.every((skill: unknown) => typeof skill === 'string')
    ) {
      res.status(400).json({
        success: false,
        message: 'Provide valid student details.',
      })
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
      return
    }

    const student = await Student.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: normalizedEmail,
        department: department.trim(),
        studyYear,
        skills: skills.map((skill: string) => skill.trim()).filter(Boolean),
      },
      { new: true, runValidators: true },
    )

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found.',
      })
      return
    }

    res.json({
      success: true,
      message: 'Student updated successfully.',
      student,
    })
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        success: false,
        message: 'A student with this email already exists.',
      })
      return
    }

    res.status(400).json({
      success: false,
      message: 'Failed to update student. Check the submitted details.',
    })
  }
})

// DELETE: Remove a student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid student ID.',
      })
      return
    }

    const student = await Student.findByIdAndDelete(id)

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found.',
      })
      return
    }

    res.json({
      success: true,
      message: 'Student deleted successfully.',
    })
  } catch {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student.',
    })
  }
})

export default router
