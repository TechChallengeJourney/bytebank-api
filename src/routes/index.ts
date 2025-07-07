import { Router } from 'express'
import userRoutes from './userRoutes'
import cardRoutes from './cardRoutes'
import transactionRoutes from './transactionRoutes'
import authRoutes from './authRoutes'
import categoryRoutes from './categoryRoutes'
import methodRoutes from './methodRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/cards', cardRoutes)
router.use('/transactions', transactionRoutes)
router.use('/categories', categoryRoutes)
router.use('/methods', methodRoutes)

export default router