'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

module.exports = class camhead extends Component{
    constructor(props) {
      super(props);
    }
    render() {
      return(<View style={styles.topVeiwStyle}>
              <Image
                source={require('../images/logo.png')}
                />
                <Text style={styles.topVeiwText}>{this.props.text}</Text>
            </View>);
    }
}

var styles = StyleSheet.create({
  topVeiwStyle:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  topVeiwText:{
      color: '#FFFFFF',
      fontSize: 18,
  }
});
