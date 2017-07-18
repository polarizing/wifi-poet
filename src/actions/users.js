import ActionTypes from '../constants/actionTypes';
import firebase from '../firebase';

/*
	Get user from database.
*/
export function getUser(userId) {
	return dispatch => {
		dispatch( getUserRequestedAction() );
		return firebase.database()
			   .ref('users/' + userId)
			   .once('value', snap => {
					dispatch( getUserFulfilledAction( snap.val() ) );
				})
				.catch( (error) => {
					console.log(error);
					dispatch( getUserRejectedAction() );
				})
	}
}

function getUserRequestedAction() {
	return {
		type: ActionTypes.GET_USER_REQUESTED
	}
}

function getUserRejectedAction() {
	return {
		type: ActionTypes.GET_USER_REJECTED
	}
}

function getUserFulfilledAction(data) {
	return {
		type: ActionTypes.GET_USER_FULFILLED,
		payload: data
	}
}