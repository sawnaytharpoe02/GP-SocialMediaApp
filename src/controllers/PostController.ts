import { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import { PostCreate } from '../interface/post';

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const postTp: PostCreate = {
			userId: user._id.toString(),
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			userPicturePath: user.picturePath,
			description,
			picturePath,
			likes: new Map<string, boolean>(),
			comments: [],
		};

		const newPost = new Post(postTp);
		await newPost.save();

		const post = await Post.find();
		res.status(201).json(post);
	} catch (err: any) {
		res.status(409).json({ message: err.message });
	}
};

// GET NEW FEED POSTS
export const getFeedPosts = async (req: Request, res: Response) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};

// GET USER POSTS
export const getUserPosts = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};

// LIKE POST
export const likePost = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		const isLiked = post.likes?.get(userId);

		if (isLiked) {
			post.likes?.delete(userId);
		} else {
			post.likes?.set(userId, true);
		}

		const updatePost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes ?? {} },
			{ new: true }
		);
		res.status(200).json(updatePost);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};
