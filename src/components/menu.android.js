'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { StyleSheet,View,ScrollView,Navigator,DrawerLayoutAndroid,BackAndroid } from 'react-native';
import CamemisToolbar from './toolbar';
import CamemisSideBarNave from './sidebarnav';
import CAMEMISNavigatorMenu from '../tools/CAMEMISNavigatorMenu';
var widthSideBar = 280;
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];

export default class menu extends Component{
  constructor(props){
      super(props);
      this.renderDrawerContent = this.renderDrawerContent.bind(this);
      this._handleBackButton = this._handleBackButton.bind(this);
      this.state = {navigator: null};
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
    this.setState({navigator:this.navigator});
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  _handleBackButton(){
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
  }
  render(){
      return (
        <DrawerLayoutAndroid
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerWidth={widthSideBar}
          keyboardDismissMode="on-drag"
          onDrawerOpen={() => {
            this._overrideBackPressForDrawerLayout = true;
          }}
          onDrawerClose={() => {
            this._overrideBackPressForDrawerLayout = false;
          }}
          ref={(drawer) => { this.drawer = drawer; }}
          renderNavigationView={this.renderDrawerContent}
        >
            <CAMEMISNavigatorMenu
              refName={(ref) => this.navigator = ref}
              navigator={this.state.navigator}
              openDrawer={this._openDrawer} />

        </DrawerLayoutAndroid>
      );
  }
  renderDrawerContent(){
    return(
        <CamemisSideBarNave
          navigator={this.navigator}
          loggle={this._closeDrawer}
          logout={this._logout}/>
    );
  }

  _logout = () => {
    this.props.doLogout();
  }
  _openDrawer = () => {
    this.drawer.openDrawer();
  }
  _closeDrawer = () => {
    this.drawer.closeDrawer();
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
