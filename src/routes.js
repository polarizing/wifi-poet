import {History} from './components/pages/History';
import {CreateNetwork} from './components/pages/create'
import {Form} from './components/pages/Form';

export const routes = [
{
    path: '/networks/:networkId',
    component: History
}, {
    path: '/form/',
    component: Form
}, {
	path: '/create/',
	component: CreateNetwork
}

];