import React, {useEffect, useState} from "react";
import "./Departments.css"
import {isNotEmpty, RequestMethod, sendRequest} from "../../Constants";
import Aux from "../../hoc/Auxiliary.js"


const Departments = props => {

	const DEPARTMENTS_GET_NAMES_URL = "/v1/departments-names";
	const DEPARTMENT_GET_URL = "/v1/departments";
	const EMPLOYEES_GET_URL = "/v1/employees";

	const [departmentsNames, setDepartmentsNames] = useState([]);
	const [department, setDepartment] = useState({employees: []});
	const AUTH_HEADER = {"Authorization": "Bearer " + localStorage.getItem("accessToken")};

	const [employees, setEmployees] = useState({content:[]});
	useEffect(() => {

		sendRequest(RequestMethod.GET, null, null, DEPARTMENTS_GET_NAMES_URL)
			.then(res => res.json()).then(res => setDepartmentsNames(res));

		sendRequest(RequestMethod.GET, AUTH_HEADER, null, EMPLOYEES_GET_URL + "?page=0&size=2")
			.then(res => res.json()).then(res => setEmployees(res));

	}, [])

	const chooseDepartment = (id) => {
		sendRequest(RequestMethod.GET, AUTH_HEADER, null, DEPARTMENT_GET_URL + "/" + id)
			.then(res => res.json()).then(res => setDepartment(res));
	}

	return (
		<Aux className={"departments"}>
			{

				isNotEmpty(employees.content) ?
					(
						<div className={"EmployeesMap"}>
							<h4>Choose department:</h4>

							{
								employees.content.map(e =>
									<div key={e.id}>{e.name}</div>
								)
							}
						</div>
					) : null
			}
			{/*<Employees employees={employees}/>*/}
		</Aux>
	)
};

export default Departments;