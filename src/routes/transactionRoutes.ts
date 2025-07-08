import express from 'express'
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transactionController'
import { validateToken } from '../middlewares/validateToken'
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()

router.get('/', validateToken, getTransactions)
router.post('/', upload.single('file'), validateToken, createTransaction)
router.put('/:id', validateToken, updateTransaction)
router.delete('/:id', validateToken, deleteTransaction)

export default router