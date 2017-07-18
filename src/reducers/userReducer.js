import ActionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
	activeUser: { user: null, error: null, loading: false },
}

export function userReducer(state = INITIAL_STATE, action) {
	
	let error;

	switch(action.type) {

		case ActionTypes.GET_USER_REQUESTED:
			return { ...state, activeUser: { ...state.activeUser, loading: true } }
		case ActionTypes.GET_USER_REJECTED:
			error = action.payload || "Error in getting user."
			return { ...state, activeUser: { user: null, error: error, loading: false } }
		case ActionTypes.GET_USER_FULFILLED:
			  return { ...state, activeUser: { user: action.payload, error: null, loading: false } }

		default:
			return state;
	}
}