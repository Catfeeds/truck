import config from './config';
import {
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
import isEmpty from 'lodash/isEmpty'
import {Actions, ActionConst} from 'react-native-router-flux';

const Tool = {
};

/**
 * [fetch description]
 * @param  {[type]} cmp        [请求页面容器，主要用于显示loading加载框，传null时不显示加载框，加载款必须为	<Loading  visible={this.state.loading_visible}]  />]
 * @param  {[type]} url        [请求地址]
 * @param  {[type]} method     [必传请求方式：get、post、put、update、delete]
 * @param  {[type]} params     [参数]
 * @param  {[type]} fn_succ    [成功回调]
 * @return {[type]}            [description]
 */
Tool.fetch = (cmp, url, method, params, fn_succ, fn_error) => {
  let keys = '';
  if(params){
    for(let k in params){
      let p = params[k];
      if(Tool.isArray(p)){
        p.map((v,i)=>{
          keys += k+'['+i+']='+v+'&';
        })
      }else{
        keys += k+'='+p+'&';
      }
    }
    keys = keys.substring(0,keys.length-1);
  }
  if(!method){
    Tool.alert('请传人请求方式');
    return;
  }
  cmp && cmp.setState({ loading_visible: true });
  if(keys && method == 'get')url = url + '?' + keys;
  let options = {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if(method != 'get'){
    options['body'] = JSON.stringify(params);
  }
  return fetch(url, options)
  .then( (response) => {
    cmp && cmp.setState({ loading_visible: false })
    return response.json();
  } )
  .then( (result ) => {
      console.log(url+'?'+keys);
      console.log(result);
      if( !result.code || result.code == 200 || result.code == 'success'){
        if(fn_succ && Tool.isFunction( fn_succ ))
          fn_succ.call(this, result.data);
      }
      else if(result.code == 'unauthorized')
        Tool.to('login')
      else{
        if(fn_error && Tool.isFunction( fn_error ))
          fn_error.call(this, result.data);
        setTimeout(()=>{
          Tool.alertLong(result.message);
        },500)
      }
      return;
  })
  .catch((error) => {
    cmp && cmp.setState({ loading_visible: false })
    if(fn_error && Tool.isFunction( fn_error ))
      fn_error.call(this, error);
      setTimeout(()=>{
        Tool.alertLong('网络错误，信息提交失败');
      },500)
  });
}

Tool.upload = (cmp, url, imgArray, fn_succ) => {
  if(imgArray.length<=0)return;
   let formData = new FormData();
    for(var i = 0;i<imgArray.length;i++){
        let file = {uri: imgArray[i].uri, type: 'multipart/form-data', name: imgArray[i].fileName};
        formData.append("files",file);
    }
    cmp && cmp.setState({ loading_visible: true })
    fetch(`${urlPath}oss/uploadFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    .then( (response) => response.json() )
    .then( (result ) => {
        cmp && cmp.setState({ loading_visible: false })
        if( !result.code ){
          if(fn_succ && Tool.isFunction( fn_succ ))
            fn_succ.call(this, result.data);
        }else{
            Tool.alertLong('图片上传失败：'+result.alertMsg);
          return;
        }
        return;
    })
    .catch((error) => {
      cmp && cmp.setState({ loading_visible: false });
        Tool.alert('网络出错：'+error.message)
    });
}

/**
 *接收参数： this.props.KEY_NAME
 */
Tool.to = (key, params) => {
  let routeAction = Actions[key];
  routeAction(params);
}

Tool.back = ( params ) => {
  Actions.pop( params );
}

Tool.alert = (content, isAlert) => {
  Tool.alertShort(content, isAlert);
}

Tool.alertShort = (content, isAlert) => {
  if(!content)content = '未知错误'
  if(isAlert || Platform.OS === 'ios')
    Alert.alert('提示', content.toString())
  else
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT)
}

Tool.alertLong = (content, isAlert) => {
  if(!content)content = '未知错误'
  if(isAlert || Platform.OS === 'ios')
    Alert.alert('提示', content.toString())
  else
    ToastAndroid.show(content.toString(), ToastAndroid.LONG)
}

Tool.isArray = (arr) => {
    return Object.prototype.toString.call(arr).toLowerCase() === '[object array]';
}

Tool.isFunction = function(v){
    return Object.prototype.toString.apply(v) === '[object Function]';
}
Tool.isEmpty = function(v, allowBlank) {
    return v === null || v === undefined || ((Tool.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
}

/**
*数组合并去重：将来arr2合并到arr1后面
*/
Tool.concat = (arr1, arr2) => {
  if(!Tool.isArray(arr1))arr1=[];
  if(!Tool.isArray(arr2))arr2=[];
  let array = arr1.concat();
  for (var i = 0; i < arr2.length; i++) {
    array.indexOf(arr2[i])===-1?array.push(arr2[i]):0
  }
  return array;
}

/**
* 发送POST请求
* fetch默认使用 multipart/form-data（支持图片异步上传）
* 由于现有Java服务器无法接收到 multipart/form-data 文本，所以统一使用 application/x-www-form-urlencoded
* @param  {String} url     post链接
* @param  {Object} params  post参数
* @param  {String} enctype
* 1 application/x-www-form-urlencoded
* 2 text/plain
* 默认multipart/form-data
*/
Tool.post = function( url, params, enctype ){
  let body,
      headers = new Headers(),
      request;
  switch( enctype ){
      case 2:
          headers.append('Content-Type','text/plain; charset=UTF-8')
          body = stringifyParam( params );
          break;
      case 3:
          headers.append('Content-Type', 'application/json;charset=utf-8')
          body = JSON.stringify( params );
          break;
      case 1:
          headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
      default:
          body = new FormData();
          if( !isEmpty( params ) ){
              if( params instanceof FormData ){
                body = params;
              }
              else {
                for( let key in params ){
                    body.append( key, params[ key ] )
                }
              }
          }
          break;
  }
  request = new Request( url, {
      method : 'POST',
      credentials: "include",
      body : body || {},
      headers : headers || {},
  } )
  return catchHandle( fetch( request ) );
},
Tool.uploadImage = function( url, images ){

}
/**
* 发送get请求
* @param  {String} url    请求路径
* @param  {Object} params 请求参数
* @return {Promise}
*/
Tool.get = function( url, params ){
  if( !isEmpty( params ) ) url += `?${ stringifyParam( params ) }`;
  let request = new Request( url, {
      method : 'GET',
      credentials: "include",
  } )
  return catchHandle( fetch( request ) );
}

/**
* fetch( type, url, params )
* fetch( url, params )
* @param  {[type]} type   [description]
* @param  {[type]} url    [description]
* @param  {[type]} params [description]
* @return {[type]}        [description]
*/
// Tool.fetch = function( type, url, params = {}){
//   let headers,
//       body,
//       regx = new RegExp(type,'i'),
//       promise,
//       _url,
//       _params,
//       _type;
//   const types = 'GET,POST,PUT';
//
//   if( !regx.test( types ) ){
//       _type = "GET";
//       _url = type;
//       _params = url;
//   }else{
//       _type = type.toUpperCase();
//       _url = url;
//       _params = params;
//   }
//
//   switch( _type ){
//       case "GET":
//       case "HEAD":
//           promise = this.get( _url, _params );
//           break;
//       case "POST":
//           promise = this.post( _url, _params, 1)
//           break;
//       case "PUT":
//           body = JSON.stringify( params );
//           headers = new Headers()
//           headers.append('Content-Type', 'application/json;charset=utf-8')
//           promise = fetch(new Request( url, {
//                   method : 'PUT',
//                   credentials: "include",
//                   body : body || {},
//                   headers : headers || {},
//               }));
//           break;
//       default:
//           promise = this.post( _url, _params )
//           break;
//   }
//   return catchHandle( promise );
// }

export function stringifyParam( params ){
    if( isEmpty( params ) )
        return null;
    let arr = [];
    if( Array.isArray( params ) ){
        for( let i in params ){}
    }else
        recursive( params, arr )
    function recursive( rawObj, outArr, prefix = '' ){
        for( let key in rawObj ){
            if( Array.isArray( rawObj[key] ) ){
                if( typeof rawObj[key][0] === 'object' )
                    rawObj[key].forEach( ( v, i ) => recursive( v, outArr, `${ prefix }${ key }[${i}].` ) )
                else
                    rawObj[key].forEach( v => outArr.push( `${ prefix }${ key }=${ v }` ) )
            }else
                outArr.push( `${ prefix }${ key }=${ rawObj[key] }`)
        }
    }
    return arr.join("&");
}

// DateTool.dateToString = function( date = new Date(), pattern = "YYYY-MM-DD" ){
//   if( !(date instanceof Date) ) date = new Date( date )

//   let __year = date.getFullYear(),
//       __month = date.getMonth() + 1,
//       __date = date.getDate(),
//       __hour = date.getHours(),
//       __minute = date.getMinutes(),
//       __second = date.getSeconds();
//   return pattern.replace(/(YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s)/g,function( a, b ){
//     switch( a ){
//       case "YYYY":
//         return __year
//       case "YY":
//         return __year.substr(2)
//       case "MM":
//         return __month <= 9 ? ( "0" + __month ) : __month
//       case "M":
//         return __month
//       case "DD":
//         return __date <= 9 ? ( "0" + __date ) : __date
//       case "D":
//         return __date
//       case "hh":
//         return __hour <= 9 ? ( "0" + __hour ) : __hour
//       case "h":
//         return __hour
//       case "mm":
//         return __minute <= 9 ? ( "0" + __minute ) : __minute
//       case "m":
//         return __minute
//       case "ss":
//         return __second <= 9 ? ( "0" + __second ) : __second
//       case "s":
//         return __second
//       default:
//         return a
//     }
//   })
// }
/**
 * 处理异步错误
 * @param  {Promise} promise
 * @return {Promise}
 */
function catchHandle( promise ){

  return promise.then( response => {
    if( response.status === 200 )
      return response.json()
    else
      throw new Error("系统错误，请联系客服")
  })
  .then( json => {
      if( json.code === "success" ){
          return json.data
      }else{
          let e = new Error(json.message);
          e.name = json.code;
          throw e;
      }
  })
  .catch( e => {
      switch( e.name ){
        case "unauthorized":
          Actions.login()
          break;
        default:
          Tool.alertLong( e.message );
          break;
      }
      throw e;
  })
}

export default Tool;
