import React, {Component} from 'react';
import {getCurrentRoute} from '../../App'

import CreateNetworkForm from '../../../containers/createNetworkFormContainer'
import {Page, ContentBlock, Navbar, List, ListItem, FormLabel, FormInput, Button, GridRow, GridCol} from 'framework7-react';

export class CreateNetwork extends Component {
    constructor(props, context) {
        super(props, context);
    }
    // const route = getCurrentRoute();
    
    render() {
        return (
            <Page>
                <Navbar title="创建新网络" backLink="Back" sliding />
                <CreateNetworkForm />
            </Page>
        )
    };
};