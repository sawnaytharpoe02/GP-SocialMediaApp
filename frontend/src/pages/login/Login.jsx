import './login.css';

const Login = () => {
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
					<div className="LoginBox">
						<input placeholder="Email" className="LoginInput" />
						<input placeholder="Password" className="LoginInput" />
						<button className="LoginButton">Log In</button>
						<span className="LoginForgot">Forgot Password?</span>
						<button className="LoginRegisterButton">
							Create a New Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;