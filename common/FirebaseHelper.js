import * as firebase from "firebase";

var FirebaseHelper = {};

const config = {
    
};

FirebaseHelper.init = function() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        FirebaseHelper.provider = new firebase.auth.FacebookAuthProvider();
    }
}

FirebaseHelper.getAuthentication = function() {
    FirebaseHelper.init();
    return firebase.auth();
}

FirebaseHelper.signInWithPopup = function() {
    FirebaseHelper.init();
    return firebase.auth().signInWithPopup(FirebaseHelper.provider);
}

FirebaseHelper.getDatabase = function() {
    FirebaseHelper.init();
    return firebase.database();
}

FirebaseHelper.getIncidents = function(incidents) {
    return JSON.parse(sessionStorage.incidents);
}

FirebaseHelper.setIncidents = function(incidents) {
    sessionStorage.incidents = JSON.stringify(incidents);
}

module.exports = FirebaseHelper;
