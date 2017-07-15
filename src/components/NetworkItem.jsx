import React, {Component} from 'react';
import {Link, Icon, List, ListItem, FormInput} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';
import gathering from '../Gathering';

export default class NetworkItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            onFocusValue: null,
            disabled: false
        }

        console.log(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount() {
      
    }

    onChange(e, item) {
      
          const data = {
            title: e.target.value
          }

          let ref = firebase.database().ref('networks')

          return ref
                 .child(item.id)
                 .update(data)

    }

    isBlank( str ) {
      return ( !str || 0 === str.length || /^\s*$/.test(str) )
    }

    isDuplicate( str ) {
      console.log( 'Running isDuplicate check ...')
      console.log( str );
      console.log( str === this.state.onFocusValue );
      return str === this.state.onFocusValue;
    }

    onFocus(e, item) {

      // If content-editable line is focused, temporarily copy to client-side state and DB.
      this.setState( (prevState, props) => {
        return { onFocusValue: item.title }
      })

      // Set line to be 'locked' on database.
      this.setLocked( {locked: gathering.myName}, item )

    }

    setLocked(status, item) {
      let ref = firebase.database().ref('networks')
      return ref.child(item.id).update(status)
    }

    onBlur(e, item) {
        // Set line to be 'unlocked' on database.
        this.setLocked( {locked: null}, item );

        // Sanitizing content-editable string into plain text.
        var text = e.target.innerText;

        var data = {
          title: null,
          time: firebase.database.ServerValue.TIMESTAMP
        }

        // Check if string is blank or contains only white-space or null / undefined.
        // If string is blank, then rewrite database value with pre-focus value stored in client state
        // and do not push history.
        if ( this.isBlank( text ) ) { 
          data.title = this.state.onFocusValue;
          let ref = firebase.database().ref('networks')
          return ref
                 .child(item.id)
                 .update(data)
        }

        // Check if string is same as pre-focus value.
        // If string is the same, do not update database or push history.
        if ( this.isDuplicate( text ) ) {
          return;
        }
        // String has text, store text string in history.
        else {
          data.title = e.target.innerText;
          let ref = firebase.database().ref('networks/' + item.id + '/history');
          return ref.push(data);
        }

    }

    lockStyle() {
      // console.log(this.props.networkData.locked);
        if ( this.props.networkData.locked && (this.props.networkData.locked !== gathering.myName) ) {
          return {
            display: 'inline-block'
          }
        } else {
          return {
            display: 'none'
          }
        }
    }

    pencilStyle() {
      if (this.props.networkData.locked === gathering.myName) {
        return {
            display: 'inline-block'
        }
      } else {
        return {
          display: 'none'
        }
      }
    }

    disabled() {
      return this.props.networkData.locked && (this.props.networkData.locked !== gathering.myName)
    }

    render() {

        return (
            <div className="wifi-network">
              <div className="wifi-name">
                  <ContentEditable
                      onBlur={(e) => this.onBlur(e, this.props.networkData)}
                      key={this.props.networkData.id}
                      className="content no-fastclick"
                      html={this.props.networkData.title} // innerHTML of the editable div
                      disabled={ this.disabled() }       // use true to disable edition
                      onChange={(e) => this.onChange(e, this.props.networkData)} // handle innerHTML change
                      onFocus={(e) => this.onFocus(e, this.props.networkData)}
                  />
              </div>
              <div className="wifi-network-info">
                  <img style={ this.pencilStyle() } className="pencil-icon" src="pencil.svg"></img>
                  <img style={ this.lockStyle() } className="lock-icon" src="lock.svg"></img>
                  <img className="wifi-icon" src="wifi.svg"></img>
                  <Link href={"/networks/" + this.props.networkData.id} networkName={this.props.networkData.title} className="wifi-info-icon" iconF7="info" color="blue" />
              </div>
            </div>
        );
    }
};
