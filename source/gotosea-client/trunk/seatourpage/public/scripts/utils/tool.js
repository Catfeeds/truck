import React from "react"
import { render } from "react-dom"
import Alert from 'components/common/alert'
import Confirm from 'components/common/confirm'
import LoadToast from 'components/common/load-toast'
import Promise from 'promise'
import { getHistory } from 'scripts/wrap'

const Tool = {},
    clearableEventQueue = [],
    // filterUrls = ['reset', 'reset/succ', 'login', 'authentication', 'resign', 'resign/succ', 'resignAuthorize'],
    filterUrls = ['reset', 'reset/succ', 'login', 'authentication', 'resign', 'resign/succ'],
    AlertSg = singleton(() => {
        let ele = document.createElement('DIV');
        document.getElementById('util').appendChild(ele);
        return render( <Alert /> , ele)
    }),
    ConfirmSg = singleton(() => {
        let ele = document.createElement('DIV');
        document.getElementById('util').appendChild(ele);
        return render( <Confirm /> , ele)
    }),
    LoadingSg = singleton(() => {
        let ele = document.createElement('DIV');
        document.getElementById('util').appendChild(ele);
        return render( <LoadToast /> , ele)
    });

/**
 * 网络请求
 * @param {String}   url        请求地址
 * @param {Object}   params     参数
 * @param {Function} fn_succ    成功回调函数
 * @param {String}   loadMsg    load显示文字
 * @param {Boolean}  silent     是否隐藏loading 
 */
Tool.fetch = (url, params, fn_succ, loadMsg, silent) => {
    let msg_wait = false; 
    if(!silent){
    	Tool.showLoadToast(loadMsg);
    }
	let keys = '';
	if(params) {
	  	for(let k in params) {
	  		let p = params[k];
	  		if(Tool.isArray(p)) {
	  			p.map((v, i) => {
	  				keys += k + '[' + i + ']=' + v + '&';
	  			})
	  		} else {
	  			keys += k + '=' + p + '&';
	  		}
	  	}
	  	keys = keys.substring(0, keys.length - 1);
	}
	return fetch( url, {
  		method: 'POST',
  		credentials: 'include',
  		headers: {
  			'Content-Type': 'application/x-www-form-urlencoded',
  		},
  		body: keys
  	})
  	.then( response => {
  		!msg_wait && Tool.hideLoadToast();
  		return response.json();
  	})
  	.then((result) => {
  		if(result.code == 200) {
  			if(fn_succ && Tool.isFunction(fn_succ))
  				fn_succ.call(this, result.data);
  		}
  		//399未登录，398未实名
  		else if(result.code == '399')
  			Tool.alert('提示','请先登录')
  		else if(result.code == '398') {
  			Tool.alert('提示','未实名认证')
  		} else {
  			Tool.alert(result.errorMessage);
  		}
  		return;
  	})
  	.catch((error) => {
  		Tool.alert('错误','网络错误，信息提交失败');
  	});
}

/*
 *router: 路由名称
 *parms：该参数与路由设置对于，会作为url显示，支持使用数组； 可从this.props.params中获取
 *parameters：可作为页面跳转时复杂参数传递； 可从this.props.location.state中获取
 * */
Tool.to = (router, urlParms, parameters) => {
    let history = getHistory(),
        match,
        url = ( '/' + router ).replace('\\\\','\\');
    if (urlParms || urlParms == 0) {
        if (Tool.isArray(urlParms) && urlParms.length > 0) {
            urlParms.some((p, index) => {
                url += '/' + p;
            })
        } else {
            url += '/' + urlParms;
        }
    } else {
        url = url + '/';
    }
//  if( !!router && ( match = /[\/]?(.+)/.exec( router ) ).length > 0 && indexOf( filterUrls, match[ 0 ] ) === -1 ){
//      // console.info(`url:${ url } —— router:${ router }`)
//      /*存储路由信息，作为登录回跳用*/
//      Tool.saveSkipUrl(url);
//      Tool.saveParams(parameters);
//  }
    while( clearableEventQueue.length ) clearableEventQueue.shift().call()
    history.push({
        pathname: url,
        state: parameters
    });
}

Tool.back = () => {
    history.go(-1);
}

Tool.isFunction = function(v){
    return Object.prototype.toString.apply(v) === '[object Function]';
}

Tool.alert = function(title = "", info = "", fn = null, btnText = "", closeByMask = true) {
    AlertSg().show(title, info, fn, btnText, closeByMask)
}

Tool.confirm = function(title = "", info = "", fn = null) {
    ConfirmSg().show(title, info, fn)
}

Tool.showLoadToast = function(msg = "", closeable = false) {

    LoadingSg().show(msg, closeable)
}

Tool.hideLoadToast = function() {
        LoadingSg().hide();
}

Tool.fileUpload = (url, fileElementId, fn_succ, loadMsg, silent) => {
    Tool.showLoadToast();
    Tool.load('ajaxFileUpload')
        .then(() => {
            Tool.hideLoadToast();
            let msg_wait = silent ? null : Tool.showLoadToast(loadMsg || '图片上传中...');

            $.ajaxFileUpload({
                url: url,
                secureuri: false,
                fileElementId: fileElementId, //file控件id
                dataType: 'json',
                success: function(data, status) {
                    Tool.hideLoadToast();
                    if (Tool.isFunction(fn_succ)) {
                        fn_succ.apply(this, arguments);
                    } else {
                        Tool.alert('上传成功！');
                    }
                },
                error: function(data, status, e) {
                    Tool.hideLoadToast();
                    Tool.alert('上传失败！');
                }
            })
        })
}

Tool.getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

Tool.setTitle = (title) => {
    document.title = title;
    window.postMessage(title, window.location);
}

/*cookie操作*/
Tool.setCookie = (name, value, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

Tool.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

Tool.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Tool.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/*登录用户保存1个月*/
Tool.saveUser = (ret) => {
    let nowday = new Date();
    let expirationDate = nowday.add('d', 30);
    let userInfo = {
        version: ret.version,
        userId: ret.data.id,
        openId: ret.data.openId,
        status: ret.data.status,
        userName: ret.data.userName,
        phone: ret.data.phone,
        password: ret.data.password,
        name: ret.data.name,
        nickName: ret.data.nickName,
        loginDate: nowday.format('yyyy-MM-dd'),
        expirationDate: expirationDate.format('yyyy-MM-dd')
    }

    window.localStorage.setItem("userInfo", JSON.stringify(userInfo)); //转为json字符串	
}

Tool.getLoginId = () => {
    if (Tool.isLogin()) {
        return Tool.getLoginUser().userId
    }
}

Tool.getLoginUser = () => {
    let userInfo;
    if (Tool.isLogin()) {
        userInfo = window.localStorage.getItem('userInfo');
    }
    return JSON.parse(userInfo);
}

Tool.isLogin = () => {

    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo); //字符串转为json对象
        let nowday = new Date().format('yyyy-MM-dd')
        let expirationDate = userInfo.expirationDate;
        if (nowday < expirationDate && userInfo.userId && userInfo.userName) {
            return true;
        }
    } else {
        return false;
    }
}

/*登录超时或者未登录时回跳页面*/
//回跳url
Tool.saveSkipUrl = (url) => {
    window.localStorage.setItem("skipUrl", url);
}
Tool.clearSkipUrl = () => {
    window.localStorage.removeItem("skipUrl");
}
Tool.getSkipUrl = () => {
        return window.localStorage.getItem("skipUrl");
    }
    //回跳页面参数,该参数为to方法中的state
Tool.saveParams = (params) => {
    window.localStorage.setItem("params", params);
}
Tool.clearParams = () => {
    window.localStorage.removeItem("params");
}
Tool.getParams = () => {
    return window.localStorage.getItem("params");
}
Tool.viewImgs = function(imgs, currentImg) {
    wx.previewImage({
        current: currentImg || imgs[0],
        urls: imgs
    });
}

let resourceMap = {
	
    calendar: window.calenderUrl,
    touchSlider: "http://huayun-hl.oss-cn-shenzhen.aliyuncs.com/WeChat/vendors/jquery.touchSlider.js",
    ajaxFileUpload: {
        script: "http://huayun-hl.oss-cn-shenzhen.aliyuncs.com/WeChat/vendors/ajaxfileupload.js",
    },
    date: "http://huayun-hl.oss-cn-shenzhen.aliyuncs.com/WeChat/vendors/date.js",
    wx: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
    map: {
        script: ["http://api.map.baidu.com/api?v=2.0&ak=YGl2BqurgynhzfZNFbpsRcP21yDPq9ee&callback=BMapInit", "http://map.qq.com/api/js?v=2.exp&callback=qqMapInit"],
        extra() {
            return new Promise(resolve => {
                if (!!window.qq && !!qq.maps && !!qq.maps.LatLng && !!BMap)
                    resolve();
                let timer = setInterval(() => {
                    if (!!qq && !!qq.maps && !!qq.maps.LatLng && !!BMap) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 1000)
            })
        }
    },
    // test : ["http://www.cnblogs.com/bundles/blog-common.js?v=hH1lCMV8WaIu271Nx7jPuv36TENW9-RsSxziLxUpjtc1","https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/plugins/swfobject_0178953.js"]
}
let installed = []
Tool.load = function(name, linearLoad = false) {
    let promise = [];

    if (existed(name))
        return Promise.resolve();
    if(!resourceMap[name])
        return Promise.reject();

    if (Array.isArray(resourceMap[name]))
        promise = loadScript(resourceMap[name], name, linearLoad)
    else if( typeof resourceMap[name] === "object" ){
        if (!!resourceMap[name].script) {
            promise = loadScript(resourceMap[name].script, name, linearLoad)
        }
        if (!!resourceMap[name].link) {
            promise = promise.concat(loadStyle(resourceMap[name].link, name))
        }
    }
    else
        promise = loadScript(resourceMap[name], name, linearLoad)

    if (typeof resourceMap[name].extra === "function")
        promise.push(resourceMap[name].extra())

    return Promise.all(promise).then(() => {
        installed.push(name)
    });
}

function existed(name) {
    return installed.indexOf(name) != -1
}
function loadScript( path, name, linear ){
    return linear ? linearLoadScript( path, name ) : parallelLoadScript( path, name )
}
/*
    线性加载Script脚本
*/
function linearLoadScript( path, name ){
    let _path = Array.isArray(path) ? path : [path],
        gen = (function* (){
            for( let __path of _path ){
                yield new Promise((resolve, reject) => {
                    let script = document.createElement("SCRIPT");
                    script.type = "text/javascript";
                    script.src = __path;
                    script.setAttribute("__rs", name)
                    script.onload = function() {
                        resolve();
                    }
                    document.body.appendChild(script)
                })
            }
        })();
    return [new Promise( ( resolve, reject ) => {
        next();
        function next(){
            let _next = gen.next();
            if( _next.done )
                return resolve();
            _next.value.then( script => { 
                next()
            })
        }
    })]
}

/*
    并行加载Script脚本
*/
function parallelLoadScript(path, name) {
    let _path = Array.isArray(path) ? path : [path];
    return _path.map(v => {
        return new Promise((resolve, reject) => {
            let script = document.createElement("SCRIPT");
            script.type = "text/javascript";
            script.src = v;
            script.setAttribute("__rs", name)
            script.onload = function() {
                resolve();
            }
            document.body.appendChild(script)
        })
    })
}

function loadStyle(path, name) {
    let _path = Array.isArray(path) ? path : [path];
    return _path.map(v => {
        return new Promise((resolve, reject) => {
            let link = document.createElement("LINK");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = v;
            link.setAttribute("__rs", name)
            link.onload = function() {
                resolve();
            }
            document.body.appendChild(link)
        })
    })
}

function empty() {}
Tool.loadChunk = function(routes) {
    for (let _route of routes) {
        if (!!_route.getComponent)
            _route.getComponent(null, empty);
        routes.childRoutes && Tool.loadChunk(routes.routes.childRoutes)
    }
}


Tool.resetScroll = function(){
    document.body.scrollTop = 0;
}

Tool.singleton = singleton;

function singleton(fn) {
    let result;
    return () => result || (result = fn.apply(null, arguments));
}

Tool.isPromise = function( obj ){
    return 'function' === typeof obj.then;
}

Tool.valid = function( v ){
    for( let k in v ){
       if( v[k].require && ( !v[k].value || !String(v[k].value).trim() ) ) {
            Tool.alert(v[k].requireMsg )
            return;
        }else if( !!v[k].regx && !v[k].regx.test( v[k].value ) ){
            Tool.alert( v[k].msg )
            return;
        }
    }
    return true;
}

Tool.compareProps = function( props1, props2 ){
    let _keys = Object.keys( props1 ),
        keys = Object.keys( props2 ),
        len = keys.length;

    if( _keys.length !== len )
        return true;
    for( let i = len ; i-- ; ){
        if( props2[ keys[ i ] ] !== props1[ keys[ i ] ] ) return true;
    }
    return false;
}

Tool.cloneObj = function(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj), //序列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};

/**
 * ios微信上fixed定位在往下拖动的时候，元素不会移动
 * 需要在往下拖动的时候设置定位成absolute
 * 在放手的时候重新设置成fixed
 * @param  {DOMElement} body    容器；如：documebt.body
 * @param  {[DOMElement]} layout fixed 定位的节点对象
 */
Tool.fixFixed = function(body, layout) {
    if (/iPhone/i.test(window.navigator.userAgent)) {
        let hide = false;
        body.addEventListener('touchmove', touchmoveHandle, false )
        body.addEventListener('touchend', touchendHandle, false )
        function touchmoveHandle(){
            if (body.scrollTop < 0) {
                hide = true;
                setPosition(layout, 'absolute')
            } else if (hide) {
                hide = false;
                setPosition(layout, 'fixed')
            }
        }
        function touchendHandle(){
            if (hide) {
                hide = false;
                setTimeout(function() {
                    setPosition(layout, 'fixed')
                }, 300)
            }
        }

        function setPosition(node, position) {
            if (Array.isArray(node))
                node.map(v => v.style.position = position)
            else
                node.style.position = position
        }
        clearableEventQueue.push( (function( body, touchmoveHandle, touchendHandle ){
            return () => {
                body.removeEventListener( 'touchmove', touchmoveHandle )
                body.removeEventListener( 'touchend', touchendHandle )
            }
        })( body, touchmoveHandle, touchendHandle ))
    }
}

export default Tool;
