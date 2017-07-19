import React, {Component} from 'react';
import {getCurrentRoute} from '../../App'

import {getFramework7} from '../../App'

import {List, ListItem, FormLabel, FormInput, ContentBlock, Button} from 'framework7-react';

export default class CreateNetworkForm extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(props);
        this.state = {
            name: undefined,
            author: this.props.user.displayName
        }
    }
    // const route = getCurrentRoute();
    onClick(e) {
        console.log('Clicked button!');
        console.log(this.props);
        var data = {
            name: this.state.name,
            author: this.state.author
        }

        if (data.name && data.author) {
            this.props.onCreateNetwork(data)
            console.log("Create network success!");
            getFramework7().mainView.router.back();
        }
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleNetworkNameChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <div>
                <List form>
                  <ListItem>
                    <FormLabel>名称</FormLabel>
                    <input
                      placeholder="你的网络叫什么?"
                      type="text"
                      maxLength={13}
                      onChange={(e) => {this.handleNetworkNameChange(e)}}
                      value={this.state.name}
                      ref={(input) => this.input = input} />
                  </ListItem>
                  <ListItem>
                    <FormLabel>作者</FormLabel>
                    <input
                      type="text"
                      maxLength={10}
                      value={this.state.author}
                      onChange={(e) => {this.handleAuthorChange(e)}}
                      ref={(input) => this.input = input} />
                  </ListItem>
                </List>
                <ContentBlock inset>
                <Button onClick={(e) => {this.onClick(e)} }  big round fill color="green">提交</Button>
                </ContentBlock>
            </div>
        )
    };
};