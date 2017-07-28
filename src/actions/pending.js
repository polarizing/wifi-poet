import firebase from '../firebase';
import C from '../constants';

/*
	Watch for any changes to Pending data.
*/

export function watchPendingChangedEvent(dispatch) {
	firebase.database().ref('/pending').on('value', (snap) => {
		dispatch( watchPendingChangedAction( snap.val() ) );
	});
}

function watchPendingChangedAction(pendings) {
	return {
		type: C.PENDING_CHANGED,
		payload: pendings
	}
}

/*
	Create pending deletion.
*/
export function createPendingDeletion(networkId, data) {
	data.timestamp = firebase.database.ServerValue.TIMESTAMP;

	return dispatch => {
		dispatch( createPendingDeletionActionRequested() );
		firebase.database()
			   .ref('pending')
			   .child(networkId)
			   .onDisconnect()
			   .remove()
			   
		firebase.database()
			   .ref('pending')
			   .child(networkId)
			   .set(data)
			   .then( (result) => {
			  	 dispatch( createPendingDeletionActionFulfilled( data ) )
			   })
			   .catch( (error) => {
			  	 dispatch( createPendingDeletionActionRejected() )
			   })
	}
}

function createPendingDeletionActionRequested() {
	return {
		type: C.CREATE_PENDING_DELETION_REQUESTED
	}
}

function createPendingDeletionActionFulfilled(pending) {
	return {
		type: C.CREATE_PENDING_DELETION_FULFILLED,
		payload: pending
	}
}

function createPendingDeletionActionRejected() {
	return {
		type: C.CREATE_PENDING_DELETION_REJECTED
	}
}

/*
	Delete pending deletion.
*/
export function deletePendingDeletion(networkId) {

	return dispatch => {
		dispatch( deletePendingDeletionActionRequested() );
		firebase.database()
			   .ref('pending')
			   .child(networkId)
			   .remove()
			   .then( (result) => {
			  	 dispatch( deletePendingDeletionActionFulfilled( networkId ) )
			   })
			   .catch( (error) => {
			  	 dispatch( deletePendingDeletionActionRejected() )
			   })
	}
}

function deletePendingDeletionActionRequested() {
	return {
		type: C.DELETE_PENDING_DELETION_REQUESTED
	}
}

function deletePendingDeletionActionFulfilled(pending) {
	return {
		type: C.DELETE_PENDING_DELETION_FULFILLED,
		payload: pending
	}
}

function deletePendingDeletionActionRejected() {
	return {
		type: C.DELETE_PENDING_DELETION_REJECTED
	}
}