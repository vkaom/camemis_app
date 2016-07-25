/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
module.exports = class Attendance extends Component {
  render() {
    return (<ScrollableTabView
              style={{marginTop: 0, }}
              initialPage={0}
              renderTabBar={() => <FacebookTabBar />}
              >
              <ScrollView tabLabel="ios-paper" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>News</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-people" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Friends</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Messenger</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Notifications</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-list" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Other nav</Text>
                </View>
              </ScrollView>
            </ScrollableTabView>
          );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});
