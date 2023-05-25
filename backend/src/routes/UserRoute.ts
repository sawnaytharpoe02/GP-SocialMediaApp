import { Router } from 'express';
import {
	deleteUser,
	updateUser,
	getUser,
	followUser,
	unfollowUser,
	getFriendsList,
} from '../controllers/UserController';
import { verifyToken } from '../middleware/auth';
const router = Router();

//query a user
router.get('/', getUser);

//get user's friend lists
router.get('/friends/:userId', getFriendsList);

router
	.route('/:id')
	.put(verifyToken, updateUser)
	.delete(verifyToken, deleteUser);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

export default router;
