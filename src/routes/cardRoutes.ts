import { Router } from 'express'
import { getCards, createCard, updateCard, deleteCard } from '../controllers/cardController'
import { validateId } from '../middlewares/validateId'
import { validateToken } from '../middlewares/validateToken'

const router = Router()

router.get('/', validateToken, getCards)
router.post('/', validateToken, createCard)
router.put('/:id', [validateId, validateToken], updateCard)
router.delete('/:id', [validateId, validateToken], deleteCard)

export default router