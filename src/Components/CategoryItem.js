import React, { Component } from 'react';


class CategoryItem extends Component {


	constructor() {
	  super();
	  this.state ={
			display: '',
			title: '',
			description: ''
		}
	  this.handleTitleChange = this.handleTitleChange.bind(this);
	  this.cancelEdit = this.cancelEdit.bind(this);
	  this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	  this.onEditCategoryItem = this.onEditCategoryItem.bind(this);

	}


	componentWillMount(){	
		this.check();
		this.setState({title: this.props.category.title})
		this.setState({description: this.props.category.description})
	}
	check(){
		if(this.props.category.title === "Uncategorized"){
			this.setState({display: 'hidden'})
		}
	}
	handleTitleChange(event) {
		this.setState({title: event.target.value}, function() {
			// console.log(this.state.title)
		})
	}
	handleDescriptionChange(event) {
		this.setState({description: event.target.value}, function() {
			// console.log(this.state.description)
		})
	}

	onEditCategoryItem(event) {
		event.preventDefault();
		this.props.onEditCategory(this.props.category.id, this.state.title, this.state.description);
	}
	deleteCategory(id) {
		this.props.onDeleteCategory(id);
	}

	cancelEdit(){
		this.setState({title: this.props.category.title})
		this.setState({description: this.props.category.description})
	}

	render() {
		
		return(

			<div className="category-entry row mx-0 mb-2">
				<div className="col-md-9 col-8 px-1">
					<div>
						<span className="font-weight-bold">{this.props.category.title}</span>
					</div>
					<div>
						<small>{this.props.category.description}</small>
					</div>
				</div>
				
				<div className="col-md-3 col-4 d-flex justify-content-between flex-column px-1">
					<div className={this.state.display}>
						<div className="row mx-0 justify-content-end">
							<div className="circle-btn"  data-toggle="modal" data-target={"#editCategory"+this.props.category.id}>
								
									<span className="icon">
										<i className="fas fa-pen"></i>
									</span>
							
							</div>
							<div className="circle-btn" data-toggle="modal" data-target={"#deleteCategory"+this.props.category.id}>
								<span className="icon">
									<i className="fas fa-trash"></i>
								</span>
							</div>
						</div>
					</div>
				</div>
				


				{/*edit modal*/}

				      	<div className="modal" id={"editCategory"+this.props.category.id} role="dialog">
				      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
				      	    	<div className="modal-content">
									<div className="modal-body">
										<div className="row mx-0 mb-1">
											<h4>Category Form</h4>
										</div>

										<div className="pb-4 mt-2">
											<div className="form-group">
												<input type="text" ref={title => this.title = title} className="form-control form-control-sm" onChange={this.handleTitleChange} value={this.state.title}/>
											</div>

											<div className="form-group">
												<input type="text" ref={description => this.description = description} className="form-control form-control-sm" onChange={this.handleDescriptionChange} value={this.state.description}/>
											</div>
										</div>

										
										<div className="action-bar row mx-0 justify-content-end">
											<div className="col-auto">
												<button type="button" className="btn btn-success btn-green" data-dismiss="modal" onClick = {this.onEditCategoryItem}>
														<small>SAVE</small>
													</button>
											</div>
											<div className="col-auto px-0">
												<div className="btn btn-danger" data-dismiss="modal" onClick = {this.cancelEdit}>
													<small>CANCEL</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

				{/*delete modal*/}

						      	<div className="modal" id={"deleteCategory"+this.props.category.id} role="dialog">
						      		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
						      	    	<div className="modal-content">
											<div className="modal-body">
												<div className="row mx-0 mb-1">
													<h4>Delete Category</h4>
												</div>

												<div className="mb-4 mt-2">
													Are you sure you want to delete this category?
												</div>

												
												<div className="action-bar row mx-0 justify-content-end">
													<div className="col-auto">
														<button type="button" className="btn btn-success btn-green" data-dismiss="modal" onClick={this.deleteCategory.bind(this, this.props.category.id)}>
																<small>CONFIRM</small>
															</button>
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

		)

	}












}
export default CategoryItem;