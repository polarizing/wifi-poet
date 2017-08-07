import firebase from './firebase';
import auth from './auth';
import user from './user';
import network from './network';
import history from './history';
import pending from './pending';
import poem from './poem';

export default {
	...firebase,
	...auth,
	...user,
	...network,
	...history,
	...pending,
	...poem,
}