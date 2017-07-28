// import firebase from '../firebase';
// import C from '../constants';
// import { createLine } from './line';
// /*
// 	Watch for any changes to Version data.
// */

// export function watchVersionsChangedEvent(dispatch) {
// 	firebase.database().ref('/version').on('value', (snap) => {
// 		dispatch( watchVersionsChangedAction( snap.val() ) );
// 	});
// }

// function watchVersionsChangedAction(versions) {
// 	return {
// 		type: C.VERSIONS_CHANGED,
// 		payload: versions
// 	}
// }

// /*
// 	Create a new version entry.
// 	data :: {
// 		name: STRING
// 		author: STRING
// 		timestamp: NUMBER
// 	}
// */
// export function createVersion( networkId, data) {

// 	return dispatch => {
// 		dispatch( createVersionActionRequested() );
// 		firebase.database()
// 			.ref('poem')
// 			.once('value')
// 			.then(function (snapshot) {
// 				var networks = snapshot.val();
// 				// console.log(networks);
// 				var counter = 0;
// 				var networkFound = null;

// 				for (var network in networks) {
// 					if (network === networkId) {
// 						break;
// 					}
// 					counter += 1;
// 				}

// 				return counter;
// 			})
// 			.then(function (counter) {
// 				return firebase.database()
// 							   .ref('version')
// 							   .push( { line: counter, name: data.name, author: data.author, timestamp: firebase.database.ServerValue.TIMESTAMP } )
// 			})
// 			// .then(function (counter) {
// 			// 	return firebase.database()
// 			// 	.ref('line')
// 			// 	.once('value')
// 			// 	.then(function (snapshot) {
// 			// 		var lines = snapshot.val();

// 			// 		var lineKey = undefined;

// 			// 		for (var line in lines) {
// 			// 			if (lines[line].number == counter) {
// 			// 				lineKey = line;
// 			// 				return lineKey
// 			// 			}
// 			// 		}

// 			// 		if (!lines || !lineKey) {
// 			// 			return firebase.database()
// 			// 				.ref('line')
// 			// 				.push({ number: counter, timestamp: firebase.database.ServerValue.TIMESTAMP })
// 			// 				.then((snap) => {
// 			// 					return snap.key
// 			// 				})
// 			// 		}
// 			// 	})
// 			// })
// 			// .then(function (key) {
// 			// 	console.log(key, data)
// 			// 	// dispatch(  )
// 			// 	return firebase.database()
// 			// 				   .ref('version')
// 			// 				   .child(key)
// 			// 				   .push( { name: data.name, author: data.author, timestamp: firebase.database.ServerValue.TIMESTAMP } )
// 			// })
// 		   .then( (result) => {
// 		   	// console.log(result.val())
// 		  	 dispatch( createVersionActionFulfilled( result ) )
// 		   })
// 		   .catch( (error) => {
// 		  	 dispatch( createVersionActionRejected() )
// 		   })
// 	}
// }

// function createVersionActionRequested() {
// 	return {
// 		type: C.CREATE_VERSION_REQUESTED
// 	}
// }

// function createVersionActionFulfilled(version) {
// 	return {
// 		type: C.CREATE_VERSION_FULFILLED,
// 		payload: version
// 	}
// }

// function createVersionActionRejected() {
// 	return {
// 		type: C.CREATE_VERSION_REJECTED
// 	}
// }