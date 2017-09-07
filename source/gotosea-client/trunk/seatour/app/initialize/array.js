export default function initArray(){
  /**
   * 数组克隆
  */
  Array.prototype.clone = function (fmt) {
      let arr = [];
      for (var i = 0; i < this.length; i++) {
        arr.push(this[i]);
      }
      return arr;
  }
}
