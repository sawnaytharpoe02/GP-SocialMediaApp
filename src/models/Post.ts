import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		location: String,
		userPicturePath: String,
		descripton: String,
		picturePath: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Post = model('post', PostSchema);

export default Post;
