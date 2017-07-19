import firebase from './firebase';
import auth from './auth';
import networkHistory from './networkHistory';

export default {
	...firebase,
	...auth,
	...networkHistory
}