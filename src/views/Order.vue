<template>
  <div id="order-ticket">
    <div class="ticket">
      <div class="main">
        <div class="non-arrow">
          <div class="time">{{ data.ticket.start_time | remove_seconds }}</div>
          <p class="airport">{{data.ticket.start_airport__name}}</p>
        </div>
        <div class="arrow">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon--_jiantou"></use>
            </svg>
          </div>
        </div>
        <div  class="non-arrow">
          <p class="duration">共{{data.duration}}</p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-feiji1"></use>
          </svg>
        </div>
        <div class="arrow">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon--_jiantou"></use>
            </svg>
          </div>
        </div>
        <div  class="non-arrow">
          <div class="time">{{ data.ticket.end_time | remove_seconds }}</div>
          <p class="airport">{{ data.ticket.end_airport__name }}</p>
        </div>
      </div>
      <p class="head"><span>{{data.ticket.airline}}</span><span>价格：<strong>{{data.ticket.price}}</strong></span><span>出发日期：<strong>{{data.date}}</strong></span> <span>客机型号：{{data.ticket.catagory}}</span></p>
      <p class="user-info"><span>乘机人：<strong>{{ data.user_info.name }}</strong></span><span>联系方式：<strong>{{data.user_info.tel}}</strong></span></p>
    </div>
    <div class="payment"></div>
  </div>
</template>

<script>
export default {
  name: "order",
  props:["data"],
  data(){
    return {
    }
  },
  filters:{
    remove_seconds(x){
      return x.slice(0,5)
    }
  },
}
</script>

<style scoped>
#order-ticket{
  width:800px;
  padding: 40px 0;
  border-radius: 20px;
  background-color: #b3e1f6;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* 头部三大信息和乘机人信息*/
p.head{
  font-size:14px;
  text-align: center;
  color:#8d9296;
  margin-top:10px;
}
.head span,.user-info span{
  margin-right:20px;
}

p.user-info{
  font-size:16px;
  text-align: center;
  color: #0061a8;
  margin-top:10px;
}

.time{
  font-size:40px;
  font-weight: bold;
}
.ticket .main > div.non-arrow{
  width:200px;
  display: inline-block;
  text-align: center;
}

/* 机场名和持续时间 */
.main .airport{
  text-align: center;
  color: #748787;
  font-size:20px;
  font-weight: bolder;
}
.main  .non-arrow .icon{
  font-size:50px;
}
.main .duration{
  font-size: 14px;
  color:#8d9296;
}

/* 箭头 */
.arrow{
  width:50px;
  display: inline-block;
  text-align: center;
}
.arrow > div{
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow .icon{
  font-size:40px;
  color: #b3cfe7;
}

</style>
