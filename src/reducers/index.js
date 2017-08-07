import history from './history';
import network from './network';
import pending from './pending';
import poem from './poem';
import user from './user';

export default {
  ...history,
  ...network,
  ...pending,
  ...poem,
  ...user,
};
