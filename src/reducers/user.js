import C from '../constants';

const INITIAL_STATE = {
	activeUser: { data: {displayName: null, isAnonymous: null}, error: null, loading: false },
}

function user(state = INITIAL_STATE, action) {
	
	let error;

	switch(action.type) {

		case C.GET_USER_REQUESTED:
			return { ...state, activeUser: { ...state.activeUser, loading: true } }
		case C.GET_USER_REJECTED:
			error = action.payload || "Error in getting user."
			return { ...state, activeUser: { data: null, error: error, loading: false } }
		case C.GET_USER_FULFILLED:
			  return { ...state, activeUser: { data: action.payload, error: null, loading: false } }

		default:
			return state;
	}
}


module.exports = {
	user,
}