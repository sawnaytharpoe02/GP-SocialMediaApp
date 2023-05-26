export interface IPost {
  userId: String;
  desc: String;
  img: String;
  likes: string[];
  comments: Comment[];
}
export interface Comment {
  text: string;
  created: Date;
  postedBy?: string;
}
