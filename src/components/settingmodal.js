'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ListView,
  Modal,
  PixelRatio,
} from 'react-native';

module.exports = class settingmodal extends Component{
  constructor(props) {
    super(props);
    this.state = {modalVisible: this.props.visible};
  }
  setModalVisible(visible){
      this.props.visible = visible;
  }
  render() {
    return(<Modal
            animationType={"fade"}
            transparent={false}
            visible={this.props.visible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
             <View style={styles.container}>
                <View>
                  <Text>Hello World!</Text>
                  <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.props.visible)
                  }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>

                </View>
             </View>
          </Modal>
        );
  }
}
var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        marginTop: 22,
    },
  });
