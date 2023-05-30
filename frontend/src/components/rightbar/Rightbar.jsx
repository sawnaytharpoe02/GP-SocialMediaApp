import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function Rightbar({ user, friend }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const { data: currentUserData, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUserData.user?.followings?.includes(user?._id)
  );

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:3001/api/users/${user._id}/unfollow`,
          {
            userId: currentUserData.user._id,
          }
        );
        dispatch({ type: 'UNFOLLOW', payload: user._id });
        window.location.reload();
      } else {
        await axios.put(`http://localhost:3001/api/users/${user._id}/follow`, {
          userId: currentUserData.user._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Linn Aung Htet</b> and <b>3 other friends</b> have a birhday
            today.
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUserData.user.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? 'single'
                : user.relationship === 1
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friend?.map((f) => (
            <Link
              to={`/profile/${f.username}`}
              key={uuidv4()}
              style={{ textDecoration: 'none', color: '#fff' }}>
              <div className="rightbarFollowing">
                <img
                  src={
                    f.profilePicture
                      ? PF + f.profilePicture
                      : PF + 'person/no_avatar.jpg'
                  }
                  alt="profile_picture"
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{f.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
