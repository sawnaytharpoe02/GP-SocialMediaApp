import './topbar.css';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Topbar() {
  const navigate = useNavigate();
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const { data } = useContext(AuthContext);

  const logoutHandler = () => {
    Swal.fire({
      title: 'Are you sure want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
      }
    });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Connectopia</span>
        </Link>
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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <button onClick={logoutHandler} className="cmnButton">
          Log Out
        </button>
        <Link to={`/profile/${data?.user?.username}`}>
          <img
            src={
              data?.user?.profilePicture
                ? PF + data.user?.profilePicture
                : PF + 'person/no_avatar.jpg'
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
