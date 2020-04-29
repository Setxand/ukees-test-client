import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Home from "../Home/Home.js";
import './App.css';
import Departments from "../../components/Departments/Departments";
import Employees from "../../components/Employees/Employees.js"

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<Switch>
						<Route exact path="/">
							<Home/>
						</Route>
						<Route exact path="/employees">
							<Employees/>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
