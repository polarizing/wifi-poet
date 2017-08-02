import firebase from '../firebase';
import C from '../constants';
import { createPoem } from './poem';
import { updatePoem } from './poem';

/*
	REDUX CRUD -- CREATE, GET, UPDATE, DELETE
*/

/*
	Watch for any changes to Network data.
*/

export function watchNetworksChangedEvent(dispatch) {
	firebase.database().ref('/networks').on('value', (snap) => {
		dispatch( watchNetworksChangedAction( snap.val() ) );
	});
}

function watchNetworksChangedAction(networks) {
	return {
		type: C.NETWORKS_CHANGED,
		payload: networks
	}
}

/*
	Get network history from database.
*/
export function getNetworkHistoryItem(networkId) {
	return dispatch => {
		dispatch( getNetworkHistoryItemRequestedAction() );
		return firebase.database()
			   .ref('history')
			   .child(networkId)
			   .once('value', snap => {

					dispatch( getNetworkHistoryItemFulfilledAction( snap.val() ) );
				})
				.catch( (error) => {
					console.log(error);
					dispatch( getNetworkHistoryItemRejectedAction() );
				})
	}
}

function getNetworkHistoryItemRequestedAction() {
	return {
		type: C.GET_NETWORK_HISTORY_ITEM_REQUESTED
	}
}

function getNetworkHistoryItemRejectedAction() {
	return {
		type: C.GET_NETWORK_HISTORY_ITEM_REJECTED
	}
}

function getNetworkHistoryItemFulfilledAction(data) {
	return {
		type: C.GET_NETWORK_HISTORY_ITEM_FULFILLED,
		payload: data
	}
}

/*
	Add to Network history and updates poem model.
*/
export function createNetworkHistoryItem(networkId, data) {


	return dispatch => {
		dispatch( createNetworkHistoryItemRequestedAction() );
		const networkRef = firebase.database().ref('/history/' + networkId);

		// Atomic update
		var newNetworkHistoryKey = firebase.database().ref('/history/' + networkId).push().key;
		// Write the new post's data simultaneously in the network history list and the poem list.
		var updates = {};
		updates['/history/' + networkId + '/' + newNetworkHistoryKey] = data;
		updates['/poem/' + networkId + '/updated_at'] = data.created_at;
		return firebase.database().ref().update(updates);
	}
}

function createNetworkHistoryItemRequestedAction() {
	return {
		type: C.CREATE_NETWORK_HISTORY_ITEM_REQUESTED
	}
}

function createNetworkHistoryItemRejectedAction() {
	return {
		type: C.CREATE_NETWORK_HISTORY_ITEM_REJECTED
	}
}

function createNetworkHistoryItemFulfilledAction(network) {
	return {
		type: C.CREATE_NETWORK_HISTORY_ITEM_FULFILLED,
		payload: network
	}
}


/*
	Create network.
*/
export function createNetwork(data) {
	data.created_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch => {
		dispatch( createNetworkRequestedAction() );
		
		// Atomic update
		var newNetworkKey = firebase.database().ref('/networks/').push().key;
		var newNetworkHistoryKey = firebase.database().ref('/history/' + newNetworkKey).push().key;

		var updates = {};
		updates['/networks/' + newNetworkKey ] = data;
		updates['/history/' + newNetworkKey + '/' + newNetworkHistoryKey] = data;

		var poemData = Object.assign( {}, data, { 'network_key': newNetworkKey, 'updated_at': data.created_at} )
		updates['/poem/' + newNetworkKey] = poemData;

		return firebase.database().ref().update(updates);

	}
}

function createNetworkRequestedAction() {
	return {
		type: C.CREATE_NETWORK_REQUESTED
	}
}

function createNetworkFulfilledAction(network) {
	return {
		type: C.CREATE_NETWORK_FULFILLED,
		payload: network
	}
}

function createNetworkRejectedAction() {
	return {
		type: C.CREATE_NETWORK_REJECTED,
	}
}


/*
	Update network with properties.
*/
export function updateNetwork(networkId, data) {
	return dispatch => {
		dispatch( updateNetworkRequestedAction() );
		firebase.database()
			   .ref('networks')
			   .child(networkId)
			   .update(data)
			   .then( () => {
			  	 dispatch( updateNetworkFulfilledAction( data ) )
			   })
			   .catch( (error) => {
			  	 dispatch( updateNetworkRejectedAction() )
			   })
	}
}

function updateNetworkRequestedAction() {
	return {
		type: C.UPDATE_NETWORK_REQUESTED
	}
}

function updateNetworkFulfilledAction() {
	return {
		type: C.UPDATE_NETWORK_FULFILLED
	}
}

function updateNetworkRejectedAction(network) {
	return {
		type: C.UPDATE_NETWORK_REJECTED,
		payload: network
	}
}


/*
	Gets all Networks from database.
*/

export function getNetworks() {
	return dispatch => {
		dispatch( getNetworksRequestedAction() );
		return firebase.database().ref('/networks').once('value', snap => {
			const items = snap.val();
			console.log(items);
			dispatch( getNetworksFulfilledAction(items) );
		})
		.catch( (error) => {
			console.log(error);
			dispatch( getNetworksRejectedAction() );
		})
	}
}

function getNetworksRequestedAction() {
	return {
		type: C.GET_NETWORKS_REQUESTED
	};
}

function getNetworksRejectedAction() {
	return {
		type: C.GET_NETWORKS_REJECTED
	};
}

function getNetworksFulfilledAction(networks) {
	return {
		type: C.GET_NETWORKS_FULFILLED,
		payload: networks
	};
}
