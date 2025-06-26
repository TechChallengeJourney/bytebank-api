import express from 'express'
import {
  getExtract,
  createExtract,
  updateExtract,
  deleteExtract
} from '../controllers/extractController'

const router = express.Router()

router.get('/', getExtract)
router.post('/', createExtract)
router.put('/:id', updateExtract)
router.delete('/:id', deleteExtract)

export default router