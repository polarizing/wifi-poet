import React, {PropTypes} from 'react';

import { Icon, NavLeft, Link, NavCenter, NavRight, Views, View, Navbar, Pages, Page} from 'framework7-react';

import Auth from './Auth';
import NetworkList from '../containers/networkListContainer';

const MainViews = (props, context) => {
	return (
		<Views>
			<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
				{/* Navbar */}
				{context.framework7AppContext.theme.ios ? (
					<Navbar>
						<NavLeft>

							<Link href={"/about/"}>
								<Icon f7="left" className="home-back"></Icon>
							</Link>
						</NavLeft>
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
									<Link f7="chevron-left" openPanel="left" />
								</NavLeft>
								<NavCenter sliding>Framework7</NavCenter>
								<NavRight>
									<Link icon="icon-bars" openPanel="right"></Link>
								</NavRight>
							</Navbar>
						) : null}

						{ /* <ContentBlockTitle>已连接 wifi-poet 路由器...</ContentBlockTitle> */ }
						{ /* <ContentBlock inset inner><marquee>🥛你已连接Wi-Fi诗人网络。通过Wi-Fi网络名字留个言吧，别人会看见哦～🥛</marquee></ContentBlock> */ }
						{ /* <Auth /> */ }
						<NetworkList />
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