<template>
  <div>
   <nav-bread>
        <span>Cart</span>
      </nav-bread>
<div class="row " id="myVue" v-cloak>
   <div class="col-lg-10 col-lg-offset-1" >
  <div class="layui-form">
    <table class="ShopCartTable layui-table">
      <thead>
        <tr>
          <th class="selectLeft">
            <template>
              <el-checkbox  @change="toggleCheckAll()">全选</el-checkbox>
            </template>
            <span class="selectLeftGoods">商品或服务名称</span>
          </th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in cart">
          <td  class="selectLeft">
            <template>
              <el-checkbox v-model="item.checked" @change="editCart('checked',item)"></el-checkbox>
            </template>
            <span class="goodName">
              <img class="goodImg" :src="'static/'+item.productImage"/>
            </span>
            <span class="goodName goodsName">
              <h2 class="goodname" v-text="item.productName"></h2>
              <p class="goodGary">
                <span>供应商：</span>
                <span v-text="item.supplier"></span>
              </p>
              <p class="goodGary">
                <span>发货地：</span>
                <span v-text="item.ConPlace"></span>
              </p>
            </span>
          </td>
          <td class="danPrice">{{item.productPrice}}</td>
          <td>
            <i class="fa  deleteBtn" aria-hidden="true" @click="editCart('minu',item)">-</i>
            <input v-model="item.productNum" type="text" class="form-control numInput" aria-label="...">
            <i class="fa  addBtn" aria-hidden="true" @click="editCart('add',item)">+</i>
          </td>
          <td>
            <p class="totalPrice">{{(item.productNum*item.productPrice)}}</p>
          </td>
          <td class="gongneng">
            <p class="deletegoods"  @click="delCartConfirm(item)">删除</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row tablefooter">
      <template>
        <el-checkbox style="padding-left:16px" @change="toggleCheckAll()">全选</el-checkbox>
      </template>
     
      <span class="totalclassPoin">总价：<span class="totalMoneyClass">{{totalPrice}}$</span></span>
      <span class="totalclassPoin">数量：<span class="totalMoneyClass">{{updateCartCount}}件</span></span>
      <button class="SettlementBtn" @click="checkOut()">去结算</button>
    </div>
  </div>
   </div>
 </div> 
 <div class="md_show" v-if="mdShowCart">
  <span class="error_show">确认删除？</span>
<a class="btn" href="javascript:;" @click="delCart()">确认</a>
<a class="btn" href="javascript:;" @click="mdShowCart=false">关闭</a>
</div>
<div class="md_show" v-if="countto">
  <span>请先加入购物车！</span>
   <a class="btn btn--m" href="javascript:;" @click="countto = false">关闭</a>
</div>
</div>
</template>
<style>
.ShopCartTable {margin: 0 auto;width:20rem;}
.toper_nav{background: white;border-bottom: 1px solid #DEDEDE;}
.toper_btm_nav, .toper_nav{float: left;}
.logoTit{margin-left: 20px;}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{padding-right: 0px;padding-left: 0px;}

.layui-tab-title{border-bottom: 0px;}
.layui-tab-title li{color: white;margin-top: -5px;margin-right: 50px;vertical-align:inherit;}
.toper_btm_nav{height:45px;background: #05226C;} 
.layui-tab-brief>.layui-tab-title .layui-this{border-radius: 15px;color: #05226C;height: 35px;background: white;padding-bottom: 5px;}
.layui-tab-title .layui-this:after{height:38px ;line-height: 38px;}
.toper_btm{line-height: 18px;}
.toper_btm img{margin-top: 15px;}
.erweimaImg{float: right;}
.erweimaCont{margin-left: -8px;font-size: 12px;}
.toper_tit{font-size: 16px;font-weight: bold;}
.ShopCartTable{text-align: center;width:80%;margin-top:20px;}
.ShopCartTable thead tr{background-color: #f3f3f3;border:1px solid #e9e9e9;height:32px;line-height: 32px;font-weight: 200;}
.ShopCartTable th{text-align: center;border: 0px;color: #999999;font-weight: 200;}
.ShopCartTable td{border: 0px;border-bottom: 1px solid #EDEDED;padding:10px 0;}
.goodImg{width: 100px;height: 100px;padding: 5px;border: 1px solid #DEDEDE;}
/* .addBtn,.deleteBtn{color: #999999;font-size: 12px;margin-top:5px;!important;} */
.deleteBtn{display: inline-block;cursor: pointer;height: 30px;line-height: 30px;
    border: 1px solid #ededed;padding: 0px 5px;border-right: 0px;}
.addBtn{margin-left: -4px; display: inline-block;cursor: pointer;height: 30px;
    line-height: 30px;border: 1px solid #ededed;padding: 0px 5px;border-left: 0px;}
.numInput{width: 50px;height: 30px;
    margin-left:-4px;border: 1px solid #EDEDED;text-align: center;margin-top:-5px;position: relative;}
.selectInput{width: 50px;}
.selectLeftGoods{margin-left: 40px;}
.goodName{display: inline-block;}
.goodsName{margin-left: 10px;}
.goodGary{color: #999999;text-align: left;}
.goodname{font-language-override: 16px;}
.danPrice{color: #999999;}
.totalPrice{font-size: 14px;font-weight: bold;}
.SettlementBtn{height: 50px;width: 100px;color: white;background: #209ceb;
    display: inline-block;text-align: center;float: right;position: relative;font-size:18px;margin-top:-1px;}
.totalclassPoin{color: #999999;position: absolute;right:140px;}
.servicenum{position: absolute;right: 35%;color: #999999;}
.removeMuch{position: absolute;left: 90px;cursor: pointer;color: #999999;}
.removeSaves{position: absolute;left: 250px;cursor: pointer;color: #999999;}
.deletegoods{color: #999999;cursor: pointer;}
.ShopCartTable .selectLeft{text-align: left;}
.el-checkbox__input{margin-right: 20px;}
.el-checkbox__label{margin-left:-20px;color: #999999;font-weight: normal;}

.gongneng p{cursor: pointer;color: #999999;}
.gongneng .saveCheck{color: red;}
.tablefooter{height: 50px;line-height:50px;border: 1px solid #EDEDED;margin-top: 20px;margin-bottom:30px;}
.totalMoneyClass{color: red;font-weight: 500;font-size:20px;}
.goodsNum{color: red;}
.is-null{
    font-weight:500;
    color:#ccc;
    height:300px;

}
td.is-null{
    border:0px;
}
.is-null i{

}
.md_show{
  background-color: #ccc;
}
</style>
<script>
    import NavBread from './../components/NavBread'
   import API_LIST from '../../static/js/common.js'
  export default{
        data(){
          return{
          cart:[],
          delItem:{},
          productId:'',
          mdShowCart:false,
          countto:false
          }
            },
            components:{
                     NavBread
                },
        mounted(){  
         this.getCart();
        },
       computed:{
        updateCartCount(){
          return this.$store.state.cartCount;
        },
          checkAllFlag(){
            return this.checkedCount == this.cart.length;
          },
          checkedCount(){
            var i = 0;
            this.cart.forEach((item)=>{
               console.log(item.checked===true)
              if(item.checked===true)i++;
            })
            console.log('ffff')
            return i;
          },
          //计算总价格
          totalPrice(){
            var money = 0;
            this.cart.forEach((item)=>{
              if(item.checked==true){
                console.log(item.productPrice,item.productNum)
                money += parseFloat(item.productPrice)*parseInt(item.productNum);
              }
            })
            return money;
          }
        },
        methods:{
          //获取购物车商品
          getCart(){
             let token=localStorage.getItem('token');
            /* let userName=localStorage.getItem('userName');*/
          axios.post(API_LIST.getCart,{
          token:token
         /* userName:userName*/
          }).then((response)=>{
             console.log(response.data)
             let res=response.data;
             if(res.status='0'){
             this.cart=res.result;
             console.log(res.result)

           }
        })
      },
         closeModal(){
         this.mdShowCart=false;
         },
         //商品删除确认
          delCartConfirm(item){
           this.delItem =item;
          this.mdShowCart=true;
         },
         //商品删除
         delCart(){
           let token=localStorage.getItem('token');
           console.log(this.delItem)
          this.$http.post(API_LIST.cartDel,{
                productId:this.delItem.productId,
                token,token
              }).then((response)=>{
                  let res = response.data;
                  if(res.status == '0'){
                     this.mdShowCart=false;
                    var delCount = this.delItem.productNum;
                    this.$store.commit("updateCartCount",-delCount);
                    this.getCart();
                  }
              });
         },
         //编辑购物车
         editCart(flag,item){
                let token=localStorage.getItem('token');
                if(flag=='add'){
                  item.productNum++;

                }else if(flag=='minu'){
                  if(item.productNum<=1){
                    return;
                  }
                  item.productNum--;
                }else{
                  console.log('aaaa')
                  console.log(item.productNum)
                  var num='';

                }

                axios.post(API_LIST.cartEdit,{
                  token:token,
                  productId:item.productId,
                  productNum:item.productNum,
                  checked:item.checked
                }).then((response)=>{
                    let res = response.data;
                      console.log(res)
                    if(res.status=="0"){
                      console.log(flag)
                     this.$store.commit("updateCartCount",flag=="add"?1:-1);
                    }
                })
            },
            //全选
             toggleCheckAll(){
               let token=localStorage.getItem('token');
              console.log(this.checkAllFlag)
                var flag =! this.checkAllFlag;
                console.log(flag)

                this.cart.forEach((item)=>{
                  item.checked = flag?true:false;
                 
                })
                axios.post(API_LIST.editCheckAll,{
                  checkAll:flag,
                  token:token
                }).then((response)=>{
                    let res = response.data;
                    if(res.status=='0'){
                        console.log(res);
                        
                    }
                })
            },
            //检查购物车是否有物品
            checkOut(){
              console.log(this.checkedCount)
                if(this.checkedCount>0){
                    this.$router.push({
                        path:"/address"
                    });
                }else{
                  this.countto=true;
                }
            }
     }
    }
                
    </script>