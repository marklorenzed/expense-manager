import React, { Component } from 'react';

class ProjectItem extends Component {

	deleteProject(id) {
		// console.log();
		this.props.onDelete(id);
	}

	render() {

    return (
      <li className="Project">
        <strong>{this.props.project.title}</strong> - {this.props.project.category}
        <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>&times;</a>
      </li>
    );
  }
}

export default ProjectItem;
