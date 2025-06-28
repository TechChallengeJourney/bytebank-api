import { Router } from 'express';
import { getUsers, deleteUser, updateUser } from '../controllers/userController';
import { validateId } from '../middlewares/validateId';
import { validateToken } from '../middlewares/validateToken';

const router = Router()

router.get('/', validateToken, getUsers)
router.put('/:id', [validateId, validateToken],  updateUser)
router.delete('/:id', [validateId, validateToken], deleteUser)

export default router