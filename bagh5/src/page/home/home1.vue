<template>
  <article>
    <div class="mui-content" id="home">
      <section class='head'>
        <img :src="appset.toppic" style='width:100%;'></img>
      </section>
      <section class="goods">
        <ul>
          <router-link tag="li" class="mui-card goods_item" v-for="(item, index) in activities" :to="'../bag/bag.html?id=' + item.id" :key="item.id" :data-state="item.mark">
            <div class="mui-card-content">
              <img class='goods_item_image' :src='item.pic_1' width="100%"></img>
              <div class='down_time'>
                {{ item.page_timestamp}}
              </div>
            </div>
            <div class="mui-card-footer">
              <div class='mui-ellipsis goods_item_title'>{{ item.title }}</div>
              <div class='goods_item_progress'>
                <div :class='item.page_class' :style="'width:' + item.page_progress + '%;'"></div>
                <span style='position:relative;'>已兑换{{ item.get_sum }}份</span>
              </div>
              <div v-if="item.change.length>0" class='goods_item_user'>
                <img v-for="(list, idx) in item.change" :key = "list.unionid" :src="list.headimg"></img>
              </div>
            </div>
          </router-link>
        </ul>
      </section>
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
  data(){
    return{
      activities: [], // 所有活动列表
      appset: {} //活动首页设置
    }
  },
  mounted(){
    // 获取首页数据
    getActivities(activitiesdata, {url:'../../testjson/home/home.json'})
  },
  components: { footGuide }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    margin: 0 auto;
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
