import './closeFriend.css';
import { useNavigate } from 'react-router';

export default function CloseFriend({ user }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <li
      className="sidebarFriend"
      onClick={() => navigate(`/profile/${user.username}`)}>
      <img
        className="sidebarFriendImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : '/assets/person/no_avatar.jpg'
        }
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
