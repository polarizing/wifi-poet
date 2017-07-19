import ActionTypes from '../constants/actionTypes';

const initialState = {
	items: [],
	live: 0
}

export function networkReducer(state = initialState, action) {
	let error;

	switch(action.type) {
		case ActionTypes.NETWORKS_CHANGED: {
			const networks = action.payload;
	        const newNetworks = [];
	        var newLive = 0;

          	for (let network in networks) {
            	if (networks[network].locked) {
              		newLive += 1;
            	}
	            newNetworks.push({
	              id: network,
	              name: networks[network].name,
	              locked: networks[network].locked,
	            })
          	}

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got changed networks.',
				items: newNetworks,
				live: newLive
			});

			return newState;
		}

		case ActionTypes.GET_NETWORKS_REQUESTED: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			})
		}
		case ActionTypes.GET_NETWORKS_REJECTED: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error in getting networks.'
			})
		}
		case ActionTypes.GET_NETWORKS_FULFILLED: {
			const networks = action.payload;
	        const newNetworks = [];
	        var newLive = 0;

          	for (let network in networks) {
            	if (networks[network].locked) {
              		newLive += 1;
            	}
	            newNetworks.push({
	              id: network,
	              name: networks[network].name,
	              locked: networks[network].locked,
	            })
          	}

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got networks.',
				items: newNetworks,
				live: newLive
			});
			return newState;
		}

		case ActionTypes.CREATE_NETWORK_REQUESTED:
	   		return { ...state, newNetwork: { ...state.newNetwork, loading: true }}
		case ActionTypes.CREATE_NETWORK_REJECTED:
			error = action.payload || "Error in creating network history item."
			return { ...state, newNetwork: { newNetwork: null, error: error, loading: false}}
		case ActionTypes.CREATE_NETWORK_FULFILLED:
			return { ...state, newNetwork: { newNetwork: action.payload, error: null, loading: false}}


		case ActionTypes.UPDATE_NETWORK_REQUESTED: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			})
		}
		case ActionTypes.UPDATE_NETWORK_REJECTED: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error in editing network properties.'
			})
		}
		case ActionTypes.UPDATE_NETWORK_FULFILLED: {
			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Edited network property.'
			});
			return newState;
		}

		case ActionTypes.NETWORK_HISTORY_ADDED:
			return Object.assign({}, state);
		default:
			return state;
	}
}