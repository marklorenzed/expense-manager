import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';


class CreateExpenseForm extends Component {

  constructor() {
	  super();
	  this.state = {
	  	categories: [],
	    date: moment(),
	    title: '',
	    value: 0,
	    category: '',
	    startDate: moment()
	  }
	  this.handleAddDate = this.handleAddDate.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
  }

	addExpense(id){
  		this.props.addExpense(id);
	}
  
	getCategories() {
	  axios
	  .get('https://expense-manager.thinkingpandas.com:443/api/categories')
	  .then( response =>{
	    this.setState({categories: response.data}, function() {
	    })
	  })
	}

	componentWillMount(){	
	  this.getCategories();
	}

	handleAddDate(date) {
	    this.setState({startDate: date},function() {
	    	console.log(this.state.startDate._d)
	    });
	}
	onSubmit(event) {
		event.preventDefault();
		var category = this.state.categories.find( (category) => {
			return category.id === this.category_id.value
		})

		this.props.onAdd(this.title.value, this.value.value, this.state.startDate._d ,category)
		// console.log(this.title.value, this.value.value, this.state.startDate._d, this.category_id.value)
		this.title.value = ''
		this.value.value = ''
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
    	<div>
		<div className="btn btn-green btn-small" data-toggle="modal" data-target="#addModal"> 
			<small>CREATE EXPENSE</small>   	
		</div>

		<div className="modal" id="addModal" role="dialog">
      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
      	    	<div className="modal-content">
					<div className="modal-body">
						<form>
							<div className="pb-4 mt-2">
								<h4>Expense Form</h4>
									
									<div className="form-group">
										<input type="text" ref={title => this.title = title} className="form-control form-control-sm" placeholder="Title"/>
									</div>
									<div className="form-group">
										<select ref={category_id => this.category_id = category_id} className="form-control form-control-sm">
											{categoryoptions}
										</select>

									</div>

									<div className="form-group">
										<DatePicker className="form-control"
										    selected={this.state.startDate}
										    onChange={this.handleAddDate}
										    showTimeSelect
										    timeFormat="HH:mm"
										    timeIntervals={15}
										    dateFormat="MM/DD/YYYY h:mm"
										    timeCaption="time"
										    ref={date => this.date = date}
										/>
									</div>

									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text" id="inputGroupPrepend3">₱</span>
											</div>
											<input type="number" ref={value => this.value = value} name="value" className="form-control" placeholder="0.00"/>
										</div>
										
					
									</div>
								
							</div>
							<div className="action-bar row mx-0 justify-content-end">
								<div className="col-auto">
									<button type="button" className="btn btn-success btn-green" data-dismiss="modal" onClick = {this.onSubmit}>
										<small>SAVE</small>
									</button>
								</div>
								<div className="col-auto px-0" >
									<div className="btn btn-danger" data-dismiss="modal">
										<small>CANCEL</small>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


    );


  }


}


export default CreateExpenseForm;
