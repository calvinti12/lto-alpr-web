import React from 'react'
import ViewComponent from './abstract/ViewComponent'
import { browserHistory } from 'react-router'

import Auth from '../common/auth'

class App extends ViewComponent {

    constructor(props) {
        super(props)
    }

    goHome() {
        Auth.getUser() != null ? browserHistory.push("/incidents") : browserHistory.push("/");
    }

    login() {
        Auth.login(
            (result) => {
                browserHistory.push('/incidents');
            },
            (error) => console.log(error)
        );
    }

    logout() {
        Auth.logout(() => {browserHistory.push("/")});
    }

    render() {
        var logoutLink = <a className="navbar-text navbar-right login-link" onClick={this.logout.bind(this)}>Logout</a>;
        var loginLink = <a className="navbar-text navbar-right logout-link" onClick={this.login.bind(this)}>Login with Facebook</a>;

        return <div>
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" onClick={this.goHome.bind(this)}>License Plate Recognition System</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5">
                        {Auth.getUser() != null ? logoutLink : loginLink}
                    </div>
                </div>
            </nav>

            <div className="container">
                {this.props.children}
            </div>

            <div className="loading-box">
                <div className="loading-box-image">
                    <img src="/resources/images/spinner.gif" />
                </div>
            </div>
        </div>;
    }

}

export default App;
