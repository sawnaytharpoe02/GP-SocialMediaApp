import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [friends, setFriends] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/users?username=${username}`
      );
      setUser(res.data);
      await getFriends(res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getFriends = async (id) => {
    try {
      const friendsList = await axios.get(
        `http://localhost:3001/api/users/friends/${id}`
      );

      setFriends(friendsList.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + 'person/no_cover.jpg'
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/no_avatar.jpg'
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">
                {user.desc || 'Hi there, nice to meet you!'}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} friend={friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
