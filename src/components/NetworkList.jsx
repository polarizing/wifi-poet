import React, {Component} from 'react';
import {Link, Icon, List, ListItem, FormInput, ContentBlockTitle, Preloader} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';
import NetworkItem from './NetworkItem'

const onChangeHandler = (event) => {
    console.log('change');
};

const pStyle = {margin: '1em 0'};

export default class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            live: 0,
            items: []
        }

    }

    componentDidMount() {      

        const itemsRef = firebase.database().ref('networks');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          let newLive = 0;

          for (let item in items) {
            if (items[item].locked) {
              newLive += 1;
            }
            newState.push({
              id: item,
              title: items[item].title,
              locked: items[item].locked,
            })
          }

          this.setState({
            items: newState,
            live: newLive
          })
        })
    }

    getContentBlockTitleString() {

      if (this.state.live <= 0) {
        return ( <div>Choose a network...</div> );
      } else {
        // return ( <div> { this.state.live.toString() } 位诗人正在写诗 ... <Preloader size="15"></Preloader> </div> )
        return ( <div> { this.state.live.toString() } poet{ this.state.live > 1 ? "s are" : " is" } writing... <Preloader size="15"></Preloader> </div> )
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
                    this.state.items.map((item) => {
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
                              title="+ Create your own ..."
                      >
                  </ListItem>
              </List>
            </div>
        );
    }
};
