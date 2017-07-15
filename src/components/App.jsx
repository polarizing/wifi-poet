import React, {PropTypes} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Icon
} from 'framework7-react';

import MainViews from './MainViews'
import gathering from '../Gathering';

import {routes} from '../routes';

let currentRoute;
export const getCurrentRoute = () => currentRoute;

export class App extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		gathering.join(null, 'Poet-' + Math.floor((Math.random() * 99999) + 1) );
		gathering.onUpdated( function(count, users) {
			console.log(gathering.roomName + ' have ' + count + ' members.');
			console.log('Here is the updated users list -');
			for (var i in users) {
				console.log(users[i] + '(id: ' + i + ')');
			}
		})
		// console.log(  gathering );
	}

	render() {
		return (
			<Framework7App themeType="ios" onRouteChange={route => currentRoute = route} routes={routes}>		
				<Statusbar />		
				<MainViews />
			</Framework7App>  
		);
	}
}

