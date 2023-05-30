import { Router } from 'express';
import {
  createPost,
  getPost,
  getUserPosts,
  updatePost,
  deletePost,
  likeDislikePost,
  getTimelinePosts,
  comment,
  getAllComments,
  uncomment,
} from '../controllers/PostController';
import { verifyToken } from '../middleware/auth';

const router = Router();

//create a post
router.post('/', [verifyToken, createPost]);

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

//comment , uncomment
router.get('/:postId/comments', getAllComments);
router.post('/:postId/comments', comment);
router.delete('/:postId/comments/:commentId', uncomment);

export default router;
