<template>
  <div id="content">
    <div id="window">
    <div id="user_info">
      <div class="right">
        <p id="title">注&nbsp;&nbsp;&nbsp;册</p>
        <p>
          <input type="text" name="name" placeholder="可以随意指定一个你喜欢的昵称" v-model="name">
          <p v-if="is_name_error" class="error">{{name_error}}</p>
        </p>
        <p class="radio_gender">
          <input type="radio" name="gender" value="male" v-model="gender" checked>&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" name="gender" value="female" v-model="gender">&nbsp;&nbsp;女
        </p>

        <p>
          <input type="text" name="tel" placeholder="电话号码(可作为登入使用)" v-model="tel">
          <p v-if="is_tel_error" class="error">{{tel_error}}</p>
        </p>
        <p>
          <input type="text" name="email" placeholder="邮箱(可作为登入和找回密码使用)" v-model="email">
          <p v-if="is_email_error" class="error">{{email_error}}</p>
        </p>
        <p>
          <input type="password" name="pd1" placeholder="密码" v-model="pd1">
          <p v-if="is_pd1_error" class="error">{{pd1_error}}</p>
        </p>
        <p>
          <input type="password" name="pd2" placeholder="二次输入密码" v-model="pd2">
          <p v-if="is_pd2_error" class="error">{{pd2_error}}</p>
          <p v-if="is_pd12_error" class="error">{{pd12_error}}</p>
        </p>
        <p>
          <input type="text" name="abbr" placeholder="地址(可选，可以为您提供更好的服务)" v-model="abbr">
        </p>
        <p>
          <button v-on:click="submit">立即注册</button>
        </p>
        <p style="color:white;" id="switch_login">
          已有账号? &nbsp;&nbsp;<a href="/login">点击去登录!</a>
        </p>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "register",
  data(){
    return {
      //昵称
      name:"",
      is_name_error:false,
      name_error:"此项为必填项",
      //电话号码
      tel:"",
      is_tel_error:false,
      tel_error:"此项为必填项",
      //邮箱
      email:"",
      is_email_error:false,
      email_error:"邮箱格式有误",

      gender:"男",

      pd1:"",
      is_pd1_error:false,
      pd1_error:"此项不能为空",

      pd2:"",
      is_pd2_error:false,
      pd2_error:"此项不能为空",

      is_pd12_error:false,
      pd12_error:"两次密码不一致",

      abbr:"",
    }
  },
  mounted(){

  },
  methods:{
    check_name(){
      if(!this.name.trim()){
        this.is_name_error = true;
      }
      else{
        this.is_name_error = false;
      }
    },//check_name
    check_tel(){
      var trim_tel = this.tel.trim()
      if(!trim_tel){
        this.is_tel_error = true;
        this.tel_error = "此项为必填项"
      }
      else if(trim_tel.search(/^1\d*$/) == -1 || trim_tel.length != 11){
        this.is_tel_error = true;
        this.tel_error = "电话格式有误";
      }
      else{
        this.is_tel_error = false;
      }
    },//check_tel
    check_email(){
      if(!this.email.trim()){
        this.is_email_error = true;
        this.email_error = "此项为必填项";
      }
      else if(this.email.trim().search(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/) == -1){
        this.is_email_error = true;
        this.email_error = "邮箱格式有误";
      }
      else{
        this.is_email_error = false;
      }
    },//check_email
    check_pd12(){
      if(!this.pd1){
        this.is_pd1_error = true;
        this.pd1_error = "此项为必填项";
        this.is_pd12_error = false;
      }
      else if(this.pd1.search(/^[0-9a-zA-Z_]*$/) == -1){
        this.is_pd1_error = true;
        this.pd1_error = "密码包含不合法字符，只能包含数组、字母和下划线";
      }
      else if(this.pd1.length <6){
        this.is_pd1_error = true;
        this.pd1_error = "密码至少由6个字符组成";
      }
      else{
        this.is_pd1_error = false;
      }
      
      if(!this.pd2){
        this.is_pd2_error = true;
        this.pd2_error = "此项为必填项";
        this.is_pd12_error = false;
      }
      else{
        this.is_pd2_error = false;
      }

      if(!this.is_pd1_error && !this.is_pd2_error){
        if(this.pd1 != this.pd2){
          this.is_pd12_error = true;
        }
        else{
          this.is_pd12_error = false;
        }
      }
      
    },//check_pd12
    submit(){
      this.check_name();
      this.check_tel();
      this.check_email();
      this.check_pd12();

      if(!this.is_name_error && !this.is_tel_error && !this.is_email_error &&
        !this.is_pd1_error && !this.is_pd2_error && !this.is_pd12_error){
          axios({
            url:"http://127.0.0.1:8000/ticket/register/",
            method:"post",
            data:{
              name:this.name,
              tel:this.tel,
              email:this.email,
              password:this.pd1,
              gender:this.gender,
              abbr:this.abbr
            },
            transformRequest:[function(data){
              let ret = ""
              for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            }
          }).then(res=>{
            console.log(res.data.data);
            if(res.data.state){
              this.is_tel_error = res.data.data.is_tel_error;
              this.is_email_error = res.data.data.is_email_error;
              this.tel_error = res.data.data.tel_error;
              this.email_error = res.data.data.email_error;
            }
            else{
              this.$router.push("/login")
            }
          },function(){
            console.log("Failing Request!");
          })
      }
      // 待加入与后台的交互
    }
  },
}
</script>

<style>
@import "../../../static/css/login_register_base.css";
@import "../../../static/css/register.css";
</style>