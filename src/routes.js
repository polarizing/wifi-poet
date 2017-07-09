import {About} from './components/pages/About';
import {Form} from './components/pages/Form';

export const routes = [{
    path: '/networks/:networkId',
    component: About
}, {
    path: '/form/',
    component: Form
}];