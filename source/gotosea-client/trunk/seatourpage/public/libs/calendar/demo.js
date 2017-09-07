$(document).ready( function() {

    var nowDate = moment().format('YYYY-MM-DD');
    var thisMonth = moment().format('YYYY-MM');
    /*0:开船，1不开船，2无排期*/
    var eventArray = [
        {
            title: 'Multi-Day Event',
            endDate: thisMonth + '-14',
            startDate: thisMonth + '-10',
            flag:'￥',
            className:'test',
            status:0,
            explain: 1000
        },{
            endDate: thisMonth + '-21',
            startDate: thisMonth + '-15',
            title: 'Another Multi-Day Event',
            flag:'',
            status:1,
            explain: ''
        },{
            endDate: thisMonth + '-23',
            startDate: thisMonth + '-21',
            title: 'Another Multi-Day Event',
            flag:'￥',
            explain: 1500
        },{
            date: thisMonth + '-27',
            title: 'Single Day Event',
            explain:'免费'
        }
    ];
    $('.clndrCalendar').clndr({
    	daysOfTheWeek:['周日','周一','周二','周三','周四','周五','周六'],
        events: eventArray,
        clickEvents: {
            click: function (target) {
                console.log('Cal-1 clicked: ', target);
            },
            today: function () {
                console.log('Cal-1 today');
            },
            nextMonth: function () {
                console.log('Cal-1 next month');
            },
            previousMonth: function () {
                console.log('Cal-1 previous month');
            },
            onMonthChange: function () {
                console.log('Cal-1 month changed');
            },
            nextYear: function () {
                console.log('Cal-1 next year');
            },
            previousYear: function () {
                console.log('Cal-1 previous year');
            },
            onYearChange: function () {
                console.log('Cal-1 year changed');
            },
            nextInterval: function () {
                console.log('Cal-1 next interval');
            },
            previousInterval: function () {
                console.log('Cal-1 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-1 interval changed');
            }
        },
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        /*起始结束日期*/
        constraints: {
	        endDate: '2016-12-16',
	        startDate: nowDate
	    },
	    selectedDate: "2016-8-16",   //某一天处于选择状态
        showAdjacentMonths: false,   //是否显示上下月份天
        adjacentDaysChangeMonth: false  //是否点击上下月份天调整至单月
    });
});