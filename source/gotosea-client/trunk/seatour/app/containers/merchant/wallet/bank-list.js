import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  View,
  Picker,
  TouchableOpacity
} from 'react-native';
import Tool from 'utils/tool';
import {Actions} from 'react-native-router-flux';
import Loading from 'components/common/loading';

export default class BankList extends Component{
  constructor(props) {
    super(props);
    let { ids, selectDates } = props;
    this.state = {
      loading_visible: false,
      bank: props.bank || null,
      bankImg: null,
      bankImgs: [
        require('images/merchant/bank/btn_icbc.png'),
        require('images/merchant/bank/btn_abc.png'),
        require('images/merchant/bank/btn_boc.png'),
        require('images/merchant/bank/btn_ccb.png'),
        require('images/merchant/bank/btn_bcm.png'),
        require('images/merchant/bank/btn_cmb.png'),
        require('images/merchant/bank/btn_spdb.png'),
        require('images/merchant/bank/btn_cctb.png'),
        require('images/merchant/bank/btn_ceb.png'),
        require('images/merchant/bank/btn_hxb.png'),
        require('images/merchant/bank/btn_cmbc.png'),
        require('images/merchant/bank/btn_gdb.png'),
        require('images/merchant/bank/btn_cib.png'),
        require('images/merchant/bank/btn_pnb.png'),
        require('images/merchant/bank/btn_hsb.png'),
        require('images/merchant/bank/btn_czb.png'),
        require('images/merchant/bank/btn_cbb.png'),
      ],
      datas: [],
    }
  }
  componentWillReceiveProps(props){
    let{ doRefresh } = props;
    if( doRefresh === true)this.fetch();
  }
  componentWillMount(){
    Actions.refresh({
        rightButtonImage: require('images/merchant/btn_gengduo.png'),
        onRight: () => {
          Tool.to('bankAdd');
        },
    });
    this.fetch();
  }
  back(){
    let { bank, bankImg } = this.state;
    Tool.back({refresh:({ bank, bankImg })})
  }
  fetch(){
    Tool.fetch(null, `${config.appUrlPath}rest/banks`,'get',null,(ret)=>{
      this.setState({datas: ret});
    })
  }
  listContent(){
    let { bank, datas, bankImgs } = this.state;
    let view;
    if(datas.length > 0){
      view = datas.map( (v,k)=>{
        let select = false;
        if(bank && bank.id == v.id)select = true;
        let img = bankImgs[v.bank-1];
        return <TouchableOpacity key = { 'bankno-' + k } style = { styles.itemView } onPress={ ()=>{ this.setState({bank:v, bankImg: img},()=>this.back())} }>
                <View style = { styles.item}>
                  <Image source = { img } style = { styles.bankLogo }/>
                  <View style = { styles.detail }  >
                    <Text style={ styles.name} >{ v.bankName }</Text>
                    <Text style={ styles.idCard} >{ `尾号${v.cardNo}储蓄卡` }</Text>
                  </View>
                  <View>
                    {select && <Image source={ require('images/community/btn_Ok_blue_s.png')} style={{ width: 16, height: 16 }}/>}
                    {!select && <View style = { styles.unSelect }/>}
                  </View>
                </View>
               </TouchableOpacity>
      });
    }
    return view;
  }
  render(){
    return(
      <ScrollView style = { styles.containers }>
        <Loading  visible = {this.state.loading_visible} />
        <View style = { styles.content }>
          { this.listContent() }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  add:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:15,
    paddingBottom: 15,
  },
  addIcocVIew:{
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon:{
    color: '#ffffff',
    fontSize: 12,
  },
  addText:{
    color: '#acacac',
    fontSize: 14,
    paddingLeft: 10,
  },
  content:{

  },
  itemView:{
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5,
  },
  item:{
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
  },
  touchView:{
    padding: 20,
    paddingLeft: 0,
  },
  touchViewRight:{
    padding: 20,
    paddingRight: 0,
  },
  detail:{
    flex: 1,
  },
  name:{
    fontSize: 14,
    color: '#323232',
    marginBottom: 2,
  },
  idCard: {
    fontSize: 17,
    color: '#323232',
  },
  unSelect:{
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: '#bdbdbd',
    borderWidth: 1,
  },
  bankLogo:{
    width: 29,
    height: 29,
    marginRight: 15,
  },
})
