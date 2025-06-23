import { Router } from 'express'
import userRoutes from './userRoutes'
import cardRoutes from './cardRoutes'
import extractRoutes from './extractRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)
router.use('/extracts', extractRoutes)

export default router