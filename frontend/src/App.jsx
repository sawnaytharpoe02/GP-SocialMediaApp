import Home from './pages/home/Home';
import { Routes, Route } from 'react-router';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
