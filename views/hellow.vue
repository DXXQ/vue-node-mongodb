<template>
  <div>
     <navheader></navheader>
    <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
    <el-header>
      <el-menu :default-active="this.$router.path" router class="el-menu-demo" text-color="#000" mode="horizontal">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{item.navItem}}</el-menu-item>
   </el-menu>
    </el-header>
    <el-main>
      <div class="main-top">
       <div class="main-left-top">
          <el-carousel :interval="5000" arrow="always">
           <el-carousel-item v-for="item in ImgList" :key="item.id">
             <img :src="item.src" class=""/>
              </el-carousel-item>
          </el-carousel>
           <div class="main-left-bottom">
          <img src="./../assets/kouhong.png">
           <img src="./../assets/yifu.png">
            <img src="./../assets/hufupin.png">
             <img src="./../assets/xiezi.png">
           </div>
          </div>
          <div class="main-right-top">我是右边</div>
        </div>
      
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
</div>
</template>
<script>
import navheader from './../components/navheader'

    export default{
        data(){
            return {
              navList:[
               {name:'/Join',navItem:'注册商家'},
               {name:'/Homepage',navItem:'我的淘宝'},
               {name:'/Cart',navItem:'我的购物车'}
              ],
              ImgList:[
                {
                  id:1,
                  src:require('./../assets/lunbo1.png')
                },
                {
                  id:2,
                  src:require('./../assets/lunbo2.png')
                },
                {
                  id:3,
                  src:require('./../assets/lunbo3.png')
                }
              ]
           }},
        components:{
          navheader
        }}
</script>
<style>
.el-container{
  height:10rem;
  margin:0 auto;
}
.el-header, .el-footer {
  background-color:#d2691e;
    text-align: center;
    line-height: 1rem;
    padding:0.1rem;
  }
.main-right-top{
  height:8rem;
}
.main-top{
  height:10rem;
}
.main-left-top{
   width:10rem;
  float:left;
height:4rem;
}
.main-left-bottom{
  height:5rem;
  margin-top:0.5rem;
display:flex;
flex-direction: row;
}
.main-left-bottom img{
  width:2rem;
  height:3rem;
  margin-left:0.2rem;
}
.el-carousel{
height:4rem;
  border:1px solid #ccc;
}
.el-carousel img{
width:10rem;
height:4rem;
}
.el-menu-item{
    background-color:#d2691e;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 8rem;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 6rem;
  }

</style>

  
