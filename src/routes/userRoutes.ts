import { Router } from 'express';
import { getUsers, createUser, deleteUser, updateUser } from '../controllers/userController';
import { validateId } from '../middlewares/validateId';

const router = Router()

router.get('/', getUsers)
router.post('/', createUser)
router.put('/:id', validateId, updateUser)
router.delete('/:id', validateId, deleteUser)

export default router