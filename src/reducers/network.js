import C from '../constants';

const initialState = {
	items: [],
	live: 0
}

function network(state = initialState, action) {
	let error;

	switch(action.type) {
		case C.NETWORKS_CHANGED: {
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

		case C.GET_NETWORKS_REQUESTED: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			})
		}
		case C.GET_NETWORKS_REJECTED: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error in getting networks.'
			})
		}
		case C.GET_NETWORKS_FULFILLED: {
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

		case C.CREATE_NETWORK_REQUESTED:
	   		return { ...state, newNetwork: { ...state.newNetwork, loading: true }}
		case C.CREATE_NETWORK_REJECTED:
			error = action.payload || "Error in creating network history item."
			return { ...state, newNetwork: { newNetwork: null, error: error, loading: false}}
		case C.CREATE_NETWORK_FULFILLED:
			return { ...state, newNetwork: { newNetwork: action.payload, error: null, loading: false}}


		case C.UPDATE_NETWORK_REQUESTED: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			})
		}
		case C.UPDATE_NETWORK_REJECTED: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error in editing network properties.'
			})
		}
		case C.UPDATE_NETWORK_FULFILLED: {
			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Edited network property.'
			});
			return newState;
		}

		case C.NETWORK_HISTORY_ADDED:
			return Object.assign({}, state);
		default:
			return state;
	}
}


module.exports = {
	network,
}