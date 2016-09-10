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
  View,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import '../lib/UserAgent';
import io from 'socket.io-client/socket.io';
import Icon from 'react-native-vector-icons/FontAwesome';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    // var nodeServerUrl = 'http://192.168.0.101:8081';
    // //var nodeServerUrl = 'http://admin-tool.camemis.de:8081';
    // this.socket = io(nodeServerUrl, {transports: ['websocket'], jsonp: false});
    //this.chatSocket = io(nodeServerUrl + '/chat', {transports: ['websocket'], jsonp: false});
  }
  componentDidMount() {
    // this.socket.emit('getUserId', this.props.tokenId);
    // this.socket.on('receiveChatNotification', function (data) {
    //   console.log('----------------------CHAT MESSAGE----------------------');
    //   console.log(data);
    // });
  }
  _renderPostItem(){
    return (
      <View style={styles.postWrapper}>
        <View style={styles.postTop}>
          <Text>
            <Text style={styles.boldText}>Laiouk </Text>
            <Text>and </Text>
            <Text style={styles.boldText}>4 others</Text>
            <Text>replied to a comment on this.</Text>
          </Text>
        </View>
        <View style={styles.postMiddle}>
          <View style={{flexDirection: 'row', paddingBottom:10,}}>
            <Image
              source={require('../images/av1.png')}
              style={{width:50, height:50, resizeMode: 'contain', marginRight: 10}}
            />
            <View>
              <Text>
                <Text style={styles.boldText}>Laiouk </Text>
                <Text>feeling stone in brain.</Text>
              </Text>
              <Text style={styles.postTime}>Sept 5 at 8:43pm</Text>
            </View>
          </View>
          <View>
            <Text>Tomorrow exam but my brain is so frustrated, without feeling of studying. Hmm...my god!</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop: 2, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon style={[styles.postToolbarIcon, {color: 'blue'}]} name='thumbs-o-up' />
              <Text>Phy Phy Huang and 64 others</Text>
            </View>
            <Text>7 Comments</Text>
          </View>
        </View>
        <View style={styles.postToolbar}>
          <View style={styles.postToolbarIconGroup}>
            <Icon style={styles.postToolbarIcon} name='thumbs-up' />
            <Text>Like</Text>
          </View>
          <View style={styles.postToolbarIconGroup}>
            <Icon style={styles.postToolbarIcon} name='commenting' />
            <Text>Comment</Text>
          </View>
          <View style={styles.postToolbarIconGroup}>
            <Icon style={styles.postToolbarIcon} name='mail-forward' />
            <Text>Share</Text>
          </View>
        </View>
        <View style={styles.postBottom}>
          <View style={{flexDirection: 'row', paddingBottom:10,}}>
            <Image
              source={require('../images/av2.png')}
              style={{width:40, height:40, resizeMode: 'contain', marginRight: 10}}
            />
            <View style={{flex:1}}>
              <Text style={styles.boldText}>Phy Phy Huang</Text>
              <Text numberOfLines={2}>You asked, Font Awesome delivers with 30 shiny new icons in version 4.6. Want to request new icons?</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          {this._renderPostItem()}
          {this._renderPostItem()}
          {this._renderPostItem()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  boldText:{
    fontWeight: 'bold',
  },
  postWrapper: {
    //flex: 1,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  postTime: {
    color: '#bbb'
  },
  postTop: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
  },
  postMiddle: {
    padding: 10,
  },
  postToolbar:{
    borderTopWidth: 1,
    borderTopColor: '#CDCDCD',
    marginLeft:10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postToolbarIconGroup: {
    flexDirection:'row',
    alignItems: 'center',
  },
  postToolbarIcon:{
    fontSize: 14,
    marginRight: 5,
  },
  postBottom: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee'
  }
});
const mapStateToProps = (state) => {
  return {
    tokenId: state.login.tokenId
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
