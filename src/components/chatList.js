import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  PixelRatio,
  RefreshControl,
  Modal,
  TouchableHighlight,
  NetInfo
} from 'react-native';
import CamemisToolbar from './toolbar';
import ChatListSearch from './chatListSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

var toolbarActions = [
  {title: 'Search', icon: 'search', action: 'search'},
];

class ChatListCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      searchModalVisible: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.navOnDidFocus !== nextProps.navOnDidFocus) {
      //this._fetchChatList();
    }
  }
  componentDidMount() {}
  componentWillUpdate(nextProps) {}
  _onRefresh() {
    //this.props.fetchChatList()
  }
  _fetchChatList(){}
  _setSearchModalVisible(visible){
    this.setState({searchModalVisible: visible});
  }
  _renderSearchModal(){
    return(
      <Modal
        animationType={"none"}
        transparent={false}
        visible={this.state.searchModalVisible}
        onRequestClose={() => {
          //alert("Modal has been closed.")
        }}
        style={{flex:1,backgroundColor: 'yellow', margin:0, padding:0}}
        >
        <ChatListSearch navIcon="chevron-left" navigator={this.props.navigator} title="Chat" onNavIconPress={this._setSearchModalVisible.bind(this, false)} onActionSelected={this._onActionSelected} actions={toolbarActions} />

      </Modal>
    );
  }
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <CamemisToolbar navIcon="chevron-left" navigator={this.props.navigator} title="Chat" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
          <Text>
            Loading...
          </Text>
        </View>
      </View>
    );
  }
  _onActionSelected = (action) => {
    switch (action) {
      case 'search':
        this._setSearchModalVisible(true);
        break;
      default:
        console.log('action: default');
    }
  }
  render() {
    if (this.state.isLoading) {
      //return this._renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <CamemisToolbar navIcon="chevron-left" navigator={this.props.navigator} onNavIconPress={() => this.props.navigator.pop()} title="Chat" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        {this._renderSearchModal()}
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop:10}}>
          <TouchableHighlight onPress={()=>{this.props.navigator.push({name:'chatRoom'})}}>
          <View style={styles.chatItemList}>
            <Image
              source={require('../images/av2.png')}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.name}>Rada K.</Text>
              <Text style={styles.lastChatText}>Hello, how are you?</Text>
            </View>
          </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  chatItemList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight:20,
    borderRadius: 60,
  },
  rightContainer: {
    flex: 1,
    marginRight: 10,
	  //backgroundColor: '#FF0000',
  },
  name: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    navOnDidFocus: state.navigator.navOnDidFocus,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const ChatList = connect(mapStateToProps, mapDispatchToProps)(ChatListCom)

module.exports = ChatList
