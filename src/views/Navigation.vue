<template>
  <div id="navi">
    <ul>
      <li class="navi-home" title="首页">
        <a href="/index">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-index"></use>
          </svg>
        </a>
      </li>
      <li  v-if="login_state" class="navi-info" @click="quit" title="退出">
        <a href="#">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuichu"></use>
          </svg>
        </a>
      </li>
      <li  v-if="login_state" class="navi-info" title="订单">
        <a href="/history">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dingdan"></use>
          </svg>
        </a>
      </li>
      <li  v-if="login_state" class="navi-info" title="我的信息">
        <a href="/profile">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wode"></use>
          </svg>
        </a>
      </li>
      <li  v-if="login_state" class="navi-info welcome">
        欢迎 {{ username }}
      </li>
      <li  v-if="!login_state" class="navi-info" title="注册">
        <a href="/regsiter">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhuce"></use>
          </svg>
        </a>
      </li>
      <li  v-if="!login_state" class="navi-info" title="登入">
        <a href="/login">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-logindengru"></use>
          </svg>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data(){
    return {
      login_state: false,
      username: "佚名",
    }
  },
  created(){
    this.check_login_state()
  },
  methods:{
    check_login_state(){
      if(window.sessionStorage.getItem("login_state")){
        if(window.sessionStorage.getItem("login_state") === "yes"){
          this.login_state = true
        }
      }
      if(window.sessionStorage.getItem("username")){
        this.username = window.sessionStorage.getItem("username")
      }
    },
    quit(){
      window.sessionStorage.setItem("login_state","no")
      this.login_state = false
      window.sessionStorage.setItem("account","")
      window.sessionStorage.setItem("username","")
      this.username = null
      this.$router.push("/index")
    }
  }
}
</script>

<style>
#navi{
  width:100%;
  height:40px;
  background-color: #036980;
}
#navi ul{
  padding:0;
  margin:0;
  list-style-type: none;
  padding-left:100px;
  padding-right:100px;
}

#navi ul li{
  display: inline-block;

  margin-left:40px;
  height:100px;

  height:40px;
  line-height:40px;

}
/* 链接样式设置 */
#navi ul li a{
  /*color:rgb(62, 214, 241);*/
  color:white;
  font-size:20px;
  text-decoration: none;
}
#navi ul li a .icon{
  font-size:24px;
}
.welcome{
  font-size:16px;
  /*color:rgb(62, 214, 241);*/
  color:white;
}
#navi ul li a:hover{
  color:white;
}

/* 浮动分栏 */
#navi ul li.navi-home{
  float:left;
}
#navi ul li.navi-info{
  float:right;
}
</style>
