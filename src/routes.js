import {History} from './components/pages/History';
import {CreateNetwork} from './components/pages/create'
import {Form} from './components/pages/Form';
import {About} from './components/pages/about';

export const routes = [
{
    path: '/networks/:networkId',
    component: History
}, {
    path: '/form/',
    component: Form
}, {
    path: '/about/',
    component: About
}, {
	path: '/create/',
	component: CreateNetwork
}

];