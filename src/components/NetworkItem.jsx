import React, {Component} from 'react';
import {Link} from 'framework7-react';
import firebase from '../firebase.js';
import ContentEditable from 'react-contenteditable';

export default class NetworkItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            onFocusValue: null,
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount() {
      
    }

    onChange(e, item) {

          const data = {
            name: e.target.value
          }

          this.props.onUpdateNetwork( item.id, data );

    }

    isBlank( str ) {
      return ( !str || 0 === str.length || /^\s*$/.test(str) )
    }

    isDuplicate( str ) {
      console.log("%cRunning isDuplicate check ..." + (str === this.state.onFocusValue) + " " , "color: blue; font-size:15px;"); 
      return str === this.state.onFocusValue;
    }

    onFocus(e, item) {

      // If content-editable line is focused, temporarily copy to client-side state and DB.
      this.setState( (prevState, props) => {
        return { onFocusValue: item.name }
      })

      // Set line to be 'locked' on database.
      this.setLocked( {locked: window.GATHERING.myName}, item )

    }

    setLocked(status, item) {
      this.props.onUpdateNetwork( item.id, status );
    }

    onBlur(e, item) {
        // Set line to be 'unlocked' on database.
        this.setLocked( {locked: null}, item );

        // Sanitizing content-editable string into plain text.
        var text = e.target.innerText;

        // Check if string is blank or contains only white-space or null / undefined.
        // If string is blank, then rewrite database value with pre-focus value stored in client state
        // and do not push history.
        if ( this.isBlank( text ) ) { 
          var data = {
            name: this.state.onFocusValue
          }
          this.props.onUpdateNetwork( item.id, data );
        }

        // Check if string is same as pre-focus value.
        // If string is the same, do not update database or push history.
        else if ( this.isDuplicate( text ) ) {
          return;
        }

        // String has text, store text string in history.
        else {
          let data = {
            name: e.target.innerText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            author: window.GATHERING.myName,
          }
          this.props.onCreateNetworkHistoryItem( item.id, data )
        }

    }

    lockStyle() {
      // console.log(this.props.networkData.locked);
        if ( this.props.networkData.locked && (this.props.networkData.locked !== window.GATHERING.myName) ) {
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
      if (this.props.networkData.locked === window.GATHERING.myName) {
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
      return this.props.networkData.locked && (this.props.networkData.locked !== window.GATHERING.myName)
    }

    editNetwork(e) {
      // console.log(e);
      // document.getElementById.focus();
      // Explicitly focus the text input using the raw DOM API.
      if (this.textInput !== null) {
        // console.log(this.textInput.htmlEl.focus());
        // this.textInput.focus();
        // this.textInput.focus();
      }
    }

    render() {

        return (
            <div className="wifi-network" onClick={(e) => this.editNetwork(e)}>
              <div className="wifi-name">
                  <ContentEditable
                      ref={(input) => { this.textInput = input; }}
                      onBlur={(e) => this.onBlur(e, this.props.networkData)}
                      key={this.props.networkData.id}
                      className="content no-fastclick"
                      html={this.props.networkData.name} // innerHTML of the editable div
                      disabled={ this.disabled() }       // use true to disable edition
                      onChange={(e) => this.onChange(e, this.props.networkData)} // handle innerHTML change
                      onFocus={(e) => this.onFocus(e, this.props.networkData)}
                  />
              </div>
              <div className="wifi-network-info">
                  <img role="presentation" style={ this.pencilStyle() } className="pencil-icon" src="pencil.svg"></img>
                  <img role="presentation" style={ this.lockStyle() } className="lock-icon" src="lock.svg"></img>
                  <img role="presentation" className="wifi-icon" src="wifi.svg"></img>
                  <Link href={"/networks/" + this.props.networkData.id} networkName={this.props.networkData.name} className="wifi-info-icon" iconF7="info" color="blue" />
              </div>
            </div>
        );
    }
};
