import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Home from "../Home/Home.js";
import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
					</ul>

					<hr/>
					<Switch>
						<Route exact path="/">
							<Home/>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
