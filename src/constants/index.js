import firebase from './firebase';
import auth from './auth';
import user from './user';
import networkHistory from './networkHistory';

export default {
	...firebase,
	...auth,
	...user,
	...networkHistory
}