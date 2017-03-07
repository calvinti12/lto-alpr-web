import FirebaseHelper from './firebaseHelper'

var Auth = {};

Auth.login = function(responseCallback, errorCallback) {
    FirebaseHelper.signInWithPopup().then(function(result) {
        console.log("Login sucess");
        updateDetails();

        if (typeof responseCallback !== "undefined") {
            responseCallback(result);
        }
    }).catch(function(error) {
        console.error("Login error");
        updateDetails();

        if (typeof errorCallback !== "undefined") {
            errorCallback(error);
        }
    });
}

Auth.logout = function(responseCallback, errorCallback) {
    FirebaseHelper.getAuthentication().signOut().then(function() {
        console.log("Logout sucess");
        updateDetails();

        if (typeof responseCallback !== "undefined") {
            responseCallback();
        }
    }, function(error) {
        console.error("Logout error");
        updateDetails();

        if (typeof errorCallback !== "undefined") {
            errorCallback(error);
        }
    });
}

Auth.getUser = function() {
    return sessionStorage.user != null ? JSON.parse(sessionStorage.user) : null;
}

var updateDetails = function() {
    var currentUser = FirebaseHelper.getAuthentication().currentUser;

    if (currentUser) {
        var user = {
            name: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL
        }
        sessionStorage.user = JSON.stringify(user);
    } else {
        delete sessionStorage.user;
    }
}

module.exports = Auth;
