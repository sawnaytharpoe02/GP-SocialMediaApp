export interface PostCreate {
	userId: string;
	firstName: string;
	lastName: string;
	location?: string;
	userPicturePath: string;
	description: string;
	picturePath: string;
	likes: Map<string, boolean>;
	comments: string[];
}
