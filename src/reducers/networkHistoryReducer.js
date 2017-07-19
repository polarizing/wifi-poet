import C from '../constants';

const INITIAL_STATE = {
	networkHistoryItemList: { history: [], error: null, loading: false },
	newNetworkHistoryItem: { history: null, error: null, loading: false }
}

export function networkHistoryReducer(state = INITIAL_STATE, action) {
	
	let error;

	switch(action.type) {

		case C.GET_NETWORK_HISTORY_ITEM_REQUESTED:
			return { ...state, networkHistoryItemList: { history: [], error: null, loading: true } }
		case C.GET_NETWORK_HISTORY_ITEM_REJECTED:
			error = action.payload || "Error in getting network history item."
			return { ...state, networkHistoryItemList: { history: [], error: error, loading: false } }
		case C.GET_NETWORK_HISTORY_ITEM_FULFILLED: {
	          const history = action.payload;
	          const newHistory = [];
	          for (let item in history) {
	            newHistory.push({
	              id: item,
	              name: history[item].name,
	              timestamp: history[item].timestamp,
	              author: history[item].author
	            })
	          }
	          newHistory.reverse();
			  return { ...state, networkHistoryItemList: { history: newHistory, error: null, loading: false } }
	        }

	   	case C.CREATE_NETWORK_HISTORY_ITEM_REQUESTED:
	   		return { ...state, newNetworkHistoryItem: { ...state.newNetworkHistoryItem, loading: true }}
		case C.CREATE_NETWORK_HISTORY_ITEM_REJECTED:
			error = action.payload || "Error in creating network history item."
			return { ...state, newNetworkHistoryItem: { history: null, error: error, loading: false}}
		case C.CREATE_NETWORK_HISTORY_ITEM_FULFILLED:
			return { ...state, newNetworkHistoryItem: { history: action.payload, error: null, loading: false}}

		default:
			return state;
	}
}