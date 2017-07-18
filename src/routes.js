import {History} from './components/pages/History';
import {Form} from './components/pages/Form';

// import {NetworkHistory} from './containers/networkHistoryContainer';
import NetworkHistory from './containers/networkHistoryContainer';

export const routes = [{
    path: '/networks/:networkId',
    component: History
}, {
    path: '/form/',
    component: Form
}];