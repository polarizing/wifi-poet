import auth from './auth';
import history from './history';
import network from './network';
import pending from './pending';
import poem from './poem';
import user from './user';
// import version from './version';
// import line from './line';

export default {
  ...auth,
  ...history,
  ...network,
  ...pending,
  ...poem,
  ...user,
  // ...version,
  // ...line
};
