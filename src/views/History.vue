<template>
  <div>
    <top/>
    <navigation/>
    <order v-for="t in  tickets" :key="t" :data="t" style="margin:0 auto 10px"></order>
    <p v-if="tickets.length <= 0" id="blank">
      此处空空如也。。。。
    </p>
    <p v-if="tickets.length === 1" class="blank">

    </p>
    <six-securities/>
    <copyright/>
  </div>
</template>

<script>
import Top from "./Top";
import Navigation from "./Navigation";
import SixSecurities from "./SixSecurities";
import Copyright from "./Copyright";
import Order from "./Order";
import axios from "axios";
export default {
  name: "History",
  components:{Top,Navigation,Copyright,SixSecurities,Order},
  data(){
    return{
      tickets:null
    }
  },
  mounted(){
    this.scan_orders()
  },
  methods:{
    scan_orders(){
      axios({
        url:"http://127.0.0.1:8000/ticket/order-history",
        method:"get",
        params:{
          account:window.sessionStorage.getItem("account")
        }
      }).then(res=>{
        this.tickets = res.data.data
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
.blank{
  height:120px;
  width:100%;
}
#blank{
  height:350px;
  line-height: 350px;
  width:100%;

  font-size:20px;
  color:#8d9296;
  text-align: center;
}
</style>
