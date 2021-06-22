<template>
  <div>
    <top/>
    <navigation/>
    <message  v-if="is_paid" >
      <span class="content">
        <span>支付成功，{{ surplus }} 秒中后将会自动跳转自首页！</span>
      </span>
    </message>
    <order v-if="ticket1" :data="ticket1" style="margin:0 auto 10px"/>
    <order v-if="ticket2" :data="ticket2" style="margin:0 auto 10px"/>
    <div id="payment-submit">
      <div>
        <p class="one">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhifu1"></use>
          </svg>
          待支付：￥{{ ticket1.ticket.price + ticket2.ticket.price}}<button @click="pay">支付</button>
        </p>
        <p class="sec">
          您的余额为：￥{{ ticket1.user_info.money }}
        </p>
      </div>
    </div>
    <six-securities/>
    <copyright/>
  </div>
</template>

<script>
import Top from "./Top";
import Navigation from "./Navigation";
import SixSecurities from "./SixSecurities";
import Copyright from "./Copyright";
import Order from "./Order"
import Message from "./Message";
import axios from "axios";
export default {
  name: "OrderPage",
  components:{Top,Navigation,SixSecurities,Copyright,Order,Message},
  data(){
    return {
      is_paid:false,
      timeout: 5,
      surplus: 0,
      ticket1: null,
      ticket2: null,
    }
  },
  mounted(){
    this.create_ticket()
  },
  methods:{
    pay(){
      axios({
        url:"http://127.0.0.1:8000/ticket/order-submit/",
        method:"get",
        params:{
          id1:this.$route.query.id1,
          id2:this.$route.query.id2,
          num: 2,
          tel:window.sessionStorage.getItem("account")
        }
      }).then(res=>{
        if(res.data.state === "success"){
          alert("购票成功")
          // 页面跳转倒计时
          this.is_paid = true
          this.surplus = this.timeout
          window.setInterval(()=>{
            this.surplus--
            if(this.surplus <=0){
              this.$router.replace("/index")
            }
          },1000)
        }
        else{
          alert("购票失败")
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    create_ticket(){
      axios({
        url:"http://127.0.0.1:8000/ticket/order2/",
        method:"get",
        params:{
          id1:this.$route.query.id1,
          id2:this.$route.query.id2,
          account:window.sessionStorage.getItem("account")
        }
      }).then(res=>{
        this.ticket1 = res.data.data.ticket1
        this.ticket2 = res.data.data.ticket2
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#payment-submit{
  height:80px;
  width:100%;
  margin-bottom: 10px;
}
#payment-submit{
  text-align: center;
}
#payment-submit > div {
  width:800px;
  margin:0 auto;
}
.one{
  height:50px;
  line-height: 50px;
  font-size:20px;
  font-weight: bold;
}
.one .icon{
  font-size:50px;
  vertical-align: middle;
}

.one button{
  width:100px;
  height:30px;
  vertical-align: middle;
  margin-left:20px;
  border-radius: 8px;
  background-color: #36bbe8;
  outline: none;
  border:none;
  letter-spacing: 10px;
  color:white;
  text-align: center;
}
.one button:hover{
  cursor:pointer;
  background-color: #0c91bf;
}

.sec{
  font-size:16px;
  color:#8d9296;
}
</style>
