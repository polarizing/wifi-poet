import React, {PropTypes} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Icon
} from 'framework7-react';

import WifiSwitch from '../containers/wifiSwitchContainer';
import NetworkList from '../containers/networkListContainer';

const MainViews = (props, context) => {
	return (
		<Views>
			<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
				{/* Navbar */}
				{context.framework7AppContext.theme.ios ? (
					<Navbar>
						{/*<NavLeft>
							<Link icon="icon-bars" openPanel="left" />
						</NavLeft>*/}
						<NavCenter sliding>Wi-Fi Poet</NavCenter>
						{/*<NavRight>
							<Link icon="icon-bars" openPanel="right"></Link>
						</NavRight>*/}
					</Navbar>
				) : null}
				{/* Pages */}
				<Pages>
					<Page>
						{context.framework7AppContext.theme.material ? (
							<Navbar>
								<NavLeft>
									<Link icon="icon-bars" openPanel="left" />
								</NavLeft>
								<NavCenter sliding>Framework7</NavCenter>
								<NavRight>
									<Link icon="icon-bars" openPanel="right"></Link>
								</NavRight>
							</Navbar>
						) : null}

						{ /* <ContentBlockTitle>已连接 wifi-poet 路由器...</ContentBlockTitle> */ }
						{ /* <ContentBlock inset inner><marquee>🥛你已连接Wi-Fi诗人网络。通过Wi-Fi网络名字留个言吧，别人会看见哦～🥛</marquee></ContentBlock> */ }
						<WifiSwitch></WifiSwitch>
						<NetworkList></NetworkList>
					</Page>
				</Pages>
			</View>
		</Views>
	);
};

MainViews.contextTypes = {
	framework7AppContext: PropTypes.object
};

export default MainViews;