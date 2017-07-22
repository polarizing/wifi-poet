import React, {Component} from 'react';
import { GridRow, GridCol, Navbar, NavRight, Link, List, ListItem, ContentBlockTitle, Preloader, Icon, FormInput} from 'framework7-react';
import NetworkItem from '../containers/networkItemContainer'
import moment from 'moment';
import Switch from 'react-toggle-switch'
import Marquee from 'react-text-marquee'

 
class NetworkList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          checked: false,
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
              
              <p className="marquee"><span>📶 你已打开 Wi-Fi Poet 写诗模式. 点击网络名称进行编辑! 📶</span></p>
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
                title= { moment().locale('zh-cn').format('MMM Do YYYY') }
                innerSlot={
                    <span className="">
                        <img role="presentation" className="wifi-icon" src="wifi_3.svg"></img>
                        <Icon className="wifi-info-icon" f7="info" size="22px" color="blue"></Icon>
                    </span>
                }
              >
              </ListItem>
            </List>
            
              <ContentBlockTitle> 
                { this.getContentBlockTitleString() }
              </ContentBlockTitle>
              <List className="wifi-network-list">
                  {
                    this.props.networks.map((item) => {
                      return (
                        <NetworkItem editable={this.state.checked} key={item.id} networkData={ item }></NetworkItem>
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