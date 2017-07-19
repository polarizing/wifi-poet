import React from 'react';
import { Provider } from 'react-redux';

import {Framework7App, Statusbar} from 'framework7-react';

import store from '../store/store';
import { listenToAuth } from '../actions/auth';

import MainViews from './MainViews'
import {routes} from '../routes';

let currentRoute;
let framework7;
export const getCurrentRoute = () => currentRoute;
export const getFramework7 = () => framework7;

export class App extends React.Component{
	// constructor(props) {
	// 	super(props);
	// }

	componentWillMount() {
		store.dispatch( listenToAuth() );
	}

	render() {
		return (
			<Provider store={store}>
				<Framework7App themeType="ios" onFramework7Init={f7 => framework7 = f7} onRouteChange={route => currentRoute = route} routes={routes}>		
					<Statusbar />		
					<MainViews />
				</Framework7App>
			</Provider>
		);
	}
}