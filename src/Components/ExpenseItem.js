import React, { Component } from 'react';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';

class ExpenseItem extends Component {

	constructor() {
	  super();
	  this.state = {
	  	expense: [],
	    categories: [],
	    optionState: '',
	    startDate: moment(),
	    newDate: moment(),
	    title: '',
	    value: 0,
	  }
	  this.handleDateChange = this.handleDateChange.bind(this);
	  this.handleChangeOption = this.handleChangeOption.bind(this);
	  this.handleTitleChange = this.handleTitleChange.bind(this);
	  this.handleValueChange = this.handleValueChange.bind(this);
	}
	handleDateChange(date) {
	    this.setState({startDate: date},function() {
	    	console.log(this.state.startDate._d)
	    });
	}
	handleChangeOption(event) {
		this.setState({optionState: event.target.value}, function() {
			console.log(this.state.optionState)
		});	
	}
	handleTitleChange(event){
		this.setState({title: event.target.value}, function() {
			console.log(this.state.title)
		})
	}
	handleValueChange(event){
		 this.setState({value: event.target.value}, function() {
			console.log(this.state.value)
		});
	}
	deleteExpense(id) {
		// console.log();
		this.props.onDelete(id);
	}
	

	getCategories() {
	  axios
	  .get('https://expense-manager.thinkingpandas.com:443/api/categories')
	  .then( response =>{
	    
	    this.setState({categories: response.data}, function() {
	      // console.log(this.state.categories)
	    })
	  })
	}

	componentWillMount(){	
	  this.getCategories();
	  this.setState({optionState: this.props.expense.category_id})
	  this.setState({value: this.props.expense.value})
	  this.setState({expense: this.props.expense})
	}


	render() {
	let categoryoptions;
	if(this.state.categories){
	  categoryoptions = this.state.categories.map(category => {
	    return (
	    	
	    	<option key={category.id} value={category.id}>{category.title}</option>
	    	
	      
	    );
	  })
	}

    return (
      <div className="Expense row expense-entry mb-2 mx-0">

      	<div className="col-9 p-0">
      		<div>
      			<small className="font-weight-bold">{this.state.expense.title} </small>
      		</div>
      		<div>
      			<small className="expense-category">{this.state.expense.category.title}</small>
      			<small> <Moment format="LL">{this.state.expense.createdAt}</Moment></small>
      		</div>
      	</div>
        <div className="col-3 text-right p-0">
			<h6>₱{this.state.expense.value}.00</h6>
			<div className="row mx-0 justify-content-end">

				<div className="circle-btn" data-toggle="modal" data-target={"#editModal"+this.state.expense.id}>
					<span className="icon">
					<i className="fas fa-pen"></i>
					</span>
				</div>

				<div className="circle-btn" data-toggle="modal" data-target={"#deleteModal"+this.state.expense.id}>
					<span className="material-icons"><i className="fas fa-trash"></i></span>
				</div>
			</div>
      	
        </div>




      	<div className="modal" id={"editModal"+this.state.expense.id} role="dialog">
      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
      	    	<div className="modal-content">
					<div className="modal-body">
						<div className="mb-4 mt-2">
							<h4>Expense Form</h4>
							
							<div className="form-group">
								<input type="text" ref="title" className="form-control form-control-sm" onChange={this.handleTitleChange} defaultValue={this.state.expense.title}/>
							</div>
							<div className="form-group">
								<select ref="category_id" className="form-control form-control-sm" onChange={this.handleChangeOption} value={this.state.optionState}>
									{categoryoptions}
								</select>

							</div>

							<div className="form-group">
								<DatePicker className="form-control"
								    selected={this.state.startDate}
								    onChange={this.handleDateChange}
								    showTimeSelect
								    timeFormat="HH:mm"
								    timeIntervals={15}
								    dateFormat="LLL"
								    timeCaption="time"
								/>
							</div>

							<div className="form-group">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text" id="inputGroupPrepend3">₱</span>
									</div>
									<input type="number" name="value" className="form-control" placeholder="0.00" onChange={this.handleValueChange} value={this.state.value} />
								</div>
								
			
							</div>


						</div>
						<div className="action-bar row mx-0 justify-content-end">
							<div className="col-auto">
								<div className="btn btn-success btn-green">
									<small>SAVE</small>
								</div>
							</div>
							<div className="col-auto px-0">
								<div className="btn btn-danger" data-dismiss="modal">
									<small>CANCEL</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="modal" id={"deleteModal"+this.state.expense.id} role="dialog">
      		<div className="modal-dialog modal-dialog-centered" role="document">
      	    	<div className="modal-content em-expense-modal">
					<div className="modal-body paper-modal">
						<h4>Delete Expense</h4>
						<div className="mb-4 mt-2">Are you sure you want to delete this expense?</div>

						<div className="action-bar row mx-0 justify-content-end">
							<div className="col-auto">

								<div className="btn btn-green" data-dismiss="modal" onClick={this.deleteExpense.bind(this, this.state.expense.id)}><small>CONFIRM</small>
								</div>
							</div>

							<div className="col-auto px-0"><div className="btn btn-danger" data-dismiss="modal">
								<small>CANCEL</small>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

      </div>
    );
  }
}

export default ExpenseItem;
