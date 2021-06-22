<template>
  <div id="reserve">
    <div id="advertisement">
      <img  v-if="order_num==0" src="/static/images/shanghai.jpg" alt="上海陆家嘴" title="上海陆家嘴">
      <img  v-if="order_num==1" src="/static/images/island.jpg" alt="太平洋小岛" title="太平洋小岛">
      <img  v-if="order_num==2" src="/static/images/settingsun.jpg" alt="大海的日落" title="大海的日落">
    </div>
    <search :top_distance="206" :is_absolute="true"/>
  </div>
</template>

<script>
import Search from "./Search";
export default {
  name: "reserve",
  components:{ Search },
  data(){
    return {
      order_num: 0,
      acculating_count:0
    }
  },
  created(){
    this.scroll_pics()
  },
  methods:{
    // 使图片每隔五秒中切换
    scroll_pics(){
      window.setInterval(()=>{
        this.acculating_count++
        this.order_num = this.acculating_count % 3
      },5000)
    }
  }
}
</script>

<style>
/* -------旅游宣传与预订--------- */
#reserve{
  position: relative;
  height:430px;
}
#reserve #advertisement{
  width:100%;
  height:250px;
  overflow:hidden;
}
#reserve #advertisement img{
  width:100%;
}
</style>
