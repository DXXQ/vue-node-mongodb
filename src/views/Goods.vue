<template>
 <div class="container">
   <nav-header></nav-header>
    <div class="el-container">
    <div class="el-header">
      <el-menu :default-active="this.$router.path" router class="el-menu-demo" text-color="#000" mode="horizontal">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{item.navItem}}</el-menu-item>
   </el-menu>
    </div>
     <div class="el-aside">
       <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
         <el-submenu index="1">
            <template slot="title">
               <div>女装</div>
               <i class="el-icon-arrow-right"></i>
           </template>
            <el-submenu index="1-1">
             <span slot="title">裙子</span>
             <el-menu :default-active="this.$router.path" router class="el-menu-demo" text-color="#000" mode="horizontal">
              <el-menu-item v-for="(item,i) in nav1List" :key="i" :index="item.name">{{item.nav1Item}}</el-menu-item>
            </el-menu>
        </el-submenu>
         <el-submenu index="1-2">
             <span slot="title">外套</span>
             <el-menu-item index="1-2-1">呢子大衣</el-menu-item>
             <el-menu-item index="1-2-2">牛仔衣</el-menu-item>
             <el-menu-item index="1-2-3">连帽衫</el-menu-item>
        </el-submenu>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="1-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="1-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="1-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
          <el-submenu index="1">
            <template slot="title">
               <div>男装</div>
               <i class="el-icon-arrow-right"></i>
           </template>
            <el-submenu index="1-1">
             <span slot="title">外套</span>
             <el-menu-item index="1-1-1">夹克</el-menu-item>
             <el-menu-item index="1-1-2">工装外套</el-menu-item>
             <el-menu-item index="1-1-3">小西装</el-menu-item>
        </el-submenu>
         <el-submenu index="1-2">
             <span slot="title">衬衫</span>
             <el-menu-item index="1-2-1">格子衬衫</el-menu-item>
             <el-menu-item index="1-2-2">灯芯绒衬衫</el-menu-item>
             <el-menu-item index="1-2-3">文艺衬衫</el-menu-item>
        </el-submenu>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="1-3-1">牛仔裤</el-menu-item>
             <el-menu-item index="1-3-2">工装裤</el-menu-item>
             <el-menu-item index="1-3-3">休闲裤</el-menu-item>
            </el-submenu>
         </el-submenu>
          <el-submenu index="1">
            <template slot="title">
               <div>女装</div>
               <i class="el-icon-arrow-right"></i>
           </template>
            <el-submenu index="1-1">
             <span slot="title">裙子</span>
             <el-menu-item index="1-1-1">碎花连衣裙</el-menu-item>
             <el-menu-item index="1-1-2">A字短裙</el-menu-item>
             <el-menu-item index="1-1-3">蛋糕裙</el-menu-item>
        </el-submenu>
         <el-submenu index="1-2">
             <span slot="title">外套</span>
             <el-menu-item index="1-2-1">呢子大衣</el-menu-item>
             <el-menu-item index="1-2-2">牛仔衣</el-menu-item>
             <el-menu-item index="1-2-3">连帽衫</el-menu-item>
        </el-submenu>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="1-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="1-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="1-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
          <el-submenu index="1">
            <template slot="title">
               <div>女装</div>
               <i class="el-icon-arrow-right"></i>
           </template>
            <el-submenu index="1-1">
             <span slot="title">裙子</span>
             <el-menu-item index="1-1-1">碎花连衣裙</el-menu-item>
             <el-menu-item index="1-1-2">A字短裙</el-menu-item>
             <el-menu-item index="1-1-3">蛋糕裙</el-menu-item>
        </el-submenu>
         <el-submenu index="1-2">
             <span slot="title">外套</span>
             <el-menu-item index="1-2-1">呢子大衣</el-menu-item>
             <el-menu-item index="1-2-2">牛仔衣</el-menu-item>
             <el-menu-item index="1-2-3">连帽衫</el-menu-item>
        </el-submenu>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="1-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="1-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="1-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
      <el-submenu index="1">
            <template slot="title">
               <div>男装</div>
               <i class="el-icon-arrow-right"></i>
           </template>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="1-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="1-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="1-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
            <el-submenu index="2">
            <template slot="title">
               <div>彩妆</div>
               <i class="el-icon-arrow-right"></i>
           </template>
         <el-submenu index="2-2">
             <span slot="title">外套</span>
             <el-menu-item index="2-2-1">呢子大衣</el-menu-item>
             <el-menu-item index="2-2-2">牛仔衣</el-menu-item>
             <el-menu-item index="2-2-3">连帽衫</el-menu-item>
        </el-submenu>
          <el-submenu index="2-3">
             <span slot="title">裤子</span>
             <el-menu-item index="2-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="2-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="2-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
          <el-submenu index="4">
            <template slot="title">
               <div>儿童</div>
               <i class="el-icon-arrow-right"></i>
           </template>
          <el-submenu index="1-3">
             <span slot="title">裤子</span>
             <el-menu-item index="4-3-1">牛仔短裤</el-menu-item>
             <el-menu-item index="4-3-2">黑色弹力裤</el-menu-item>
             <el-menu-item index="4-3-3">长裤</el-menu-item>
            </el-submenu>
         </el-submenu>
       </el-menu>
     </div>
    <div class="el-main">
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
          <div class="main-right">我是右边</div>
        </div>
      
    </div>
  </div>
   <nav-header></nav-header>
</div>
</template>
<style>
.container{
  height:100%;
}
.el-container{
  height:100%;
  margin:0 auto;
  position:relative;
}
.el-header, .el-footer {
  background-color:#d2691e;
    text-align: center;
    height: 1.2rem;
    width:100%;
    padding:0.1rem;
  }
  /* .el-header{
   position:absolute;
   top:-0.1rem;
  } */
  .el-menu-item{
    height:1.1rem;
  }
  .el-footer{
     position:absolute;
    bottom:0rem;
  }
.main-right{
  float:right;
  width:4rem;
  height:6rem;
}
.main-top{
 width:15rem;
 height:6rem;
}
.main-left-top{
 width:15rem;
  float:left;
height:0rem;
}
.main-left-bottom{
  height:1rem;
  margin-top:0.01rem;
display:flex;
flex-direction: row;
}
.main-left-bottom img{
  width:2rem;
  height:1rem;
  margin-left:0.2rem;
}
.el-carousel{
 overflow-y: hidden;
 height:5rem;
  border:1px solid #ccc;
}
.el-carousel img{
width:15rem;
height:5rem;
}
/* .el-header ul{
  height:0.8rem;
  padding:0.01rem;
} */
.el-header .el-menu{
  background-color:#d2691e;
}
 .el-header .el-menu-item:first-child {
 margin-left:0.2rem;
   
  }
  .el-aside {
     position:absolute;
     top:1.4rem;
     left:0rem;
     width:3rem;
     bottom:1.4rem;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 8rem;
  }
  .el-menu-vertical-demo{
  background-color:#ccc;
  margin:0 auto;
  width:3rem;
} 
.el-submenu{
  width:3rem;
}
.el-submenu__title{
display:flex;
flex-direction:row;
}
.el-icon-arrow-right{
  line-height: 1rem;
}
  .el-main {
    overflow-x:hidden;
     position:absolute;
     top:1.4rem;
    left:3rem;
   bottom:1.4rem;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 6rem;
  }

</style>

  

<script>
import NavHeader from './../components/NavHeader'

    export default{
        data(){
            return {
              isCollapse:'false',
              navList:[
               {name:'/UserRegister',navItem:'注册'},
               {name:'/Homepage',navItem:'我的淘宝'},
               {name:'/Cart',navItem:'我的购物车'}
              ],
              nav1List:[
               {name:'/GoodsList',navItem:'连衣裙'},
               {name:'/Homepage',navItem:'我的淘宝'},
               {name:'/Cart',navItem:'我的购物车'}
              ],
              ImgList:[
                {
                  id:1,
                  src:require('./../assets/jingdong.png')
                },
                {
                  id:2,
                  src:require('./../assets/jingdong.png')
                },
                {
                  id:3,
                  src:require('./../assets/jingdong.png')
                }
              ]
           }},
        components:{
          NavHeader
        }}
</script>
