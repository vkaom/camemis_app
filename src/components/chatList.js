/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';
import CamemisToolbar from './toolbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { fetchChatList } from '../actions/chat'
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var personList = [];
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
    //this._setSearchModalVisible = this._setSearchModalVisible.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.navOnDidFocus !== nextProps.navOnDidFocus) {
      // If somehow we're sure we can actually be faster than React at this. (not likely)
      console.log('--------------------init ajax-----------------------------');
      this._fetchChatList();
    }
  }
  componentDidMount() {
    //this._fetchChatList();

    //using this also works but must remove mapDispatchToProps
    // this.props.dispatch(fetchChatList()).then(() => {
    //   this.setState({isLoading: false});
    // });

    //this._fetchData();
  }
  componentWillUpdate(nextProps) {
    // console.log('componentWillReceiveProps');
    // console.log(this.props.navOnDidFocus);
    // console.log(nextProps.navOnDidFocus);
    //this._fetchChatList()
  }
  _onRefresh() {
    //this._fetchData();
    this.props.fetchChatList()
  }
  _fetchChatList(){
    this.props.fetchChatList().then(() => {
      this.setState({isLoading: false});
    });
  }
  _fetchData() {
    this.setState({refreshing: true});
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData.movies);
        responseData.movies.map(function(object, i){
          personList.unshift({name: object.title, img: object.posters.thumbnail, lastChatText: 'Oh yeah?'});
        });
        this.setState({
          refreshing: false,
          loaded: true,
        });
      })
      .done();
  }
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
        <View style={{flex: 1}}>
          <View>
            <CamemisToolbar navigator={this.props.navigator} onNavIconPress={this._setSearchModalVisible.bind(this, false)} title="Search" />
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
            <Text>Hello World!</Text>
            <TouchableHighlight onPress={() => {
              this._setSearchModalVisible(!this.state.searchModalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="ជជែក" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
          <Text>
            Loading...
          </Text>
          <TouchableHighlight onPress={() => {this._fetchChatList()}} >
            <Text>

            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _onActionSelected = (action) => {
    switch (action) {
      case 'search':
        console.log('action: search');
        this._setSearchModalVisible(true);
        break;
      default:
        console.log('action: default');
    }
    //console.log(this.props.navigator.getCurrentRoutes(0));
  }

  render() {
    // console.log('---START---');
    // console.log('navOnDidFocus: ' + this.props.navOnDidFocus);
    // console.log('---END---');
    // if(this.props.navOnDidFocus === true){
    //   this._fetchChatList.bind(this);
    // }
    if (this.state.isLoading) {
      return this._renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="ជជែក" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        </View>
        {this._renderSearchModal()}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingTop:10}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {
            this.props.personList.map(function(object, i){
              return (
                <View style={styles.chatItemList} key={i}>
                  <Image
                    //source={object.img}
                    source={{uri: object.img}}
                    style={styles.thumbnail}
                  />
                  <View style={styles.rightContainer}>
                    <Text style={styles.name}>{object.name}</Text>
                    <Text style={styles.lastChatText}>{object.lastChatText}</Text>
                  </View>
                </View>
              );
            }, this)
          }
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
    marginBottom: 8,
    // textAlign: 'center',
  },
});

//module.exports = connect()(ChatList);
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    //navOnDidFocus: state.navigator.navOnDidFocus
    //result: state.chat.result
    //isLoading: state.chat.isLoading,
    navOnDidFocus: state.navigator.navOnDidFocus,
    personList: state.chat.result.items
  }
}

/*1st Method*/
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onTodoClick: (id) => {
//     //   dispatch(toggleTodo(id))
//     // }
//     test: () => {
//       dispatch(test())
//     }
//   }
// }
/*2nd Method*/
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({test}, dispatch);
// }

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListCom)

module.exports = ChatList
