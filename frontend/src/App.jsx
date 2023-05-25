import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { Routes, Route, Navigate } from 'react-router';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {

  const {data} = useContext(AuthContext);

  return (
    <>
      <Routes>   
        <Route path='/' element={data ? <Home/> : <Register/>}/>
        <Route path='/register' element={data ? <Navigate to="/"/> :<Register/>}/>
        <Route path='/login' element={data ? <Navigate to="/"/> : <Login/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
    </>
  );
};

export default App;
