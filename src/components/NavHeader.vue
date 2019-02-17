<template>
  <header class="header">
      <div class="cup_top">
        <div class="top_wrap">
          <div class="top_tap">
            <img src="./../assets/taobao.png">
          </div> 
            <div class="search_wrap">
             <div class="search_bd">
              <el-form :inline="true" >
                      <el-form-item label="商品名称">
                          <el-input v-model="goodsFind" prefix-icon="el-icon-search" placeholder="请输入商品名称"></el-input>
                          <div class="show_list" v-if="showList">
                            <ul>
                             <li v-for="(item,index) in goodsFindList">
                               <a href="javascript:void(0)"> <div>{{item.productName}}</div> </a>
                             </li>
                            </ul>
                           </div>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" round>查询</el-button>
                       </el-form-item>
                     </el-form>
                 </div>
               </div>
            <div class="top_login">
              <div class="top_login_container">
                          <span class="top_login_link" v-text="'你好!'+nickName" v-if="nickName"></span>
                          <a href="javascript:void(0)" class="top_login_link" @click="loginModalFlag=true" v-if="!nickName">登录/</a>
                           <a href="javascript:void(0)" class="top_login_link" @click="loginOut">登出</a>
                        </div>
                        <div class="top_login_container">
                          <a href="javascript:void(0)" class="top_register_link" @click="toRegister" v-if="!nickName">注册</a>
                        </div>
               </div>
             </div>
            </div>
             <div class="md_show" v-if="loginModalFlag">
              <form action="" method="post">
               <div class="error_wrap">
                   <span class="error_show" v-show="errorTip">用户名或者密码错误</span>
                   </div>
                   <div>
                <div class="item firstLine" id="firstLine">
                  <span class="login_title">我要登录</span>
                  <span class="login_close"  @click="loginModalFlag=false">x</span>
                </div>
                <ul style="list-style-type:none">
                <li class="item">
                  <label>用户</label>
                  <input type="text" name="uname" v-model="userName"/>
                </li>
                <li class="item">
                  <label>密码</label>
                  <input type="password" name="upwd" v-model="userPwd" @keyup.enter="login"/>
                </li>
              </ul>
             </div>
                <div class="item">
                   <a href="javascript:;" class="btn_login" @click="login">登  录</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-bind:class="{'mask_show':loginModalFlag}"></div>
</header>
</template>
<style>
.header{
  height:1.5rem;
  background-color: #ea7500;
}
.cup_top{
 padding:0.01rem;
  } 
.top_wrap{
  position:relative;
    padding:0.1rem 0.1rem;
}
.top_tap{
  position:absolute;
  left:1.5rem;
}
.top_tap img{
  width:3rem;
  height:1.3rem;
}
.search_wrap{
width:15rem;
 margin:0 auto;
}
.search_bd{
  padding:0.1rem;
}
.show_list{
  position:absolute;
  z-index:999;
  left:0rem;
  width:8rem;
  background-color:white;
}
.show_list ul li{
  border-bottom: 1px solid #ccc;
  list-style:none;
}
.el_form{
  position:relative;
  padding:0.01rem;
}
.el-input__inner{
  width:8rem;
  height:0.8rem;
  border-radius:0.8rem;
}
.top_login{
  width:3rem;
  height:1rem;
 padding:0.1rem;
  position: absolute;
  right:1rem;
 bottom:0.2rem;
  }
  .top_login-link{

  }
  .top_login_container{
 margin-top:0.1rem;
  }
.top_login .el_button{
  width:1rem;
  height:0.5rem;
  padding:0.03rem 0.01rem;
}
.md_show{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-2.5rem;
  margin-left:-5rem;
  width:10rem;
  height:5rem;
  background-color:white;
  z-index:9999;
}
.md_show .item{
  width:7rem;
  margin:0 auto;
  height:1rem;
  line-height:1rem;
  padding:0 0.5rem; 
}
.md_show .item .firstLine{
  color:#666;
  background:#f7f7f7;
  font-size:0.4rem;
  font-weight:bold;
  cursor:move;
}
.md_show .item .login_close{
  display:inline-block;
  float:right;
  cursor:pointer;
  font-size:0.3rem;
}

.md_show .item li{
  border:0.01rem solid #ccc;
}
.md_show .item input{
    height:0.5rem;
  width:5rem;
}
.md_show .item a.btn_login{
  display:block;
  margin:0.2rem;
  height:0.8rem;
  width:7rem;
  background:#4490f7;
  color:white;
  font-size:0.2rem;
  font-weight:bold;
  text-align:center;
  margin:0 auto;
}
.mask_show{
  height:100%;
  width:100%;
  background-color:black;
  opacity:0.6;
  position:absolute;
  z-index:999;
  top:0;
  left:0;
}

</style>
<script>
/*import API_LIST from '../../static/js/common.js'*/
//函数防抖实现关键字检索
 const delay=(function(){
  let timer=0;
  return function(callback,ms){
    clearTimeout(timer);
    timer=setTimeout(callback,ms);
  }
 })();
export default{
    data() {
      return {
        userName:'',
        userPwd:'',
         nickName:'',
         showList:false,
         errorTip:false,
         loginModalFlag:false,
         goodsFind:'',
         goodsFindList:[]
      }
    },
    //监听搜索框数据改变
    watch:{
       goodsFind(){
        console.log(this.goodsFind)
        delay(()=>{
          console.log('3')
          this.axiosData();
        },300);
       }
    },
     mounted(){
            this.checkLogin();
        },
      methods: {
        //寻找检索商品
      async axiosData(){
         console.log('2')
         let token=localStorage.getItem('token');
         let goodsFind=this.goodsFind;
         const res=await this.$http.post("http://127.0.0.1:3005/goodsFind",{
                token:token,
                goodsFind:goodsFind
                  }).then((response)=>{
                    console.log('4')
                     this.goodsFindList=response.data.result;
                      console.log(response.data.result)
                      this.showList=true;
                  })
                  console.log(this.goodsFindList)
      },
      //检查是否登陆
       checkLogin(){
         let token=localStorage.getItem('token');
         let userName=localStorage.getItem('userName');
         console.log('寻找'+token)
         this.$http.post("http://127.0.0.1:3005/checkLogin",{
                token:token,
                userName:userName  
                  }).then((response)=>{
                    var res = response.data;
                    var path = this.$route.pathname;
                    if(res.status=="0"){
                      console.log(response.data)
                     this.nickName = res.result;
                      this.$store.commit("updateUserInfo",res.result);
                      this.loginModalFlag = false;
                    }else{
                      console.log('check错误')
                    }
                  })
              },
        //登陆
       login(){  
        if(!this.userName||!this.userPwd){
          this.errorTip=true;
          return;
        }
        this.$http.post(API_LIST.login,{
          userName:this.userName,
          userPwd:this.userPwd
          }).then((response)=>{
          console.log(response.data)
          if(response.data.status==0){
            console.log('存入token')
            console.log(response.data.token)
          /*  
            let token=localStorage.getItem('token');
            let localStorage= localStorage.getItem('userName');*/
          let token=response.data.token;
          let userName=response.data.userName;
          let userPwd=response.data.userPwd;
            localStorage.setItem('token',token);
           localStorage.setItem('userName',userName);
            localStorage.setItem('userPwd',userPwd);
                 this.errorTip = false;
                  this.loginModalFlag = false;
                 this.nickName=response.data.userName;
          }else{
            this.errorTip = true
          }
        }).catch((reject)=>{
          console.log(reject)
        })
       },
       //登出
       loginOut(){
          localStorage.removeItem('token');
          let token=localStorage.getItem('token');
          if(token==null){
            this.nickName='';
          }
       },
       //转到注册页面
       toRegister(){
        this.$router.push({path:'./../UserRegister'});
       }
     }
}
</script>
