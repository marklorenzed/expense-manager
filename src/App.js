import React, { Component } from 'react';
import { BrowserRouter, Route , Switch } from "react-router-dom";
import Home from './Components/Home';
import Categories from './Components/Categories';
import Error from './Components/Error';

import './App.css';


class App extends Component {
	

	render() {

		return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Home} exact/>
				<Route path="/categories" component={Categories}/>
				<Route component={Error}/>
			</Switch>
		</BrowserRouter>

		);
  }
}

export default App;


