import initCalendar from './calendar'
import initDate from './date'
import initStroage from './stroage'
import initArray from './array'

export default function initData(){
  //__DEV__为React Native全局变量，用于指示当前运行环境是否是开发环境,正式环境取消控制台打印
  if (!__DEV__) {
    global.console = {
      info: () => {},
      log: () => {},
      warn: () => {},
      debug: () => {},
      error: () => {},
    };
  }
  //持久化存储
  initStroage();
  //初始化日历数据
  initCalendar();
  //时间处理
  initDate();
  //数组
  initArray();
}
