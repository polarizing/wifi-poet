import React, {Component} from 'react';
import {ContentBlockTitle, Link, Icon, List, ListItem, FormInput, FormLabel} from 'framework7-react';
import firebase from '../firebase.js';

const onChangeHandler = (event) => {
    console.log('change');
};

const pStyle = {margin: '1em 0'};

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
            
            <List className="wifi-network-switch" form>
              <ListItem
                className="wifi-toggle" 
                title="Wi-Fi" 
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
                title="july-9-2017 :: wifi-poet"
                innerSlot={
                    <span className="">
                        <img className="wifi-icon" src="wifi.svg"></img>
                        <Icon className="wifi-info-icon" f7="info" size="22px" color="blue"></Icon>
                    </span>
                }
              >
              </ListItem>
            </List>
        );
    }
};
