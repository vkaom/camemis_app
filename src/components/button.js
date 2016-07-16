'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

module.exports = class button extends Component{

  constructor(props) {
    super(props);
  }
	render(){
		return(
      this.buttonTouchable()
		);

	}
  buttonTouchable(){
    return(<TouchableHighlight
				onPress={this.props.onPress}
				underlayColor="#eff0f1"
				style={styles.bottonStyle}
				>
			   		<Text style={styles.textBotton}>{this.props.text}</Text>
			   </TouchableHighlight>);
  }
}

var styles = StyleSheet.create({
	bottonStyle:{
		borderWidth: 1,
		borderRadius: 5,
		width: 150,
		height: 30,
		marginTop:10,
		borderColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textBotton:{
		color: '#FFFFFF',
		fontSize: 14,
	}
});
