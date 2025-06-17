import { Router } from 'express'
import { getCards, createCard, updateCard, deleteCard } from '../controllers/cardController'
import { validateId } from '../middlewares/validateId'

const router = Router()

router.get('/', getCards)
router.post('/', createCard)
router.put('/:id', validateId, updateCard)
router.delete('/:id', validateId, deleteCard)

export default router