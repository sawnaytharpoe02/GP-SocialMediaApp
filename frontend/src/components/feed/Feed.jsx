import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { data } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = username
        ? await axios.get(`http://localhost:3001/api/posts/profile/${username}`)
        : await axios.get(
            `http://localhost:3001/api/posts/timeline/${data.user._id}`
          );
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [username, data?.user?._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === data.user?.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
