import React, {Component} from 'react';
import {ContentBlockTitle, Link, Icon, List, ListItem, FormInput, FormLabel} from 'framework7-react';
import firebase from '../firebase.js';
import moment from 'moment';
import gathering from '../Gathering';

const onChangeHandler = (event) => {
    console.log('change');
};

export default class WifiSwitch extends Component {
    constructor(props, context) {
        super(props, context);
        this.checked = true;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

    }

    onChange(e) {
      console.log('Switch!');
    }



    render() {
        return (
            <div>
             <ContentBlockTitle> 
                Hello, Poet_28484!
              </ContentBlockTitle>
            <List className="wifi-network-switch" form>
              <ListItem
                className="wifi-toggle" 
                title="Wi-Fi Poet" 
                innerSlot={
                    <div>
                        <FormInput type="switch" onChange={this.onChange}></FormInput>
                    </div>
                }
              >
              </ListItem>
               <ListItem
                className="wifi-connected-network"
                media= '<i class="f7-icons color-blue wifi-connected-icon">check</i>'
                title= { moment().format('MMM Do YYYY') }
                innerSlot={
                    <span className="">
                        <img className="wifi-icon" src="wifi.svg"></img>
                        <Icon className="wifi-info-icon" f7="info" size="22px" color="blue"></Icon>
                    </span>
                }
              >
              </ListItem>
            </List>
            </div>
        );
    }
};
