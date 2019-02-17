<template>
  <div>
  <nav-bread>
        <span>ADDRESS</span>
  </nav-bread>
  <div class="newAddressShow-container">
  <div class="newAddressShow">
   <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
    <el-form-item label='收货人姓名'>
       <el-input v-model="newname"></el-input>
       </el-form-item>
       <el-form-item label='收货人电话'>
           <el-input placeholder="Please input" v-model="telephone"></el-input>
       </el-form-item>
   
       <div class="linkage">
        <el-select
          v-model="sheng"
          @change="choseProvince"
          placeholder="省级地区">
          <el-option
       v-for="item in province"
       :key="item.id"
       :label="item.value"
       :value="item.id">
     </el-option>
   </el-select>
   <el-select
     v-model="shi"
     @change="choseCity"
     placeholder="市级地区">
     <el-option
       v-for="item in shi1"
       :key="item.id"
       :label="item.value"
       :value="item.id">
     </el-option>
   </el-select>
   <el-select
     v-model="qu"
     @change="choseBlock"
     placeholder="区级地区">
     <el-option
       v-for="item in qu1"
       :key="item.id"
       :label="item.value"
       :value="item.id">
     </el-option>
   </el-select>
    </div>
    <el-form-item  size="small">
   <el-button type="primary" @click="addressCreat()">Create</el-button>
   <el-button >Cancel</el-button>
    </el-form-item>
  </el-form>
</div>
<div class="newAddressShow-right">
</div>
</div>
<div class="contenter">
              <el-row>
                <span class="addAddressCons">收货人信息(点击选择默认)</span>
                <!-- <span class="addAddress" @click="AddressShowClick">新增收货地址</span> -->
              </el-row>
              <template>
               <el-select v-model="name" @change="selectGet(items)" :placeholder="address">
                <el-option
                 v-for="items in addressdata"
                 :key="items.newname"
                 :label="items.newname+items.telephone+items.sheng+items.shi+items.qu"
                 :value="items.newname+items.telephone+items.sheng+items.shi+items.qu">
               <el-button style="float:right" @click="removeItem(id)">删除</el-button>
               <span style="float:left; color: #8492a6; font-size: 13px">{{items.newname+items.telephone+items.sheng+items.shi+items.qu}}</span>
             </el-option>
        </el-select>
      </template>
 </div>
 <div v-bind:class="{'mask_show':newAddressShow}"></div>
 <div class="show-text"><span>确认订单信息</span></div>
 <div class="accessory-list-wrap">
              <div class="accessory-list">
                <ul>
                   <li v-for="(item,index) in GoodsMessage">  
                    <div class="wrapper">
                      <div class="pic">    
                       <a href="#"> <img :src="'static/'+item.productImage"/></a>
                     </div>
                      <div class="main">
                         <div class="name">{{item.productName}}</div>
                         <div class="price">{{item.productPrice}}</div>
                         <div class="btn-area"></div>
                     </div>
                    </div>
                </li>
             </ul>
         </div>
     </div>
     <div class="tablefooter">
      <span>总价{{totalPrice}}</span>
      <button>确认</button>
     </div>
</div>
</template>
    <style>
.content{
 position:absolute;
 z-index:1;
 width:100%;
 height:3rem;
 }
.contenter{
   border:1px solid #ccc;
 padding:0.5rem 2rem;
}
.el-select{
  width:15rem;
  height:1rem;
}
.el-select-dropdown__item {
   height:0.8rem;
}
.newAddressShow-container{
  width:100%;
  height:5rem;
}
.newAddressShow{
   width:10rem;
   float:left;
  /*  position:absolute;
  top:50%;
  left:50%;
  margin-top:-5rem;
  margin-left:-5rem;
  width:10rem;
  height:10rem;
  background-color:white;
  z-index:99999; */
}
.newAddressShow-right{
overflow:auto;
height:5rem;
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
.el-form{
 padding:0.1rem;
  background-color: #ccc;
}
.newAddressShow .el-input input{
  width:2rem;
}
.linkage .el-select {
    width: 2rem;
    height: 1rem;
}
.show-text{
  height:1rem;
  border-bottom: 1px solid #ea7500;
}
.show-text span{
  display:block;
  width:3rem;
 
  color:#ea7500;
  font-size: 0.4rem
}
.accessory-list-wrap{
  margin-top:0.2rem;
  width:100%;
  min-height:2rem;
}
.accessory-list{
  padding:0.1rem;
}
.accessory-list ul{
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;

  align-items: center;
}
.accessory-list ul li{
  /* float: left;  */
 /*  display:flex;
 justify-content: center;
 align-items: center; */
  width: 30%;
  height:2rem;
  margin-right: 0.2rem;
  margin-bottom: 0.5rem;
  background: #fff;
  border: 2px solid #e9e9e9;
  -webkit-transition: all .5s ease-out;
  transition: all .5s ease-out;
}
.accessory-list .wrapper{
  width:8rem;
}
.accessory-list .pic {
  width:2rem;
  overflow:hidden;
    float:left;
}

.accessory-list .pic a {
  display: block;
  overflow: hidden;
  width:2rem;
}

.accessory-list .pic img {
  width: 100%;
}
.accessory-list .wrapper .main{
  overflow:auto;
  height:2rem;
}
.tablefooter{
  height:1rem;
  line-height:1rem;
  border: 1px solid #EDEDED;
  margin-top:0.5rem;
  margin-bottom:0.5;
}
.tablefooter span{
  color:red;
  font-size:0.5rem;
}
.foot{
  margin-top:1rem;
  width:100%;
  height:5rem;
}
.addAddressCons {
    font-weight: bold;
}
.addAddress {
    float: right;
    color: #05226C;
    cursor: pointer;
}
.scolleShow {
    max-height:2rem;
    overflow: auto;
    min-height:1rem;
}
.consignee {
    padding: 5px 15px;
    cursor: pointer;
}
.el-col-4 {
    width: 16.66667%;
}
.consigneeListClick {
    border: 1px solid #05226C;
}
.consigneeListWidth {
    width: 100%;
}
.consigneeList {
    border: 1px solid #999999;
    margin-right: 20px;
    padding: 5px 17px;
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
    position: relative;
    height: 31px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.arrow-right {
    position: absolute;
    transform: rotate(45deg);
    right: -2px;
    bottom: -10px;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid #05226C;
}
.fa-check {
    color: black;
    position: ;
    color: black;
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: white;
    font-size: 12px;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.rightAddress {
    height: 31px;
    line-height: 31px;
    margin-top: 10px;
    padding: 0px 20px;
}
.el-col-20 {
    width: 83.33333%;
}
.addressDefultClass {
    border: 1px solid #EDEDED;
    padding: 3px 7px;
    border-radius: 4px;
    color: #EDEDED;
}
.consignee {
    padding: 5px 15px;
    cursor: pointer;
}
.el-row {
    box-sizing: border-box;
  }
.muchAddress {
    margin-top: 20px;
    color: #999999;
    cursor: pointer;
    width: 75px;
    margin-left: 15px;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

          </style>
<script>
  import NavBread from './../components/NavBread'
   import API_LIST from '../../static/js/common.js'
  export default{
        data(){
      return {
         mapJson:'../static/json/map.json',
         newname:'',
         telephone:'',
         province:'',
         sheng: '',
         shi: '',
         shi1: [],
         qu: '',
         qu1: [],
         city:'',
         block:'',
         name:'',
         newAddressShow:false,
         address:'',
         input:'',
         GoodsMessage:[],
         isShowDefult:false,
         addressdata:[],
         totalPrice:0
            }
          },
         components:{
                     NavBread
                },
           created:function(){
                 this.getCityData();
                 this.getGoodsMessage();
               },
           mounted(){  
                  this.getAddressList();
                  console.log('111')
                  console.log(API_LIST)
              }, 
          methods: {
            getAddressList(){
              let addressdata=this.addressdata;
             for( var items of addressdata){
              if(items.isShowDefult==true){
                console.log('aaa')
                this.address=items.newname+items.city+items.area+items.phone;
              }else{
                console.log('bbb')
              }
             }
            },
            selectGet(itemId){
              let obj={};
              obj=this.addressdata.find((item)=>{
              return item.id===itemId
              })
              obj.isShowDefult=true;
              console.log(obj)
              console.log(obj.city)
            },
            removeItem(id){
              console.log('999')
              let obj={};
              obj=this.addressdata.find((item)=>{
              return item.id===id
              })
              console.log(obj)
            },
            getGoodsMessage(){
              console.log('aaaaaa')
                let token=localStorage.getItem('token');
                 axios.post(API_LIST.getGoodsMessage,{
                 token:token
             }
              ).then((response)=>{
                let res=response.data;
                console.log(res)
                if(res.status==0){
                  this.GoodsMessage=res.result.getGoodsMessage;
                  var addressdata=res.result.addressdata;
                  console.log(addressdata)
                  addressdata.forEach((item)=>{
                    console.log(item)
                    this.addressdata.push(item)
                  })
                   console.log(this.addressdata)
                 this.GoodsMessage.forEach((item)=>{
                  console.log(this.totalPrice+=item.productPrice)
                  this.totalPrice+=item.productPrice
               })
                }else{
                  console.log('ooooo')
                }
             })
            },
            //新收货地址创建
            addressCreat(){
             let newname=this.name;
             let telephone=this.telephone;
             let qu=this.qu;
             let sheng=this.sheng;
             let shi=this.shi;
             let token=localStorage.getItem('token');
             axios.post(API_LIST.addressCreat,{
              token:token,
              name:newname,
              telephone:telephone,
              sheng:sheng,
              shi:shi,
              qu:qu
             }).then((response)=>{
              console.log(this.addressdata)
              let res=response.data;
              if(res.status==0){
                console.log(res)
                this.addressdata.push(
                  {newname:newname,
                  telephone:telephone,
                  sheng:sheng,
                  shi:shi,
                  qu:qu})
              }
             })
            },
     //选择收货地址
       getCityData:function(){
          console.log(this.mapJson)
        var that = this
       this.$http.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      }
    }
  }
        
    </script>
