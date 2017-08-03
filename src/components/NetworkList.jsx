import React, {Component} from 'react';
import { GridRow, GridCol, Navbar, NavRight, Link, List, ListItemSwipeoutActions, ListItemSwipeoutButton, ListItem, ContentBlockTitle, Preloader, Icon, FormInput} from 'framework7-react';
import NetworkItem from '../containers/networkItemContainer'
import moment from 'moment';
import Switch from 'react-toggle-switch'
import Marquee from 'react-text-marquee'
import {getFramework7} from './App'
import ReactDOM from 'react-dom'
import Transition from 'react-motion-ui-pack'
import { spring } from 'react-motion';

 
class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          checked: false,
          swipeout: {
            element: null,
            delete: false
          },
          networks: []
        }
    }

    componentWillMount() {
      console.log('MOUNTING');
      console.log(this.props.pending);
    }

      componentWillReceiveProps(nextProps) {
         this.props = null;
         this.props = nextProps;
         // call any method here   
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
      console.log(this.state.checked)
    }

    toggleSwitch = () => {
      this.setState(prevState => {
        return {
          checked: !prevState.checked
        };
      }, function() {
        console.log(this.state.checked);
      });
    };

    getInnerStartSlot() {
      if (this.state.checked) {
          return (
              
              <p className="marquee"><span>📶 你已打开 Wifi-Poet 写诗模式，点击网络名称进行编辑 📶</span></p>
                    // <marquee>你已打开Wi-Fi Poet写诗模式！以下网络名字随你任意改写！</marquee>
              )
      } else {
        return (
              <div className="product-network">
                <div className="product-text">Wifi-Poet</div>
                <div className="powered-by-text">Powered by <b>NerveMilk</b>®</div>
              </div>
          )
      }
      
    }

    onSwipeoutOpen(e) {
        this.setState(prevState => {
          return {
            swipeout: {
              element: e.target,
              delete: false
            }
          }
        })
    }

    swipeoutClick(e, item) {
      console.log(item);
      if (item.locked) {
        return;
      }
      if (this.state.checked) {
          var currSwipeoutElement = this.state.swipeout.element;
            this.setState(prevState => {
              return {
                swipeout: {
                  element: currSwipeoutElement,
                  delete: true
                }
              }
            })
      }
    }

    onSwipeoutClosed(e, networkId) {

      if (this.state.swipeout.delete) {

        var data = {
          action: 0,
          initiated_by: this.props.user.displayName,
          ends_in: 6000,
        }

        
        this.props.onCreatePendingDeletion(networkId, data)

        // get current pending list ... recheck if still to be deleted -- cannot do recheck
        // with no unique pending ID (promise) ... fake it with limit???
        var tmOut = setTimeout(() => {
          if (this.props.pending[networkId] ) {
            this.props.onDeletePoem(networkId, { deleted_by: this.props.user.displayName });
          } 
        }, 6000)



      }
    }

    getNetworkCreationLink() {
      // if (this.props.networks.length >= 16) {
      //   return ""
      // } else {
        return "/create/"
      // }
    }

    render() {
        return (
            <div>
            <ContentBlockTitle> 
                <GridRow noGutter>
                  <GridCol width="70">你好, {this.props.user.displayName}! </GridCol>
                  <GridCol width="30"><div className="editing-mode-text">模式: {this.state.checked ? "编辑" : "浏览"}</div></GridCol>
                </GridRow>
              </ContentBlockTitle>
            <List className="wifi-network-switch" form>
              <ListItem
                className="wifi-toggle" 
                innerStartSlot={this.getInnerStartSlot()}
                innerSlot={
                    <div>
                    <Switch on={this.state.checked} onClick={this.toggleSwitch}/>
                    </div>
                }
              >
              </ListItem>
               <ListItem
                className="wifi-connected-network"
                media= '<i class="f7-icons color-blue wifi-connected-icon">check</i>'
                title= { moment().locale('zh-cn').format('L') }
                innerSlot={
                    <span className="">
                        <Link href={"/about/"} >
                        <img role="presentation" className="wifi-icon" src="wifi_3.svg"></img>
                        <Icon className="wifi-info-icon" f7="info" size="22px" color="blue"></Icon>
                        </Link>
                    </span>
                }
              >
              </ListItem>
            </List>
            
              <ContentBlockTitle> 
                { this.getContentBlockTitleString() }
              </ContentBlockTitle>
              
              <List className="wifi-network-list">
              <Transition
                          component="ul"
                          enter={{
                            opacity: 1, height: 44
                          }}
                          leave={{
                           opacity: 0, height: 0
                          }}
                          runOnMount={false}
                        >  
                         
                  {
                    this.props.networks.map((item, index) => {

                      return (

                          <ListItem 
                              ref={item.network_key}
                              onSwipeoutOpen={(e) => this.onSwipeoutOpen(e, item)}
                              onSwipeoutClosed={(e) => this.onSwipeoutClosed(e, item.network_key)}
                              swipeout
                              media="<img src='/blank256.png'>"
                              key={item.network_key}
                              innerSlot= { <NetworkItem pending={this.props.pending[item.network_key]} editable={this.state.checked} key={item.network_key} networkData={ item } ></NetworkItem> }
                          >
                          
                          { this.state.checked ? <ListItemSwipeoutActions>
                                    <ListItemSwipeoutButton color={this.state.checked ? "red" : "gray"} close={this.state.checked} onClick={(e) => this.swipeoutClick(e, item)}>删除</ListItemSwipeoutButton>
                                  </ListItemSwipeoutActions> : null }

                          </ListItem>
                      )
                    })
                  }
                  {
                    (this.state.checked && this.props.networks.length < 10) ? <ListItem 
                              key="test-key"
                              link={ this.getNetworkCreationLink() }
                              media="<img src='/blank256.png'>"
                              title="创建新的Wi-Fi网络..."
                      >
                       </ListItem> : <span key="test-key-undefined"></span>
                  }
                 
                  </Transition>
              </List>
              <ContentBlockTitle> 
                <GridRow noGutter>
                  <GridCol width="10"></GridCol>
                  <GridCol width="80"><div className="footer-text">Wifi Poet v0.5 | NerveMilk</div></GridCol>
                  <GridCol width="10"></GridCol>
                </GridRow>
              </ContentBlockTitle>
            </div>
        );
    }
};

export default NetworkList;