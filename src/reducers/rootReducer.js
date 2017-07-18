import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { networkReducer } from './networkReducer';
import { networkHistoryReducer } from './networkHistoryReducer';

const rootReducer = combineReducers({
	network: networkReducer,
	networkHistory: networkHistoryReducer,
	user: userReducer,
})


export default rootReducer;