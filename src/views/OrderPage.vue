<template>
  <div>
    <top/>
    <navigation/>
    <message>
      <span v-if="is_discounted && !is_drawn && !is_paid" class="content"  title="点击即可领取" @click="get_coupon()">
        <span>恭喜你获得一份优惠券</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youhuiquan"></use>
        </svg>
      </span>
      <span v-else-if="is_discounted && is_drawn && !is_paid" class="content">
        <span>恭喜您，本次购买可以享受 {{ discount }}折扣（注意：仅限本次本次购买使用，退出该页面即失效）</span>
      </span>
      <span v-else-if="is_paid" class="content">
        <span>支付成功，{{ surplus }} 秒中后将会自动跳转自首页！</span>
      </span>
      <span v-else class="content">
        <span>最近天气晴朗，适合出行，祝君旅途愉快！</span>
      </span>
    </message>
    <order v-if="data" :data="data" style="margin:0 auto 10px"/>
    <div id="payment-submit">
      <div>
        <p class="one">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhifu1"></use>
          </svg>
          待支付：￥{{ price }}<button @click="pay">支付</button>
        </p>
        <p class="sec">
          您的余额为：￥{{ data.user_info.money }}
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
      is_drawn:false,
      discount:100,
      is_discounted:false,
      is_paid:false,
      timeout: 5,
      surplus: 0,
      data: null,
      clear: null,
      price: 100000
    }
  },
  created(){
    this.create_ticket()
  },
  watch:{
    surplus: function(){
      if(this.surplus<=0){
        clearInterval(this.clear)
      }
    }
  },
  methods:{
    pay(){
      this.is_paid = true
      this.surplus = this.timeout
      if(this.price <= this.data.user_info.money){
        axios({
          url:"http://127.0.0.1:8000/ticket/order-submit/",
          method:"get",
          params:{
            tel:this.data.user_info.tel,
            num: 1,
            id: this.data.ticket.id,
            money: this.price
          }
        }).then(res=>{
          if(res.data.state === "success"){
            this.surplus = this.timeout
            this.clear= setInterval(()=>{
              this.surplus--
              if(this.surplus <=0){
                this.$router.replace("/index")
              }
            },1000)
            alert("订票成功")
          }
          else{
            alert("订票失败，请稍后再试")
          }
        }).catch(err=>{
          alert(err)
        })
      }
      else{
        alert("您的余额不够，请充值后再尝试！")
      }

    },
    create_ticket(){
      axios({
        url:"http://127.0.0.1:8000/ticket/order/",
        method:"get",
        params:{
          id:	this.$route.query.id,
          account:window.sessionStorage.getItem("account")
        }
      }).then(res=>{
        this.data = res.data.data
        this.price = this.data.ticket.price
        if(res.data.is_discounted && res.data.is_discounted === 1){
          this.is_discounted = true
          this.discount = res.data.discount
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    get_coupon(){
      this.is_drawn = true
      this.price = this.price * this.discount / 100
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
