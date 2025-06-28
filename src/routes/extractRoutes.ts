import express from 'express'
import {
  getExtract,
  createExtract,
  updateExtract,
  deleteExtract
} from '../controllers/extractController'
import { validateToken } from '../middlewares/validateToken'

const router = express.Router()

router.get('/', validateToken, getExtract)
router.post('/',validateToken, createExtract)
router.put('/:id',validateToken, updateExtract)
router.delete('/:id',validateToken, deleteExtract)

export default router