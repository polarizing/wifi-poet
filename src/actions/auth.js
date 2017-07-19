import * as firebase from "firebase";
import C from "../constants";
import { auth } from "../firebase";

export const listenToAuth = () => (dispatch, getState) => {


  auth.onAuthStateChanged(authData => {

    if (authData) {
      alert('You are signed in!')
      console.log(authData);
      dispatch({
        type: C.AUTH_LOGIN,
        uid: authData.uid,
        isAnonymous: authData.isAnonymous,
        // username: authData.providerData[0].displayName
      });
    } else {
      alert('You are not signed in!')
      if (getState().auth.status !== C.AUTH_ANONYMOUS) {
        dispatch({ type: C.AUTH_LOGOUT });
      }

      firebase.auth().signInAnonymously()
          .then(function() {
            alert('Signed in anonymously');
          })
          .catch(function(error) {
            alert('Error', error);
      //   // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    }

  });

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