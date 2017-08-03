import React, {Component} from 'react';
import {getCurrentRoute} from '../../App'

import {Page, ContentBlockTitle, Navbar, List, ListItem, FormLabel, FormInput, Button, GridRow, GridCol} from 'framework7-react';

export class About extends Component {
    constructor(props, context) {
        super(props, context);
    }
    // const route = getCurrentRoute();
    
    render() {
        return (
            <Page>
                <Navbar title="About" backLink="Back" sliding />
                <ContentBlockTitle>Wifi-Poet was founded in 2016. </ContentBlockTitle>
            </Page>
        )
    };
};