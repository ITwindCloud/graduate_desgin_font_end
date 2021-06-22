<template>
  <div id="transfer-box">
    <div>
      <p class="title">中转方案推荐</p>
      <ul v-if="cases">
        <li v-for="c in cases" :key="c">
          <div class="start-end-time">
            <div class="time-and-airport">
              <div class="time">{{ c.previous.start_time | remove_seconds}}</div>
              <div class="airport">{{ c.previous.start_airport__name }}</div>
            </div>
            <div class="time-arrow">
              <div class="arrow"><span></span></div>
            </div>
            <div class="time-and-airport">
              <div class="time">{{ c.previous.end_time | remove_seconds }}</div>
              <div class="airport">{{ c.previous.end_airport__name }}</div>
            </div>
          </div>
          <div class="middle-time">
            <div class="juzhong">
              <p>{{ get_waiting_duration(c.previous.end_time,c.next.start_time) }}</p>
              <p><span>转1次</span></p>
            </div>
          </div>
          <div class="start-end-time">
            <div class="time-and-airport">
              <div class="time">{{ c.next.start_time | remove_seconds }}</div>
              <div class="airport">{{ c.next.start_airport__name }}</div>
            </div>
            <div class="time-arrow">
              <div class="arrow"><span></span></div>
            </div>
            <div class="time-and-airport">
              <div class="time">{{ c.next.end_time | remove_seconds }}</div>
              <div class="airport">{{ c.next.end_airport__name }}</div>
            </div>
          </div>
          <div class="price-order">
            <div>
              <div class="price-discount">
                <div class="price">
                  <span>￥</span><strong>{{ c.previous.price + c.next.price }}</strong>
                </div>
                <div class="discount"> </div>
              </div>
              <div class="order-btn">
                <div @click="order_btn(c.previous,c.next)">点击订票</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="none">
        抱歉，暂时没有很好的中转方案
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Transfer",
  props: ["cases"],
  filters:{
    remove_seconds(x){
      return x.slice(0,5)
    }
  },
  methods:{
    get_waiting_duration(time_str1,time_str2){
      let hour = Number(time_str2.slice(0,2)) - Number(time_str1.slice(0,2))
      let minute = Number(time_str2.slice(3,5)) - Number(time_str1.slice(3,5))
      let diff = hour*60 + minute
      return "中转" + parseInt(diff/60) + "小时" + parseInt(diff%60) + "分钟"
    },
    order_btn(t1,t2){
      let routeData = this.$router.resolve({
        name: 'order2',
        query: {
          id1: t1.id,
          id2: t2.id
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
.none{
  width:100%;
  height:100px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  color:#ccc;
}
/* 中转的每一个方案，起点到中转站，再由中转站到终点站 */
#transfer-box ul{
  padding:0;
  margin:0;
  list-style-type:none;
  width:100%;
}
#transfer-box ul li{
  padding:10px 0;
  width:100%;
}
#transfer-box ul li:hover{
  border-radius: 10px;
  box-shadow:3px 3px 2px rgba(0,0,0,0.2),
  -3px -3px 2px  rgba(0,0,0,0.2);
}
#transfer-box ul li > div{
  display:inline-block;
}

/* 缩小时间箭头的长度,拉长时间元素的占比*/
#transfer-box ul .time-arrow{
  width:20%;
}
#transfer-box ul .start-end-time{
  width:30%;
}
#transfer-box ul .time-and-airport{
  width:36%;
}

/* 中转信息 */
.juzhong{
  display: block;
  align-items: center;
  justify-content: center;
}
#transfer-box .middle-time{
  width:14%;
  height:52px;
}
#transfer-box .middle-time div{
  width:100%;
}
#transfer-box .middle-time p{
  text-align: center;
  line-height: 26px;
  height:26px;
  color:rgb(120, 127, 133);
}
#transfer-box .middle-time span{
  display: inline-block;
  width:46px;
  height:22px;
  line-height: 22px;
  border:1px solid #398efe;
  border-radius: 10px;
  color:#398efe;
}
#transfer-box .price-order{
  width:24%;
}

/*---------------------------------------------------*/
/* -----------中转推荐------------ */
#transfer-box{
  width:100%;
  margin-top:20px;
  display:flex;
  align-items:center;
  justify-content:center;
}
#transfer-box > div{
  /* height:500px; */
  width:900px;
  border-radius: 20px;
  box-shadow: 6px 6px 4px rgba(86, 184, 241, 0.2),
  -6px -6px 4px rgba(86, 184, 241, 0.2);
  /* border:1px red solid; */
}
/* 标题 */
.title{
  font-size:20px;
  height:40px;
  line-height:40px;
  font-weight:600;
  color:#333;
}

/* 一行有三列，划分所占比例 */
.start-end-time{
  width:40%;
  /* overflow: hidden; */
}
.price-order{
  width:28%;
}
/* 第一列，内容包括起始时间，终点时间，以及二者中间的一条线 */
.start-end-time{
  vertical-align: bottom;
}
.start-end-time > div{
  display: inline-block;
  vertical-align: top;
  width:32%;
}

.time-and-airport{
  position: relative;
  overflow: visible;
}
/* 起飞时间和到达时间 */
.time-and-airport .time{
  font-size:30px;
  font-weight: normal;
  text-align: center;
}
.time-and-airport .airport{
  font-size:10px;
  text-align: center;
}
.start-end-time .time-arrow .arrow{
  height:40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.start-end-time .time-arrow .arrow span{
  display: inline-block;
  width:70%;
  height:5px;
  background-color:rgba(94, 117, 121,0.2);
}

/* 第三列：价格、折扣、订票按钮 */
.price-order{
  position: relative;
  vertical-align: bottom;
}
.price-order > div{
  float:right;
}
.price-order > div > div{
  display: inline-block;
}

/* 价格和折扣设置 */
.price-discount{
  vertical-align: bottom;
}

.price-discount .price *{
  color:#f40;
}
.price-discount span{
  font-size:18px;
}
.price-discount .price strong{
  font-size:28px;
  font-weight: normal;
}
.price-discount .discount{
  text-align: center;
}
/* 订票按钮 */
.price-order .order-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height:53px;
}
.price-order .order-btn div{
  width:68px;
  height:30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  outline:none;
  cursor:hand;
  background-image: linear-gradient(90deg,#ffa50a,#f70);
  border-color: #ff9913;
  color:white;
}
.price-order .order-btn div:hover{
  cursor:pointer;
}
</style>
