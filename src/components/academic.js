/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    PixelRatio,
    RefreshControl,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var personList = [
  {name: 'Ethan Fox', img: require('../images/person-1.jpg'), lastChatText: 'Sweet! I heard they had a great time over at the cabin. Next time we should bring the croquest set.'},
  {name: 'John Son', img: require('../images/person-2.jpg'), lastChatText: 'You: Nope! We are good!'},
  {name: 'Marry', img: require('../images/person-3.jpg'), lastChatText: 'Oh yeah? Because I think no.:)'},
  {name: 'Steven', img: require('../images/person-4.png'), lastChatText: 'Oh yeah? Because I think no.:)'},
  {name: 'Hungary', img: require('../images/person-5.jpg'), lastChatText: 'Oh yeah? Because I think no.:)'},
];
module.exports = class Academic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loaded: false,
    };
  }
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.barInfoStyle}>
            <Icon name="info-circle" size={20} color="#fff"/>
            <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Class Informations</Text>
          </View>
          <View style={{padding:10,backgroundColor:'#f0f8ff'}}>
              <View style={{flex:1, flexDirection:'row',}}>
                <Text>Year:</Text><Text style={{fontWeight: 'bold'}}> Academic Year 2015-2016</Text>
                <Text style={{marginLeft:20}}>Grade:</Text><Text style={{fontWeight: 'bold'}}> Level 12</Text>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text>Class:</Text><Text style={{fontWeight: 'bold'}}> grade 12 A</Text>
              </View>
              <View style={{flex:1, flexDirection:'row',}}>
                <Text>Contact Info:</Text><Text style={{fontWeight: 'bold'}}> 012 3345 2455</Text>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text>Email:</Text><Text style={{fontWeight: 'bold'}}> elt.info@elt.kh.edu</Text>
              </View>
          </View>
        </View>
        <View>
          <View style={styles.barInfoStyle}>
            <Icon name="list-alt" size={20} color="#fff"/>
            <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Student Lists</Text>
          </View>
          <View>
            {this.personLists()}
          </View>
        </View>
        <View>
          <View style={styles.barInfoStyle}>
            <Icon name="file-text" size={20} color="#fff"/>
            <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Teachers And Subjects</Text>
          </View>
          <View>
            {this.personLists()}
          </View>
        </View>
      </ScrollView>
    );
  }
  personLists() {
    return personList.map(function(object, i){
      return(
        <View key={i} style={{flexDirection:'row', marginTop:5}}>
          <Image
            source={object['img']}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{object['name']}</Text>
            <Text style={styles.lastChatText}>{object['lastChatText']}</Text>
          </View>
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  barInfoStyle: {
    flex:1,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#4682B4',
    marginTop:10,
    borderRadius:5,
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
    borderRadius:25,
  },
  rightContainer: {
    flex: 1,
    marginRight: 10,
	  //backgroundColor: '#FF0000',
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    // textAlign: 'center',
  },
});
