<template>
  <div id="order" :style="{top:top_distance+'px'}" :class="{absolute:is_absolute,relative:!is_absolute}">
    <div>
      <ul class="ticket">
        <li>国内机票</li>
        <li :class="{select:date_num==0}" v-on:click="click_start_date(date_args[0])">{{ dates[0] }}</li>
        <li :class="{select:date_num==1}" v-on:click="click_start_date(date_args[1])">{{ dates[1] }}</li>
        <li v-on:click="click_start_date(date_args[2])">{{ dates[2] }}</li>
        <li v-on:click="click_start_date(date_args[3])">{{ dates[3] }}</li>
      </ul>
      <div id="hot-cities">
        <span>热门城市推荐</span>
        <ul class="cities">
          <li v-on:click="click_end_city('北京')">北京</li>
          <li v-on:click="click_end_city('上海')">上海</li>
          <li v-on:click="click_end_city('深圳')">深圳</li>
          <li v-on:click="click_end_city('广州')">广州</li>
          <li v-on:click="click_end_city('南京')">南京</li>
          <li v-on:click="click_end_city('成都')">成都</li>
          <li v-on:click="click_end_city('武汉')">武汉</li>
          <li v-on:click="click_end_city('杭州')">杭州</li>
          <li v-on:click="click_end_city('三亚')">三亚</li>
          <li v-on:click="click_end_city('重庆')">重庆</li>
        </ul>
      </div>

      <div id="searching_info">
        <p class="three_lines">
          <span v-if="num===1" class="cur_info_input"></span>
          <span v-else></span>
          <span v-if="num===2" class="cur_info_input"></span>
          <span v-else></span>
          <span v-if="num===3" class="cur_info_input"></span>
          <span v-else></span>
        </p>
        <p class="three_input">
          <input v-on:focus="change_num(1)" type="text" v-on:blur="change_num(-1)" v-model="start" placeholder="出发地">
          <input v-on:focus="change_num(2)" type="text" v-on:blur="change_num(-1)" v-model="end" placeholder="目的地">
          <input v-on:focus="change_num(3)" type="date" v-on:blur="change_num(-1)" v-on:change="start_date_change" v-model="start_date">
        </p>
        <p class="submit">
          <button @click="go_searching2">搜索</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  props: {
    top_distance:{
      type:Number,default:0
    },
    is_absolute:{
      type:Boolean,default: false
    },
  },
  data(){
    return {
      start:"",
      end:"",
      start_date:"",
      test:"",
      dates:[],
      date_args:[],
      num:-1,
      date_num:0,
    }
  },
  mounted(){
    if(this.$route.path.indexOf("/result") !== -1){
      this.start = window.sessionStorage.getItem("start")
      this.end = window.sessionStorage.getItem("end")
      this.start_date = window.sessionStorage.getItem("start_date")
      this.start_date_change()
    }
    else{
      if(this.$route.path.indexOf("/index") !== -1){
        this.today_date_format()
      }
      else{
        this.start_date_change()
      }
    }
  },
  methods:{
    today_date_format(){
      let today = new Date();
      let year = today.getFullYear(),month = today.getMonth(),day = today.getDate();
      month+=1;
      if(month<10){
        month = "0"+month;
      }
      if(day<10){
        day = "0"+day;
      }
      let str_date = year + "-" + month + "-" + day
      this.start_date = str_date
      this.start_date_change();
    },//today_date_format
    start_date_change(){
      axios({
        url:"http://127.0.0.1:8000/ticket/four-dates/",
        method:"get",
        params:{
          "date":this.start_date
        }
      }).then(res=>{
        console.log(res.data.data);
        this.dates = res.data.data.dates;
        console.log(this.dates)
        this.date_args = res.data.data.date_args;
        this.date_num = res.data.data.select;
        this.start_date = res.data.data.start_date;
      },function(){
        console.log("Failure");
      })
    },//start_date_change
    change_num(num){
      this.num = num;
    },//change_num
    click_start_date(x){
      this.start_date = x;
      this.start_date_change();
    },//click_start_date
    click_end_city(x){
      this.end = x;
    },//click_end_city
    go_searching(){
      if(this.$route.name === "index" || this.$route.name === "result"){
        if(this.start && this.end && this.start_date){
          // this.$router.push({name:"result"})
          window.sessionStorage.setItem("start",this.start)
          window.sessionStorage.setItem("end",this.end)
          window.sessionStorage.setItem("start_date",this.start_date)
          let routeData = this.$router.resolve({
            name: 'result',
            query: {
              start:this.start,
              end:this.end,
              date:this.start_date
            }
          })
          window.open(routeData.href, '_blank')
        }
        else{
          alert("无效搜索")
        }
      }
    },
    go_searching2(){
      axios({
        url:"http://127.0.0.1:8000/ticket/search-check/",
        method:"get",
        params:{
          start:this.start,
          end:this.end,
        }
      }).then(res=>{
        if(res.data.state === "failure"){
          alert("无效搜索")
        }
        else{
          this.go_searching()
        }
      }).catch(err=>{
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
@import "../../static/css/search.css";
/* 按钮设置 */
.absolute{
  position:absolute;
}
.relative{
  position:relative;
}

#searching_info .submit{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#searching_info button{
  color:white;
  font-size:24px;
  letter-spacing: 10px;
  background-image: linear-gradient(-90deg, #f70 0%, #FFA50A 100%);
  box-shadow: 0 4px 16px 0 rgb(255 102 0 / 32%);
  width:176px;
  height:56px;
  border-radius: 30px;
  outline:none;
  border:0;
  cursor:hand;
  position: absolute;
  margin-bottom: 12px;
  box-shadow: 2px 2px 3px #f40;
}

#searching_info button:hover{
  cursor:pointer;
  box-shadow: 2px 2px 1px #f40;
}
</style>
