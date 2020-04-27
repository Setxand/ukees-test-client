import React from "react";


const SignUpContext = React.createContext({
	signUpForm: {
		email: "",
		password: "",
		name: "",
		departmentId: ""
	},
	signUp: () => {}
});

export default SignUpContext;