import React, { Component } from 'react';
import axios from 'axios';
import Expenses from './Expenses';
import CreateExpenseForm from './CreateExpenseForm';


import '.././App.css';



class Home extends Component {
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
			this.state.expenses.map( expense => {
				let sumExpenses = this.state.sumExpenses;
				sumExpenses+= expense.value
				this.setState({sumExpenses:sumExpenses})
			})
		})

		
	}

	getSum() {
		var sum = 0;
		this.state.expenses.map(expense => {
			var amount = parseInt(expense.value)
			sum += amount
		})
		this.setState({sumExpenses: sum})
	}

	getCategories() {
	  axios
	  .get('https://expense-manager.thinkingpandas.com:443/api/categories')
	  .then( response =>{
	    
	    this.setState({category: response.data})
	  })
	}
	
	componentDidMount(){
		this.getExpenses();
		this.getCategories();
		this.getSum();
	}

	handleDeleteProject(id) {
		let projects = this.state.projects;
		let index = projects.findIndex(x => x.id === id);
		projects.splice(index, 1);
		this.setState({projects:projects});
	}
	handleDeleteExpense(id) {
		let expenses = this.state.expenses;
		let index = expenses.findIndex(x => x.id === id);

		expenses.splice(index, 1);
		this.setState({expenses:expenses});
		
		this.getSum();

		
		axios.delete('https://expense-manager.thinkingpandas.com:443/api/expenses/'+id)
	}
	handleCreateExpense(title, value, date, category1){
		const expenses = this.state.expenses;
		// var category2 = this.state.category.find( (category) => {
		// 	return category2.id === category1.id
		// })
		var val = parseInt(value);
	
		var category_id = category1.id
		var category = {title: category1.title, id : category1.id}
		
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
			let id = response.data.data.id
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
	handleEditExpense(id, title, value, date, category1){


		let category_id = category1.id
		let category = {title: category1.title, id : category1.id}
		
		// console.log(id,title, value, date, category_id, category1);
		axios
		.put('https://expense-manager.thinkingpandas.com:443/api/expenses/'+id, {
			title: title,
			value: value,
			category_id: category_id,
			date: date,
			category: category
		}).then(response => { })

		let expenses = this.state.expenses;

		expenses = expenses.map(expense => {
			if(expense.id === id) {
				expense.title = title
				expense.value = value
				expense.category_id = category_id
				expense.date = date
				expense.category= category
			}

			this.setState({expenses: expenses})

		});

		this.getSum();
		alert('Successfully updated a expense!')
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
						
							<div className="btn btn-green btn-small">
								<small>SHOW REPORT</small>
							</div>
					
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


			<Expenses 
				onEdit={this.handleEditExpense.bind(this)} 
				onDelete={this.handleDeleteExpense.bind(this)} 
				expenses = {this.state.expenses} 
			/>

		</div>

      </div>
    );
  }
}

export default Home;


