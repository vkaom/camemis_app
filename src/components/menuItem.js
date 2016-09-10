'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

module.exports = class MenuItem extends Component{
    constructor(props) {
      super(props);
    }
    render() {
      var selectedItemStyle = this.props.selected && styles.selectedMenuItemWrapper;
      var selectedIconStyle = this.props.selected && styles.selectedIcon;
      var selectedTitleStyle = this.props.selected && styles.selectedTitle;
      return(
        <TouchableHighlight onPress={this.props.onPress} underlayColor="#4682B6" >
          <View style={[styles.menuItemWrapper, selectedItemStyle]}>
            <View style={{flex: 1, width:8}}>
              <Icon style={[styles.icon, selectedIconStyle]} name={this.props.icon} />
            </View>
            <Text style={[styles.title, selectedTitleStyle]}>{this.props.title}</Text>
          </View>
        </TouchableHighlight>
      );
    }
}

var styles = StyleSheet.create({
  menuItemWrapper: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#CDCDCD',
    alignItems: 'center'
  },
  selectedMenuItemWrapper:{
    backgroundColor: '#4682B6',
  },
  icon: {
    //flex: 1,
    fontSize: 16,
    marginTop: 2,
    color: '#5d5d5d',
    //backgroundColor: 'yellow',
  },
  selectedIcon: {
    color:'#fff',
  },
  title: {
    flex: 11,
    color:'#000',
    marginLeft:20,
    fontSize:16,
    //backgroundColor: 'yellow',
  },
  selectedTitle: {
    color:'#fff',
  }
});
