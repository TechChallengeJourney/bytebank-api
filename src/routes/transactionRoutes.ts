import express from 'express'
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from '../controllers/transactionController'
import { validateToken } from '../middlewares/validateToken'

const router = express.Router()

router.get('/', validateToken, getTransaction)
router.post('/', validateToken, createTransaction)
router.put('/:id', validateToken, updateTransaction)
router.delete('/:id', validateToken, deleteTransaction)

export default router