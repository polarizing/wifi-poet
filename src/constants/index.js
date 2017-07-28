import firebase from './firebase';
import auth from './auth';
import user from './user';
import network from './network';
import history from './history';
import pending from './pending';
import poem from './poem';
// import version from './line';
// import line from './version';

export default {
	...firebase,
	...auth,
	...user,
	...network,
	...history,
	...pending,
	...poem,
	// ...version,
	// ...line
}