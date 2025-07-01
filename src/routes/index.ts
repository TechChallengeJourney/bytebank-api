import { Router } from 'express'
import userRoutes from './userRoutes'
import cardRoutes from './cardRoutes'
import transactionRoutes from './transactionRoutes'
import authRoutes from './authRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)
router.use('/transactions', transactionRoutes)
router.use('/auth', authRoutes)

export default router