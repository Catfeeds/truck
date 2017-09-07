Ext.define('Rich.JsonAjax', {
    extend: 'Ext.data.Connection',
    requires:[
    	'Ext.window.MessageBox',
    	//'Rich.util.Relax',
		'Rich.widget.Message'
    ],
    singleton: true,
    autoAbort: false,
    autoRefresh:false,
    setupUrl: function(options, url) {
        var form = this.getForm(options);
        if (form) {
            url = url || form.action;
        }
        //if(url.indexOf('/') == -1){
        //	url = '../json/'+ url;
        //}
        return url;
    },
    onComplete: function(request,xdrResult) {
        var me = this,
            options = request.options,
            result,
            success,
            response;
        try {
            result = me.parseStatus(request.xhr.status);
        } catch (e) {
            result = {
                success : false,
                isException : false
            };
        }
        success = me.isXdr ? xdrResult : result.success;
        if (success) {
            response = me.createResponse(request);
            me.fireEvent('requestcomplete', me, response, options);
            Ext.callback(options.success, options.scope, [response, options]);
        } else {
            if (result.isException || request.aborted || request.timedout) {
                response = me.createException(request);
            } else {
                response = me.createResponse(request);
            }
            me.fireEvent('requestexception', me, response, options);
            Ext.callback(options.failure, options.scope, [response, options]);
        }
        if(response.failture){
        	success = false;
        }
        Ext.callback(options.callback, options.scope, [options, success, response]);
        delete me.requests[request.id];
        return response;
    },
    /*parseStatus: function(status) {
        status = status == 1223 ? 204 : status;
        var success = (status >= 200 && status < 300) || status == 304,
            isException = false;
        if (!success) {
            switch (status) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:isException = true;break;
            }
        }
        if(status == 399 && this.autoRefresh){
        	window.location.reload();
        }
        return {
            success: success,
            isException: isException
        };
    },*/
    /**
     * Creates the response object
     * @private
     * @param {Object} request
     */
    createResponse : function(request) {
    	debugger
        var me = this,
            xhr = request.xhr,
            isXdr = me.isXdr,
            headers = {},
            lines = isXdr ? [] : xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, response, byteArray;
        while (count--) {
            line = lines[count];
            index = line.indexOf(':');
            if (index >= 0) {
                key = line.substr(0, index).toLowerCase();
                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }
                headers[key] = line.substr(index + 1);
            }
        }
        request.xhr = null;
        delete request.xhr;
        response = {
        	failture:false,
            request: request,
            requestId: request.id,
            status: xhr.status,
            statusText: xhr.statusText
            /*,getResponseHeader: function(header) {
                return headers[header.toLowerCase()];
            },
            getAllResponseHeaders: function() {
                return headers;
            }*/
        };
        if (isXdr) {
            me.processXdrResponse(response, xhr);
        }
        if (request.binary) {
            response.responseBytes = me.getByteArray(xhr);
        } else {
            response.responseText = xhr.responseText;
            if(xhr.status === 0){
    			response.responseText = '{"code":0,"alertType":4,"alertMsg":"连接不到服务器(服务器端停止或网络异常)"}';
            }
            response.responseXML = xhr.responseXML;
            try{
            	var resText = Ext.String.trim(response.responseText);
            	if(resText == ''){
            		response.responseJson = null;
            	}else{
            		if(xhr.status != 200 || !request.options.notDecode){
		        		var jsonRes = response.responseJson = Ext.decode(resText);
				        var alertType = jsonRes.alertType;
				        var status = parseInt(jsonRes.code);
				        var alertMsg = jsonRes.alertMsg;
				        if(status != 0 && status != 200){
				        	response.failture = true;
				        }
				        if(status == 399){
				        	if(this.autoRefresh){//已经进入系统
				        		alertType = parseInt(alertType);
				        		alertMsg = decodeURIComponent(alertMsg);
				        		if(alertType != 0){
				        			alert(alertMsg);
				        		}
				        		window.location.reload();
				        		return null;
				        	}else{//尚未进入系统
				        		return response;
				        	}
				        	
				        }
				        if(alertType && alertMsg){
				        	alertType = parseInt(alertType);
				        	alertMsg = decodeURIComponent(alertMsg);
				        	if(alertType == 1){
				    			Rich.Msg.alert('消息',alertMsg);//无需关闭的提示
					    	}else if(alertType == 2){
					    		Ext.Msg.alert('消息',alertMsg);//需要关闭的提示
					    	}else if(alertType == 3){
					    		Rich.Msg.error('错误',alertMsg);//无需关闭的错误
					    	}else if(alertType == 4){
					    		Ext.Msg.error('错误',alertMsg);//需要关闭的错误
					    	}
				        }
            		}
            	}
            }catch(e){
            	response.failture = true;
            	console.error('json数据格式不正确');
            	Rich.Msg.error('错误','json数据格式不正确');
            }
        }
        xhr = null;
        return response;
    },
    createException : function(request) {
        return {
            request : request,
            requestId : request.id,
            status : request.aborted ? -1 : 0,
            statusText : request.aborted?'连接被取消':'连接失败',
            aborted: request.aborted,
            timedout: request.timedout
        };
    }
},function(){
	Ext.onInternalReady(function() {
		Ext.Msg.error = function(title,msg){
			Ext.Msg.show({
			    title: title,
			    msg: msg,
			    minWidth: this.minWidth,
			    buttons: Ext.Msg.OK,
			    //multiline: true,
			    fn: Ext.emptyFn,
			    //animateTarget: 'addAddressBtn',
			    icon: Ext.window.MessageBox.INFO
			});
		};
	});
	/*
	Ext.define('Rich.ProxyAjax',{
		override:'Ext.data.proxy.Ajax',
		doRequest: function(operation, callback, scope) {
	        var writer  = this.getWriter(),
	            request = this.buildRequest(operation);
	        if (operation.allowWrite()) {
	            request = writer.write(request);
	        }
	        Ext.apply(request, {
	        	notDecode     : true,//不自动转换json
	            binary        : this.binary,
	            headers       : this.headers,
	            timeout       : this.timeout,
	            scope         : this,
	            callback      : this.createRequestCallback(request, operation, callback, scope),
	            method        : this.getMethod(request),
	            disableCaching: false
	        });
	        Rich.JsonAjax.request(request);
	        return request;
	    }
	});
	
	*/
	
	Ext.define('Rich.data.request.Ajax',{
		override:'Ext.data.request.Ajax',
	    createResponse: function(xhr) {
	        var me = this,
	            isXdr = me.isXdr,
	            headers = {},
	            lines = isXdr ? [] : xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
	            count = lines.length,
	            line, index, key, response, byteArray;
	 
	        while (count--) {
	            line = lines[count];
	            index = line.indexOf(':');
	            
	            if (index >= 0) {
	                key = line.substr(0, index).toLowerCase();
	                
	                if (line.charAt(index + 1) == ' ') {
	                    ++index;
	                }
	                
	                headers[key] = line.substr(index + 1);
	            }
	        }
	        
	        response = {
	            request: me,
	            requestId: me.id,
	            status: xhr.status,
	            statusText: xhr.statusText,
	            getResponseHeader: me._getHeader,
	            getAllResponseHeaders: me._getHeaders
	        };
	 
	        if (isXdr) {
	            me.processXdrResponse(response, xhr);
	        }
	 
	        if (me.binary) {
	            response.responseBytes = me.getByteArray(xhr);
	        }
	        else {
	            response.responseText = xhr.responseText;
	            response.responseXML = xhr.responseXML;
	            if(xhr.status === 0){
	    			response.responseText = '{"code":0,"alertType":4,"alertMsg":"连接不到服务器(服务器端停止或网络异常)"}';
	            }
	            try{
	            	var resText = Ext.String.trim(response.responseText);
	            	if(resText == ''){
	            		response.responseJson = null;
	            	}else{
	            		var jsonRes = response.responseJson = Ext.decode(resText);
	            		//if(xhr.status == 200){
			        		//var jsonRes = response.responseJson = Ext.decode(resText);
					        var alertType;//= '3';//jsonRes.alertType;
					        var code = jsonRes.code;
					        if(code == 'success' || code == 'SUCCESS'){
					        	code='200';
					        }
					        var status = parseInt(code);
					        var alertMsg = jsonRes.message;
					        if(status != 0 && status != 200){
					        	response.failture = true;
					        	response.status = status;
					        }
					        if(status == 399){
					        	if(Rich.JsonAjax.autoRefresh){//已经进入系统
					        		alertType = parseInt(alertType);
					        		alertMsg = decodeURIComponent(alertMsg);
					        		if(alertType != 0){
					        			alert(alertMsg);
					        		}
					        		window.location.reload();
					        		return null;
					        	}else{//尚未进入系统
					        		return response;
					        	}
					        	
					        }
					        alertType =  status == 200?1:3;
					        if(alertType && alertMsg){
					        	alertType = parseInt(alertType);
					        	alertMsg = decodeURIComponent(alertMsg);
					        	if(alertType == 1){
					    			Rich.Msg.alert('消息',alertMsg);//无需关闭的提示
						    	}else if(alertType == 2){
						    		Ext.Msg.alert('消息',alertMsg);//需要关闭的提示
						    	}else if(alertType == 3){
						    		Rich.Msg.error('错误',alertMsg);//无需关闭的错误
						    	}else if(alertType == 4){
						    		Ext.Msg.error('错误',alertMsg);//需要关闭的错误
						    	}
					        }
	            		//}else{
	            			//其他错误
	            		//}
	            	}
	            }catch(e){
	            	response.failture = true;
	            	console.error('json数据格式不正确');
	            	Rich.Msg.error('错误','json数据格式不正确');
	            }
	        }
	 
	        return response;
	    }
	});
	
	
});
