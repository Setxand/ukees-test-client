import React, {Component} from "react";
import Login from "../../components/Login/Login.js"
import SignUp from "../../components/SignUp/SignUp.js"
import "./Home.css"
import {refresh, RequestMethod, sendRequest} from "../../Constants";
import {Redirect} from "react-router-dom";

class Home extends Component {

	constructor(props) {
		super(props);
		this.LOGIN_URL = "/login";
		this.SIGNUP_URL = "/signup";
		this.ACCESS_TOKEN_KEY = "accessToken";
		this.REFRESH_TOKEN_KEY = "refreshToken";
		this.USER_ID_KEY = "userId";

		this.state = {
			isAuthenticated: false,
			loginForm: {
				email: "",
				password: ""
			},
			openSignup: false,
			signUpForm: {
				email: "",
				password: "",
				name: "",
				departmentId: ""
			}

		}
	}

	componentDidMount() {
		this.setState({isAuthenticated: refresh()})
	}

	openSignup = () => {
		this.setState({openSignup: true});
	};

	login = () => {
		this.setLocalStorage(sendRequest(RequestMethod.POST, null, this.state.loginForm, this.LOGIN_URL));
	};

	signup = () => {
		this.setLocalStorage(sendRequest(RequestMethod.POST, null, this.state.signUpForm, this.SIGNUP_URL));
	};

	setLocalStorage(response) {
		response.then(res => res.json())
			.then(res => {
				if (!res.message) {
					this.setState({isAuthenticated: true})
					localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
					localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
					localStorage.setItem(this.USER_ID_KEY, res.userId);
					this.setState({isAuthenticated: true})
				}
			});
	}

	handleForm(event, form) {
		const updatedForm = form;
		updatedForm[event.target.name] = event.target.value;
		this.setState({loginForm: updatedForm});
	}

	render() {
		return (
			<div className={"Home"}>
				{
					this.state.isAuthenticated ?
						<Redirect to={"/employees"}/> :


						<Login login={this.login}
							   signupWindow={this.openSignup}
							   openSignup={this.state.openSignup}
							   changeInpValues={(event) => this.handleForm(event, this.state.loginForm)}
							   loginForm={this.state.loginForm}>

							<SignUp signUpForm={this.state.signUpForm}
									signup={this.signup}
									changeInpValues={(event) =>
										this.handleForm(event, this.state.signUpForm)}/>


						</Login>
				}
			</div>
		)
	}
};

export default Home;