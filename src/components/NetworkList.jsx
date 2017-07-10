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
        let networkData = 

        [
          {
            title: '害怕别人看穿我给你的心',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '我就给今天我们所有共同好友的朋友圈',
            time: firebase.database.ServerValue.TIMESTAMP
          },
           {
            title: '都点了一个赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '一分钟前我们的共同好友发了一条朋友圈',
            time: firebase.database.ServerValue.TIMESTAMP
          },
           {
            title: '你第一个点赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '我马上也点了一个赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '然后截图',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '这样我的头像就在你的头像旁边了',
            time: firebase.database.ServerValue.TIMESTAMP
          },
           {
            title: '尽管我们不说话',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '你不给我点赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
           {
            title: '我也不给你点赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '但我们还是会产生一些意外的联系',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '比如',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '一分钟之内',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '有人给你点了一个赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '也给我点了一个赞',
            time: firebase.database.ServerValue.TIMESTAMP
          },

          {
            title: '发朋友圈的过程在触摸了"发送"之后',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '还要持续一点时间',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '长短不一定',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '对我来说',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '你点了赞就结束了',
            time: firebase.database.ServerValue.TIMESTAMP
          },
            {
            title: '你赞我一下',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '我赞你一下',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '你赞一下我赞过的人',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '我赞一下你赞过的人',
            time: firebase.database.ServerValue.TIMESTAMP
          },
          {
            title: '似有非有的的情感虚弱得像两百块包年的wifi',
            time: firebase.database.ServerValue.TIMESTAMP
          },

        ]

        for (var i = 0; i < networkData.length; i++) {
            let ref = firebase.database().ref('networks');
            ref.push(networkData[i]);
        }

        let data = {
          title: e.target.innerHTML,
          time: firebase.database.ServerValue.TIMESTAMP
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
                                            <Link href={"/networks/" + item.id} networkName={item.title} className="wifi-info-icon" iconF7="info" color="blue" />
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
