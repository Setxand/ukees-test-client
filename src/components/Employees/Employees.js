import React, {useEffect, useState} from "react";
import "./Employees.css"
import Employee from "./Employee/Employee.js"
import {isNotEmpty, RequestMethod, sendRequest} from "../../Constants";
import Aux from "../../hoc/Auxiliary";
import Search from "./Search/Search.js"
import EmployeesTable from "./EmployeesTable/EmployeesTable.js"
import EditEmployee from "../../context/EditEmployee";

const Employees = props => {
	const DEPARTMENTS_GET_NAMES_URL = "/v1/departments-names";
	const EMPLOYEES_URL = "/v1/employees";

	const [departmentsNames, setDepartmentsNames] = useState([]);
	const [employees, setEmployees] = useState({pageable: {pageNumber: 0}, content: []});
	const [searchInp, setSearchInp] = useState("");
	const [employeeFormToEdit, setEditEmployeeForm] = useState({name: ""});


	useEffect(() => {

		sendRequest(RequestMethod.GET, null, null, DEPARTMENTS_GET_NAMES_URL)
			.then(res => res.json()).then(res => setDepartmentsNames(res));
		employeesRequest(0, 2);
	}, [])

	useEffect(() => {
		if (searchInp.length > 5) {
			employeesRequest(0, 2, searchInp);
		}
	}, [searchInp])

	const employeesRequest = (pageNum, pageSize, search = "") => {
		const authHeader = {"Authorization": "Bearer " + localStorage.getItem("accessToken")};
		sendRequest(RequestMethod.GET, authHeader, null, EMPLOYEES_URL + "?page=" +
			pageNum + "&size=" + pageSize + "&search=" + search)
			.then(res => res.json())
			.then(res => setEmployees(res));
	}

	const handleNextButton = () => {
		if (!employees.last) {
			employeesRequest(employees.pageable.pageNumber + 1, 2, searchInp ? searchInp : "");
		}
	}

	const handlePreviousButton = () => {
		if (!employees.first) {
			employeesRequest(employees.pageable.pageNumber - 1, 2, searchInp ? searchInp : "");
		}
	}

	const handleSearchClick = () => {
		employeesRequest(0, 2, searchInp);
		setSearchInp("");
	}

	const handleEditButton = (index) => {
		setEditEmployeeForm(employees.content[index]);
	};

	const saveChanges = () => {
		const index = employees.content.findIndex(e => e.id === employeeFormToEdit.id)
		employees.content[index] = employeeFormToEdit;
		setEmployees(employees);
		setEditEmployeeForm({});
		const authHeader = {"Authorization": "Bearer " + localStorage.getItem("accessToken")};

		sendRequest(RequestMethod.PATCH, authHeader, employees.content[index], EMPLOYEES_URL);
		window.location.reload();
	}

	return (
		<Aux className={"Employees"}>

			<Search searchInp={searchInp}
					handleSearchClick={handleSearchClick}
					handleSearchInputChange={event => setSearchInp(event.target.value)}/>

			<EditEmployee.Provider value={{employeeFormToEdit: employeeFormToEdit,
				setEmployeeForm: (form) => setEditEmployeeForm(form), saveChanges: saveChanges}}>
				<EmployeesTable employees={employees}
							 departmentsNames={departmentsNames}
							 handlePreviousButton={handlePreviousButton}
							 handleNextButton={handleNextButton}
								handleEditButton={index => handleEditButton(index)}/>
			</EditEmployee.Provider>

		</Aux>
	)


};

export default Employees;