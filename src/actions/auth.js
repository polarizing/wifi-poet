import * as firebase from "firebase";
import C from "../constants";
import { auth } from "../firebase";
import { getUser } from '../actions/user';

export const listenToAuth = () => (dispatch, getState) => {

  // Tests to see if /users/<userId> exists. 
  function checkForFirstTime(userId) {
    firebase.database().ref('/users').child(userId).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      userFirstTimeCallback(userId, exists);
    });
  }

  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  function createNewUser() {
    var userCountRef = firebase.database().ref('/userCount')
    var tempName;
    alert('Creating new user in database ...');
    userCountRef
         .transaction(function (current_value) {
           return (current_value || 0) + 1;
         })
         .then(function (userCountTxn) {
           tempName = 'Poet_' + ( userCountTxn.snapshot.val() ).pad(5);
           var usersRef = firebase.database().ref('users');
           return usersRef.push({
                 displayName: tempName,
                 isAnonymous: true
           })
         })
         .then(function (result) {
            // console.log(result.getKey());
            dispatch({
              type: C.AUTH_LOGIN,
              uid: result.getKey(),
              isAnonymous: true,
              // username: authData.providerData[0].displayName
            });
            dispatch(getUser(result.getKey()))
         })
  }

  // // Setup what to do with the user information.
  function userFirstTimeCallback(userId, exists) {
    if (exists) {
       // Get user stored in database.
       var usersRef = firebase.database().ref('users/' + userId);
       usersRef.once('value').then(function(snapshot) {
         var displayName = snapshot.val().displayName;
         // window.GATHERING.join(firebase.auth().currentUser.uid, displayName );
       })

       dispatch(getUser(userId));

       // window.GATHERING.onUpdated( function(count, users) {
       //   console.log(window.GATHERING.roomName + ' have ' + count + ' members.');
       //   console.log('Here is the updated users list -');
       //   for (var i in users) {
       //     console.log(users[i] + '(id: ' + i + ')');
       //   }
       // })
    } else {
     // Create new user in database.
       var userCountRef = firebase.database().ref('/userCount')
       var tempName;
       alert('Creating new user in database ...');
       userCountRef
         .transaction(function (current_value) {
           return (current_value || 0) + 1;
         })
         .then(function (userCountTxn) {
           tempName = 'Poet_' + ( userCountTxn.snapshot.val() ).pad(5);
           var usersRef = firebase.database().ref('users/' + userId);
           return usersRef.set({
              // provider: user.provider,
                 displayName: tempName,
                 isAnonymous: true
           })
         })
         // .then(function (snapshot) {
         //  console.log(snapshot);
         //  console.log(window.GATHERING);
         //   // window.GATHERING.join(firebase.auth().currentUser.uid, tempName );
         // })
         .catch(function (error) {
           console.log('User creation error?')
         })
      // alert('user ' + userId + ' does not exist!');
    }
  }

    // // find a suitable name based on the meta info given by each provider
  function getName(authData) {
      switch (authData.provider) {
          case 'password':
              return authData.password.email.replace(/@.*/, '');
          case 'twitter':
              return authData.twitter.displayName;
          case 'facebook':
              return authData.facebook.displayName;
      }
  }

  createNewUser();
  // userFirstTimeCallback();
  // auth.onAuthStateChanged(authData => {

  //   if (authData) {
  //     alert('You are signed in!')
  //     var isAnonymous = authData.isAnonymous;
  //     var uid = authData.uid;
  //     /* 
  //       Check if user is anonymous and is first time signing in.
  //     */
  //     if (isAnonymous) {
  //       checkForFirstTime(uid);
  //     }

  //     dispatch({
  //       type: C.AUTH_LOGIN,
  //       uid: uid,
  //       isAnonymous: isAnonymous,
  //       // username: authData.providerData[0].displayName
  //     });
  //   } else {

  //     alert('You are not signed in!')

  //     if (getState().auth.status !== C.AUTH_ANONYMOUS) {
  //       dispatch({ type: C.AUTH_LOGOUT });
  //     }

  //     firebase.auth().signInAnonymously()
  //         .then(function() {
  //           alert('Signed in anonymously');
  //         })
  //         .catch(function(error) {
  //           console.log(error);
  //           // alert('Error', error);
  //     //   // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // ...
  //     });

  //   }

  // });

};

export const openAuth = () => dispatch => {

  dispatch({ type: C.AUTH_OPEN });
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).catch(error => {
    dispatch({
      type: C.FEEDBACK_DISPLAY_ERROR,
      error: `Login failed! ${error}`
    });
    dispatch({ type: C.AUTH_LOGOUT });
  });

};

export const logoutUser = () => dispatch => {

  dispatch({ type: C.AUTH_LOGOUT });
  auth.signOut();

};