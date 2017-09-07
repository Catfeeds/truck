import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

let { width, height } = Dimensions.get('window');

export default class MerchantIntroduce extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <ScrollView style={ styles.containers }>
        <View style={styles.contentView}>
          <Text style={styles.content}>
            { this.props.introduction }
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor:'#ffffff',
    padding: 20,
  },
  contentView: {
    minHeight: height-80,
  },
  content: {
    color: '#323232',
    fontSize: 14,
    lineHeight: 25,
  },
})
