import React from 'react'
import ViewComponent from './abstract/ViewComponent'
import { Link, browserHistory } from 'react-router'

import FirebaseHelper from '../common/firebaseHelper'

class Incident extends ViewComponent {

		constructor(props) {
		    super(props);
		    this.state = {
            value: FirebaseHelper.getIncidents()[this.props.params.incidentId]
        };

        console.log(FirebaseHelper.getIncidents()[this.props.params.incidentId]);
		}

		updateIncident() {
        $(".loading-box").show();

        var incident = this.state.value;
        var owner = encodeURIComponent(incident.owner).replace(new RegExp("\\.", 'g'), "%2E");
        var referenceKey = "incidents/" + owner + "/" + incident.key;

        console.log(referenceKey);
        var value = $.extend(true, {}, this.state.value);
        value.response = this.state.response;

        FirebaseHelper.getDatabase().ref(referenceKey)
            .update(value, (error) => {
                $(".loading-box").hide();
                if (!error) {
                    browserHistory.push("/incidents");
                }
            });
    }

		onBack() {
				browserHistory.goBack();
		}

		handleChange(event) {
		    var nextState = {};
		    nextState[event.target.name] = event.target.value;
		    this.setState(nextState);
		}

		render() {
        var response = this.state.response || this.state.value.response;

				return <div>
						<h1>Incident Details</h1>

            <div className="row">
                <div className="form-group col-xs-6">
                    <label>User</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.owner}/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Type</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.type}/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Plate Number</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.plateNumber}/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Location</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.location}/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Reported By</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.reportedBy}/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Reported Date</label>
                    <input type="text" className="form-control" disabled defaultValue={this.state.value.reportedDate}/>
                </div>

                <div className="form-group col-xs-8">
                    <label>Details</label>
                    <textarea className="form-control" rows="3" disabled defaultValue={this.state.value.details}/>
                </div>

                <div className="form-group col-xs-8">
                    <label>Response</label>
                    <textarea name="response" className="form-control" rows="6"
                        value={response} onChange={this.handleChange.bind(this)}/>
                </div>

                <div className="col-xs-12">
                    <br/>
                    <button className="btn btn-primary" onClick={this.updateIncident.bind(this)}>Send Response</button>
										<button className="btn btn-default" onClick={this.onBack.bind(this)}>Back</button>
                </div>
            </div>
		    </div>
		}
}

export default Incident;
