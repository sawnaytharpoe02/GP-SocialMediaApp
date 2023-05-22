import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { Routes, Route } from 'react-router';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
