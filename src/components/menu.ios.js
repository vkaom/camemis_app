'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { StyleSheet,View,ScrollView,Navigator } from 'react-native';
import Drawer from 'react-native-drawer'
import CamemisToolbar from './toolbar';
import CAMEMISNavigatorMenu from '../tools/CAMEMISNavigatorMenu';
import CamemisSideBarNave from './sidebarnav';
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
export default class menu extends Component{
  constructor(props){
      super(props);
      this.renderDrawerContent = this.renderDrawerContent.bind(this);
      this.state = {navigator: null};
  }
  componentDidMount() {
      this.setState({navigator:this.navigator});
  }
  render(){
      return (
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="overlay"
          content={this.renderDrawerContent()}
          tapToClose={true}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          >
            <CAMEMISNavigatorMenu
              refName={(ref) => this.navigator = ref}
              navigator={this.state.navigator}
              openDrawer={this._openDrawer} />
        </Drawer>
      );
  }
  renderDrawerContent(){
    return(
        <CamemisSideBarNave
            navigator={this.state.navigator}
            loggle={this._closeDrawer}
            logout={this._logout} />
    );
  }
  _logout = () => {
    this.props.doLogout();
  }
  _openDrawer = () => {
    this._drawer.open();
  }
  _closeDrawer = () => {
    this._drawer.close();
  }

}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#FFFFFF',
      shadowColor: "#000000",
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {return {}},mapDispatchToProps)(menu);
