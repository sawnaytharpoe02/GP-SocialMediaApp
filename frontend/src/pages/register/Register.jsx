import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {

	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const navigate = useNavigate();

	const handleClick = async(e) => {
		e.preventDefault();
		if(password.current.value !== passwordAgain.current.value){
			passwordAgain.current.setCustomValidity("Password don't match")
		}else{
			const user = {
				username : username.current.value,
				email : email.current.value,
				password : password.current.value,
			}
			try {
				await axios.post('http://localhost:3001/api/auth/register',user);
				navigate('/login');
			} catch (err) {
				console.log(err.message);
			}
		}
	};

	const loginHandler = () => {
		navigate('/login');
	}

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Scmsocial</h3>
					<span className="loginDesc">
						Connect with friends and the world around you on Scmsocial.
					</span>
				</div>
				<div className="loginRight">
					<form className="registerBox" onSubmit={handleClick}>
						<input type='text' placeholder="Username" className="loginInput" ref={username} required/>
						<input type='email' placeholder="Email" className="loginInput" ref={email} required/>
						<input type='password' placeholder="Password" className="loginInput" ref={password} minLength={6} required/>
						<input type='password' placeholder="Password Again" className="loginInput" ref={passwordAgain} minLength={6} required/>
						<button className="loginButton">Sign Up</button>
						<button type='button' onClick={loginHandler} className="loginRegisterButton">Log Into Account</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
