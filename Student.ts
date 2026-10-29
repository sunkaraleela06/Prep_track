
import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must contain at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    studyYear: {
      type: Number,
      required: [true, 'Study year is required'],
      min: [1, 'Study year must be at least 1'],
      max: [4, 'Study year cannot exceed 4'],
    },
    skills: {
      type: [String],
      default: [],
    },
    completedTopics: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalTopics: {
      type: Number,
      default: 10,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
)

export type StudentType = InferSchemaType<typeof studentSchema>

const Student = mongoose.model('Student', studentSchema)

export default Student
