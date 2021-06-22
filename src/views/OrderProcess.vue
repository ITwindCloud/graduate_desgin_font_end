<template>
  <div id="order_process">
    <p class="process-title">
      订票流程
    </p>
    <ul>
      <li>
        <div>
          <span class="icon" align="center" style="background-image: url('/static/images/放大镜.jpg');"></span>
          <span class="instruction">
            <p class="instruction-title">航班查询</p>
            <p class="instruction-content">选择出行航班</p>
          </span>
        </div>
      </li>
      <li>
        <div>
          <span class="icon" align="center" style="background-image: url('/static/images/提交订单.jpg');"></span>
          <span class="instruction">
            <p class="instruction-title">提交订单</p>
            <p class="instruction-content">登记乘机人和联系人</p>
          </span>
        </div>
      </li>
      <li>
        <div>
          <span class="icon" align="center" style="background-image: url('/static/images/在线支付.jpg');"></span>
          <span class="instruction">
            <p class="instruction-title">在线支付</p>
            <p class="instruction-content">支付机票款</p>
          </span>
        </div>
      </li>
      <li>
        <div>
          <span class="icon" align="center" style="background-image: url('/static/images/无需取票.jpg');"></span>
          <span class="instruction">
            <p class="instruction-title">无需取票</p>
            <p class="instruction-content">凭电子客票号换登机牌</p>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OrderProcess"
}
</script>

<style scoped>
/* -----购票流程------- */
#order_process{
  /* height:54px; */
  width:100%;
  overflow: hidden;
}

/* ”订票流程“四个字 */
#order_process .process-title{
  color:#36bbe8;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

/* 四个步骤 */
#order_process ul{
  margin:0;
  padding:0;
  height:54px;
  list-style-type:none;
  width:100%;
}

#order_process ul li,#order_process ul li span{
  display: inline-block;
  cursor:hand;
}
#order_process ul li  div{
  display: flex;
  align-items: center;
  justify-content: center;
}
#order_process ul li{
  width:24%;
}
#order_process .icon{
  height:50px;
  width:50px;
  border-radius: 25px;
  border:2px solid #63a1f1;
  background-repeat:no-repeat;
  background-position:center;
  vertical-align: middle;
  /* margin-top:-30px; */
}
#order_process .instruction{
  height:54px;
}
#order_process .instruction p{
  height:27px;
  line-height:27px;
  font-size:14px;
  padding-left:10px;
}
#order_process .instruction .instruction-title{
  color:#f40;
}
#order_process .instruction .instruction-content{
  color:#8d9296;
}
</style>
