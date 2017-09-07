export default {
	//1天的毫秒数
    dayOfMs: 24 * 60 * 60 * 1000,
    subjoinZero(data) {
        return data <= 9 ? `0${ data }` : data
    },
    getArrayOfDate(date) {
        let year = `${ date.getFullYear() }年`,
            month = `${ this.subjoinZero( date.getMonth() + 1 ) }月`,
            _date = `${ this.subjoinZero( date.getDate() )}日`;
        return [year, month, _date]

    },
    getArrayOfTime(date) {
        let hour = `${ this.subjoinZero( date.getHours() + 1 )}时`,
            minute = `${ this.subjoinZero( date.getMinutes() ) }分`;
        return [hour, minute]
    },
    getArrayOfDateTime(date) {
        return this.getArrayOfDate(date).concat(this.getArrayOfTime(date))
    },
    /**
     * 日期字符串格式化
     * @param  {Date}   date    默认今天
     * @param  {String} pattern 
     * @return {String}         
     */
    dateToString(date = new Date(), pattern = "YYYY-MM-DD") {
        if (!(date instanceof Date)) date = new Date(date)

        let __year = date.getFullYear(),
            __month = date.getMonth() + 1,
            __date = date.getDate(),
            __hour = date.getHours(),
            __minute = date.getMinutes(),
            __second = date.getSeconds();
        return pattern.replace(/(YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s)/g, function(a, b) {
            switch (a) {
                case "YYYY":
                    return __year
                case "YY":
                    return __year.substr(2)
                case "MM":
                    return __month <= 9 ? ("0" + __month) : __month
                case "M":
                    return __month
                case "DD":
                    return __date <= 9 ? ("0" + __date) : __date
                case "D":
                    return __date
                case "hh":
                    return __hour <= 9 ? ("0" + __hour) : __hour
                case "h":
                    return __hour
                case "mm":
                    return __minute <= 9 ? ("0" + __minute) : __minute
                case "m":
                    return __minute
                case "ss":
                    return __second <= 9 ? ("0" + __second) : __second
                case "s":
                    return __second
                default:
                    return a
            }
        })
    }
}