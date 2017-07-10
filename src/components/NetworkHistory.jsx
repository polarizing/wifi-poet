import React, {Component} from 'react';
import {Card, Link, Icon, List, ListItem, FormInput, Timeline, TimelineItem} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';
import moment from 'moment'

const onChangeHandler = (event) => {
    console.log('change');
};

const pStyle = {margin: '1em 0'};

export default class NetworkHistory extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: []
        }          
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('networks/' + this.props.networkId + '/history');

        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
              time: items[item].time
            })
          }
          newState.reverse();
          this.setState({
            items: newState
          })
        })

    }

    getTime(unix_timestamp) {
      var dateTime = new Date(unix_timestamp);
      // dateTime.toISOString(); // Returns "2013-05-31T11:54:44.000Z"
      var converted_date = moment(dateTime).format("h:mm:ss");
      // Will display time in 10:30:23 format
      // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return converted_date
    }

    getDay(unix_timestamp) {

    }

    getMonth(unix_timestamp) {
      var dateTime = new Date(unix_timestamp);
      return moment(dateTime).format("MMM");
    }

    render() {
        return (

             <Timeline sides>
               {
                  this.state.items.map((item, idx) => {
                    var dateTime = new Date(item.time);
                    var date = moment(dateTime);
                    return (
                      <TimelineItem side={ (idx % 2 == 0) ? "right" : "left"}
                            key={item.id}
                            inner
                            time={ date.format("h:mm:ss") + " : 匿名" }
                            title=""
                            subtitle=""
                            text={item.title}
                            day={ date.format("D") }
                            month={ date.format("MMM").toUpperCase() }
                        >
                            

                        </TimelineItem>
                    )
                  })
                }
            </Timeline>
        );
    }
};
