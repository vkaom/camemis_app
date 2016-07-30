/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  ActivityIndicator,
  View
} from 'react-native';

module.exports = class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render() {
    return (
      <View>
      <Animated.Image                         // Base: Image, Text, View
        source={require('../images/av2.png')}
        style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      />

          </View>
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1,                         // Animate to smaller size
        friction: 0.1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
}

const styles = StyleSheet.create({
  container: {

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
