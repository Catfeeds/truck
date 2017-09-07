import Picker from 'react-native-picker';
import Tool from 'utils/tool';

export default WheelPicker = {
  config:{
    pickerTitleText: '',
    pickerConfirmBtnText: '确定',
    pickerCancelBtnText: '取消',
    pickerConfirmBtnColor: [52,165,240,1],
    pickerCancelBtnColor: [52,165,240,1],
    pickerBg:[255,255,255,1],
    pickerToolBarBg:[240,240,240,1],
  },
  getGroup(min, max, unit){
    let data = [];
    for(var i = min; i <= max; i++){
      let value = i.toString();
      if(value.length == 1 )value = '0'+value;
      if(unit)value += unit;
      data.push(value);
    }
    return data;
  },
  dateTimePicker(value,fn){

    let now = new Date();
    let year = this.getGroup(now.getFullYear(),now.getFullYear()+1);
    let mouth = this.getGroup(1, 12);
    let day = this.getGroup(1, 31);
    let h = this.getGroup(0, 23,'时');
    let m = this.getGroup(0, 59,'分');

    Picker.init({
        ...this.config,
        pickerData: [year,mouth,day,h,m],
        selectedValue: value || [],
        onPickerConfirm: data => {
          let date = data[0]+'-'+data[1]+'-'+data[2];
          let time = data[3].substring(0,data[3].length-1)+':'+data[4].substring(0,data[4].length-1);
          if(Tool.isFunction(fn))
            fn.call(this,data,date,time)
          console.log(date+' '+time+'    '+data);
        },
        onPickerCancel: data => {
          //console.log(data);
        },
        onPickerSelect: data => {
          //console.log(data);
        }
    });
    Picker.show();
  },
  timePicker(value,fn){
    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }
    let now = new Date();
    let h = this.getGroup(0, 23,'时');
    let m = this.getGroup(0, 59,'分');
    Picker.init({
        ...this.config,
        pickerData: [h,m],
        selectedValue: value || [],
        onPickerConfirm: data => {
          let time = data[0].substring(0,data[0].length-1)+':'+data[1].substring(0,data[1].length-1);
          if(Tool.isFunction(fn))
            fn.call(this, data, time)
          console.log(time);
        },
        onPickerCancel: data => {
          //console.log(data);
        },
        onPickerSelect: data => {
          //console.log(data);
        }
    });
    Picker.show();
  },
  /**
   * [cityPicker 省市选择]
   * @param  {[array]}   datas  [ {key:1, value: '广东'，items:[{key:2,value:'广州'}]} ]
   * @param  {[array]}   values [description]
   * @param  {Function} fn      [description]
   * @return {[type]}           [description]
   */
  cityPicker(datas, values, fn){
    let pickerData = [];
     datas.map((v,k)=>{
       let citys = [];
       v.items && v.items.map((vc,kc)=>{
         citys.push(vc.value);
       })
       pickerData.push({
         [v.value]: citys
       });
     })
    Picker.init({
        ...this.config,
        pickerData: pickerData,
        selectedValue: values || [],
        onPickerConfirm: data => {

          let keys = [];
          datas.map((v,k)=>{
            if(v.value == data[0]){
              keys.push(v.key);
              v.items.map((vc,kc)=>{
                if(vc.value == data[1])keys.push(vc.key);
              })
            }
          })
          let text = data[0]+'-'+data[1];
          fn.call( this,data, keys, text);
          console.log(data);
        },
    });
    Picker.show();
  }
};
