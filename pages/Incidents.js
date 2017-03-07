import React from 'react'
import ViewComponent from './abstract/ViewComponent'
import { Link, browserHistory } from 'react-router'

import FirebaseHelper from '../common/firebaseHelper'


class Incidents extends ViewComponent {

		constructor(props) {
		    super(props);
		    this.state = {};
		}

		componentDidMount() {
				$(".loading-box").show();

				var self = this;
				var incidents = [];

				var incidentsReference = FirebaseHelper.getDatabase().ref("incidents");
				incidentsReference.on("value", function(snapshot) {
						snapshot.forEach(function(incidentOwner){
								incidentOwner.forEach(function(incidentHolder) {
										var incident = incidentHolder.val();
										incident.key = incidentHolder.key;
										incident.owner = decodeURIComponent(incidentOwner.key);
										incidents.push(incident);
								});
						});

						console.log(incidents);
						FirebaseHelper.setIncidents(incidents);
						self.setState({incidents: incidents});
						$(".loading-box").hide();
				});
		}

		handleChange(event) {
		    var nextState = {};
		    nextState[event.target.name] = event.target.value;
		    this.setState(nextState);
		}

		onRowClick(index) {
				browserHistory.push("/incidents/" + index);
		}

		render() {
				var incidents = [];

				console.log(this.state.incidents);

				if (this.state.incidents != null) {
						this.state.incidents.forEach((incident, index) => {
								incidents.push(<tr onClick={this.onRowClick.bind(this, index)} key={index}>
										<td>{incident.owner}</td>
										<td>{incident.type}</td>
										<td>{incident.plateNumber}</td>
										<td>{incident.location}</td>
										<td>{incident.details}</td>
										<td>{incident.reportedBy}</td>
										<td>{incident.reportedDate}</td>
										<td>{incident.response}</td>
								</tr>);
						});
				}

		    return <div>
						<h1>Incidents</h1>
						<h4>Click a row to edit</h4>
						<table className="table">
								<thead>
										<tr>
												<th>User</th>
												<th>Type</th>
												<th>Plate Number</th>
												<th>Location</th>
												<th>Details</th>
												<th>Reported By</th>
												<th>Reported Date</th>
												<th>Response</th>
										</tr>
								</thead>
								<tbody>
										{incidents}
								</tbody>
						</table>
		    </div>
		}
}

export default Incidents;
