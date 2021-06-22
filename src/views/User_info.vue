<template>
  <div id="user_body">
    <top/>
    <navigation/>
    <div id="user_info">
<!--      a profile image-->
      <div class="profile">
        <img v-if="info && info.gender" src="static/images/user/头像男孩.png" alt="头像"/>
        <img v-else-if="info && !info.gender" src="static/images/user/头像女孩.png" alt="头像"/>
      </div>
<!--      details-->
      <div class="detail" v-if="info">
        <p>
          <img src="static/images/user/姓名.png" alt=""/>
          <input v-if="disabled" type="text" v-model="name" disabled>
          <input v-else  type="text" v-model="name">
        </p>
        <p><img @click="alert_not_allowed_mod" src="static/images/user/性别.png" alt=""/> {{ get_sex(info.gender) }}</p>
        <p><img @click="alert_not_allowed_mod" src="static/images/user/电话.png" alt=""/> {{ info.tel }}</p>
        <p><img @click="alert_not_allowed_mod" src="static/images/user/邮箱.png" alt=""/> {{ info.email }}</p>
        <p>
          <img src="static/images/user/地址.png" alt=""/>
          <input v-if="disabled"  type="text" v-model="addr" disabled>
          <input v-else  type="text" v-model="addr">
        </p>
        <p><img src="static/images/user/余额.png" alt=""/> {{ info.money }}元</p>
        <p>
          <button v-if="disabled" @click="editable" >编辑</button>
          <button v-else @click="editable" class="edit" disabled>编辑</button>

          <button v-if="!disabled" @click="submit">提交</button>
          <button v-else disabled>提交</button>

          <button v-if="!disabled" @click="withdraw">取消</button>
          <button v-else disabled>取消</button>
        </p>
      </div>
      <div v-else class="detail">
        <div class="loading">正在马不停蹄的赶过来</div>
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
import axios from "axios";
export default {
  name: "User_info",
  components:{Top,Navigation,SixSecurities,Copyright},
  data(){
    return {
      male: true,
      info: null,
      name: "",
      addr: "",
      disabled: true
    }
  },
  mounted(){
    this.get_user_info()
  },
  created(){
  },
  methods:{
    get_sex(b){
      if(b){
        return "男"
      }
      else{
        return "女"
      }
    },
    get_user_info(){
      axios({
        url:"http://127.0.0.1:8000/ticket/user_info/",
        params:{
          tel: window.sessionStorage.getItem("account")
        }
      }).then(res=>{
        this.info = res.data.data
        this.addr = this.info.addr
        this.name = this.info.name
      }).catch(err=>{
        alert(err)
      })
    },
    alert_not_allowed_mod(){
      alert("此字段暂时不能修改")
    },
    editable(){
      this.disabled = false
    },
    withdraw(){
      this.name = this.info.name
      this.addr = this.info.addr
      this.disabled = true
    },
    submit(){
      this.disabled = true
      axios({
        url:"http://127.0.0.1:8000/ticket/user_info_mod/",
        params:{
          name:this.name,
          addr:this.addr,
          tel:this.info.tel
        }
      }).then(res=>{
        if(res.data.state === "failure"){
          alert("修改失败")
        }
        else{
         alert("修改成功")
        }
      }).catch(err=>{
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
*{
  padding:0;
  margin:0;
}

#user_info{
  width:320px;
  height:430px;
  margin: 0 auto;
}
.profile{
  text-align: center;
}
.profile img{
  width:100px;
  height:100px;
  margin-top:20px;
}
.detail img{
  width:30px;
  height:30px;
  margin-right:20px;
  vertical-align: middle;
}
.detail p{
  margin-top:15px;
  height:30px;
  font-size:20px;
  font-weight: bolder;
  line-height: 30px;
  /*align-items: center;*/
}
.detail .loading{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:300px;
  color:#ccc;
  font-size:30px;
}

.detail input, .detail input:disabled{
  height:30px;
  margin-left:6px;
  width:200px;
  font-size:20px;
  font-weight: bolder;
  outline: none;
  border:none;
}
.detail input:focus{
  color:#036980;
  border:1px  #ccc solid;
  border-radius:4px;
  padding-left:4px;
}
.detail button{
  height:30px;
  border:none;
  width:100px;
  color:white;
  background-color: #36bbe8;
  cursor:pointer;
  border-radius: 4px;
}
.detail button:disabled{
  color:#ccc;
  cursor: default;
}
</style>
