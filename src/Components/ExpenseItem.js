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
	  this.setState({optionState: this.props.category.id})
	  this.setState({value: this.props.expense.value})
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
      			<small className="font-weight-bold">{this.props.expense.title} </small>
      		</div>
      		<div>
      			<small className="expense-category">{this.props.expense.category.title}</small>
      			<small> <Moment format="LL">{this.props.expense.createdAt}</Moment></small>
      		</div>
      	</div>
        <div className="col-3 text-right p-0">
			<h6>₱{this.props.expense.value}.00</h6>
			<div className="row mx-0 justify-content-end">

				<div className="circle-btn" data-toggle="modal" data-target={"#editModal"+this.props.expense.id}>
					<span className="icon">
					<i className="fas fa-pen"></i>
					</span>
				</div>

				<div className="circle-btn">
					<span className="material-icons"><i className="fas fa-trash"></i></span>
				</div>
			</div>
      	
        </div>




      	<div className="modal" id={"editModal"+this.props.expense.id} role="dialog">
      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
      	    	<div className="modal-content">
					<div className="modal-body">
						<div className="mb-4 mt-2">
							<h4>Expense Form</h4>
							
							<div className="form-group">
								<input type="text" ref="title" className="form-control form-control-sm" onChange={this.handleTitleChange} defaultValue={this.props.expense.title}/>
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
								<div className="btn btn-green">
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


      </div>
    );
  }
}

export default ExpenseItem;
