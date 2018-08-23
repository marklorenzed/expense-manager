import React, { Component } from 'react';

import '.././App.css';


class Error extends Component {
	

	render() {
		
		return (
			<div className="container">
				<div className="backBtn">
					<a href="/"><span>◀</span></a>
				</div>
				<div className="jumbotron m-5">
					<h1>Error: Path does not exist</h1>
				</div>
			</div>

		);
  }
}

export default Error;


