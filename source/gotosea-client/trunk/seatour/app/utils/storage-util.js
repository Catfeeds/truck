/**
 * [StorageUtil 本地存储工具]
 * @type {Object}
 */

let StorageUtil = {};

/**
 * [save description]
 * @param  {[string]} key     [description]
 * @param  {[object]} value   [description]
 * @param  {[number]} expires [毫秒]
 * @return {[type]}         [description]
 */
StorageUtil.save = (key, value, expires) => {
  storage.save({
    key: key,
  	data: value,
  	expires: expires || null
  })
}

/**
* key: string
* params: object
*/
StorageUtil.load = (key, callback) => {
  StorageUtil.loadByParams(key, null, callback);
}
StorageUtil.loadByParams = (key, params, callback) => {
  storage.load({
    key: key,
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: params || null,
      someFlag: true,
    }
  })
  .then( ret => {
    callback.call( this, ret );
  })
  .catch( error => {
    //未知数据源或者过期返回null
    if( 'NotFoundError' == error.name || 'ExpiredError' == error.name)
      callback.call(this, null);
    else
      console.error('读取数据失败：' + error.message);
  })
}

StorageUtil.remove = ( key ) => {
  storage.remove({
    key: key
  })
}

StorageUtil.clearMap = () => {
  storage.clearMap();
}

export default StorageUtil;
