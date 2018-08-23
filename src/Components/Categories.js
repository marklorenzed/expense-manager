import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import '.././App.css';
import axios from 'axios';


class Categories extends Component {
	
	constructor(){
		super();
		this.state ={
			categories: [],
		}
		this.onSubmit = this.onSubmit.bind(this);
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
	}
	
	handleEditCategory(id, title, description){
	
		axios.put('https://expense-manager.thinkingpandas.com:443/api/categories/'+id, {
			title: title,
			description: description
		}).then( response => {  })

		let categories = this.state.categories;

		categories = categories.map(category => {
			if(category.id === id) {
				category.title = title
				category.description = description
			}

			this.setState({categories: categories})

		});
		alert('Successfully updated a category!');
		
	}
	handleDeleteCategory(id) {
		let categories = this.state.categories;
		let index = categories.findIndex(x => x.id === id);
		categories.splice(index, 1);
		this.setState({categories:categories});
		// console.log(this.state.categories)
		axios.delete('https://expense-manager.thinkingpandas.com:443/api/categories/'+id);
	}
	onSubmit(event){
		event.preventDefault();
		let categories = this.state.categories;
		let title = this.title.value
		let description = this.description.value

		axios.post('https://expense-manager.thinkingpandas.com:443/api/categories',{
			title: this.title.value,
			description: this.description.value
		}).then(response => {
			let id = response.data.data.id
			
			categories.unshift({
				id,
				title,
				description
			})

			this.setState({categories: categories});

		})
		alert('Successfully created a new category!');

	}	
	render() {
		let categories;
		if(this.state.categories){
		  categories = this.state.categories.map(category => {
		    return (
		    	
		    	<CategoryItem 
		    		onEditCategory={this.handleEditCategory.bind(this)} 
		    		onDeleteCategory={this.handleDeleteCategory.bind(this)} 
		    		key={category.id} 
		    		category = {category}

		    	/>
		    	
		      
		    );
		  })
		}
		
		return (
			<div className="container-fluid p-0 m-0">
				<div className="backBtn">
					<a href="/"><span>◀</span></a>
				</div>
				
				<div className="row mx-0 my-3">
					<div className="col-12">
						<div className="category-header">
							<h4>CATEGORIES</h4>
							<button className="btn" data-toggle="modal" data-target="#createCategory">
								<small>CREATE CATEGORY</small>
							</button>
						</div>
						
						{categories}

					</div>
				</div>
				

				<div className="modal" id="createCategory" role="dialog">
		      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
		      	    	<div className="modal-content">
							<div className="modal-body">
								<form>
									<div className="row mx-0 mb-1">
										<h4>Category Form</h4>
									</div>
									<div className="pb-4 mt-2">
										
										<div className="form-group">
											<input type="text" ref={title => this.title = title} className="form-control form-control-sm" placeholder="Title"/>
										</div>
										<div className="form-group">
											<input type="text" ref={description => this.description = description} className="form-control form-control-sm" placeholder="Description"/>
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

export default Categories;


