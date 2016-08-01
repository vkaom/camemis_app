'use strict';
import React, { Component } from 'react';
import {
  Platform,
  AppState,
  StyleSheet,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
var Signin = require('./components/signin');
var Setting = require('./components/setting');
var ChatList = require('./components/chatList');
import Mymenu from './components/menu';
import {navOnDidFocus} from './actions/navigator';

var ROUTES = {
    signin: Signin,
    setting: Setting,
    mymenu: Mymenu,
    chatList: ChatList,
};

class CamemisApp extends Component {
  constructor(props) {
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this.state={second:5};
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    PushNotification.configure({
      onNotification: function(notification) {
           console.log( 'NOTIFICATION:', notification );
       }
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange(AppState) {
      if (AppState === 'background'){
          console.log('this app is run background: '+this.state.second);
          PushNotification.localNotificationSchedule({
              message: "My Notification Message", // (required)
              date: new Date(Date.now() + (this.state.second * 1000)), // in 60 secs
              playSound: true,
              vibrate: true,
          });
      }
  }
  render() {
    return(
      <Navigator
          initialRoute={{name: 'signin'}}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
          onDidFocus={(route) => {
            this.props.dispatch(navOnDidFocus())
          }}
      />
    );
  }
  renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return (<Component route={route} navigator={navigator}/>);
  }
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#808080',
    }

});

const mapStateToProps = (state) => {
  return {}
}
module.exports = connect(mapStateToProps)(CamemisApp);
