<template>
  <div id="price-trend">
    <div>
      <p class="title">价格趋势图</p>
      <div class="pic-note">
        <div class="pic">
          <div id="mybar" ref="myechart" style="height:500px;width:800px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Statistic",
  props: ["data"],
  data(){
    return {
      statistic: null,
      example: {},
      bar:{}
    }
  },
  mounted(){
    // this.create_example()
    this.statistic =this.data.statistic
    this.visualization()
  },
  updated(){
    if(!this.bar){
      this.visualization()
    }
  },
  computed:{
  },
  methods:{
    visualization(){
      let dom = this.$refs.myechart
      this.bar = echarts.init(dom)
      let option = {
        tooltip:{},
        legend:{
          data:["min","mean","max"]
        },
        xAxis:{
          data: this.statistic.x
        },
        yAxis:{},
        series:[
          {
            name:'min',
            type: 'bar',
            data: this.statistic.min,
            itemStyle: {
              color:"#eb5e0b"
            }
          },
          {
            name:'mean',
            type: 'bar',
            data: this.statistic.mean,
            itemStyle: {
              color:"#5eaaa8"
            }
          },
          {
            name:'max',
            type: 'bar',
            data: this.statistic.max,
            itemStyle: {
              color:"#a3d2ca"
            }
          }
        ]
      }// option
      this.bar.setOption(option)
    }
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
#bar5{
  width:700px;
  height:400px;
}

/* ----价格行情图----- */
/* 标题 */
.title{
  font-size:20px;
  height:40px;
  line-height:40px;
  font-weight:600;
  color:#333;
}
#price-trend{
  width:100%;
  /* border:1px solid red; */
  margin-top:20px;
  display: flex;
  align-items: center;
  justify-content: center;

}
#price-trend > div{
  width:900px;
  box-shadow: 6px 6px 4px rgba(86, 184, 241, 0.2),
  -6px -6px 4px rgba(86, 184, 241, 0.2);
}
#price-trend .pic-note{
  width:100%;
  /* border:1px solid blue; */
}

#price-trend .pic{
  width:100%;

  justify-content: center;
  align-items: center;
}
#price-trend .pic #mybar{
  display: block;
  margin:0 auto;
}
</style>
