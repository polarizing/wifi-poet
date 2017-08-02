import firebase from '../firebase';
import C from '../constants';

import { updateNetwork } from './network';
import { deletePendingDeletion } from './pending';

/*
	Watch for any changes to Poem data.
*/

export function watchPoemChangedEvent(dispatch) {
	var poemRef = firebase.database().ref('poem/');
	poemRef.orderByKey().on('value', (data) => {
		var temp = [];

		data.forEach(function(child) {
			// console.log(child.key);
			// console.log(child.val())
			temp.push(child.val());
		})

		dispatch( watchPoemChangedAction( temp ) );
		// console.log(data.val());
	});
}

function watchPoemChangedAction(poem) {
	return {
		type: C.POEM_CHANGED,
		payload: poem
	}
}

/*
	Create poem.
*/
export function createPoem(networkId, data) {
	data.timestamp = firebase.database.ServerValue.TIMESTAMP;

	return dispatch => {
		dispatch( createPoemRequestedAction() );
		firebase.database()
			   .ref('poem')
			   .child(networkId)
			   .set(data)
			   .then( (result) => {
			  	 dispatch( createPoemFulfilledAction( data ) )
			   })
			   .catch( (error) => {
			  	 dispatch( createPoemRejectedAction() )
			   })
	}
}

function createPoemRequestedAction() {
	return {
		type: C.CREATE_POEM_REQUESTED
	}
}

function createPoemFulfilledAction(poem) {
	return {
		type: C.CREATE_POEM_FULFILLED,
		payload: poem
	}
}

function createPoemRejectedAction() {
	return {
		type: C.CREATE_POEM_REJECTED,
	}
}

/*
	Delete a poem line.
*/
export function deletePoem(networkId, data) {

	// If we start deleting it visually,
	// we will also set onDisconnect handlers for making sure
	// the 'deleted' property is also in the network model for that network
	// as well as removed from the pending table.

    // Deleted disconnect handlers.

	return dispatch => {
		dispatch( updateNetwork(networkId, data) );
    	dispatch( deletePendingDeletion(networkId) );
    	
    	firebase.database()
		.ref('networks')
		.child(networkId)
		.onDisconnect()
		.update(data)

		firebase.database()
			.ref('pending')
			.child(networkId)
			.onDisconnect()
			.remove()

		dispatch( updatePoemRequestedAction() );

    	firebase.database()
			.ref('poem')
			.child(networkId)
			.remove()
			.then( (result) => {
				dispatch( deletePoemFulfilledAction( data ) )
			})
			.catch( (error) => {
				dispatch( deletePoemRejectedAction() )
			})
	}
}

function deletePoemRequestedAction() {
	return {
		type: C.DELETE_POEM_REQUESTED
	}
}

function deletePoemFulfilledAction(poem) {
	return {
		type: C.DELETE_POEM_FULFILLED,
		payload: poem
	}
}

function deletePoemRejectedAction() {
	return {
		type: C.DELETE_POEM_REJECTED
	}
}

/*
	Update a poem line.
*/
export function updatePoem(networkId, data) {

	// If we set a lock, we also set an onDisconnect unlock handler.
	console.log(data.locked);
	if (data.locked) {
		firebase.database()
			.ref('poem')
			.child(networkId)
			.onDisconnect()
			.update({locked: null})
	}

	return dispatch => {
		dispatch( updatePoemRequestedAction() );
		firebase.database()
			   .ref('poem')
			   .child(networkId)
			   .update(data)
			   .then( () => {
			  	 dispatch( updatePoemFulfilledAction( data ) )
			   })
			   .catch( (error) => {
			  	 dispatch( updatePoemRejectedAction() )
			   })
	}
}

function updatePoemRequestedAction() {
	return {
		type: C.UPDATE_POEM_REQUESTED
	}
}

function updatePoemFulfilledAction() {
	return {
		type: C.UPDATE_POEM_FULFILLED
	}
}

function updatePoemRejectedAction(poem) {
	return {
		type: C.UPDATE_POEM_REJECTED,
		payload: poem
	}
}