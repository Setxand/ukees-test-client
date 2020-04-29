import React from "react";
import "../Employees.css"
import Employee from "../Employee/Employee.js";
import "./EmployeesTable.css"
import EditEmployee from "../../../context/EditEmployee";
const employeesTable = props => {

	const handleNavigationClick = (direction, handler, buttonName) => {
		return !direction ? <th onClick={handler}
								className={"employee-page-navigation"}>{buttonName}</th> :
			<th className={"employee-page-navigation-hidden"}>{buttonName}</th>
	}

	return (
		<div className={"EmployeesTable"}>
			<table>
				<tr>
					{handleNavigationClick(props.employees.first, props.handlePreviousButton, "previous")}
					<th></th>
					<th style={{width: "400px"}}>Id</th>
					<th className={"varCharColumn"}>Name</th>
					<th>Active</th>
					<th className={"varCharColumn"}>Department</th>
					{handleNavigationClick(props.employees.last, props.handleNextButton, "next")}
				</tr>

				{
					props.employees.content.map((e, index) => {
						return <Employee key={e.id}
										 employee={e}
										 handleEditButton={() => props.handleEditButton(index)}
										 depName={props.departmentsNames[props.departmentsNames
											 .findIndex(d => d.id === e.departmentId)].name}/>
					})
				}
			</table>
		</div>
	)
};

export default employeesTable;