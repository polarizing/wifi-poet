import C from '../constants';

const initialState = {
	items: []
}

function pending(state = initialState, action) {
	let error;

	switch(action.type) {
		case C.PENDING_CHANGED: {
			const pendings = action.payload;

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got changed pending item.',
				items: pendings,
			});

			return newState;
		}

		case C.CREATE_PENDING_REQUESTED:
	   		return { ...state, newPending: { ...state.newPending, loading: true }}
		case C.CREATE_PENDING_REJECTED:
			error = action.payload || "Error in creating pending item."
			return { ...state, newPending: { newPending: null, error: error, loading: false}}
		case C.CREATE_PENDING_FULFILLED:
			return { ...state, newPending: { newPending: action.payload, error: null, loading: false}}
		
		case C.DELETE_PENDING_REQUESTED:
	   		return { ...state, deletedPending: { ...state.deletedPending, loading: true }}
		case C.DELETE_PENDING_REJECTED:
			error = action.payload || "Error in deletedPending pending item."
			return { ...state, deletedPending: { deletedPending: null, error: error, loading: false}}
		case C.DELETE_PENDING_FULFILLED:
			return { ...state, deletedPending: { deletedPending: action.payload, error: null, loading: false}}

		default:
			return state;
	}
}


module.exports = {
	pending,
}