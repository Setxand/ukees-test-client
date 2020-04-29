import React from "react";

const search = props => {

	return (
		<div className={"Search"}>
			<input name={"search"}
				   placeholder={"search"}
				   onChange={(event) => props.handleSearchInputChange(event)}
				   value={props.searchInp}/>
			<button onClick={props.handleSearchClick}>search</button>
		</div>
	)
};

export default search;