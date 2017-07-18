import React, {Component} from 'react';
import {Link, Icon, List, ListItem, FormInput, ContentBlockTitle, Preloader} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';
import NetworkItem from '../containers/networkItemContainer'

export default class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
      this.props.onGetNetworks()
      console.log(this.props);
    }

    getContentBlockTitleString() {

      if (this.props.live <= 0) {
        // return ( <div>Choose a network...</div> );
        return ( <div>选取网络...</div>);
      } else {
        return ( <div> { this.props.live.toString() } 位诗人正在写诗 ... <Preloader size="15"></Preloader> </div> )
        // return ( <div> { this.state.live.toString() } poet{ this.state.live > 1 ? "s are" : " is" } writing... <Preloader size="15"></Preloader> </div> )
      }

    }

    render() {
        return (
            <div>
              <ContentBlockTitle> 
                <div>{ this.getContentBlockTitleString() }</div>
              </ContentBlockTitle>
              <List className="wifi-network-list">
                  {
                    this.props.networks.map((item) => {
                      return (
                        <ListItem 
                              media="<img src='/blank256.png'>"
                              key={item.id}
                              innerSlot= { <NetworkItem networkData={ item } ></NetworkItem> }
                          >
                          </ListItem>
                      )
                    })
                  }
                  <ListItem 
                              media="<img src='/blank256.png'>"
                              title="创建新的Wi-Fi网络..."
                      >
                  </ListItem>
              </List>
            </div>
        );
    }
};
