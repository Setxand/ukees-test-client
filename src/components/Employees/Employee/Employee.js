import React from "react";
import "./Employee.css"
import EditEmployee from "../../../context/EditEmployee.js";
import SimpleHoc from "../../../hoc/SimpleHoc.js"

const employee = props => {

	const simpleEmployeeForm = (
		<SimpleHoc>
			<th><p>{props.employee.id}</p></th>
			<th><p>{props.employee.name}</p></th>
			<th><p>{props.employee.isActive.toString()}</p></th>
			<th><p>{props.depName}</p></th>
		</SimpleHoc>
	)

	const handleEvent = (event, context) => {
		const form = Object.assign({}, context.employeeFormToEdit);
		form[event.target.name] = event.target.value;
		context.setEmployeeForm(form);
	}

	const employeeFormToEdit = (context) => (
		<SimpleHoc>
			<th><p>{props.employee.id}</p></th>
			<th><input name={"name"} value={context.employeeFormToEdit.name}
					   onChange={event => {handleEvent(event, context)}}/>
				<button onClick={context.saveChanges}>Save</button>
			</th>
			<th><p>{props.employee.isActive.toString()}</p></th>
			<th><p>{props.depName}</p></th>
		</SimpleHoc>
	)

	return (
		<tr>
			<th>
				<button>View</button>
			</th>
			<th>
				<button onClick={props.handleEditButton}>Edit</button>
			</th>
			<EditEmployee.Consumer>
				{context => context.employeeFormToEdit &&
				context.employeeFormToEdit.id !== props.employee.id ? simpleEmployeeForm : employeeFormToEdit(context)}
			</EditEmployee.Consumer>
			<th>
				<button>Delete</button>
			</th>
		</tr>
	)
}

export default employee;