import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class Expenses extends Component {

	constructor(){
		super();
		this.state={
			sum: 0
		}
		this.editExpense = this.editExpense.bind(this);
	}

	deleteExpense(id){
  		this.props.onDelete(id);
	}
	editExpense(id, title, value, date, category){
		this.props.onEdit(id, title, value, date, category);
	}
	render() {


	let expenseItems;
	if(this.props.expenses){
		expenseItems = this.props.expenses.map(expense => {
			// console.log(project);
			return (
				<ExpenseItem onEditExpense={this.editExpense.bind(this)} onDelete={this.deleteExpense.bind(this)} key={expense.id} expense={expense} category={expense.category}/>
			
			);

		})

	}


    return (
		<div className="Expenses row">
			

			<div className="col-12 mt-2">
			<h5 className="text-uppercase">Expense List</h5>

				{expenseItems}

			</div>
			

			
		</div>
    );


  }


}


export default Expenses;
