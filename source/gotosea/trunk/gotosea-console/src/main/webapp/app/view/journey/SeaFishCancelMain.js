/**
 * 海钓取消行程退款
 */
Ext.define('Rich.view.journey.SeaFishCancelMain', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
        'Ext.form.FieldSet',
        'Rich.model.ExtJourney',
        'Ext.grid.column.Number',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.seafishcancelMain',
	
    id:null,
    loadById:function(id){
    	this.id = id;
    	var sto = this.lookupI('list').getStore();
		sto.getProxy().extraParams = {id:id};
		sto.loadPage(1);
    	this.show();
    },
    
	initComponent:function(){
		var me = this;
        var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Tuser',
	        pageSize: 50,
	        autoLoad:false,
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return 'get'},
		        url:Rich.Url.journeyTuserPath,
		        reader: {
		            type: 'json',
		            root: 'data',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[{
				xtype:'grid',
				itemId:'list',
				flex:1,
		    	forceFit:true,
		    	renderTo: Ext.getBody(),
		    	store: store,
		    	selModel: {
			        injectCheckbox: 0,
			        mode: "SIMPLE",
			        checkOnly: true
			    },
			    selType: "checkboxmodel",
			    bbar: Ext.create('Ext.PagingToolbar', {
		            store: store,
		            displayInfo: true,
		            displayMsg: '显示 {0} - {1} of {2}',
		            emptyMsg: "没有数据",
		            items:['-']
		        }),
			   columnLines: true,
			   columns: [
			   		{ text: '编号', dataIndex: 'id' },
			        { text: '姓名', dataIndex: 'name' },
			        { text: '收款金额', dataIndex: 'totalFee' },
			        { text: '退款金额', dataIndex: 'drawBack', editor: "textfield" }
			    ],
			    plugins: [
			        Ext.create('Ext.grid.plugin.CellEditing', {
			            clicksToEdit: 1
			        })
			    ],
				lookDetail:function(){
					//Ext.create('Rich.view.finance.BillMgrWindow').showById(record.get('id'));
					var grid = this.up('seafishcancelMain').lookupI('list');
					var rec = grid.getSelectionModel().getSelections();
					var id = rec.get('id');
					alert(id);
			    },
			    dockedItems:{
					xtype:'toolbar',
					ui:'footer',
					style:{float:'right'},
					items:[{
					xtype:'button',
					text:'确认',
					handler:function(btn){
						this.up('seafishcancelMain').lookupI('list').lookDetail();
						}
					}]
				}
			}]
		});
		this.callParent(arguments);
	}
});
