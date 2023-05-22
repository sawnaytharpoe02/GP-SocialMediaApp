import Home from './pages/home/Home';
import { Routes, Route } from 'react-router';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={< Login/>} />
      </Routes>
    </div>
  );
};

export default App;
