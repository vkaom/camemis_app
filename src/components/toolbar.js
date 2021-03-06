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

    render() {
      return(
        <View style={[styles.toolbar, this.props.styles]}>
          <TouchableHighlight style={styles.toolbarNavIcon} onPress={()=>{this.props.onNavIconPress()}} underlayColor="#4682B6" >
            <Icon name={this.props.navIcon} size={25} color="#fff" />
          </TouchableHighlight>
          <View style={styles.toolbarMain}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.toolbarTitle}>{this.props.title}</Text>
            </View>
            {this._renderActions()}
          </View>
        </View>
      );
    }

    _renderActions(){
      if(this.props.actions && this.props.actions.length > 0){
        return this.props.actions.map(function(object, i){
          return (
            <TouchableHighlight style={styles.toolbarAction} key={i} onPress={()=>{this.props.onActionSelected(object.action)}} underlayColor="#4682B6">
              <Icon name={object.icon} size={20} color="#ffffff" />
            </TouchableHighlight>
          );
        }, this)
      }else{
        return null;
      }
    }
}


var styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#4682B4',
    height: 60,
  },
  toolbarNavIcon: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  toolbarMain: {
    flex: 11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    //backgroundColor: 'blue',
  },
  toolbarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  toolbarAction: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
    //backgroundColor: 'yellow',
  }
});
