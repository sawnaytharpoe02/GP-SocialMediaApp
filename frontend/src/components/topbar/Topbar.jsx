import './topbar.css';
import { Search } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

export default function Topbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Scmsocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Timeline</span>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        <button onClick={logoutHandler} className="cmnButton">Log Out</button>
      </div>
    </div>
  );
}
