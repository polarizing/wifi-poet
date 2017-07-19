import {History} from './components/pages/History';
import {Form} from './components/pages/Form';

export const routes = [{
    path: '/networks/:networkId',
    component: History
}, {
    path: '/form/',
    component: Form
}];