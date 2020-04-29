import React from "react";

const EditEmployee = React.createContext({
	employeeFormToEdit: {
		name: ""
	},
	setEmployeeForm: () => {},
	saveChanges: () => {}
});

export default EditEmployee;