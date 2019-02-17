       <template>
        <div>
        <nav-bread>
        <span>register</span>
         </nav-bread>
         <div class="md_show" >
              <form action="" method="post">
                   <div>
                <ul style="list-style-type:none">
                <li class="item">
                  <label>用户</label>
                  <input type="text" name="uname" v-model="userName"/>
                </li>
                <li class="item">
                  <label>密码</label>
                  <input type="password" name="upwd" v-model="userPwd"/>
                </li>
                <li class="item">
                  <label>确认密码</label>
                  <input type="password" name="upwd" v-model="reuserPwd" @blur="checkpwd"/>
                  <div class="error_show">
                   <span v-show="errorTip">用户名或者密码错误</span>
                 </div>
                </li>
                <li class="item">
                  <label>邮箱</label>
                  <input type="email" name="email">
                </li>
              </ul>
             </div>
                <div class="item">
                   <a href="javascript:;" class="btn_login" @click="register">确认注册</a>
                </div>
              </form>
            </div>
            <div class="mdShow" v-if="mdShow">
          <p slot="message">
             你已经注册过了！
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </div>
          </div>
        </template>
  <script>
  import NavBread from './../components/NavBread'
  import API_LIST from '../../static/js/common.js'
   export default{
    data() {
      return {
        userName:'',
        userPwd:'',
        reuserPwd:'',
        mdShow:false,
         errorTip:false,
      }
    },
    components:{
          NavBread
        },
    methods: {
      checkpwd() {
        if(this.reuserPwd!=this.userPwd){
          this.errorTip=true
          console.log(this.userPwd)
          console.log(this.reuserPwd)
         }else{
           this.errorTip=false
         }
        },
        register() {
           axios.post(API_LIST.register,{
          userName:this.userName,
          userPwd:this.userPwd
          }).then((response)=>{
              console.log(this.userPwd)
          console.log(this.reuserPwd)
             if(response.data.status===0){
             console.log('用户添加成功')
         }else{

       this.mdShow=true
         }
          })
        }
       /* axios.post()*/
      }
    }
</script>
 <style>
.md_show{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-2.5rem;
  margin-left:-5rem;
  width:10rem;
  height:5rem;
  background-color:#ccc;
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
.error_show{
  width:2rem;
  height:2rem;
position:absolute;
right:0.1rem;
top:5rem;
text-align:center;
}
</style>