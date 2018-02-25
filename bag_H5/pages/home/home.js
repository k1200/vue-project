// pages/home/home.js

document.ready(function(){
	let APP = App() ;
	let good = {
		props: {
			msg:{
				type:Array,
				default: function () {
					return this.msg 
				}
			}
		},
  	template: `<div class="goods"><a class="mui-card goods_item" v-for="(item, index) in msg" :href ="'../bag/bag.html?id=' + item.id" :key="item.id" :data-state="item.mark" >
					<div class="mui-card-content">
						<img class='goods_item_image' :src='item.pic_1' width="100%"></img>
            <div class='down_time'>
              {{ item.page_timestamp}}
            </div>
					</div>
					<div class="mui-card-footer">
						<div class='mui-ellipsis goods_item_title'>{{ item.title}}</div>
						<div class='goods_item_progress'>
	            <div :class='item.page_class' :style="'width:' + item.page_progress + '%;'"></div>
	            <span style='position:relative;'>已兑换{{ item.get_sum}}份</span>
	          </div>
	          <div v-if="item.change.length>0" class='goods_item_user'>
	            <img v-for="(list, idx) in item.change" :key = "list.unionid" :src="list.headimg"></img>
	          </div>
					</div>
				</a></div>`
		
	}
  let HOME = new Vue({

    el: '#home',

    data: {data:{},appset:{}},
    components: {
			'my-good': good
		},
    methods: {
    	onLoad: function(){
    		let that = this ;
    		axios.get(APP.address+'pages/home/home.json')
			  .then(function (response) {
			  	let res = response.data;
			  	if(parseInt(res.ret) === 0){
			  		that.data = res.data;
			  		that.appset = res.appset;
			  		that.onReadyGo();
			  	}else if(parseInt(res.ret) === 1) {
			  		console.log("暂无数据")
			  	}
			  })
			  .catch(function (error) {
			    console.log(error,11);
			  });
    	},
        /**
      * 数据请求完成后数据渲染
      */
      onReadyGo: function (options) {
        this.countDown();
      },
      setData: APP.setData,
      onCountDown: APP.countDown,
      /**
      * 初始化倒计时
      */
      countDown: function() {
        let msg = this.data;
        let len = msg.length;
        for(let i=0;i<len;i++){
        	this.countDownTime(msg[i],msg[i].start_, msg[i].end_);
        	if(parseInt(msg[i].re_sum) || parseInt(msg[i].get_sum)){
        		let w = parseInt(msg[i].get_sum) / (parseInt(msg[i].get_sum) + parseInt(msg[i].re_sum)) * 100 ;
        		let _class = "progress" ;
        		if(w === 100){
        			_class = "progress_full"
        		}
        		Vue.set(msg[i],"page_class",_class);
        		Vue.set(msg[i],"page_progress",w);
        	}
        };
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
  HOME.onLoad()
  
});

