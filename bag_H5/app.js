//app.js
var App = function () {
  var app = {
      userInfo: null,
      address: location.origin+'/bag_H5/',
      imgUrl:'https://tec.xishuw.com/Public/src/wap/images/',
      setData:function (options) {
        var that = this ;
        var cloneData = function (key,options,that) {
          var attrs = key.split(".");
          return (f = function(key,options,that) {
            var o = null, k = null, index = null ;
            var attr = attrs.shift() ;
            var len = attrs.length;
            index = attr.match(/[\d+]/) ;
            if(index){
              index = index[0].match(/\d+/)[0];
              k = attr.replace(/\[\d+\]/,"") ;
              o = {[k] : that[k]} ;
            }else {
              k = attr
              o = {[k] : that[k]}
            }
            if(len > 0) {
              if(index) {
                f(key,options,o[k][index]) ;
              }else {
                f(key,options,o[k]) ;
              }
            }else {
              if(index) {
                o[k][index] = options[key] ;
              }else {
                o[k] = options[key] ;
              }
              that[k] = o[k] ;
            }
          })(key,options,that);
        }

        if(options instanceof Object){
          for(key in options) {
            cloneData (key,options,that) ;
          }
        }
      },
      countDown: function (options) {
        /*
        *   options { 距开始时间：startTime, 距结束时间：endTime, interim：过度函数, 倒计时结束函数：endfun, 页面显示函数：applyDom } 
        *   return {}  0 - 距开始的倒计时结束，1 - 据结束的倒计时结束
        */

        function Time() {
          this.timestamp = null;
          this.setMsg();
        }
        Time.prototype = {
          setMsg: function () {
            for (var item in options) {
              this[item] = options[item];
            }
          },
          extend: function (obj) {
            for (var k in obj) {
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
      },
      load:function(){
        var load = new Vue({
          el:"#load",
          data:{
            isApply:true,
            loadstate:"加载中...",
            showload:false
          }
        });
        setTimeout(function(){
          load.showload = true
        },1500);
        return load;
      },
      getLocation:function() {
        var that = this ;
        wx.ready(function(){
          wx.getLocation({
            type: 'wgs84', 
            success: function (res) {
              latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              longtude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              sessionStorage.latitude = latitude ;
              sessionStorage.longtude = longtude ;
              if(!latitude || !longtude){
                layer.open({
                  content:"请确认您已经开启了GPS，并且同意微信获取您的地理位置。操作成功后重新刷新该页面！",
                  shade:false
                });
                setTimeout(function(){
                  location.assign('/prize/bagWechat/localno');
                },3000)
              }else{
                if(app.locationReadyCallback) {
                  app.locationReadyCallback();
                }
              }
            },
            cancel: function (res) {
              layer.open({
                content:"请确认您已经开启了GPS，并且同意微信获取您的地理位置。操作成功后重新刷新该页面！",
                shade:false
              })
              setTimeout(function(){
                location.assign('/prize/bagWechat/localno');
              },3000)
            },
            fail: function (res){
              layer.open({
                content:"地理位置获取失败，请确认您已经开启了GPS，并且同意微信获取您的地理位置。操作成功后重新刷新该页面！",
                shade:false
              });
              setTimeout(function(){
                location.assign('/prize/bagWechat/localno');
              },3000)
            }
          });
        })
      },
      shareReady: function(options) {
        wx.ready(function(){
          wx.onMenuShareTimeline({
            title: options.title,
            link:options.link,
            imgUrl:options.image,
            desc: options.desc,
            success: function () { APP.shareCallback({url:options.share_url}); },
            cancel: function () {}
          });
        
          wx.onMenuShareAppMessage({
            title: options.title,
            link:options.link,
            imgUrl:options.image,
            desc: options.desc ,
            success: function () { APP.shareCallback({url:options.share_url}); },
            cancel: function () {}
          });
        });
      },
      shareCallback: function(options) {
        $.ajax({
          url: app.address+"/Prize/BagWechat/addShare",
          type: 'POST',
          data: options,
        })
      }
    } 
  return app ;
}
