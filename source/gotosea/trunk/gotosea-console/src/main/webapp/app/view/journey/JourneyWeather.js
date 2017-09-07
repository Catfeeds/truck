/**
 * 评价界面
 */
Ext.define('Rich.view.journey.JourneyWeather', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.form.field.File',
        'Ext.toolbar.Paging',
        'Rich.model.Evaluate',
        'Rich.component.DicComboBox',
        'Rich.Value',
        'Rich.Url'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.journeyweather',
    id:null,
    loadById:function(id){
    	this.id = id;
		var sto = this.lookupI('grid').getStore();
		sto.getProxy().extraParams = {id:id};
		sto.loadPage(1);
	},
	
	initComponent:function(){
		var me = this;
		var store = Ext.data.Store({
			model: "Rich.model.Weather",
			autoDestroy: true,
	        groupField:'spotName',
	    	autoLoad:false,
	    	proxy: {
		         type: 'ajax',
		         url: Rich.Url.journeyWeatherPath,
		         reader: {
		             type: 'json',
		             idProperty: 'id',
		             root: 'data'
		         }
		     }
	    });
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'gridpanel',
				itemId:'grid',
				features: [{ftype:'grouping'}],
				loadMask: true,					
				padding:'0',
				bodyStyle:'',
				selType: 'checkboxmodel',
		    	forceFit:true,
		    	store: store,
			   	/*bbar: Ext.create('Ext.PagingToolbar', {
		            store: store,
		            displayInfo: true,
		            displayMsg: '显示 {0} - {1} of {2}',
		            emptyMsg: "没有数据",
		            items:['-']
		        }),*/			  
			   	columnLines: true,
			   	columns:{
	            	defaults: {
				        sortable:false,
				        draggable:false,
				        enableColumnHide:false,
				        menuDisabled:true
				   },
				   	items:[
	            		{text:'地点',dataIndex:'spotName',flex:1},
	            	  	{text: '星期', dataIndex: 'weekDay',flex: 1,renderer:function(v){
		            	  	switch(v){
		            	  		case 0:return '星期一';
		            	  		case 1:return '星期二';
		            	  		case 2:return '星期三';
		            	  		case 3:return '星期四';
		            	  		case 4:return '星期五';
		            	  		case 5:return '星期六';
		            	  		case 6:return '星期日';
		            	  	}
		            	  	return v;
		            	  }}
	            	 	,{text: '天气', dataIndex: 'weatherName',flex: 1 }
		             	,{text: '浪高', dataIndex: 'waveHeight',flex: 1 }
		             	,{text: '白天气温', dataIndex: 'tempDay',flex: 1}
		             	,{text: '夜晚气温', dataIndex: 'tempNight',flex: 1 }
		             	]}
			}]
		});
		me.callParent(arguments);
	}
});
