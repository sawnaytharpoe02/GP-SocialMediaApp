import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';

export default function Topbar() {
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
        <button class="cmnButton">Log Out</button>
      </div>
    </div>
  );
}
