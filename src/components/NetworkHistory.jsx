import React, {Component} from 'react';
import {Card, Link, Icon, List, ListItem, FormInput, Timeline, TimelineItem} from 'framework7-react';
import ContentEditable from 'react-contenteditable';
import moment from 'moment'

export default class NetworkHistory extends Component {
    constructor(props, context) {
        super(props, context); 
    }

    componentWillMount() {
        this.props.onGetNetworkHistoryItem( this.props.networkId );
    }

    render() {
        return (

             <Timeline sides>
               {
                  this.props.history.map((item, idx) => {
                    var dateTime = new Date(item.timestamp);
                    var date = moment(dateTime);
                    return (
                      <TimelineItem side={ "right"}
                            key={item.id}
                            inner
                            time={ item.author + ":" }
                            title=""
                            subtitle=""
                            text={item.name}
                            day={ date.format("h:mm:ss A") }
                            month=""
                        >
                            

                        </TimelineItem>
                    )
                  })
                }
            </Timeline>
        );
    }
};
