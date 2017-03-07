import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Auth from '../../common/auth'

import App from '../App'
import Home from '../Home'
import Incident from '../Incident'
import Incidents from '../Incidents'

function requireAuth(nextState, replaceState) {
    if (Auth.getUser() == null) {
        replaceState("/");
    }
}

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/incidents" component={Incidents} onEnter={requireAuth}/>
        <Route path="/incidents/:incidentId" component={Incident} onEnter={requireAuth}/>
    </Route>
)
