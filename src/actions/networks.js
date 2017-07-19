import ActionTypes from '../constants/actionTypes';
import firebase from '../firebase';
import C from '../constants';

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
		type: ActionTypes.NETWORKS_CHANGED,
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
	Add to Network history.
*/
export function createNetworkHistoryItem(networkId, data) {
	return dispatch => {
		dispatch( createNetworkHistoryItemRequestedAction() );
		const networkRef = firebase.database().ref('/history/' + networkId);
		networkRef.push( data )
				  .then( () => {
				  	dispatch( createNetworkHistoryItemFulfilledAction( data ) )
				  })
				  .catch( (error) => {
				  	dispatch( createNetworkHistoryItemRejectedAction() )
				  })
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
	Edit network name.
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
		type: ActionTypes.UPDATE_NETWORK_REQUESTED
	}
}

function updateNetworkFulfilledAction() {
	return {
		type: ActionTypes.UPDATE_NETWORK_FULFILLED
	}
}

function updateNetworkRejectedAction(network) {
	return {
		type: ActionTypes.UPDATE_NETWORK_REJECTED,
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
		type: ActionTypes.GET_NETWORKS_REQUESTED
	};
}

function getNetworksRejectedAction() {
	return {
		type: ActionTypes.GET_NETWORKS_REJECTED
	};
}

function getNetworksFulfilledAction(networks) {
	return {
		type: ActionTypes.GET_NETWORKS_FULFILLED,
		payload: networks
	};
}
