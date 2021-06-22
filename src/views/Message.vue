<template>
  <div id="message">
    <p>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gonggao"></use>
      </svg>
      <slot></slot>
    <p/>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["price"],
  data(){
    return {
    }
  }
}
</script>

<style scoped>
#message{
  background-color: #caf7e3;
  width:100%;
  height:30px;
  font-size:16px;
}
#message p{
  line-height: 30px;
  color:#f40;
  text-align: center;
}
#message p:hover{
  cursor:pointer;
}
.icon{
  font-size:20px;
  margin-right:10px;
}
</style>
