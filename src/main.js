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

var Singin = require('./components/singin');
var Setting = require('./components/setting');
import Mymenu from './components/menu';

var ROUTES = {
    singin: Singin,
    setting: Setting,
    mymenu: Mymenu,
};

class main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
          <Navigator
              style={styles.container}
              initialRoute={{name: 'singin'}}
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
    },
    contents:{
        flex:9,
    },

});

module.exports = main;
