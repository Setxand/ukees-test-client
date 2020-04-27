import React, {Component} from "react";
import Login from "../../components/Login/Login.js"
import Departments from "../../components/Departments/Departments.js"
import SignUp from "../../components/SignUp/SignUp.js"
import "./Home.css"
import {isNotEmpty, refresh, RequestMethod, ResponseStatus, sendRequest} from "../../Constants";
import SignUpContext from "../../context/SignUpContext"

class Home extends Component {

    constructor(props) {
        super(props);
        this.LOGIN_URL = "/login";
        this.REFRESH_URL = "/refresh-token";
        this.ACCESS_TOKEN_KEY = "accessToken";
        this.REFRESH_TOKEN_KEY = "refreshToken";
        this.USER_ID_KEY = "userId";
        this.AUTH_HEADER = {"Authorization": "Bearer " + localStorage.getItem(this.REFRESH_TOKEN_KEY)};

        this.state = {
            isAuthenticated: false,
            loginForm: {
                email: "",
                password: ""
            },
            sighUpClick: false,
            signUpForm: {
                email: "",
                password: "",
                name: "",
                departmentId: ""
            }

        }
    }

    componentDidMount() {
        if (localStorage.getItem(this.REFRESH_TOKEN_KEY)) {
            sendRequest(RequestMethod.GET, this.AUTH_HEADER, null, this.REFRESH_URL)
                .then(res => res.json())
                .then(res => {
                    if (!res.message) {
                        localStorage.clear();
                        localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
                        localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
                        localStorage.setItem(this.USER_ID_KEY, res.userId);
                        this.setState({isAuthenticated: true})
                    } else {
                        localStorage.clear();
                    }
                });
        }
    }

    signup = () => {
        this.setState({sighUpClick: true});
    };

    login = () => {
        sendRequest(RequestMethod.POST, null, this.state.loginForm, this.LOGIN_URL)
            .then((res) => {
                if (res.status !== ResponseStatus.ACCEPTED) {
                    throw new Error("Login failed");
                }
                return res;
            })

            .then(res => res.json())
            .then(res => {
                this.setState({isAuthenticated: true, authToken: res})
                localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
                localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
                localStorage.setItem(this.USER_ID_KEY, res.userId);
            });
    };

    handleLoginForm(event, form) {
        const updatedLoginForm = form;
        updatedLoginForm[event.target.name] = event.target.value;
        this.setState({loginForm: updatedLoginForm});
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({isAuthenticated: false});
    };

    render() {
        return (
            <div className={"Home"}>
                {
                    this.state.isAuthenticated ?
                        <div className={"Authenticated"}>
                            <Departments/>
                            <button onClick={this.handleLogout}>Log out</button>
                        </div> :


                        <Login login={this.login}
                               signup={this.signup}
                               sighUpClick={this.state.sighUpClick}
                               changeInpValues={(event) => this.handleLoginForm(event, this.state.loginForm)}
                               loginForm={this.state.loginForm}>

                            <SignUp signUpForm={this.state.signUpForm}
                                    signUp={this.signup}
                                    changeInpValues={(event) =>
                                        this.handleLoginForm(event, this.state.signUpForm)}/>


                        </Login>
                }
            </div>
        )
    }
};

export default Home;