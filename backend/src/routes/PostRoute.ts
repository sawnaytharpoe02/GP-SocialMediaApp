import { Router } from 'express';
import {
	createPost,
	getPost,
	getUserPosts,
	updatePost,
	deletePost,
	likeDislikePost,
	getTimelinePosts,
} from '../controllers/PostController';
import { verifyToken } from '../middleware/auth';
import { uploadSingleFile } from '../middleware/upload';

const router = Router();

//create a post
router.post('/', [verifyToken, uploadSingleFile, createPost]);

router
	.route('/:id')
	.get(getPost)
	.put([verifyToken, updatePost])
	.delete([verifyToken, deletePost]);

//like / dislike a post
router.put('/:id/like', likeDislikePost);

//get user's posts
router.get('/profile/:username', getUserPosts);

//get timeline posts
router.get('/timeline/:userId', getTimelinePosts);

export default router;
