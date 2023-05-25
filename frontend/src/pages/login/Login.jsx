import './login.css';
import {CircularProgress} from '@mui/material';
import { useContext, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {loginCall} from '../../apiCall';

const Login = () => {

	const email = useRef();
	const password = useRef();
	const {data,isFetching,dispatch} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		loginCall({email : email.current.value,password : password.current.value},dispatch)
	};
	console.log(data);

	const registerHandler = () => {
		navigate('/register');
	}

	return (
		<div className="Login">
			<div className="LoginWrapper">
				<div className="LoginLeft">
					<h3 className="LoginLogo">Scmsocial</h3>
					<span className="LoginDesc">
						Connect with friends and the world around you on Scmsocial.
					</span>
				</div>
				<div className="LoginRight">
					<form className="LoginBox" onSubmit={handleClick}>
						<input type='email' placeholder="Email" className="LoginInput" ref={email} required/>
						<input type='password' placeholder="Password" className="LoginInput" minLength={6} ref={password} required/>
						<button className="LoginButton" disabled={isFetching}>
							{isFetching ? <CircularProgress color='inherit' size="30px"/> : 'Log In'}
						</button>
						<span className="LoginForgot">Forgot Password?</span>
						<button onClick={registerHandler} type='button' className="LoginRegisterButton">
							{isFetching ? <CircularProgress color='inherit' size="30px"/> : 'Create a New Account'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;