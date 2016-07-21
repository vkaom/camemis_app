'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';

var Signin = require('./components/signin');
var Setting = require('./components/setting');
var ChatList = require('./components/chatList');
import Mymenu from './components/menu';

var ROUTES = {
    signin: Signin,
    setting: Setting,
    mymenu: Mymenu,
    chatList: ChatList,
};

class main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
          <Navigator
              
              initialRoute={{name: 'signin'}}
              renderScene={this.renderScene}
              configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
          />
    );
  }
  renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return (<Component route={route} navigator={navigator}/>);
  }
  topVeiw(){
    return(<View style={styles.topVeiwStyle}>
              <Image
                style={styles.avatar}
                source={require('./images/camemis_logo.png')}
                />
            </View>
        );
  }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#808080',
    }

});

module.exports = main;
