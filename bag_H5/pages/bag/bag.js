// pages/bag/bag.js
document.ready(function(){
	let APP = App();
	let top = {
		template : `<div class="top">
			<div class="top-tips">
				<a class="top-tip" href="../home/home.html" class='goHome'>
					<span class="mui-icon mui-icon-home" style="font-size: 18px;"></span>
          <span>福袋首页</span>
       	</a>
        <p class="top-tip" style="margin: 0;">已有<span style="font-size: 14px;font-weight: bold;color: yellow;">{{ pv }}</span>人喜欢</p>
			</div>
			<img class='head_img' :src='pic_1' width="100%"></img>
			<div class='down_time'> {{ page_timestamp }} </div>
		</div>`,
		props: {pv:{default: function () {
					return this.pv 
				}},pic_1:{default: function () {
					return this.pic_1 
				}},page_timestamp:{default: function () {
					return this.page_timestamp 
				}}}
//		data:function(){
//			return {pv:this.pv,pic_1:this.pic_1,page_timestamp:this.page_timestamp}
//		}
	};
	let BAG = new Vue({
		el: "#bag",
		data: {page_timestamp:null,data:null},
		components: {
			'my-top': top
		},
		methods: {
			onLoad: function () {
				axios.get(APP.address+'pages/bag/bag.json')
			  .then(function (response) {
			  	let res = response.data;
			  	if(parseInt(res.ret) === 0){
			  		that.data = res.data;
			  		that.onReadyGo();
			  	}else if(parseInt(res.ret) === 1) {
			  		console.log("暂无数据")
			  	}
			  })
			  .catch(function (error) {
			    console.log(error,11);
			  });
			},
			onReadyGo: function () {
	      this.countDownTime(this,this.data.start_,this.data.end_);
	    },
			/**
	    * 倒计时设置
	    */
	    countDownTime: function (that,startTime, endTime) {
	      let title = null, _title = null;
	      if (parseInt(startTime) > 0){
	        title = "距离开始还剩 ";
	        _title = "距离结束还剩 ";
	      }else {
	        title = "距离结束还剩 ";
	      }
	      APP.countDown.call(that,{
	        startTime: startTime,
	        endTime: endTime,
	        interim: function () {
	          this.timestamp = this.endTime;
	          this.downEd();
	          this.downIng();
	          this.title = _title;
	          if(that.page_timestamp){
	          	that.page_timestamp = this.title + this.d + " 天 " + this.h + " 时 " + this.min + " 分 " + this.s + " 秒" ;
	          }else {
	          	Vue.set(that,"page_timestamp",this.title + this.d + " 天 " + this.h + " 时 " + this.min + " 分 " + this.s + " 秒") ;
	          }
	        },
	        applyDom: function () {
	        	if(that.page_timestamp){
	          	that.page_timestamp = this.title + this.d + " 天 " + this.h + " 时 " + this.min + " 分 " + this.s + " 秒" ;
	          }else {
	          	Vue.set(that,"page_timestamp",this.title + this.d + " 天 " + this.h + " 时 " + this.min + " 分 " + this.s + " 秒") ;
	          }
	        },
	        endfun: function () {
	        	if(that.page_timestamp){
	          	that.page_timestamp = "活动已结束" ;
	          }else {
	          	Vue.set(that,"page_timestamp","活动已结束") ;
	          }
	        }
	      }).extend({ "title": title}).init();
	    }
		}
	})
})












//var APP = App() ;
//function scrollContent ($) {
//(function ($) {
//  var dom = $("div.scroll-content") ;
//  console.log(dom);
//  if(dom.find(".winner-item").length > 6) {
//    var height = dom.height() ;
//    var len = dom.find(".winner-item").length;
//    height = (parseInt(height) / parseInt(len)) * (parseInt(len) - 5) ;
//    var timeStamp = height *30 ;
//    var styleHtml = `.scroll-animation {
//      background = 'red';
//                        animation:winnerScroll ${timeStamp}ms linear infinite ;
//                      }
//                      @keyframes winnerScroll {
//                        0%   {transform: translateY(0px)}
//                        100% {transform: translateY(-${height}px)}
//                      }
//                      @-webkit-keyframes winnerScroll {
//                        0%   {transform: translateY(0px)}
//                        100% {transform: translateY(-${height}px)}
//                      }`;
//    var styleTag = document.createElement("style");
//    styleTag.type = "text/css" ;
//    styleTag.innerHTML = styleHtml ;
//    $("head").append(styleTag);
//    dom.addClass("scroll-animation") ;
//  }
//}($))
//}
//var BAG = new Vue({
//
//el: '#bag',
//
//data: {
//  modal: {
//    ishidden: true,
//    getaword:true,
//    getword:true,
//    get_morenum:true,
//    gethelp:true,
//    hasposter:true
//  },
//  "isLoad":false,
//  "inithidden":false,
//  "page_getWordBtn":"我要集福",
//  "page_timestamp":"距离结束还剩3",
//  "page_getAwardBtn":true,
//  "page_useWordBtns":true,
//  "page_words":true,
//  "page_subgetsumBtn":true,
//  "page_awardTitle":"恭喜你抽中。。。",
//  "page_awardContent":"谢谢",
//  "page_modal":false,
//  "page_scrollH":"auto",
//  "animationData": {},
//  data: {
//    "id": "1",
//    "shopid": "1",
//    "title": "老俵肥肠鸡原价139元跑山鸡套",
//    "pic_1": "http://7xoq3p.com1.z0.glb.clouddn.com/shopd1fdc8423e11d4e0a515f8be86f13aa81515142721.jpg",
//    "pic_2": "http://7xoq3p.com1.z0.glb.clouddn.com/shopd1d82a21def5045f2a477eb9a61897ca1515142726.jpg",
//    "start_time": "0",
//    "end_time": "1516999978",
//    "re_sum": "14",
//    "get_sum": "0",
//    "in_area_limit": "1",
//    "help_area_limit": "1",
//    "buy_limit": "1",
//    "price": "1",
//    "prizeget": "0",
//    "words": "玩,2000:转,2000:都,2000:市,2000:网,2000",
//    "words_sum": "5",
//    "rules": "1.每天每个用户有3次集字机会（不累加）\r\n2.集齐文字后即可兑换奖品\r\n3.奖品数量有限\r\n4.本活动最终解释权归新乐山所有",
//    "details": "<p><strong><span style=\"color: rgb(255, 0, 0);\">套餐</span></strong><strong><span style=\"color: rgb(255, 0, 0);\">包含：</span></strong><span style=\"color: rgb(0, 0, 0);\">跑山鸡2斤78元+青笋1份6元+魔芋1份6元+面泥鳅1份10元+拌耳叶1份26元+拌凉粉1份8元+餐具5套5元，共计139元。</span><span style=\"color: rgb(247, 150, 70);\">套餐包含锅底！</span></p><p><strong><span style=\"color: rgb(255, 0, 0);\">餐厅名称：</span></strong><span style=\"color: rgb(255, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">老俵肥肠鸡</span><br/></span></p><p><strong><span style=\"color: rgb(255, 0, 0);\">餐厅地址：</span></strong><span style=\"color: rgb(255, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">涪城区荷花东街39号（桂园雅居河堤边） &nbsp;涪城区滨河南路东段81号江南丽景5栋1层1号（安昌桥老茶树对面）</span></span></p><p><strong><span style=\"color: rgb(255, 0, 0);\">联系电话：</span></strong><span style=\"color: rgb(0, 0, 0);\">0816-2397899（花园店）&nbsp;0816-2385589（老茶树店）</span></p><p><strong><span style=\"color: rgb(255, 0, 0);\">活动时间：</span></strong><span style=\"color: rgb(0, 0, 0);\">2018年1月6日—2018年1月21日</span></p><p><strong><span style=\"color: rgb(255, 0, 0);\">注意事项：</span></strong><span style=\"color: rgb(0, 0, 0);\">每人限购一次，每桌限用一张，仅限堂食。不与其他优惠同享。不能退。</span></p><p><br/></p><p><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430186593.gif\" title=\"xshop/20180105/15151430186593.gif\" alt=\"2.gif\"/></p><p><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430225603.jpg\" title=\"xshop/20180105/15151430225603.jpg\" alt=\"微信图片_20171017135642.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430284190.jpg\" title=\"xshop/20180105/15151430284190.jpg\" alt=\"未标题-1.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430326809.jpg\" title=\"xshop/20180105/15151430326809.jpg\" alt=\"微信图片_20171013165644.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430383053.jpg\" title=\"xshop/20180105/15151430383053.jpg\" alt=\"微信图片_20171013165648.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430461986.jpg\" title=\"xshop/20180105/15151430461986.jpg\" alt=\"微信图片_20171013165653.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430525769.jpg\" title=\"xshop/20180105/15151430525769.jpg\" alt=\"微信图片_20171013165659.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430579443.jpg\" title=\"xshop/20180105/15151430579443.jpg\" alt=\"微信图片_20171013165703.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430636170.jpg\" title=\"xshop/20180105/15151430636170.jpg\" alt=\"微信图片_20171013165708.jpg\"/></p><p><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151437871563.jpg\" title=\"xshop/20180105/15151437871563.jpg\" alt=\"微信图片_20180105171127.jpg\"/><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151437938166.jpg\" title=\"xshop/20180105/15151437938166.jpg\" alt=\"微信图片_20180105171132.jpg\"/></p><p><img src=\"http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180105%2F15151430754366.jpg\" title=\"xshop/20180105/15151430754366.jpg\" alt=\"微信图片_20171017142320.jpg\"/><br/></p><p><br/></p>",
//    "posters_word": "我正在参与集福袋赢老俵肥肠鸡原价139元跑山鸡套活动",
//    "pv": "548",
//    "start_": -1516599630,
//    "end_": 400348,
//    "changeData": [
//      {
//        "id": "26",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "27",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "28",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "29",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "30",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "31",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "32",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "33",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        },
//        {
//        "id": "34",
//        "unionid": "orX-WuPH7V3CvyKRApqHSp6F1ioE",
//        "headimg": "http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132",
//        "nickname": "1200",
//        "dateline": "2018-01-27 23:50:51",
//        "title": "一等奖"
//        }
//    ],
//    "reward_num": "3",
//    "choose_state": 0,
//    "convert_state": 0,
//    "help_state": 1,
//    "getcount_state": 1,
//    "logo": "http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180120%2F15164596526433.png",
//    "subgetsum": "5",
//    "plist": [{
//      "id": "1",
//      "title": "老俵肥肠鸡原价139元跑山鸡套",
//      "re_sum": "14",
//      "get_sum": "0",
//      "use_end": "1515513600",
//      "change_state": 0,
//      "mark": "立即兑换",
//      "btn":true
//    }],
//    "words_list": "0,2,0,0,1",
//    "subgeted": 0,
//    "user_words_sum": "2",
//    "joindid": "3"
//  }
//},
//
//methods: {
//  setData: APP.setData,
//  onCountDown: APP.countDown,
//  /**
//  *  页面逻辑处理
//  */
//  initPage() {
//    var that = this ;
//    var data = that.data;
//    if(!this.isLoad){
//      var countIdx = that.countDownTime();
//      if (countIdx) {
//        that.countDownTime();
//      }
//      this.applyWords();
//      this.applyRules();
//    }
//    
//    if (parseInt(data.start_) > 0 ){
//      this.willStart();
//    } else if (parseInt(data.start_) < 0 && parseInt(data.end_) > 0) {
//      this.underway () ;
//    } else if (parseInt(data.end_) <= 0) {
//      this.end()
//    }
//    this.setData({
//      inithidden:true
//    });
//    setTimeout(function () {
//      scrollContent ($);
//    }, 2000)
//  },
//
//  /**
//   * 倒计时状态
//   */
//  countDownTime: function () {
//    var that = this;
//    var data = that.data,title = null, _title = null;
//    if (parseInt(data.start_)>0) {
//      title = "距离开始还剩 ";
//      _title = "距离结束还剩 ";
//    } else if (parseInt(data.end_) > 0) {
//      title = "距离结束还剩 ";
//    }else {
//      that.setData({
//        page_timestamp: "活动已结束"
//      });
//      return false;
//    }
//    return that.onCountDown({
//      startTime: data.start_,
//      endTime: data.end_,
//      interim: function () {
//        if (!that.data.interim){
//          that.setData({
//            "page_useWordBtns": false,
//            "page_subgetsumBtn": false,
//            "interim":true
//          });
//          that.getData();
//        }
//      },
//      applyDom: function () {
//        that.setData({
//          page_timestamp: this.title + this.d + " 天 " + this.h + " 时 " + this.min + " 分 " + this.s + " 秒"
//        })
//      },
//      endfun: function () {
//        that.setData({
//          page_timestamp: "活动已结束",
//          "data.data.end_" : 0
//        });
//        that.end();
//      }
//    }).extend({ "title": title }).init();
//  },
//
//  /**
//   * 活动未开始时各按钮的状态
//   */
//  willStart: function () {
//    this.setData({
//      "page_useWordBtns": true,
//      "page_subgetsumBtn": true,
//      "page_getWordBtn":"活动未开始",
//      "page_getAwardBtn":false
//    })
//  },
//
//  /**
//  * 活动进行中时各按钮的状态
//  */
//  underway: function () {
//    var data = this.data;
//    var plist = data.plist, _plist = null;
//    var sum = 0;
//     plist.forEach(function (item, idx) {
//      sum += parseInt(item.re_sum);
//      if (parseInt(item.re_sum) > 0) {
//        item.btn = true
//      }
//    });
//    if (parseInt(data.convert_state) === 1){
//      this.exchanged();
//    } else if ( sum === 0 ){
//      this.setData({
//        "page_useWordBtns": true,
//        "page_subgetsumBtn": true,
//        "page_getWordBtn": "已兑完"
//      })
//    }else if (parseInt(data.user_words_sum) != parseInt(data.words_sum)) {
//      this.noGetNum() ;
//    } else if (parseInt(data.user_words_sum) === parseInt(data.words_sum)) {
//      this.wordsNum(plist);
//    }
//    
//  },
//
//  isSubget: function() {
//    if (parseInt(this.data.subgeted) === 1) {
//      this.setData({
//        "page_subgetsumBtn": true
//      })
//    }
//  },
//  /**
//  * 活动结束时各按钮的状态
//  */
//  end: function () {
//    if (parseInt(this.data.convert_state) === 1){
//      this.exchanged();
//    }else {
//      this.setData({
//        "page_useWordBtns": true,
//        "page_subgetsumBtn": true,
//        "page_getWordBtn": "活动已结束",
//        "page_getAwardBtn": false
//      })
//    }
//    
//  },
//
//  /**
//  * 未集齐福字的状态
//  */
//  noGetNum: function () {
//    var data = this.data ;
//    this.setData({
//      "page_getWordBtn": `我要集福（剩余${data.reward_num}次)`,
//      "page_goon": `继续集福（剩余${data.reward_num}次)`
//    });
//    this.isSubget() ;
//  },
//  /**
//  * 已集齐福字但未兑换的状态
//  */
//  wordsNum: function(plist){
//    if (parseInt(this.data.prizeget) === 0) {
//      this.setData({
//        "page_useWordBtns": true,
//        "page_subgetsumBtn": true,
//        "page_getWordBtn": "已集齐",
//        "data.plist": plist
//      })
//    } else {
//      this.setData({
//        "page_useWordBtns": true,
//        "page_subgetsumBtn": true,
//        "page_getWordBtn": "已集齐",
//        "page_getAwardBtn": true
//      })
//    }
//  },
//
//  /**
//  * 已兑换的状态
//  */
//  exchanged: function(){
//    this.setData({
//      "page_useWordBtns": true,
//      "page_subgetsumBtn": true,
//      "page_getWordBtn": "查看订单",
//      "page_getAwardBtn": false
//    })
//  },
//
//  /**
//  * 控制 words 块主要内容的渲染
//  */
//  applyWords: function (indexNum) {
//    var that = this, data = this.data, numState = "b";
//    var words = null, words_list = null;
//    words = data.words.split(":");
//    words_list = data.words_list || [];
//    var len = words.length;
//    if (words_list) {
//      words_list = words_list.split(",");
//    } else {
//      for (var i = 0; i < len; i++) {
//        words_list.push(0);
//      }
//    }
//    if (len === 4 || len === 8) {
//      numState = "a"
//    }
//
//    var page_words = words.map(function (item, idx) {
//      var num = parseInt(words_list[idx]), _class = null;
//      if (parseInt(num) > 0) {
//        _class = "hasNum_" + numState;
//      } else {
//        _class = "noNum_" + numState;
//      };
//      return {
//        "word": item.split(",")[0],
//        "num": (parseInt(words_list[idx]) > 10 ? "9+" : parseInt(words_list[idx])),
//        "class": _class
//      }
//    });
//    this.setData({
//      "page_words": page_words
//    })
//  },
//
//  /**
//  * 控制 rules 块主要内容的渲染
//  */
//  applyRules: function () {
//    var rules = this.data.rules;
//    rules = rules.split('\n');
//    this.setData({
//      'data.rules': rules
//    })
//  },
//  
//  /**
//  * 控制 winner 块的滚动
//  */
//  winnerScroll:function() {
//    var that = this ,size = null;
//    var len = this.data.changeData.length;
//    var winner = document.
//   console.log($(".winnerScroll"))
//
//    // px * 50 = ms 
//    // wx.createSelectorQuery().select('.scroll-content').fields({ size: true }, function (res) {
//    //   size = res.height
//    //   that.setAnimation(size)
//      
//    // }).exec();
//  },
//  // setAnimation :function(height) { 
//  //   var that = this;
//  //   (function(that,height){
//  //     var len = that.data.data.changeData.length;
//  //     var size = parseInt(height) / len * 2;
//  //     var h = parseInt(height) - size;
//  //     var time = h * 50;
//  //     var animation = wx.createAnimation({
//  //       duration: time,
//  //       timingFunction: 'linear'
//  //     });
//  //     animation.translateY(-h).step();
//  //     that.setData({
//  //       animationData: animation.export()
//  //     });
//  //     appGlobal.winnerAnimation = setInterval(function () {
//  //       var _animation = wx.createAnimation({
//  //         duration: 0,
//  //         timingFunction: "step-start"
//  //       });
//  //       _animation.translateY(0).step();
//  //       that.setData({
//  //         animationData: _animation.export()
//  //       });
//
//  //       var animation_ = wx.createAnimation({
//  //         duration: time,
//  //         timingFunction: 'linear'
//  //       });
//  //       animation_.translateY(-h).step();
//  //       that.setData({
//  //         animationData: animation_.export()
//  //       });
//  //     }, time)
//
//  //   })(this, height)
//  // },
//
//  /**
//  * 求助模态框
//  */
//  toGetHelp: function (e) {
//    this.setData({
//      "modal.ishidden": false,
//      "modal.gethelp": false
//    });
//  },
//
//  /**
//  * 生成海报
//  */
//  createPoster: function () {
//    if (this.data.page_poster){
//      this.setData({
//        "modal.gethelp": true,
//        "modal.hasposter": false
//      });
//      return false;
//    }
//    var that = this, data = that.data.data;
//    wx.request({
//      url: `${appGlobal.address}/Prize/Bag/addWater`,
//      data: {
//        id: data.id,
//        thirdsesid: wx.getStorageSync('thirdsesid'),
//        nickname: appGlobal.userInfo.nickName
//      },
//      method: "POST",
//      header: {
//        'content-type': 'application/x-www-form-urlencoded'
//      },
//      success: function (res) {
//        var data = res.data;
//        var ret = parseInt(data.ret);
//        switch (ret) {
//          case 0:
//            that.setData({
//              "page_poster": data.url,
//              "modal.gethelp": true,
//              "modal.hasposter": false
//            })
//            break;
//          case 101:
//
//            break;
//        }
//      }
//    })
//  },
//
//  
//  /**
//* 我要集福
//*/
//  drawPrize: function () {
//    var that = this,data = this.data.data;
//    if (parseInt(data.convert_state) === 1) {
//      wx.navigateTo({
//        url: '../own/own',
//      })
//      return false;
//    };
//    if (parseInt(data.words_sum) === parseInt(data.user_words_sum)) {
//      return false;
//    }else if(data.end_ < 1 ){
//      return false;
//    } else if (parseInt(data.reward_num) < 1 && parseInt(data.getcount_state) === 1 ){
//      if (parseInt(data.subgeted) === 0){
//        that.toGetMorenum();
//      }
//      return false;
//    } else if (parseInt(data.reward_num) < 1 && parseInt(data.getcount_state) === 0) {
//      return false;
//    }
//    that.getWordPost();
//  },
//  getWordPost: function () {
//    var that = this,data = this.data.data ;
//    wx.request({
//      url: `${appGlobal.address}/Prize/Bag/drawPrize`,
//      data: {
//        id: data.id,
//        thirdsesid: wx.getStorageSync('thirdsesid')
//      },
//      method: "POST",
//      header: {
//        'content-type': 'application/x-www-form-urlencoded'
//      },
//      success: function (res) {
//        var data = res.data;
//        var ret = parseInt(data.ret);
//        switch (parseInt(ret)) {
//          case 0:
//            that.manageAwardMsg(data.data) ;
//            break;
//          case 1:
//            wx.showModal({
//              title: '',
//              content: res.data.msg,
//              showCancel:false
//            })
//            break;
//        }
//      }
//    })
//  },
//  manageAwardMsg: function(options) {
//    var that = this,data = this.data.data;
//    var indexNum = options.indexNum, word = options.word, reward_num = data.reward_num, 
//    words = this.data.page_words, user_words_sum = data.user_words_sum, num = null;
//    if (words[indexNum].word === word) {
//      var item = words[indexNum] ;
//      var idx = `page_words[${indexNum}].num`;
//      reward_num = parseInt(reward_num) - 1 ;
//      num = parseInt(item.num) + 1;
//      if (parseInt(item.num) === 0){
//        user_words_sum = parseInt(user_words_sum) + 1;
//        var _class = item.class.replace("no","has");
//        var newClass = `page_words[${indexNum}].class`;
//        that.setData({
//          [newClass]: _class
//        });
//      }
//      that.setData({
//        "modal.getword": false,
//        "modal.ishidden": false,
//        "page_word": word,
//        "data.reward_num": reward_num,
//        "data.user_words_sum": user_words_sum,
//        [idx]: num
//      });
//
//      if (user_words_sum === parseInt(data.words_sum)) {
//        that.underway() ;
//        that.setData({
//          page_goon : "已集齐"
//        })
//      }else {
//        that.noGetNum();
//      }
//    }
//  },
//
//  /**
//* 机会攻略
//*/
//  toGetMorenum: function () {
//    this.setData({
//      "modal.getword": true,
//      "modal.get_morenum": false,
//      "modal.ishidden": false
//    });
//  },
//
//  /**
//  * 兑换奖品
//  */
//  selectAward: function (e) {
//    var that = this, data = this.data.data ; 
//    if (parseInt(data.convert_state) === 1) {
//      return false;
//    }
//    var goodid = e.target.dataset.plistid, idx = e.target.dataset.idx;
//    wx.request({
//      url: `${appGlobal.address}/Prize/Bag/changeGoods`,
//      data: {
//        id: data.id,
//        thirdsesid: wx.getStorageSync('thirdsesid'),
//        goodid: goodid,
//        nickname: appGlobal.userInfo.nickName,
//        headimg: appGlobal.userInfo.avatarUrl
//      },
//      method: "POST",
//      header: {
//        'content-type': 'application/x-www-form-urlencoded'
//      },
//      success: function (res) {
//        var msg = res.data;
//        var ret = parseInt(msg.ret);
//        switch (ret) {
//          case 0:
//            var re_sum = 'data.plist['+idx+'].re_sum', get_sum = 'data.plist['+idx+'].get_sum';
//            var content = data.plist[idx].title;
//            that.setData({
//              "page_award": content,
//              "page_awardid": msg.data.id,
//              "page_awardtitle": "兑换成功",
//              [re_sum]: msg.data.re_sum,
//              [get_sum]: msg.data.get_sum,
//              "data.convert_state": 1,
//              "page_getWordBtn":"查看订单",
//              "modal.getaword": false,
//              "modal.ishidden": false
//            });
//            that.exchanged () ;
//            var plist = data.plist;
//            plist.forEach(function (item, idx) {
//              item.btn = false;
//              if(parseInt(idx) == parseInt(idx)) {
//                item.re_sum = parseInt(item.re_sum) - 1;
//                item.get_sum = parseInt(item.get_sum) + 1;
//              }
//            });
//            that.setData({
//              "data.plist":plist
//            })
//            break;
//          case 1:
//            wx.showModal({
//              content: data.msg,
//              showCancel: false
//            })
//            break;
//        }
//      }
//    })
//  },
//
//  /**
//* 点击抽奖
//*/
//  drawGoods: function (e) {
//    var that = this, data = this.data.data; 
//    if (parseInt(data.convert_state) === 1) {
//      return false;
//    }
//    wx.request({
//      url: `${appGlobal.address}/Prize/Bag/drawGoods`,
//      data: {
//        id: data.id,
//        thirdsesid: wx.getStorageSync('thirdsesid')
//      },
//      method: "POST",
//      header: {
//        'content-type': 'application/x-www-form-urlencoded'
//      },
//      success: function (res) {
//        var ret = res.data.ret;
//        switch (parseInt(ret)) {
//          case 0:
//            that.setData({
//              "page_getAwardBtn": false,
//              "page_award": res.data.msg,
//              "page_awardid": res.data.id,
//              "page_awardtitle": "恭喜抽中",
//              "data.convert_state": 1,
//              "page_getWordBtn": "查看订单",
//              "modal.getaword": false,
//              "modal.ishidden": false
//            });
//            var plist = data.plist;
//            plist.forEach(function (item, idx) {
//              item.btn = false;
//              if (parseInt(item.id) == parseInt(res.data.id)) {
//                item.re_sum = parseInt(item.re_sum) - 1;
//                item.get_sum = parseInt(item.get_sum) + 1;
//              }
//            });
//            that.setData({
//              "data.plist": plist
//            })
//            break;
//          case 1:
//            wx.showModal({
//              content: data.msg,
//              showCancel: false
//            })
//            break;
//        }
//      }
//    })
//  },
//
//  /**
//  * 关闭模态框
//  */
//  isHideHelp: function () {
//    this.setData({
//      "modal.ishidden": true,
//      "modal.gethelp": true,
//      "modal.getword": true,
//      "modal.hasposter": true,
//      "modal.getaword": true,
//      "modal.get_morenum": true
//    });
//  }
//}
//})
//
//BAG.initPage();