/**
 * [config 系统配置]
 * @type {Object}
 */

let config = {};
//__DEV__为React Native全局变量，用于指示当前运行环境是否是开发环境,
if(__DEV__){
  config = {
    version: 1.0,
    appUrlPath: 'http://192.168.0.189:8081/app/',        //app业务端地址
    consoleUrlPath: 'http://192.168.0.117:8080/fishsea/',    //后台管理业务端地址
    communityUrlPath: 'http://192.168.0.117:8080/fishsea/',  //社区业务地址
    pagePath: 'http://192.168.0.117/seatourpage/',
    ossPath: 'https://gotosea.oss-cn-shenzhen.aliyuncs.com/',
    endPoint: 'oss-cn-shenzhen.aliyuncs.com',
    bucketName: 'gotosea',
    imagesFolder: 'attachment/app-dev/images/',
    videoFolder: 'attachment/app-dev/video/',
    wechatAppID: 'wx976f7abc4511cc42',
    wechatAppSecret: '9013ce795391188da430bdff13e9b5e3',
    phone: 4000042010,
    ajaxPath: 'http://192.168.0.15:8081'
  }
}else{
  config = {
    version: 1.0,
    appUrlPath: 'https://app.gotosea.com.cn/',
    consoleUrlPath: 'http://www.gotosea.com.cn/fishsea/',
    communityUrlPath: 'http://www.gotosea.com.cn/fishsea/',
    pagePath: 'http://www.gotosea.com.cn/seatourpage/',
    ossPath: 'https://gotoea.oss-cn-shenzhen.aliyuncs.com/',
    endPoint: 'oss-cn-shenzhen.aliyuncs.com',
    bucketName: 'gotosea',
    imagesFolder: 'attachment/app-prod/images/',
    videoFolder: 'attachment/app-prod/video/',
    wechatAppID: 'wx976f7abc4511cc42',
    wechatAppSecret: '9013ce795391188da430bdff13e9b5e3',
    phone: 4000042010,
  }
}
global.config = config;
export default config;
