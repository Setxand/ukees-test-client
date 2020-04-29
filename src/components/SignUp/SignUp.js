import React, {useEffect, useState} from "react";
import "./SignUp.css"
import {RequestMethod, sendRequest} from "../../Constants";

const SignUp = props => {
	const PASSWORD = "password";
	const EMAIL = "email";
	const NAME = "name";

	const DEPARTMENTS_GET_URL = "/v1/departments-names";

	const[departmentsNames, setDepartmentsNames] = useState([]);

	useEffect(() => {
		sendRequest(RequestMethod.GET, null, null, DEPARTMENTS_GET_URL)
			.then(res => res.json()).then(res => setDepartmentsNames(res));
	}, [])


	return (
		<div className={"SignUp"}>
			<label>Enter email:</label>
			<input name={EMAIL}
				   placeholder={EMAIL}
				   value={props.signUpForm.email}
				   onChange={props.changeInpValues}/>

			<label>Enter password:</label>
			<input name={PASSWORD}
				   placeholder={PASSWORD}
				   value={props.signUpForm.password}
				   onChange={props.changeInpValues}
				   type={PASSWORD}/>

			<label>Enter name:</label>
			<input name={NAME}
				   placeholder={NAME}
				   value={props.signUpForm.name}
				   onChange={props.changeInpValues}/>


			<label>Select department:</label>
			<select onChange={props.changeInpValues} name="departmentId">
				{departmentsNames.map(d => {
					return <option value={d.id}>{d.name}</option>;
				})}
			</select>


			<div>
				<button onClick={props.signup}>Sign up</button>
			</div>
		</div>
	)
};

export default SignUp;