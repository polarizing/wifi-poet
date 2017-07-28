import C from '../constants';

const initialState = {

}

function line(state = initialState, action) {
	let error;

	switch(action.type) {
		
		case C.CREATE_LINE_REQUESTED:
	   		return { ...state, newLine: { ...state.newLine, loading: true }}
		case C.CREATE_LINE_REJECTED:
			error = action.payload || "Error in creating new line item."
			return { ...state, newLine: { newLine: null, error: error, loading: false}}
		case C.CREATE_LINE_FULFILLED:
			return { ...state, newLine: { newLine: action.payload, error: null, loading: false}}
		
		default:
			return state;
	}
}


module.exports = {
	line,
}