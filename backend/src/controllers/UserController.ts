import { Request, Response } from 'express';
import User from '../models/User';

// READ
export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		res.status(200).json(user);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserFriends = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user!.friends.map((id: any) => User.findById(id))
		);

		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath,
			}: any) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					picturePath,
				};
			}
		);

		res.status(200).json(formattedFriends);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};

// UPDATE
export const addRemoveFriend = async (req: Request, res: Response) => {
	try {
		const { id, friendId } = req.params;
		const user: any = await User.findById(id);
		const friend: any = await User.findById(friendId);

		if (user.friends.includes(friend)) {
			user.friends = user.friends.filter((id: any) => id !== friendId);
			friend.friends = friend.friends.filter((id: any) => id !== id);
		} else {
			user.friend.push(friend);
			friend.friends.push(id);
		}

		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((id: any) => User.findById(id))
		);

		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath,
			}: any) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					picturePath,
				};
			}
		);

		res.status(200).json(formattedFriends);
	} catch (err: any) {
		res.status(404).json({ message: err.message });
	}
};
