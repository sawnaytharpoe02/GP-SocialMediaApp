import './share.css';
import { Cancel, PermMedia } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const { data: currentUserData } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUserData.user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post('http://localhost:3001/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUserData.token}`,
        },
      };
      await axios.post('http://localhost:3001/api/posts', newPost, config);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={handleSubmit}>
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUserData?.user.profilePicture
                ? PF + currentUserData.user.profilePicture
                : PF + 'person/no_avatar.jpg'
            }
            alt=""
          />
          <input
            placeholder={
              "What's in your mind " + currentUserData.user.username + '?'
            }
            className="shareInput"
            ref={desc}
            required
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareBtn" type="submit">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}
