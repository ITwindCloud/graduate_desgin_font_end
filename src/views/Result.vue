<template>
  <div>
    <top/>
    <navigation/>
    <div id="box-search">
      <search/>
    </div>
    <div  v-if="!data" class="loading">
      正在马不停蹄地加载，请耐心等待！
    </div>
    <ticket v-if="data" :data="data"/>
    <transfer v-if="data" :cases="data.transferring_cases" />
    <statistic v-if="data" :data="data"/>
    <six-securities/>
    <copyright/>
  </div>
</template>

<script>
import Top from "./Top"
import Navigation from "./Navigation";
import Copyright from "./Copyright";
import Search from "./Search";
import SixSecurities from "./SixSecurities";
import Ticket from "./Ticket"
import Transfer from "./Transfer";
import axios from "axios";
import Statistic from "./Statistic";
export default {
  name: "Result",
  components:{
    Top,Navigation,
    Copyright,Search,
    SixSecurities,Ticket,
    Transfer,Statistic
  },
  data(){
    return {
      data: null,
      date: new Date(),
      start: "北京",
      end: "上海"
    }
  },
  created(){
    console.log("创建成功")
    this.get_data()
  },
  methods:{
    get_data(){
      axios({
        url:"http://127.0.0.1:8000/ticket/search-result/",
        method:"get",
        params:{
          start:this.$route.query.start,
          end: this.$route.query.end,
          date: this.$route.query.date
        }
      }).then(res=>{
        this.data = res.data.data
        console.log("请求数据")
        console.log(this.data)
      },err=>{
        console.log("请求失败")
      })
    },//get_data

  }
}
</script>

<style scoped>
#box-search{
  position:relative;
  height:230px;
  width:100%;
}
.loading{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:300px;
  color:#ccc;
  font-size:30px;
}
</style>
