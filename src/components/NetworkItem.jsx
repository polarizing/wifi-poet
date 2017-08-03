import React, {Component} from 'react';
import {Icon, Link, GridCol, GridRow} from 'framework7-react';
import firebase from '../firebase.js';
import classNames from 'classnames'

class NetworkItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            onFocusValue: null,
            disabled: false,
            wifi: 0,
            timeouts: [],
            intervals: [],
            editing: false
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount() {
      if (this.props.editable) {
        this.setState({wifi: 3});
      }
    }

    componentWillReceiveProps(nextProps) {
      // set pending countdown
      if ( (nextProps.pending !== this.props.pending) && nextProps.pending && this.props.editable) {
        // DELETION ACTION
        if (nextProps.pending.action === 0) {
          var i = setInterval( () => {
            var d = new Date();
            var dt = (nextProps.pending.timestamp + nextProps.pending.ends_in) - d.getTime();
            if (dt <= 6000 && dt > 4000) {
              this.setState({wifi: 3})
            }
            if (dt <= 4000 && dt > 2000) {
              this.setState({wifi: 2})
            }
            if (dt <= 2000) {
              this.setState({wifi: 1})
            }
          }, 250);
          this.state.intervals.push( i );
        }
      } else if (!nextProps.pending) {
      // clear pending countdown
        for (var i = 0; i < this.state.intervals.length; i++) {
            clearInterval( this.state.intervals[i] );
            this.setState({wifi: 3});
        }
      }

      var randomTime = Math.floor(Math.random() * 750) + 350;
      if (nextProps.editable !== this.props.editable) {
        // blinking animation
        if ( nextProps.editable ) {

          var timeoutOne = setTimeout(() => {
            this.setState({wifi: 1})
          }, randomTime)
          var timeoutTwo = setTimeout(() => {
            this.setState({wifi: 2})
          }, randomTime * 2)
          var timeoutThree = setTimeout(() => {
            this.setState({wifi: 3})
          }, randomTime * 3)

        this.state.timeouts.push( timeoutOne );
        this.state.timeouts.push( timeoutTwo );
        this.state.timeouts.push( timeoutThree );

        } else {
          for (var i = 0; i < this.state.timeouts.length; i++) {
            clearTimeout( this.state.timeouts[i] );
          }
            this.setState({wifi: 0})
          }
        }

    }

    onChange(e, item) {

          const data = {
            name: e.target.value
          }

          // Remove from pending deletion.
          if ( this.props.pending ) {
            this.props.onDeletePendingDeletion( item.network_key )
          }

          this.props.onUpdatePoem( item.network_key, data );

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
        return { 
          onFocusValue: item.name,
          editing: false
        }
      })

      // Set line to be 'locked' on database.
      this.setLocked( {locked: this.props.user.displayName}, item )

      // Remove from pending deletion.
      if ( this.props.pending ) {
        this.props.onDeletePendingDeletion( item.network_key )
      }

    }

    setLocked(status, item) {
      this.props.onUpdatePoem( item.network_key, status );
    }

    onBlur(e, item) {
        // Set line to be 'unlocked' on database.
        this.setLocked( {locked: null}, item );

        this.setState( (prevState, props) => {
          return { editing: true }
        })

        // Sanitizing content-editable string into plain text.
        var text = e.target.value;

        // Check if string is blank or contains only white-space or null / undefined.
        // If string is blank, then rewrite database value with pre-focus value stored in client state
        // and do not push history.
        if ( this.isBlank( text ) ) { 
          var data = {
            name: this.state.onFocusValue
          }
          this.props.onUpdatePoem( item.network_key, data );
        }

        // Check if string is same as pre-focus value.
        // If string is the same, do not update database or push history.
        else if ( this.isDuplicate( text ) ) {
          return;
        }

        // String has text, store text string in history.
        else {
          let data = {
            name: e.target.value,
            created_at: firebase.database.ServerValue.TIMESTAMP,
            author: this.props.user.displayName
          }
          this.props.onCreateNetworkHistoryItem( item.network_key, data )
        }

    }

    lockStyle() {
      // console.log(this.props.networkData.locked);
        if ( this.props.networkData.locked && (this.props.networkData.locked !== this.props.user.displayName) ) {
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
      if (this.props.networkData.locked === this.props.user.displayName) {
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
      return this.props.networkData.locked && (this.props.networkData.locked !== this.props.user.displayName)
    }

    getWifiIconState(num) {
      if (num === this.state.wifi && (num === 0 || num === 3) ) {
        return classNames({
          'wifi-icon': true,
        });
      }
      if (num === this.state.wifi) {
        var wifiClass = classNames({
          'wifi-icon': true,
          'wifi-icon-animation': true
        });
        return wifiClass
      } else {
        var wifiClass = classNames({
          'wifi-icon-no-show': true,
        });
        return wifiClass
      }

    }

    render() {

        return (
          <div className="wifi-network-container">
                <div className="wifi-name">
                  <input
                      type="text"
                      key={this.props.networkData.network_key}
                      className="content"
                      disabled={ this.disabled() | !this.props.editable} 
                      onBlur={(e) => this.onBlur(e, this.props.networkData)}
                      maxLength={13}
                      onChange={(e) => this.onChange(e, this.props.networkData)}
                      onFocus={(e) => this.onFocus(e, this.props.networkData)}
                      value={ this.props.networkData.name }
                      ref={(input) => this.textInput = input} 
                      />
              </div>
              <div className="filler"></div>
              <div className="wifi-link-container">
                <Link href={"/networks/" + this.props.networkData.network_key} networkName={this.props.networkData.name} >
                <div className="wifi-network-info">
                    <img role="presentation" style={ this.pencilStyle() } className="pencil-icon" src="pencil.svg"></img>
                    <img role="presentation" style={ this.lockStyle() } className="lock-icon" src="lock.svg"></img>
                    {/*<Icon className="pencil-icon" style={ this.pencilStyle() } color="black" f7="unlock_fill" size="14"></Icon>
                    <Icon className="lock-icon" style={ this.lockStyle() } color="black" f7="lock_fill" size="14"></Icon> */}
                    <img role="presentation" className={ this.getWifiIconState(3) } src="wifi_3.svg"></img>
                    <img role="presentation" className={ this.getWifiIconState(2) } src="wifi_2.svg"></img>
                    <img role="presentation" className={ this.getWifiIconState(1) } src="wifi_1.svg"></img>
                    <img role="presentation" className={ this.getWifiIconState(0) } src="wifi_0.svg"></img>
                    <Icon className="info-icon" f7="info" size="22"></Icon>
                </div>
                </Link>
              </div>
          </div>
           
        );
    }
};


export default NetworkItem;
