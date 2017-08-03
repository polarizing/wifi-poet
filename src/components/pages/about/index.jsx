import React, {Component} from 'react';
import {getCurrentRoute} from '../../App'

import {Page, Card, ContentBlock, ContentBlockTitle, Navbar, List, ListItem, FormLabel, FormInput, Button, GridRow, GridCol} from 'framework7-react';

export class About extends Component {
    constructor(props, context) {
        super(props, context);
    }
    // const route = getCurrentRoute();
    
    render() {
        return (
            <Page>
                <Navbar title="About" backLink="Back" sliding />
<ContentBlock inset> 
                Wifi-Poet is a new-media project founded in 2016.  <br /><br />

                Wifi-Poet is a router hotspot that enables anonymous collaborators
                within a certain physical proximity to write and share their thoughts
                in the form of poetry. When connected to the hotspot, anonymous writers can 
                create, delete, and edit lines of poetry in the form of always-changing wireless networks 
                while seeing their changes in real-time. <br /><br />

                Wifi-Poet explores the concept of physical and virtual locality by 
                using networks as a space for community-based art. It embraces the possibility
                that new forms of artistic production can emerge in time and space shared
                at different locations. <br /><br />

                For network-based art, it is characteristic that multiple actions (A, B, C)
                performed in different locations would yield a singular piece of art D. This is
                not the sum total of its parts. The birth of D is the symbiotic, synergetic,
                and translocal qualities and experience of shared poetry and 
                collective authorship. <br /><br />

                Wifi-Poet reimagines the possibility of creating shared poetry through a
                new collaborative environment, liberating the traditional sense of locality and physical bodies. 
                It hopes that people will find common ground through poetry and 
                interacting in both online and offline spheres.
</ContentBlock>

            </Page>
        )
    };
};