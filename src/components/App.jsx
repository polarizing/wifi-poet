import React, {PropTypes} from 'react';
import { Provider } from 'react-redux';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Icon
} from 'framework7-react';

import store from '../store/store';

import MainViews from './MainViews'
import gathering from '../Gathering';

import firebase from '../firebase';

import {routes} from '../routes';

let currentRoute;
export const getCurrentRoute = () => currentRoute;

export class App extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// gathering.join(firebase.auth().currentUser.uid, 'Poet-' + Math.floor((Math.random() * 99999) + 1) );
		// gathering.onUpdated( function(count, users) {
		// 	console.log(gathering.roomName + ' have ' + count + ' members.');
		// 	console.log('Here is the updated users list -');
		// 	for (var i in users) {
		// 		console.log(users[i] + '(id: ' + i + ')');
		// 	}
		// })
		// console.log(  gathering );
	}

	render() {
		return (
			<Provider store={store}>
				<Framework7App themeType="ios" onRouteChange={route => currentRoute = route} routes={routes}>		
					<Statusbar />		
					<MainViews />
				</Framework7App>
			</Provider>
		);
	}
}