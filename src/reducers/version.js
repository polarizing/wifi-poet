import C from '../constants';

const initialState = {

}

function version(state = initialState, action) {
	let error;

	switch(action.type) {
		
		case C.CREATE_VERSION_REQUESTED:
	   		return { ...state, newVersion: { ...state.newLine, loading: true }}
		case C.CREATE_VERSION_REJECTED:
			error = action.payload || "Error in creating new version item."
			return { ...state, newVersion: { newLine: null, error: error, loading: false}}
		case C.CREATE_VERSION_FULFILLED:
			return { ...state, newVersion: { newLine: action.payload, error: null, loading: false}}
		
		default:
			return state;
	}
}


module.exports = {
	version,
}