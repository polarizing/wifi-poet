import React, {Component} from 'react';
import {Link, Icon, List, ListItem, FormInput} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';

const onChangeHandler = (event) => {
    console.log('change');
};

const pStyle = {margin: '1em 0'};

export default class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            html: "<b>Hello <i>World</i></b>",
            items: []
        }          
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('networks');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
            })
          }
          console.log(newState);
          this.setState({
            items: newState
          })
        })
    }


    onChange(e, item) {
        console.log(e.target)
      const data = {
        title: e.target.value
      }
      let ref = firebase.database().ref('networks')
      return ref
             .child(item.id)
             .update(data)
    }

    onBlur(e, item) {
        let data = {
          title: e.target.innerHTML,
          timestamp: new Date()
        }
        let ref = firebase.database().ref('networks/' + item.id + '/history');
        return ref.push(data);
    }

    render() {
        return (
            <List className="wifi-network-list">
                {
                  this.state.items.map((item) => {
                    return (
                      <ListItem 
                            
                            media="<img src='/blank256.png'>"
                            key={item.id}
                            innerSlot={
                                <div className="wifi-network">
                                        <div className="wifi-name">
                                            <ContentEditable
                                                onBlur={(e) => this.onBlur(e, item)}
                                                key={item.id}
                                                className="content no-fastclick"
                                                html={item.title} // innerHTML of the editable div
                                                disabled={false}       // use true to disable edition
                                                onChange={(e) => this.onChange(e, item)} // handle innerHTML change
                                            />
                                        </div>
                                        <div className="wifi-network-info">
                                            <img className="wifi-icon" src="wifi.svg"></img>
                                            <Link href={"/networks/" + item.id} className="wifi-info-icon" iconF7="info" color="blue" />
                                        </div>
                                </div>
                            }
                        >
                        </ListItem>
                    )
                  })
                }
                <ListItem 
                            media="<img src='/blank256.png'>"
                            link="/form/" 
                            title="其他..."
                    >
                </ListItem>
            </List>
        );
    }
};
