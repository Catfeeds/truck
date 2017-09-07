<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
//String ExtBasePath = "http://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/ext/";
String ExtBasePath = "ext6/";
%>
<%  
	String path = request.getServerName() + ":" + request.getServerPort() + request.getContextPath();  
%>
<!DOCTYPE HTML>
<html class="x-viewport">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>海约后台管理系统</title>
    <link rel="shortcut icon" href="../favicon.ico" />
    <!-- 
    <link rel="stylesheet" type="text/css" href="<%=ExtBasePath%>build/classic/theme-neptune/resources/theme-neptune-all.css">
     -->
    <link rel="stylesheet" type="text/css" href="<%=ExtBasePath%>build/classic/theme-triton/resources/theme-triton-all.css">
    <!--  
    	<link rel="stylesheet" type="text/css" href="extlib3/calendar/resources/css/calendar.css">
    -->
    <link rel="stylesheet" type="text/css" href="resources/override.css">
    
    <link rel="stylesheet" type="text/css" href="/resources/icons.css">
    <link rel="stylesheet" type="text/css" href="resources/public.css">
    <link rel="stylesheet" type="text/css" href="resources/login.css">
    <link rel="stylesheet" type="text/css" href="resources/admin.css">
    <!-- 
    <link href="resources/skin/skin.css" rel="stylesheet" type="text/css" />
	<link href="" rel="stylesheet" type="text/css" id="skinCss"/>
	 -->
    <script type="text/javascript" src="<%=ExtBasePath%>build/ext-all.js"></script>
    <!--
    <script type="text/javascript" src="<%=ExtBasePath%>build/classic/theme-neptune/theme-neptune.js" defer></script>
    -->
     
    <script type="text/javascript" src="<%=ExtBasePath%>build/classic/theme-triton/theme-triton.js" defer></script>
     
    <script type="text/javascript" src="<%=ExtBasePath%>build/classic/locale/locale-zh_CN.js"></script>
    <script type="text/javascript">
    Ext.ExtBasePath = '<%=ExtBasePath%>';
    Ext.ServerPath = '<%=path%>';
    </script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="admin.js?a=b"></script>
</head>
<body>

<div id="loading" style="border:/*1px solid #157fcc;*/border-radius:3px;-moz-border-radius:3px;/*background:#FFF;*/position:absolute;left:50%;top:50%;width:150px;height:50px;margin-left:-75px;margin-top:-25px;z-index:30000;">
	<img src="resources/images/loading/large-loading.gif" style="margin:10px;float:left;vertical-align:top;"/>
	<br/>
	<span id="loading-msg" style="display:block;margin:5px;color:#d1d1d1;">加载中...</span>
</div>
</body>
</html>