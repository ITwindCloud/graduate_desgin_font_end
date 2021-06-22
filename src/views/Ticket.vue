<template>
  <div id="result">
    <div>
      <p class="result-title"><span>单程:</span><strong>{{ data.start }}</strong><span>至</span><strong>{{ data.end }}</strong><span>{{ data.date }}</span><span>星期{{ data.chinese_weekday }}</span></p>
      <p class="base-for-order">
        <span :class="{select:!is_price_incr}" @click="change_order_rule(false)">飞机起飞早晚</span>
        <span :class="{select:is_price_incr}" @click="change_order_rule(true)">价格优先</span>
      </p>
      <div id="ticket-menu">
        <ul v-if="data.tickets">
          <li v-for="t in data.tickets">
            <div class="start-end-time">
              <div class="time-and-airport">
                <div v-show="is_approachingly_taking_off(t.start_time)" class="warning">临近起飞</div>
                <div class="time">{{ t.start_time | remove_seconds}}</div>
                <div class="airport">{{ t.start_airport__name }}</div>
              </div>
              <div class="time-arrow">
                <div class="arrow"><span></span></div>
              </div>
              <div class="time-and-airport">
                <div class="time">{{ t.end_time  | remove_seconds }}</div>
                <div class="airport">{{ t.end_airport__name }}</div>
              </div>
            </div>
            <div class="airline">
              <div class="airline-name">{{ t.airline }}</div>
              <div class="airplane-name">{{ t.catagory }}</div>
            </div>
            <div class="price-order">
              <p  v-show="t.price < min_price + 50" class="best-price">
                最低价格
              </p>
              <div>
                <div class="price-discount">
                  <div class="price">
                    <span>￥</span><strong>{{ t.price }}</strong>
                  </div>
                  <div class="discount">{{ t.discount }}折</div>
                </div>
                <div class="order-btn" @click="order_btn(t)">
                  <div :class="{order_btn_disabled:is_took_off(t.start_time),order_btn_abled:!is_took_off(t.start_time)}">点击订票</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="none">
            抱歉，暂时没有直达机票
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ticket",
  props:["data"],
  data(){
    return {
      is_price_incr: false,
      min_price: 0,
      is_today:false
    }
  },
  filters:{
    remove_seconds(x){
      return x.slice(0,5)
    }
  },
  created(){
    this.min_price = this.data.tickets[0].price
    let today = new Date()
    window.sessionStorage.setItem("start_time",this.data.date)
    if(parseInt(this.data.date.slice(8,10)) === today.getDate()){
      this.is_today = true
    }
  },
  methods:{
    change_order_rule(x){
      if(!x && this.is_price_incr){
        this.data.tickets.sort(this.compare_by_time)
        this.is_price_incr = x
      }
      if(x && !this.is_price_incr){
        this.data.tickets.sort(this.compare_by_price)
        this.is_price_incr = x
      }
    },
    // 得出今天时间流逝了多少分钟
    get_cur_minute(){
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      return h * 60 + m
    },
    // 得出某个时刻在今天时间流逝了多少分钟
    get_minute(t){
      let hour = Number(t.slice(0,2))
      let minute = Number(t.slice(3,5))
      return hour*60 + minute
    },// get_minute
    compare_by_time(t1,t2){
      if(this.get_minute(t1.start_time)< this.get_minute(t2.start_time)){
        return -1
      }
      else if(this.get_minute(t1.start_time) > this.get_minute(t2.start_time)){
        return 1
      }
      else{
        return 0
      }
    }, //compare_by_time
    compare_by_price(p1,p2){
      if(p1.price< p2.price){
        return -1
      }
      else if(p1.price > p2.price){
        return 1
      }
      else{
        return 0
      }
    },//compare_by_price
    is_took_off(x){
      if(this.is_today && (this.get_minute(x) - this.get_cur_minute() <= 0)){
        return true
      }
      else{
        return false
      }
    },
    // 判断是否临近起飞
    is_approachingly_taking_off(x){
      let diff = this.get_minute(x) - this.get_cur_minute()
      if(this.is_today && (diff > 0 && diff <=60)){
        return true
      }
      else{
        return false
      }
    },//is_approachingly_taking_off
    order_btn(t){
      if(!this.is_today || (this.get_cur_minute() < this.get_minute(t.start_time))){
        // this.$router.push({path:"/order",query:{id:t.id}})
        let routeData = this.$router.resolve({
          name: 'order',
          query: { id: t.id }
        })
        window.open(routeData.href, '_blank')
      }
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
/* 机票查询结果 */
#result{
  min-height:200px;
  width:100%;
  /* border:1px solid red; */

  display: flex;
  align-items: center;
  justify-content:center;
}
#result > div{
  width:900px;
  min-height:300px;
  border-radius: 20px;
  box-shadow: 6px 6px 4px rgba(86, 184, 241, 0.2),
  -6px -6px 4px rgba(86, 184, 241, 0.2);

  /* border:1px blue solid; */
}

/* 标题 */
#result p.result-title{
  height:40px;
  vertical-align: bottom;
}
#result p.result-title span{
  font-size:20px;
  margin:0 5px;
}
#result p.result-title strong{
  font-size:30px;
  margin:0 10px;
}

/* 排序依据选项 */
#result p.base-for-order{
  position:relative;
  width:100%;
  height:30px;
}
p.base-for-order span{
  display:block;
  margin:0 10px;
  float:right;
  cursor:hand;
}
p.base-for-order span.select{
  color:#f40;
}
.base-for-order span:hover{
  cursor:pointer;
}

/* 机票列表 */
#ticket-menu{
  width:100%;
}
#ticket-menu ul{
  padding:0;
  margin:0;
  list-style-type:none;
}
#ticket-menu ul li{
  width:100%;
  height:70px;
  padding-top:14px;
  position: relative;
  vertical-align:bottom;
  border-bottom:1px solid rgba(177, 183, 187, 0.2);
  /* background-color:rgba(255, 255, 255, 0); */
  /* overflow: hidden; */
}
#ticket-menu ul li:hover{
  border-radius: 10px;
  box-shadow:3px 3px 2px rgba(0,0,0,0.2),
  -3px -3px 2px  rgba(0,0,0,0.2);
}
#ticket-menu ul li > div{
  display: inline-block;
}
/* 一行有三列，划分所占比例 */
.start-end-time{
  width:40%;
  /* overflow: hidden; */
}
.airline{
  width:30%;
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
/* 即将起飞警告 */
.time-and-airport .warning{
  position:absolute;
  margin:-10px auto 0;
  font-size:10px;
  width:100%;
  text-align: center;
  color:#e10022;
  /* border-color: rgba(225,0,34,.8); */
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

/* 运营航空公司以及飞机型号 */
#ticket-menu .airline div{
  width:100%;
  text-align: center;
}
#ticket-menu .airline .airline-name{
  font-size:20px;
  margin-bottom: 5px;
}
#ticket-menu .airline .airplane-name{
  color:cadetblue;
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
/* 最低价格提示 */
.price-order .best-price{
  display: inline-block;
  color:#00a876;
  background-color:rgba(38,194,141,0.2);
  height:21px;
  margin:15px 2px;
  line-height:20px;

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
}
.price-order .order-btn div:hover{
  cursor:pointer;
}
.order_btn_abled{
  background-image: linear-gradient(90deg,#ffa50a,#f70);
  border-color: #ff9913;
  color:white;
}
.order_btn_disabled{
  background-color: rgb(147, 153, 122);
  border-color:white;
  color:white;
}
</style>
