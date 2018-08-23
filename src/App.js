import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import Moment from 'react-moment';
import Projects from './Components/Projects';
import Expenses from './Components/Expenses';
import AddProject from './Components/AddProject';
import CreateExpenseForm from './Components/CreateExpenseForm';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
			category: [],
			sumExpenses: 0.00
		}
	}

	getExpenses() {
		axios
		.get('https://expense-manager.thinkingpandas.com:443/api/expenses')
		.then( response =>{
			this.setState({expenses: response.data}, function() {
				// console.log(this.state)
			})
			var sum = this.state.expenses.map( expense => {
				this.state.sumExpenses += expense.value

			})
			console.log(this.state.sumExpenses)
		})

		
	}



	getCategories() {
	  axios
	  .get('https://expense-manager.thinkingpandas.com:443/api/categories')
	  .then( response =>{
	    
	    this.setState({category: response.data}, function() {
	      console.log(this.state.category)
	    })
	  })
	}
	
	componentDidMount(){
		this.getExpenses();
		this.getCategories();
	}

	handleDeleteProject(id) {
		let projects = this.state.projects;
		let index = projects.findIndex(x => x.id === id);
		projects.splice(index, 1);
		this.setState({projects:projects});
	}
	handleDeleteExpense(id) {
		let expenses = this.state.expenses;
		let sum = parseInt(this.state.sumExpenses)
		let index = expenses.findIndex(x => x.id === id);

		sum = sum - expenses[index].value;
		
		this.setState({sumExpenses: sum})

		expenses.splice(index, 1);
		this.setState({expenses:expenses});
		
		let deleted = expenses.find( (expense) => {
			return expense.id === id
		})
		
		

		
		axios.delete('https://expense-manager.thinkingpandas.com:443/api/expenses/'+id)
	}
	handleCreateExpense(title, value, date, category1){
		const expenses = this.state.expenses;
		// var category2 = this.state.category.find( (category) => {
		// 	return category2.id === category1.id
		// })
		var val = parseInt(value)
	
		var category_id = category1.id
		var category = {title: category1.title, id : category1.id}
		const id = uuid.v4()
		
		// console.log(this.state)
		// console.log(title, value, date, category1.id, category)


		axios
		.post('https://expense-manager.thinkingpandas.com:443/api/expenses', {
			title: title,
			value: value,
			category_id: category_id,
			date: date
		})
		.then(response => {
			console.log(response)
			expenses.unshift({
				id,
				title,
				value,
				date,
				category_id,
				category
			});
			this.setState({expenses});
	
		})

		var sum = this.state.sumExpenses
		sum += val;
		this.setState({sumExpenses: sum});

		alert('Successfully created a new expense!');
	}

	render() {
    return (
      <div className="App m-3">

		<div className="container-fluid m-0 p-0">

			<div className="em-dash-header">
				<div className="total-expense mt-2">
					<h2>₱{this.state.sumExpenses.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</h2>
					<small>TOTAL EXPENSE</small>
				</div>
				<div className="action-buttons row mx-0 my-2">
					<div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
						<a href="#">
							<div className="btn btn-green btn-small">
								<small>SHOW REPORT</small>
							</div>
						</a>
					</div>
					<div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
						<a href="/categories">
							<div className="btn btn-green btn-small">
								<small>CATEGORIES</small>
							</div>
						</a>
					</div>
					<div className="col-sm-4 col-12 d-flex justify-content-center em-expense">
						<CreateExpenseForm 
							onAdd={this.handleCreateExpense.bind(this)}
						/>
					</div>
				</div>
			</div>


			<Expenses onDelete={this.handleDeleteExpense.bind(this)} expenses = {this.state.expenses} />
		</div>

      </div>
    );
  }
}

export default App;


