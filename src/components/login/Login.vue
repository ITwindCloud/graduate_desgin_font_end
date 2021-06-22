<template>
  <div>
    <div id="content">
    <div id="window">
      <div class=left>
      </div>
      <div class="right">
        <div>
          <p class="window-title">登&nbsp;&nbsp;&nbsp;陆</p>
          <p>
            <input type="text" name="account" placeholder="电话号码或者邮箱" v-model="account">
          </p>
          <p v-if="is_account_error" style="color:red;">
            {{account_error}}
          </p>
          <p>
            <input type="password" name="password" placeholder="密码" v-model="password" v-on:click="check_acc_blank">
          </p>
          <p v-if="is_password_error" style="color:red;">
            {{password_error}}
          </p>
          <!-- 验证码 -->
          <p id="captcha_p">
            <input type="text" name="captcha_input" placeholder="不区分大小写"
            v-model="captcha_input" style="width:150px;height:30px;">
            <img v-bind:src="captcha_url" v-on:click="get_captcha" alt="点击重新获取" style="width:90px;height:30px;vertical-align:middle;">
          </p>
          <p v-if="is_capt_error" style="color:red;">
            {{ capt_error }}
          </p>
          <!-- 登入按钮 -->
          <p>
            <button v-on:click="check_acc_pd">登陆</button>
          </p>
          <!-- 其他进入网站的方式 -->
          <p class="account-link"><a href="#">已经有账号，忘记密码?</a></p>
          <p class="account-link">没有账号?&nbsp;&nbsp;&nbsp;&nbsp;<a href="/register">点击注册！</a></p>
          <p class="account-link"><a href="/index">我是游客，想参观！</a></p>
        </div>
      </div>
    </div>
  </div>
  <!-- style="width:100%;height:30px;line-height:30px;color:red;" -->
  <div id="copyright">
    &copy; 苍穹科技
  </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    name: "login",
    data(){
      return {
        account:"",
        password:"",
        is_account_error:false,
        is_password_error:false,
        account_error:"",
        password_error:"",
        captcha_input:"",
        captcha_url:"#",
        captcha_answer:"",
        is_capt_error:false,
        capt_error:"",
      }
    },
    mounted(){
      this.get_captcha()
    },
    methods:{
      check_acc_blank(){
        if(!this.account.trim()){
          this.is_account_error = true;
          this.account_error = "此项为必填项";
        }
        else{
          this.is_account_error = false;
          this.is_account_error = "";
        }
      },//check_acc_blank
      check_pd_blank(){
        if(!this.password.trim()){
          this.is_password_error = true;
          this.password_error = "密码不能为空";
        }
        else{
          this.is_password_error = false;
          this.password_error = "";
        }
      },//check_pd_blank
      check_captcha(){
        if(!this.captcha_input.trim()){
          this.is_capt_error = true;
          this.capt_error = "验证码不能为空";
        }
        else{
          this.is_capt_error = false;
          // this.capt_error = "验证码不能为空";
        }
      },//check_captcha
      check_acc_pd(){
        this.check_acc_blank();
        this.check_pd_blank();
        this.check_captcha();
        //根据后端返回的数据，确认账号密码是否均正确
        if(!this.is_password_error && !this.is_account_error && !this.is_capt_error){
          axios({
            url: "http://localhost:8000/ticket/login/",
            method: 'post',
            data: {
              account:this.account,
              password:this.password,
              captcha_input:this.captcha_input,
              captcha_answer:this.captcha_answer
            },
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res=>{
            if(res.data.data){
              this.is_account_error = res.data.data.is_acc_error;
              this.is_password_error = res.data.data.is_pd_error;
              this.is_capt_error = res.data.data.is_capt_error;
              this.account_error = res.data.data.acc_msg;
              this.password_error = res.data.data.pd_msg;
              this.capt_error = res.data.data.capt_msg;
            }
            if(res.data.success){
              this.$router.push("/index")
              window.sessionStorage.setItem("login_state","yes")
              window.sessionStorage.setItem("account",this.account)
              window.sessionStorage.setItem("username",res.data.username)
            }
          });
        }//后端数据验证
      },//check_pd_acc
      get_captcha(){
        axios("http://127.0.0.1:8000/ticket/get-captcha/").then(res=>{
          console.log(res.data)
          this.captcha_url = res.data.data.url;
          this.captcha_answer = res.data.data.key;
          if(this.captcha_url){
            this.captcha_url = "http://127.0.0.1:8000" + res.data.data.url;
            console.log(this.captcha_url)
          }
          else{
            console.log("验证码返回错误")
          }
        },function(){
          console.log("Failing Request");
        });
        // this.is_capt_not_firstly_flushing=true;
      },//get_captcha
    },
}
</script>

<style>
@import "../../../static/css/login_register_base.css";
@import "../../../static/css/login.css";
</style>
