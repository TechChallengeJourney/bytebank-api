import { Router } from 'express'
import userRoutes from './userRoutes'
import cardRoutes from './cardRoutes'
import transactionRoutes from './transactionRoutes'
import authRoutes from './authRoutes'
import categoryRoutes from './categoryRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)
router.use('/transactions', transactionRoutes)
router.use('/categories', categoryRoutes)
router.use('/auth', authRoutes)

export default router