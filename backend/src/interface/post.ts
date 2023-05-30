export interface IPost {
  userId: String;
  desc: String;
  img: String;
  likes: string[];
  comments: Comment[];
}
