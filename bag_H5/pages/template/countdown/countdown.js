let countDown = function (options) {
	/*
	* 	options { 距开始时间：startTime, 距结束时间：endTime, interim：过度函数, 倒计时结束函数：endfun, 页面显示函数：applyDom } 
	* 	return {}  0 - 距开始的倒计时结束，1 - 据结束的倒计时结束
	*/

  function Time() {
    this.timestamp = null;
    this.setMsg();
  }
  Time.prototype = {
    setMsg: function () {
      for (let item in options) {
        this[item] = options[item];
      }
    },
    extend: function (obj) {
      for (let k in obj) {
        this[k] = obj[k];
      }
      return this;
    },
    init: function () {
      if (parseFloat(this.endTime) <= 0) {
        this.endfun();
      } else {
        this.timestamp = parseFloat(this.startTime) > 0 ? parseFloat(this.startTime) : parseFloat(this.endTime);
        this.downEd();
        this.downIng();
      }
      return this.downfun;
    },
    downEd: function () {
      var d = null, h = null, min = null, s = null;
      s = this.timestamp % 60;
      var h_min_s = this.timestamp % 3600;
      min = (h_min_s - s) / 60;
      var d_h_min_s = this.timestamp % (3600 * 24);
      h = (d_h_min_s - h_min_s) / 3600;
      d = (this.timestamp - d_h_min_s) / (3600 * 24);
      this.d = d < 10 ? '0' + d : d;
      this.h = h < 10 ? '0' + h : h;
      this.min = min < 10 ? '0' + min : min;
      this.s = s < 10 ? '0' + s : s;
      this.applyDom();
    },
    downIng: function () {
      var that = this;
      this.downfun = setInterval(function () {
        that.timestamp = parseInt(that.timestamp) - 1;
        if (that.timestamp === 0) {
          if (parseInt(that.startTime) > 0) {
            that.interim();
          } else {
            that.endfun();
          }
          clearInterval(that.downfun);
        } else {
          that.downEd();
        }
      }, 1000)
    }
  }
  return new Time();
}
module.exports.countdown = countDown; 