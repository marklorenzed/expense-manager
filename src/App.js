import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import Moment from 'react-moment';
import Projects from './Components/Projects';
import Expenses from './Components/Expenses';
import AddProject from './Components/AddProject';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
		}
	}

	getExpenses() {
		axios
		.get('https://expense-manager.thinkingpandas.com:443/api/expenses')
		.then( response =>{
			this.setState({expenses: response.data}, function() {
				console.log(this.state)
			})
		})
	}


	
	componentWillMount(){
		this.getExpenses();

	}

	handleDeleteProject(id) {
		let projects = this.state.projects;
		let index = projects.findIndex(x => x.id === id);
		projects.splice(index, 1);
		this.setState({projects:projects});
	}

	render() {
    return (
      <div className="App">

		<div className="container-fluid">
			<Expenses expenses = {this.state.expenses} />
		</div>

      </div>
    );
  }
}

export default App;


