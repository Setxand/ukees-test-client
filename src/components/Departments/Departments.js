import React, {useEffect, useState} from "react";
import "./Departments.css"


const Departments = props => {

	const[deps, setDeps] = useState([]);

	useEffect(() => {

	}, []);

	return (
		<div className={"departments"}>
			Logged in!
		</div>
	)
};

export default Departments;