// import firebase from '../firebase';
// import C from '../constants';

// /*
// 	Create a new line entry.
// 	data :: {
// 		number: NUMBER
// 		timestamp: STRING
// 	}
// */
// export function createLine(data) {
// 	data.timestamp = firebase.database.ServerValue.TIMESTAMP;

// 	return dispatch => {
// 		dispatch( createLineActionRequested() );
			   
// 		firebase.database()
// 			   .ref('line')
// 			   .push(data)
// 			   .then( (result) => {
// 			  	 dispatch( createLineActionFulfilled( data ) )
// 			   })
// 			   .catch( (error) => {
// 			  	 dispatch( createLineActionRejected() )
// 			   })
// 	}
// }

// function createLineActionRequested() {
// 	return {
// 		type: C.CREATE_LINE_REQUESTED
// 	}
// }

// function createLineActionFulfilled(line) {
// 	return {
// 		type: C.CREATE_LINE_FULFILLED,
// 		payload: line
// 	}
// }

// function createLineActionRejected() {
// 	return {
// 		type: C.CREATE_LINE_REJECTED
// 	}
// }