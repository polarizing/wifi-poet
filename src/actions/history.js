import firebase from '../firebase';
import C from '../constants';

/*
	Watch for any changes to Network data.
*/

export function watchNetworkHistoriesChangedEvent(dispatch) {
	console.log('watching!');
	firebase.database().ref('history').on('value', (snap) => {
		dispatch( watchNetworkHistoriesChangedAction( snap.val() ) );
	});
}

function watchNetworkHistoriesChangedAction(data) {
	return {
		type: C.NETWORK_HISTORIES_CHANGED,
		payload: data
	}
}

/*
	Get network histories from database.
*/
export function getNetworkHistories() {
	return dispatch => {
		dispatch( getNetworkHistoriesRequestedAction() );
		return firebase.database()
			   .ref('history')
			   .once('value', snap => {
					dispatch( getNetworkHistoriesFulfilledAction( snap.val() ) );
				})
				.catch( (error) => {
					console.log(error);
					dispatch( getNetworkHistoriesRejectedAction() );
				})
	}
}

function getNetworkHistoriesRequestedAction() {
	return {
		type: C.GET_NETWORK_HISTORIES_REQUESTED
	}
}

function getNetworkHistoriesRejectedAction() {
	return {
		type: C.GET_NETWORK_HISTORIES_REJECTED
	}
}

function getNetworkHistoriesFulfilledAction(data) {
	return {
		type: C.GET_NETWORK_HISTORIES_FULFILLED,
		payload: data
	}
}
