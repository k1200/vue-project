<template>
  <article id="home">
    <div class="container">
      <div class="head">
        <img src="http://7xoq3p.com1.z0.glb.clouddn.com/xshop%2F20180115%2F15159838932134.png" style="width: 100%;">
      </div>
      <div class="goods">
        <a href="http://tec.xishuw.com/Prize/BagWechat/infor/id/9" data-state="已结束" class="goods_item">
          <div style="position: relative;">
            <img src="http://7xoq3p.com1.z0.glb.clouddn.com/shop66a11904f0d3cb3b0321110a3014ac031516280795.jpg" class="goods_item_image">
            <div class="down_time"> 活动已结束 </div>
          </div>
          <div class="goods_item_title txtellipsis">绵阳火锅节</div>
          <div class="goods_item_progress">
            <div class="progress" style="width: 73%;"></div> <span style="position: relative;">已兑换73份</span>
          </div>
          <div class="goods_item_user">
            <img src="http://wx.qlogo.cn/mmopen/vi_32/icicTKb8d86B8LpN1OfwXfRDZFB77lLQ1ZYO1EqxmSwFeo0XaiboHR0HNE2IrxmAoDAFrqcWOrdwmnicI4tcqG319A/132">
          </div>
        </a>
        <a href="http://tec.xishuw.com/Prize/BagWechat/infor/id/8" data-state="已结束" class="goods_item">
          <div style="position: relative;">
            <img src="http://7xoq3p.com1.z0.glb.clouddn.com/shop835b48946d1d86b4dd6329deda1d6c021516261226.jpg" class="goods_item_image">
            <div class="down_time"> 活动已结束 </div>
          </div>
          <div class="goods_item_title txtellipsis">大闸蟹抢购</div>
          <div class="goods_item_progress">
            <div class="progress" style="width: 0%;"></div>
            <span style="position: relative;">已兑换0份</span>
          </div>
        </a>
        <a href="http://tec.xishuw.com/Prize/BagWechat/infor/id/7" data-state="进行中" class="goods_item">
          <div style="position: relative;">
            <img src="http://7xoq3p.com1.z0.glb.clouddn.com/shop279df1f8e49c5508455f07f6ddebf7de1516260938.jpg" class="goods_item_image">
            <div class="down_time"> 距离结束还剩 343 天 11 时 52 分 29 秒 </div>
          </div>
          <div class="goods_item_title txtellipsis">美食火锅节</div>
          <div class="goods_item_progress">
            <div class="progress" style="width: 0%;"></div>
            <span style="position: relative;">已兑换0份</span>
          </div>
        </a>
      </div>
    </div>
    <foot-guide></foot-guide>
  </article>
</template>

<script>
import footGuide from '../../components/footGuide/footGuide'
import {getActivities} from '../../service/getData'
import {activitiesdata} from '../../service/response'
export default {
  name: 'home',
  components: { footGuide },
  mounted () {
    getActivities(activitiesdata, {url: '../testjson/home/home.json'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    padding-bottom: 52px;
  }
  .goods {
    width: 90%;
    margin: auto;
  }
  .goods_item {
    padding: .4rem .4rem 0;
    border: 2px solid #000;
    border-radius: .75rem;
    margin: 0 0 8px 0;
    display: block;
    background-color: #fff;
    position: relative;
    overflow: hidden;
  }
  .goods_item::after {
    position:absolute;
    content:attr(data-state);
    padding:3px 0;
    color:#fff;
    background-color:#ff551b;
    right:-25px;
    top:12px;
    transform:rotate(45deg);
    width:100px;
    text-align:center;
  }
  .down_time {
    background-color:rgba(0,0,0,0.5);
    position:absolute;
    bottom:0;
    text-align: center;
    padding: 3px 0;
    width: 100%;
    color: #fff;
  }
  .goods_item_image {
    border-top-left-radius: .75rem;
    border-top-right-radius: .75rem;
  }
  .mui-card-footer {
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    padding: 0;
  }
  .goods_item_title {
    font-weight: bold;
    padding: .2rem;
    width: 100%;
  }
  .goods_item_progress {
    width: 96%;
    background-color: #101010;
    border-radius: 1.5rem;
    position: relative;
    color: #fff;
    text-align: center;
    margin: 0 auto .4rem;
    overflow: hidden;
    font-size: 12px;
  }
  .progress , .progress_full {
    height: 100%;
    position: absolute;
    background-color: #ff551b;
    left:0;
    top:0;
  }
  .progress_full {
    border-bottom-right-radius:1.5rem;
    border-top-right-radius:1.5rem;
  }
  .goods_item_user {
    width: 100%;
    padding: 0 .4rem;
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .goods_item_user img {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    margin: .4rem .25rem;
    border:1px solid #ddd;
  }
</style>
