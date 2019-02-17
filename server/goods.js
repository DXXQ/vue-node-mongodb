var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt=require("jsonwebtoken");

var server = app.listen(3005, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
       res.sendStatus(200); /*让options请求快速返回*/
    }
     else {
        next();
    }
});
app.get('/', function (req, res) {
    console.log('hhhhh')
});
//用户注册 添加用户
app.post('/register', function (req, res) {
   console.log('333')

 var param={
      userName:req.body.userName,userPwd:req.body.userPwd
   }
  
  console.log('hahhah')
  console.log(param)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
    console.log('222')
        console.log(err)
    }else{
       console.log('111')
       var db = db.db("db_admin");
        db.collection("user").find(param).toArray(function (err,doc) {
          if(err){
            console.log('meizhaodao')
    }else{
       console.log(doc)
      console.log(doc.length)
     if(doc.length==0){
      /*console.log(doc.length)*/
       db.collection("user").insert({userName:req.body.userName,userPwd:req.body.userPwd,cartList:[],addressdata:[]},function (err,doc) {
            //添加
            if(err){
           console.log(err)
         }else{
         console.log('注册成功')
             res.json({
      　　　　　　status:'0'
                })
    
    　　 }
        })
     }else{
      console.log(doc.length)
      console.log('已经注册')
      res.json({
      　　　　　　status:'1'
                })
               }
             }
          })
       }
     })
  })
//查询是否登录
app.post("/checkLogin", function (req,res,next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    let userName=req.body.userName;

    let token=req.body.token;
    console.log(userName,token)
    MongoClient.connect(url, function (err, db) {
      if(err){
       console.log('check连接失败')
    
  }else{
     console.log('check连接成功')
        var db = db.db("db_admin");
        db.collection("user").find({userName}).toArray(function (err,doc) {
        if(err){
          console.log('出错了')
        res.json({
             status:'1',
             msg:'未登录',
             result:''
        })
        return
      }else{
        console.log(doc)
      if(doc.length>0){
       let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
          console.log('正在解密')
          console.log(userName)
          res.json({
      　　　　　　status:'0',
                  result:userName
                })
        }

        })
       }else{
        res.send({'status':1});
      }
    }
    })
  }
})
})


//登录
app.post('/login', function (req, res) {
  let userName=req.body.userName;
      console.log(userName)
       console.log(req.body.userPwd)
  res.status(200)///一定要写状态码 否则返回404
      
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
        var db = db.db("db_admin");
        db.collection("user").find({userName:req.body.userName}).toArray(function (err,doc) {
            //查找
            if(err){
             console.log(err);
             res.json({ 
                status:'1',
                msg:'没有注册'
            })
             res.send(err);
             return
         }else{
          console.log('aaaa')
            console.log(doc[0]._id)

            /* res.json({
      　　　　　　status:'0',
     　　　　　　　 result:{
       　　　　　　　  count:doc.length,
        　　　　　　　list:doc
           　　　　　  }
                })*/
         if(doc.length>0){
        let userName=req.body.userName;
        let userPwd=req.body.userPwd;
        let content={userName};
        let secretOrPrivateKey="2388581";//加密的秘钥
        let token=jwt.sign(content,secretOrPrivateKey,{
          expiresIn: 60*60*1//一小时过期
        });

/*doc[0].token=token;*/
     console.log(doc)
    console.log(doc[0]._id)
     db.collection("user").update({_id:doc[0]._id},{$set:{token:token}})
            console.log('插入token成功')
           res.json({
            status:0,
            msg:'登陆成功',
            token:token,
            userName:userName

         })
         }
       }
     })
    }
  })
 })
//获取商品信息
app.get('/goodslist', function (req, res) {
      console.log('准备查找女装Goods')
  /* res.status(200)*////一定要写状态码 否则返回404
      let page=parseInt(req.param("page"));
      let pageSize=parseInt(req.param("pageSize"));
      let sort=req.param("sort");
      let skip=(page-1)*pageSize;
      let params={};
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://127.0.0.1:27017/db_admin";
      MongoClient.connect(url, function (err, db) {
       if(err){
        console.log(err)
       }else{
        var db = db.db("db_admin");
        if(sort==='1'){
          db.collection("goods").find().sort({'productPrice':1}).skip(page).limit(pageSize).toArray(function(err,doc){
          console.log(sort)
            if(err){
                res.json({ 
                status:'1',
                msg:'没有找到女装商品信息'
              })
              }else{
               console.log('找到信息女装商品')
                res.json({
      　　　　　　  status:'0',
     　　　　　　　 result:{
       　　　　　　　  count:doc.length,
        　　　　　　　 list:doc
           　　　　　  }
                })
                 return res.status(200).send()
              } 
           })
         }else{
          db.collection("goods").find().sort({'productPrice':-1}).skip(page).limit(pageSize).toArray(function(err,doc){
          console.log('zhunbeipaixu')
          console.log(sort)
            if(err){
             console.log(err);
              res.json({ 
                status:'1',
                msg:'没有找到女装商品信息'
             })
             }else{
              console.log('找到信息女装商品')
                res.json({
      　　　　　　  status:'0',
     　　　　　　　 result:{
       　　　　　　　  count:doc.length,
        　　　　　　　 list:doc
           　　　　　  }
                })
              return res.status(200).send()
            } 
         })
       }
     }
  })
})
//购物车数据加入数据库
app.post("/addCart", function (req,res,next) {
  let token =req.body.token,productId = req.body.productId,userName=req.body.userName;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
           db.collection("user").find({token}).toArray(function (err,userDoc) {
            //查找
            if(err){
             console.log(err);
             res.send(err);
             return
         }else{
            console.log(userDoc[0].token)

       if(userDoc.length>0){
       let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          console.log('jiemichucuo')
          console.log(token)
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
          console.log('正在解密')
          console.log(userName)


        db.collection("user").find({userName}).toArray(function (err,doc) {
       console.log(doc[0].cartList.length==0)
           if(doc[0].cartList.length==0){
             db.collection("goods").find({productId}).toArray(function (err1,doc) {
             console.log()
                  let productImage=doc[0].productImage;
                   let productId=doc[0].productId;
                    let productPrice=doc[0].productPrice;
                     let productName=doc[0].productName;
                    console.log('llellel')
                    console.log(userDoc[0]._id)
                     let checked=1;
          
                  /*userDoc[0].cartList.push(doc);*/
                   db.collection("user").update({_id:userDoc[0]._id},{$push:{'cartList':{productNum:1,productName:doc[0].productName,productId:doc[0].productId,productImage:doc[0].productImage,productPrice:doc[0].productPrice,checked:checked}}})
                 
                  /*userDoc[0].cartList.push(doc);*/
                  /* db.collection("user").update({_id:userDoc[0]._id},{$push:{'cartList':{productNum:1,productName:doc[0].productName,productId:doc[0].productId,productImage:doc[0].productImage,productPrice:doc[0].productPrice}}})
                 */
                      console.log('保存成功')
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    })
           }else{
            console.log(doc[0])
            var goodsItem='';
            var int='';
            var productName='';
           doc[0].cartList.forEach(function(item,index){
            console.log('aaa')
            console.log(doc[0].cartList)
              if(doc[0].cartList[index].productId == productId){
                console.log(doc[0].cartList[index])
                            goodsItem = item;
               console.log(doc[0].cartList[index].productNum)
           var  productNum=doc[0].cartList[index].productNum+1;
             console.log('d')
             int=parseInt(productNum)

              productName=doc[0].cartList[index].productName;
             }
           })
            if(goodsItem){
              console.log('ccc')
              console.log(productName)
              db.collection("user").update({_id:userDoc[0]._id,"cartList.productName":productName},{$set:{"cartList.$.productNum":int}})
               res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
          }else{ 
               db.collection("goods").find({productId}).toArray(function (err1,doc) {
                console.log(doc[0])
                  let productImage=doc[0].productImage;
                   let productId=doc[0].productId;
                    let productPrice=doc[0].productPrice;
                     let productName=doc[0].productName;
                     let checked=1;
          
                    console.log(userDoc[0]._id)
                  /*userDoc[0].cartList.push(doc);*/
                   db.collection("user").update({_id:userDoc[0]._id},{$push:{'cartList':{productNum:1,productName:doc[0].productName,productId:doc[0].productId,productImage:doc[0].productImage,productPrice:doc[0].productPrice,checked:checked}}})
                 
                      console.log('保存成功')
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                     })
                   }
                  }
                })
              }
            })
          }
         }
       })
      }
   })
  })
//获取数据库中的购物车数据
  app.post('/getCart', function (req, res) {
     let token =req.body.token,userName=req.body.userName;
     console.log(userName)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
           db.collection("user").find({token}).toArray(function (err,userDoc) {
            if(err){
             console.log(err);
             res.send(err);
             return
         }else{
          console.log('vvvv')
            console.log(userDoc[0])

       if(userDoc.length>0){
       let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          console.log(token)
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
            res.json({
                      status:'0',
                      msg:'',
                     result:userDoc[0].cartList
            })
         
      }
    })
    }
   }
 })
 }
})
})
  //修改数据库中的物品数量
  app.post("/cartEdit", function (req,res,next) {
  let token = req.body.token,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked=req.body.checked;
      
      console.log('我是cartedit')
      console.log(checked)
     /* checked = req.body.checked;*/
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
           db.collection("user").find({token}).toArray(function (err,userDoc) {
            //查找
            if(err){
             console.log(err);
             res.send(err);
             return
         }else{
            console.log(userDoc[0])

       if(userDoc.length>0){
       let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          console.log('jiemichucuo')
          console.log(token)
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
          console.log('正在改变数量')
          //更改数据中已有的数据或者创建没有的数据
            db.collection("user").update({_id:userDoc[0]._id,"cartList.productId":productId},{$set:{"cartList.$.productNum":productNum,"cartList.$.checked":checked}})
           
                res.json({
                      status:'0'
              
               })
              
      }
    })
    }
   }
 })
}
})
})
  //数据库购物车删除
app.post("/cartDel", function (req,res,next) {
  let token = req.body.token,productId= req.body.productId;
  console.log(req.body)
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
           db.collection("user").find({token}).toArray(function (err,userDoc) {
            //查找
            if(err){
             console.log(err);
             res.send(err);
             return
         }else{
           console.log('1')
            console.log(userDoc[0])

       if(userDoc.length>0){
       let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          console.log('jiemichucuo')
          console.log(token)
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
          console.log('正在删掉数量')
          //删掉数据里面符合条件的数据
            db.collection("user").update({_id:userDoc[0]._id},{$pull:{'cartList':{'productId':productId}}}, function (err,doc) {
              if (err){
                 return err;
              }else{
                res.json({
                      status:'0'
              
               })
              }
      })
     }
    })
    }
   }
 })
}
})
})
//付款页面的商品信息获取
 app.post("/getGoodsMessage", function (req,res,next) {
  let token=req.body.token;
   console.log('wowowwoowowow')
   console.log(token)
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
           db.collection("user").find({token}).toArray(function (err,userDoc) {
            //查找
            if(err){
             console.log(err);
             res.send(err);
             return
         }else{
           console.log('4')
            console.log(userDoc[0])
         if(userDoc.length>0){
        let secretOrPrivateKey='2388581';
       jwt.verify(token,secretOrPrivateKey,function(err,decode){
        if(err){
          console.log('jiemichucuo')
          console.log(token)
          res.json({
      　　　　　　status:'1',
                })
          //时间失效时伪造的TOKEN
        }else{
          let addressdata=userDoc[0].addressdata

          console.log(userDoc[0].addressdata)
          let getGoodsMessage=[];
           userDoc[0].cartList.forEach(function(item,index){
            console.log(userDoc[0].cartList[index].checked)
              if(userDoc[0].cartList[index].checked === true){
                 console.log('aaa')
                 getGoodsMessage.push(userDoc[0].cartList[index]);
                   /* res.json({
                    status:'0'
                    }) */
                  }  
        
           })
           console.log('5')
           console.log( getGoodsMessage)
          res.json({
                    status:'0',
                    result:{ 
                         getGoodsMessage,
                         addressdata
                       }
                    }) 
        }
      })
    }
   }
 })
}
})
})
 //新创建的地址信息加入数据库
app.post("/addressCreat", function (req,res,next) {
  let token=req.body.token,name=req.body.name,telephone=req.body.telephone,sheng=req.body.sheng,shi=req.body.shi,qu=req.body.qu;
   console.log('wowowwoowowow')
   console.log(token)
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
         db.collection("user").find({token}).toArray(function (err,userDoc) {
            if(err){
             console.log(err);
             res.send(err);
             return
              }else{
                  if(userDoc.length>0){
                  let secretOrPrivateKey='2388581';
                  jwt.verify(token,secretOrPrivateKey,function(err,decode){
                 if(err){
                    res.json({
    　　　　　　       status:'1',
                        })
                  }else{
                    console.log(userDoc[0].cartList)
                   db.collection("user").update({_id:userDoc[0]._id},{$push:{'addressdata':{name:name,telephone:telephone,sheng:sheng,shi:shi,qu:qu}}})
                     res.json({
    　　　　　　         status:'0'
                        })
                    }
                 })
               }
             }
          })
        }
     })
})
//根据搜索框提供的关键字进行商品检索
app.post("/goodsFind", function (req,res,next) {
  console.log(req.body.data)
  let token=req.body.token,goodsFind=req.body.goodsFind;
   console.log(goodsFind)
   console.log(token)
   let goodsname=new RegExp(goodsFind)
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/db_admin";
    MongoClient.connect(url, function (err, db) {
   if(err){
        console.log(err)
    }else{
      var db = db.db("db_admin");
         db.collection("user").find({token}).toArray(function (err,userDoc) {
            if(err){
             console.log(err);
             res.send(err);
             return
              }else{
                  if(userDoc.length>0){
                  let secretOrPrivateKey='2388581';
                  jwt.verify(token,secretOrPrivateKey,function(err,decode){
                 if(err){
                    res.json({
    　　　　　　       status:'1',
                        })
                  }else{
                    console.log("开始寻找")
                    //查询匹配goodsname的所有商品
                   db.collection("goods").find({$or:[{productName:goodsname}]}).toArray(function(err,doc){
                    if(err){
                        res.json({
                           status:'1'
                        })
                    }else{
                      console.log('xixii')
                        res.json({
    　　　　　　           status:'0',
                           result:doc
                        })
                      }
                     })
                    }
                 })
               }
             }
          })
        }
     })
})
      

