import React from 'react'
import ViewComponent from './abstract/ViewComponent'
import { Link, browserHistory } from 'react-router'

import Auth from '../common/auth'

class Home extends ViewComponent {

		constructor(props) {
		    super(props);
		    this.state = {};
		}

		login() {
				Auth.login(
						(result) => {
								browserHistory.push('/incidents');
						},
						(error) => console.log(error)
				);
		}

		handleChange(event) {
		    var nextState = {};
		    nextState[event.target.name] = event.target.value;
		    this.setState(nextState);
		}

		render() {
		    return <div className="home">
						<div className="centered">
								<img src="/resources/images/icon.png" />
								<p>Welcome to</p>
								<p>License Plate Recognition System.</p>
						</div>
		    </div>
		}
}

export default Home;
