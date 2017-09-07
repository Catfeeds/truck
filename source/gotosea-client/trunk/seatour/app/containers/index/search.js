import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  FlatList,
  View,
} from 'react-native';


import Tool from 'utils/tool';

import routeListStyle from 'styles/route/route-list';
import { Actions } from 'react-native-router-flux';
import IconSpan2 from 'components/common/icon-span2';

const { width, height }  = Dimensions.get('window');

export default class Search extends Component {
	constructor(props){
			super(props);
			this.state = {
        searchText: null,
        datas: ['珠海','广州','广州','广州','广州','广州','广州'],
        histories: ['珠海','广州','广州','广州','广州','广州','广州'],
			};
		}
    componentWillMount(){
      let me = this;
	    Actions.refresh({
          rightTitle: '搜索',
          rightButtonTextStyle: { color: '#34a5f0', fontSize: 15,},
	        onRight: () => {
            let { searchText } = me.state;
            me.search(searchText);
	        },
					renderTitle:()=>{
						return (
								<View style={routeListStyle.search}>
									<TextInput
										placeholder='搜索目的地/景点/酒店等'
										style={routeListStyle.searchText}
										returnKeyType = 'search'
										underlineColorAndroid='transparent'
                    clearButtonMode = 'always'
										onChangeText = {(text)=>{
											me.setState({searchText:text});
										}}
										onSubmitEditing = {(text)=>{
											me.search(text)
										}}
								/>
						</View>)
					}
	    });
      this.loadHistories();
		}
    loadHistories(){
      let { histories } = this.state;
      storage.getAllDataForKey('searchHistory')
        .then(histories => {
          this.setState({histories});
        });
    }
    search( text ){
      if(text){
        let id = text.replace('_','');
        storage.load({
          key: 'searchHistory',
          id: id,
        })
        .then(ret=>{})
        .catch(error=>{
            storage.save({
              key: 'searchHistory',
              id: id,
              data: text,
              expires: 1000 * 3600 * 24 * 31,
            })
            .then(ret=>{
              this.loadHistories();
            });
        });
      }

      Tool.to('searchResult', {searchText: text});
    }

	  render() {
      let { datas, histories } = this.state;
	    return (
  	       <ScrollView style={styles.container}>
            <Text style = { styles.title }>热门海岛</Text>
            <View style = { styles.hot }>
            {
              datas && datas.map((v,k)=>{
                return <TouchableOpacity key = {`hot-${k}`} style = { styles.hotItem } onPress = { this.search.bind(this,v)}>
                        <Text style = { styles.hotText }>{v}</Text>
                       </TouchableOpacity>
              })
            }
            </View>
            <Text style = { styles.title }>搜索历史</Text>
            <View style = { styles.history }>
            {
              histories && histories.map((v,k)=>{
                return <IconSpan2  key = {`history-${k}`} text = {v} style = {{paddingBottom: 25,}} textStyle = {{color: '#acacac', fontSize: 15,}} click = { this.search.bind(this,v) } />
              })
            }
            </View>

  	       </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#ffffff',
	  },
    title:{
      fontSize: 18,
      color: '#323232',
      paddingTop: 20,
      paddingLeft: 15,
      paddingBottom: 25,
    },
    hot:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
    },
    hotItem:{
      width: (width-60)/4,
      borderRadius: 30,
      borderColor: '#34a5f0',
      borderWidth: 1,
      height: 33,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    hotText:{
      fontSize: 14,
      color: '#34a5f0',
    },
    history:{
      marginLeft: 5,
    }
});
