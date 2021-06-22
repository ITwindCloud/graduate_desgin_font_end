<template>
  <div>
    <top/>
    <navigation/>
    <reserve/>
    <order-process/>
    <six-securities/>
    <copyright/>
  </div>
</template>

<script>
import Top from "./Top"
import Navigation from "./Navigation"
import Reserve from "./Reserve"
import OrderProcess from "./OrderProcess"
import SixSecurities from "./SixSecurities"
import Copyright from "./Copyright";
export default {
  name: "index",
  components: {Top,Navigation,Reserve,OrderProcess,SixSecurities,Copyright},
}
</script>

<style>
*{
  margin:0;
  padding:0;
  font-size:14px;
}
</style>
