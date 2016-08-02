'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { StyleSheet,View,ScrollView,Navigator,DrawerLayoutAndroid,BackAndroid } from 'react-native';
import CamemisToolbar from './toolbar';
import CamemisSideBarNave from './sidebarnav';
import Dashboard from './dashboard';
import Academic from './academic';
import Schedule from './schedule';
import Attendance from './attendance';
import Discipline from './discipline';
import Transcript from './transcript';
import ChatList from './chatList';
//import CAMEMISNavigatorMenu from '../tools/CAMEMISNavigatorMenu';
var widthSideBar = 280;
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
var MUNUROUTES = {
    dashboard: {
      Component:Dashboard,
      title:'My Dashboard'
    },
    academic: {
      Component:Academic,
      title:'My Academic'
    },
    schedule: {
      Component:Schedule,
      title:'My Schedule'
    },
    attendance: {
      Component:Attendance,
      title:'My Attendance'
    },
    discipline: {
      Component:Discipline,
      title:'My Discipline'
    },
    transcript: {
      Component:Transcript,
      title:'My Transcript'
    },
    chatList: {
      Component:ChatList,
      title:'ChatList'
    },
};
export default class menu extends Component{
  constructor(props){
      super(props);
      this.renderDrawerContent = this.renderDrawerContent.bind(this);
      this._handleBackButton = this._handleBackButton.bind(this);
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
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
          {this.renderMainContent()}
        </DrawerLayoutAndroid>
      );
  }
  renderDrawerContent(){
    return(
        <CamemisSideBarNave navigator={this.navigator} loggle={this._closeDrawer} logout={this._logout}/>
    );
  }
  renderMainContent(){
    return (
      <Navigator
          style={styles.container}
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{name: 'academic'}}
          renderScene={(route, navigator) =>this.renderScene(route, navigator)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
  renderScene(route, navigator){
      var CamemisRoute = MUNUROUTES[route.name];
      var MySceneComponent = CamemisRoute.Component;
      if(route.name=='chatList'){
        return (
          <View style={{flex: 1,}}>
            <View style={styles.container}>
              <MySceneComponent route={route} navigator={navigator} />
            </View>
          </View>
        );
      }else{
        return (
          <View style={{flex: 1,}}>
            <View>
              <CamemisToolbar title={CamemisRoute.title} openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <View style={styles.container}>
              <MySceneComponent route={route} navigator={navigator} />
            </View>
          </View>
        );
    }
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
  _onActionSelected = (action) => {
    switch (action) {
      case 'chatList':
        this.navigator.push({name: 'chatList'});
        break;
      case 1:
        this.navigator.pop();
        break;
      default:
        this.navigator.pop();
    }
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
