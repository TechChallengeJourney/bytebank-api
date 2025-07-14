import { Router } from 'express';
import { getUsers, deleteUser, updateUser, updateUserWidgets } from '../controllers/userController';
import { validateId } from '../middlewares/validateId';
import { validateToken } from '../middlewares/validateToken';

const router = Router()

router.get('/', validateToken, getUsers)
router.put('/:id', [validateId, validateToken],  updateUser)
router.delete('/:id', [validateId, validateToken], deleteUser)
router.put('/:id/widgets', [validateId, validateToken], updateUserWidgets);

export default router