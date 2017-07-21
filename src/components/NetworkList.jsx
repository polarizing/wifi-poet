import React, {Component} from 'react';
import { Navbar, NavRight, Link, List, ListItem, ContentBlockTitle, Preloader, Icon, FormInput} from 'framework7-react';
import NetworkItem from '../containers/networkItemContainer'
import moment from 'moment';

class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false,
          sorting: false
        }
    }

    componentWillMount() {
      this.props.onGetNetworks()
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

    onChange(e) {
      // console.log(e);
      // console.log(e.target.checked);
      // console.log(this);
      // var event = e;
      // // var currentEditableState = this.state.editable;
      // this.setState((prevState, props) => {
      //   console.log(event.target.checked);
      //     return { editable: event.target.checked };
      // }, function() {
      //           console.log(event.target.checked);

      //   console.log(this.state);
      // })

    }

    onClick(e) {
      if(e.target.checked !== undefined) {
        console.log(e.target.checked)
        // this.state.editable = e.target.checked
        // console.log(this.state);
      // var currentEditableState = this.state.editable;
        // this.setState((prevState, props) => {
        //   return { editable: e.target.checked };
        // }, function() {
        //   console.log(this.state);
        // });

        // console.log(e.target.checked)
      }
    }

    onOpen() {
      this.setState({
        sorting: !this.state.sorting,
        ...this.state
      });                
    }

    onClose() {
      this.setState({
        sorting: !this.state.sorting,
        ...this.state
      });
    }

    onSort(event, indexes) {
        console.log('sort', indexes);
    }

    render() {
        return (
            <div>
            <ContentBlockTitle> 
                你好, {this.props.user.displayName}! 
              </ContentBlockTitle>
            <List className="wifi-network-switch" form>
              <ListItem
                className="wifi-toggle" 
                title="Wi-Fi Poet" 
                innerSlot={
                    <div>
                        <FormInput type="switch" onClick={(e) => {this.onClick(e)}} onChange={(e) => {this.onChange(e)}}></FormInput>
                    </div>
                }
              >
              </ListItem>
               <ListItem
                className="wifi-connected-network"
                media= '<i class="f7-icons color-blue wifi-connected-icon">check</i>'
                title= { moment().locale('zh-cn').format('MMM Do YYYY') }
                innerSlot={
                    <span className="">
                        <img role="presentation" className="wifi-icon" src="wifi.svg"></img>
                        <Icon className="wifi-info-icon" f7="info" size="22px" color="blue"></Icon>
                    </span>
                }
              >
              </ListItem>
            </List>

              {/*<ContentBlockTitle> 
                <div>{ this.getContentBlockTitleString() }</div>
              </ContentBlockTitle>
              <Navbar backLink="Back" title="Sortable" sliding>
                <NavRight>
                  <Link toggleSortable="#sortable">{this.state.sorting ? 'Done' : 'Open'}</Link>
                </NavRight>
              </Navbar>

              <List 
                id="sortable" 
                sortable 
                onSortableSort={(e) => this.onSort(e)} 
                onSortableOpen={(e) => this.onOpen(e)} 
                onSortableClose={(e) => this.onClose(e)}
              >
                {this.props.networks.map((item) => (
                  <ListItem>
                    <NetworkItem editable={this.state.editable} key={item.id} networkData={ item }></NetworkItem>
                  </ListItem>
                ))}                  
              </List>
            */}

              <List className="wifi-network-list">
                  {
                    this.props.networks.map((item) => {
                      return (
                        <NetworkItem editable={this.state.editable} key={item.id} networkData={ item }></NetworkItem>
                        // <ListItem 
                        //       media="<img src='/blank256.png'>"
                        //       key={item.id}
                        //       innerSlot= { <NetworkItem networkData={ item } ></NetworkItem> }
                        //   >
                        //   </ListItem>
                      )
                    })
                  }
                  <ListItem 
                              link="/create/"
                              media="<img src='/blank256.png'>"
                              title="创建新的Wi-Fi网络..."
                      >
                  </ListItem>
              </List>
            </div>
        );
    }
};

export default NetworkList;