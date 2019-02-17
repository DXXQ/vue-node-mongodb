<template>
    <div class="bg">
    	<nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="filter-nav">
            <span class="">SORT BY:</span>
             <a href="javascript:void(0)" class="cur" @click="sortGoods()">Price</a>
            <!-- <a href="javascript:void(0)" class="price" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>-->
            <span v-if="sortFlag">up</span>
            <span v-else>down</span>
          </div>
     <div class="accessory-result-page">
        <div class="container">
           <div class="filter" id="filter" >
             <dl class="filter-price">
               <dt>Price:</dt>
               <dd><a href="javascript:void(0)">All</a></dd>
               <dd v-for="(item,index) in priceFilter">
                 <a href="javascript:void(0)">{{item.startPrice}} - {{item.endPrice}}</a>
               </dd>
             </dl>
           </div> 
          <div class="accessory-result">

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list">
                <ul>
                  <li v-for="(item,index) in goodslist">  
                                    <div class="pic">    
                      <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn" @click="addCart(item.productId)">购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="view-more-normal"
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20">
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
             </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdShow" v-if="mdShow">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </div>
      <div class="md_show" v-if="mdShowCart">
       
          <!-- <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg> -->
          <span>加入购物车成!</span>
       
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </div>
    </div>
</template>
<script>
import NavBread from './../components/NavBread'
import API_LIST from '../../static/js/common.js'
    export default{
        data(){
            return {
                goodslist:[],
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
                loading:false,
                mdShow:false,
                mdShowCart:false,
                priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ]
              }
            },
            components:{
                     NavBread
                },
        mounted(){  
       this.getGoodsList();  
     
       },  
       methods:{  
        getGoodsList(flag){ 
        var param = {
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,
                 /* priceLevel:this.priceChecked*/
              };//url:http://127.0.0.1:8081/list?id=1 
               this.loading = true;
         axios.get(API_LIST.goodslist,{
         	params:param
         }).then((response)=>{
         	 this.loading = false;
            let res=response.data;
            console.log(response.data)
            if(status=='0'){
            	/*if(flag){*/
            		this.goodslist=this.goodslist.cancat(res.result.list);
            		if(res.result.count==0){
            			this.busy=true;
            		}else{
            			this.busy=false;
            		}
            	}else{
            		this.goodslist=res.result.list;
            	}
            /*}else{
            	this.goodslist=[];
            }*/
          })  
        },
        //升序降序
          sortGoods(){
                this.sortFlag = !this.sortFlag;
                console.log(this.sortFlag)
                this.page = 1;
                this.getGoodsList();
          },
          //加载更多
          loadMore(){
                this.busy = true;
                setTimeout(() => {
                  this.page++;
                  this.getGoodsList(true);
             }, 500);
          },
          //加入购物车
           addCart(productId){
           	let token=localStorage.getItem('token');
           	let userName=localStorage.getItem('userName');
           	let userPwd=localStorage.getItem('userPwd');
           	
           	console.log(token)
             if(token){
                axios.post(API_LIST.addCart,{
                  productId:productId,
                  userPwd:userPwd,
                  userName:userName,
                   token:token
                }).then((res)=>{
                    var res = res.data;
                    console.log('xixi')
               console.log(res)
                    if(res.status==0){
                        this.mdShowCart = true;
                        
                    }else{
                        this.mdShow = true;
                    }
                })
            }
         }
        }
}
</script>
