import {
  Platform
} from 'react-native';
import AliyunOSS from 'react-native-aliyun-oss-cp';
import ImagePicker from 'react-native-image-picker';
import Tool from './tool';
import StorageUtil from '../utils/storage-util';

/**
 * [OssUtils 阿里oss上传工具]
 * @type {Object}
 */
export default OssUtils = {
  /**
   * [upload description]
   * @param  {[object]} cmp        [父容器，为null时不显示loading提示]
   * @param  {[string]} sourceFile [文件源路径]
   * @param  {[string]} folder     [oss存储文件路径]
   * @param  {[object]} fn_succ    [成功回调]
   * @return {[type]}            [description]
   */
  upload(cmp, sourceFile, folder, fn_succ){
    let me = this;
    StorageUtil.load('osstoken',(ret)=>{
      if(ret){
        me.ossUpload(ret.accessKeyId, ret.accessKeySecret,  ret.securityToken, cmp, sourceFile, folder, fn_succ)
      }else{
        // 获取oss上传凭证，有效期1个小时
        Tool.fetch(cmp, `${config.appUrlPath}rest/oss/token`, 'get', null, (ret)=>{
          let token = {
            accessKeyId: ret.AccessKeyId,
            accessKeySecret: ret.AccessKeySecret,
            securityToken: ret.SecurityToken
          }
          StorageUtil.save('osstoken', token, 3600*1000);
          me.ossUpload(ret.AccessKeyId, ret.AccessKeySecret,  ret.SecurityToken, cmp, sourceFile, folder, fn_succ)
        })
      }
    });
  },
  ossUpload(accessKeyId, accessKeySecret, securityToken, cmp, sourceFile, folder, fn_succ){
    let ossFile = folder + this.randomFileName(sourceFile);
    let result = {
      url: ossFile,   //相对路径
      fullUrl: config.ossPath + ossFile  //完整路径
    }
    AliyunOSS.enableOSSLog();
    const ossConfig = {
      AccessKey: accessKeyId,
      SecretKey: accessKeySecret,
      SecretToken: securityToken
    };
    AliyunOSS.initWithKey(ossConfig, config.endPoint);
    const uploadConfig = {
      bucketName: config.bucketName,
      sourceFile: sourceFile, //文件地址
      ossFile: ossFile //上传地址（相对目录）
    };
    // 上传进度
    const uploadProgress = p => console.log(p.currentSize / p.totalSize);
    // 增加上传事件监听
    AliyunOSS.addEventListener('uploadProgress', uploadProgress);
    // 执行上传
    cmp && cmp.setState({ loading_visible: true });
    AliyunOSS.uploadObjectAsync(uploadConfig).then((resp) => {
      cmp && cmp.setState({ loading_visible: false });
      AliyunOSS.removeEventListener('uploadProgress', uploadProgress);
      console.log(resp);
      if((resp == true || resp == 'UploadSuccess') && Tool.isFunction(fn_succ)){
        fn_succ.call(this, result);
      }else{
        Tool.alertLong('上传失败');
      }

    }).catch((err)=>{
      cmp && cmp.setState({ loading_visible: false });
      Tool.alertLong('上传失败');
    });
  },
  /**
   * oss上传目录+名称拼接
   * @param  {[string]} sourceFile [原文件路径]
   * @return {[type]}            [description]
   */
  randomFileName(sourceFile) {
    let ossFile = null;
    if(sourceFile){
      let now = new Date();
      let index = sourceFile.lastIndexOf('/');
      let name = sourceFile.substring(index+1, sourceFile.length);
      let dateFolder = now.format('yyyy/MM/dd');
      let dateStr = now.format('yyyyMMddhhmmss');
      let str = parseInt(100*Math.random());
      ossFile = dateFolder+'/'+dateStr+str+name;
    }
    return ossFile;
  },
  uploadImage(cmp, callback){
    var options = {
      title: '请选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle:'从相册选择',
      quality: 0.8,
      noData: false,
      mediaType: 'photos',
      durationLimit: 10,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options,(response) => {
      console.log(response);
      if(response.didCancel)return;
      //压缩到80%后图片不能超过5M
      if(response.fileSize > 5120000){
        Tool.alertLong('图片最大不能超过5M');
        return;
      }
      let source = '';
      if (Platform.OS === 'android') {
          source = response.uri
      } else {
          source = response.uri.replace('file://', '');
      }
      this.upload(cmp, source, config.imagesFolder,(ret)=>{
        if(Tool.isFunction(callback))
          callback.call(this, ret);
      });
    });
  }
}
