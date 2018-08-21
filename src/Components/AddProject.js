import React, { Component } from 'react';
import uuid from 'uuid';


class AddProject extends Component {
	constructor(){
		super();
		this.state = {
			newProject: {}
		}
	}
	static defaultProps = {
		categories: ['Web Design', 'Web Development', 'Mobile Development']
	}

	handleSubmit(e) {
		if(this.refs.title.value === ''){
			alert('title is required');
		} else {
			this.setState({newProject:{
				id: uuid.v4(),
				title: this.refs.title.value,
				category: this.refs.category.value
			}}, function(){
				// console.log(this.state);
				//send back to App.js
				this.props.addProject(this.state.newProject);
			});
		}
		console.log(this.refs.title.value);
		e.preventDefault();
	}



	render() {
	//create options for select with category data from categories defaultProps
  	let categoryOptions = this.props.categories.map(category => {
  		return <option key={category} value={category}> {category} </option>
  	})
	
    return (
		<div>
			<h3>Add Project</h3>

			<form onSubmit={this.handleSubmit.bind(this)}>
				<div>
					<label>Title</label><br/>
					<input type="text" ref="title"/>
				</div>
				<div>
					<label>Category</label><br/>
					<select name="category" ref="category" id="">
						{categoryOptions}
					</select>
				</div>
				<br />
				<input type="submit" value="Submit"/>
			</form>
		</div>
    );
  }
}

export default AddProject;
