'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
module.exports = class CamemisToolbar extends Component{
    constructor(props) {
      super(props);
    }
    _openDrawer = () => {
      this.props.openDrawer();
    }
    render() {
      return(
        <View style={[styles.toolbar, this.props.styles]}>
          <TouchableHighlight style={styles.toolbarNavIcon} onPress={this._openDrawer} underlayColor="#4682B6" >
            <Icon name='bars' size={25} color="#fff" />
          </TouchableHighlight>
          <View style={styles.toolbarLogoTitle}>
            <Image
              source={require('../images/logo.png')}
            />
            <Text style={styles.toolbarTitle}>{this.props.title}</Text>
          </View>
          {

            this.props.actions.map(function(object, i){
              return (
                <TouchableHighlight style={styles.toolbarAction} key={i} onPress={()=>{this.props.onActionSelected(i)}} underlayColor="#4682B6">
                  <Icon name={object.icon} size={20} color="#ffffff" />
                </TouchableHighlight>
              );
            }, this)
          }
        </View>
      );
    }
}


var styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#4682B4',
    height: 60
  },
  toolbarNavIcon: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    //width:60,
  },
  toolbarLogoTitle: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'blue',
  },
  toolbarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toolbarAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:5
    //backgroundColor: 'yellow',
  }
});