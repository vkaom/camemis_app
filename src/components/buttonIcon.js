'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

module.exports = class buttonIcon extends Component{
  constructor(props) {
    super(props);
  }
	render(){
		return(
      this.buttonIcon()
		);
	}
  buttonIcon(){
    return(
      <Icon.Button name={this.props.name} backgroundColor={this.props.backgroundColor} onPress={this.props.onPress}>
        <Text style={{color:this.props.colorText}}> {this.props.text}</Text>
      </Icon.Button>
    );
  }
}
