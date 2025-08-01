import mongoose from 'mongoose'

export const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}