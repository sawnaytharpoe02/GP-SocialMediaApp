import { Router } from 'express';
import {
	deleteUser,
	updateUser,
	getUser,
	followUser,
	unfollowUser,
} from '../controllers/UserController';
import { verifyToken } from '../middleware/auth';
const router = Router();

router.route('/:id').get(getUser).put(verifyToken, updateUser).delete(verifyToken, deleteUser);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

export default router;
