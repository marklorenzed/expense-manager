import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class Expenses extends Component {
  


  render() {


	let expenseItems;
	if(this.props.expenses){
		expenseItems = this.props.expenses.map(expense => {
			// console.log(project);
			return (
				<ExpenseItem key={expense.id} expense={expense} category={expense.category}/>

			);
		})
	}


    return (
		<div className="Expenses row">
			

			<div className="col-12 mt-2">
			<h5 className="text-uppercase">Expenses List</h5>
			{expenseItems}
				
			</div>

			
		</div>
    );


  }


}


export default Expenses;
