import firebase from '../firebase';
import C from '../constants';

import { updateNetwork } from './network';
import { deletePendingDeletion } from './pending';
/*
	Watch for any changes to Poem data.
*/

export function watchPoemChangedEvent(dispatch) {
	firebase.database().ref('/poem').on('value', (snap) => {
		dispatch( watchPoemChangedAction( snap.val() ) );
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
			  	//  firebase.database()
						// .ref('poem')
						// .once('value')
						// .then(function (snapshot) {
						// 	console.log('value');
						// 	console.log(snapshot.val())
						// 	var networks = snapshot.val();

						// 	var data = {
						// 		timestamp: firebase.database.ServerValue.TIMESTAMP,
						// 		networks: networks
						// 	}

						// 	firebase.database().ref('snapshot').push(data);
						// })

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
				// firebase.database()
				// 		.ref('poem')
				// 		.once('value')
				// 		.then(function (snapshot) {
				// 			console.log('value');
				// 			console.log(snapshot.val())
				// 			var networks = snapshot.val();
							
				// 			var counter = 0;
				// 			var data = [];
				// 			for (var network in networks) {
				// 				var d = networks[network]
				// 				data.push({
				// 					uid: network,
				// 					author: d.author,
				// 					name: d.name,
				// 					timestamp: d.timestamp
				// 				})
				// 			}

				// 			var finalData = {
				// 				timestamp: firebase.database.ServerValue.TIMESTAMP,
				// 				networks: data,
				// 				status: 100
				// 			}

				// 			firebase.database().ref('snapshot').push(finalData);
				// 		})
			})
			.catch( (error) => {
				dispatch( deletePoemRejectedAction() )
			})
	}
	// firebase.database()
	// 		.ref('poem')
	// 		.child(networkId)
	// 		.remove()
	// 		.then( () => {
	// 			dispatch( deletePoemFulfilledAction( data ) )
	// 		})
	
	// dispatch( updatePoemRequestedAction() );


	// return dispatch => {
	// 	dispatch( updatePoemRequestedAction() );
	// 	firebase.database()
	// 		   .ref('poem')
	// 		   .child(networkId)
	// 		   .update(data)
	// 		   .then( () => {
	// 		  	 dispatch( updatePoemFulfilledAction( data ) )
	// 		   })
	// 		   .catch( (error) => {
	// 		  	 dispatch( updatePoemRejectedAction() )
	// 		   })
	// }
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