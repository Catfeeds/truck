Ext.define('Rich.view.homepage.Calendar', {
	requires:[
        'Rich.Value',
        'Rich.Url',
        'Ext.layout.container.Absolute',
        'Ext.calendar.util.Date',
        'Ext.calendar.CalendarPanel',
        'Ext.calendar.data.MemoryCalendarStore',
        'Ext.calendar.data.MemoryEventStore',
        'Ext.calendar.data.Events',
        'Ext.calendar.data.Calendars',
        'Ext.calendar.Lang-zh_CN',
        'Rich.view.journey.JourneyMgrWindow',
        'Ext.calendar.form.EventWindow'
    ],
   
    extend: 'Ext.calendar.CalendarPanel',
    alias:'widget.homecalendar',
     
	initComponent:function(){
		var me = this;
		
		this.calendarStore = Ext.create('Ext.calendar.data.MemoryCalendarStore', {
            data: {
                "calendars":[{
                    "id":    1,
                    "title": "行程"
                },{
                    "id":    2,
                    "title": "备忘"
                }]
            }
        });

        this.eventStore = Ext.create('Ext.calendar.data.MemoryEventStore', {
            data: {}
        });
		
		Ext.apply(me,{
            eventStore: this.eventStore,
            calendarStore: this.calendarStore,
            monthViewCfg: {
                showHeader: true,
                showWeekLinks: true,
                showWeekNumbers: true
            },
            getData: function(datas) {
	            /*
	            var today = Ext.Date.clearTime(new Date()), 
	                makeDate = function(d, h, m, s) {
	                    d = d * 86400;
	                    h = (h || 0) * 3600;
	                    m = (m || 0) * 60;
	                    s = (s || 0);
	                    return Ext.Date.add(today, Ext.Date.SECOND, d + h + m + s);
	                };*/
	            var evts = [];
	            var data,date;
	            for(var i=0;i<datas.length;i++){
	            	data = datas[i];
	            	if(data){
	            		date = Ext.Date.parse(data.createTime, "Y-m-d H:i");
		            	evts.push({
		                    "id": data.id,
		                    "cid": data.id,
		                    "title": data.name,
		                    "start": date,
		                    "end": date,
		                    "fromType":data.fromType,
		                    "state":date.state,
		                    "notes": data.number
		                });
	            	}
	            }
	            return {
	                "evts":evts
	            }
	            
	        },
            freshData:function(){
				this.el.mask('...');
				Rich.JsonAjax.request({
					method:'post',
					getMethod:function(){return "post"},
					url:Rich.Url.routeJourneyPath,
					callback:this._freshBack,
					scope:this
				});
		    },
		    _freshBack:function(o,f,r){
		    	this.el.unmask();
		    	if(f){
		    		var data = r.responseJson.data.pageData;
		    		data = this.getData(data);
		    		this.eventStore.loadRawData(data);
		    	}
		    },
            listeners: {
                'eventclick': {
                    fn: function(vw, rec, el){
                        this.showEditWindow(rec, el);
                        this.clearMsg();
                    },
                    scope: this
                },
                'eventover': function(vw, rec, el){
                    //console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                },
                'eventout': function(vw, rec, el){
                    //console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                },
                'eventadd': {
                    fn: function(cp, rec){
                        this.showMsg('Event '+ rec.data.Title +' was added');
                    },
                    scope: this
                },
                'eventupdate': {
                    fn: function(cp, rec){
                        this.showMsg('Event '+ rec.data.Title +' was updated');
                    },
                    scope: this
                },
                'eventcancel': {
                    fn: function(cp, rec){
                        // edit canceled
                    },
                    scope: this
                },
                'viewchange': {
                    fn: function(p, vw, dateInfo){
                        if(this.editWin){
                            this.editWin.hide();
                        }
                        if(dateInfo){
                            //Ext.getCmp('app-nav-picker').setValue(dateInfo.activeDate);
                            this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                        }
                    },
                    scope: this
                },
                'dayclick': {
                    fn: function(vw, dt, ad, el){
                    	return;
                        this.showEditWindow({
                            StartDate: dt,
                            IsAllDay: ad
                        }, el);
                        this.clearMsg();
                    },
                    scope: this
                },
                'rangeselect': {
                    fn: function(win, dates, onComplete){
                    	return;
                        this.showEditWindow(dates);
                        this.editWin.on('hide', onComplete, this, {single:true});
                        this.clearMsg();
                    },
                    scope: this
                },
                'eventmove': {
                    fn: function(vw, rec){
                        var mappings = Ext.calendar.data.EventMappings,
                            time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';
                        
                        rec.commit();
                        
                        this.showMsg('Event '+ rec.data[mappings.Title.name] +' was moved to '+
                            Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS'+time)));
                    },
                    scope: this
                },
                'eventresize': {
                    fn: function(vw, rec){
                        rec.commit();
                        this.showMsg('Event '+ rec.data.Title +' was updated');
                    },
                    scope: this
                },
                'eventdelete': {
                    fn: function(win, rec){
                        this.eventStore.remove(rec);
                        this.showMsg('Event '+ rec.data.Title +' was deleted');
                    },
                    scope: this
                },
                'initdrag': {
                    fn: function(vw){
                        if(this.editWin && this.editWin.isVisible()){
                            this.editWin.hide();
                        }
                    },
                    scope: this
                }
            }
		});
		me.callParent(arguments);
	},
	
    showEditWindow : function(rec, animateTarget){
    	//console.log(rec);
    	if(rec){
    		var id = rec.data.EventId;
    		var ft = rec.data.FromType;
    		var state = rec.data.state;
	    	Ext.create('Rich.view.journey.JourneyMgrWindow',{
	    		fromType:ft
	    	}).showById(id,state);
    	}
    	return;
        if(!this.editWin){
            this.editWin = Ext.create('Ext.calendar.form.EventWindow', {
                calendarStore: this.calendarStore,
                listeners: {
                    'eventadd': {
                        fn: function(win, rec){
                            win.hide();
                            rec.data.IsNew = false;
                            this.eventStore.add(rec);
                            this.eventStore.sync();
                            this.showMsg('Event '+ rec.data.Title +' was added');
                        },
                        scope: this
                    },
                    'eventupdate': {
                        fn: function(win, rec){
                            win.hide();
                            rec.commit();
                            this.eventStore.sync();
                            this.showMsg('Event '+ rec.data.Title +' was updated');
                        },
                        scope: this
                    },
                    'eventdelete': {
                        fn: function(win, rec){
                            this.eventStore.remove(rec);
                            this.eventStore.sync();
                            win.hide();
                            this.showMsg('Event '+ rec.data.Title +' was deleted');
                        },
                        scope: this
                    },
                    'editdetails': {
                        fn: function(win, rec){
                            win.hide();
                            Ext.getCmp('app-calendar').showEditForm(rec);
                        }
                    }
                }
            });
        }
        this.editWin.show(rec, animateTarget);
    },
    
    updateTitle: function(startDt, endDt){
        return;
        var p = Ext.getCmp('app-center'),
            fmt = Ext.Date.format;
        
        if(Ext.Date.clearTime(startDt).getTime() == Ext.Date.clearTime(endDt).getTime()){
            p.setTitle(fmt(startDt, 'F j, Y'));
        }
        else if(startDt.getFullYear() == endDt.getFullYear()){
            if(startDt.getMonth() == endDt.getMonth()){
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'j, Y'));
            }
            else{
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'F j, Y'));
            }
        }
        else{
            p.setTitle(fmt(startDt, 'F j, Y') + ' - ' + fmt(endDt, 'F j, Y'));
        }
    },
    
    // This is an application-specific way to communicate CalendarPanel event messages back to the user.
    // This could be replaced with a function to do "toast" style messages, growl messages, etc. This will
    // vary based on application requirements, which is why it's not baked into the CalendarPanel.
    showMsg: function(msg){
        Rich.Msg.alert('消息',msg);
    	//Ext.fly('app-msg').update(msg).removeCls('x-hidden');
    },
    clearMsg: function(){
        //Ext.fly('app-msg').update('').addCls('x-hidden');
    }
});
