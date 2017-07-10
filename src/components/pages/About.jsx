import React from 'react';
import {getCurrentRoute} from '../App'

import {Page, ContentBlock, ContentBlockTitle, Navbar, List, ListItem} from 'framework7-react';

import NetworkHistory from '../NetworkHistory'

export const About = (props) => {

    const route = getCurrentRoute();
    console.log(props);

    return (
        <Page>
            <Navbar title="历史" backLink="Back" sliding />
            {/*<ContentBlock inner inset>
                  <ul>
                    <li>Route: {route.route.path}</li>
                    <li>Url: {route.url}</li>
                    <li>Path: {route.path}</li>
                    <li>Network ID: {route.params.networkId}</li>
                    <li>Query: {JSON.stringify(route.query)}</li>
                    <li>Hash: {route.hash}</li>
                  </ul>
                  <p>Network ID: {props.networkId}</p>
                <p>Route: {route.route.path} </p>
                <p>You can go <f7-link back>back</f7-link>.</p>
                <p>Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac habitasse platea dictumst.</p>
                <p>Fusce eros lectus, accumsan eget mi vel, iaculis tincidunt felis. Nulla tincidunt pharetra sagittis. Fusce in felis eros. Nulla sit amet aliquam lorem, et gravida ipsum. Mauris consectetur nisl non sollicitudin tristique. Praesent vitae metus ac quam rhoncus mattis vel et nisi.       Aenean aliquet, felis quis dignissim iaculis, lectus quam tincidunt ligula, et venenatis turpis risus sed lorem. Morbi eu metus elit. Ut vel diam dolor.</p>
            </ContentBlock>*/}
            <ContentBlockTitle>留言历史...</ContentBlockTitle>
            <NetworkHistory networkId={props.networkId}></NetworkHistory>
        </Page>
    );
};
