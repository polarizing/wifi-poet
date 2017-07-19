import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { networkReducer } from './networkReducer';
import { networkHistoryReducer } from './networkHistoryReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	network: networkReducer,
	networkHistory: networkHistoryReducer,
	user: userReducer,
})


export default rootReducer;