import React, {useEffect, useState} from "react";
import {logout, refresh} from "../Constants";
import {Redirect} from "react-router-dom";


const Aux = props => {

	const [auth, setAuth] = useState({});

	useEffect(() => {
		setAuth(refresh());
	}, [])

	return auth ? (
		<div className={props.className}>
			{props.children}
			<div className={"logoutButton"}>
				<button onClick={logout}>Log out</button>
			</div>
		</div>
	) : <Redirect to={"/"}/>
}

export default Aux;