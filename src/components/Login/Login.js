import React from "react";
import "./Login.css"

const login = props => {
    const PASSWORD = "password";
    const EMAIL = "email";

    return props.sighUpClick ? props.children :
        (
            <div className={"login"}>
                <label>Enter email:
                    <input name={EMAIL}
                           placeholder={EMAIL}
                           value={props.loginForm.email}
                           onChange={props.changeInpValues}/>
                </label>

                <label>Enter password:
                    <input name={PASSWORD}
                           placeholder={PASSWORD}
                           value={props.loginForm.password}
                           onChange={props.changeInpValues}
                           type={PASSWORD}/>
                </label>

                <div className={"loginButtons"}>
                    <button onClick={props.login}>Sign in</button>
                    <button onClick={props.signup}>Sign up</button>
                </div>
            </div>
        )
};

export default login;