import C from '../constants';

const initialState = {
	items: [],
	live: 0
}

function poem(state = initialState, action) {
	let error;

	switch(action.type) {
		case C.POEM_CHANGED: {
			const networks = action.payload;
	        var newLive = 0;

	        for (var i = 0; i < networks.length; i++) {
	        	if (networks[i].locked) {
	        		newLive += 1;
	        	}
	        }

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got changed poem.',
				items: networks,
				live: newLive
			});

			return newState;
		}

		case C.CREATE_POEM_REQUESTED:
	   		return { ...state, newPoem: { ...state.newPoem, loading: true }}
		case C.CREATE_POEM_REJECTED:
			error = action.payload || "Error in creating poem item."
			return { ...state, newPoem: { newPoem: null, error: error, loading: false}}
		case C.CREATE_POEM_FULFILLED:
			return { ...state, newPoem: { newPoem: action.payload, error: null, loading: false}}
		
		case C.UPDATE_POEM_REQUESTED:
	   		return { ...state, updatePoem: { ...state.updatePoem, loading: true }}
		case C.UPDATE_POEM_REJECTED:
			error = action.payload || "Error in updating poem item."
			return { ...state, updatePoem: { updatePoem: null, error: error, loading: false}}
		case C.UPDATE_POEM_FULFILLED:
			return { ...state, updatePoem: { updatePoem: action.payload, error: null, loading: false}}

		case C.DELETE_POEM_REQUESTED:
	   		return { ...state, deletedPoem: { ...state.deletedPoem, loading: true }}
		case C.DELETE_POEM_REJECTED:
			error = action.payload || "Error in deleting poem item."
			return { ...state, deletedPoem: { deletedPoem: null, error: error, loading: false}}
		case C.DELETE_POEM_FULFILLED:
			return { ...state, deletedPoem: { deletedPoem: action.payload, error: null, loading: false}}

		default:
			return state;
	}
}


module.exports = {
	poem,
}