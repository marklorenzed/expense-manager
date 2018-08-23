import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class Expenses extends Component {

	constructor(){
		super();
		this.state={
			sum: 0
		}
	}

	deleteExpense(id){
  		this.props.onDelete(id);
	}
	
	render() {


	let expenseItems;
	if(this.props.expenses){
		expenseItems = this.props.expenses.map(expense => {
			// console.log(project);
			return (
				<ExpenseItem onDelete={this.deleteExpense.bind(this)} key={expense.id} expense={expense} category={expense.category}/>
			
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
