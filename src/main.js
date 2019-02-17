// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Router from 'vue-router'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'lib-flexible'
import VueLazyload from 'vue-lazyload'//图片懒加载
import infiniteScroll from  'vue-infinite-scroll'//加载更多

Vue.use(VueResource);
Vue.use(Element);
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg'
  })
Vue.use(infiniteScroll);

const store = new Vuex.Store({
  state: {
    nickName:'',
    cartCount:0
  },
  mutations: {
    //更新用户信息
   updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    //更新购物车的数量
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
  }
});
new Vue({
  el: '#app',
  router,
  store,
mounted(){
    this.getCartCount();
  },
  methods:{
    getCartCount(){
      let token=localStorage.getItem('token');
      this.$http.post("http://127.0.0.1:3004/getCartCount",{
        token:token}).then(res=>{
        var res = res.data;
        if(res.status=="0"){
          console.log(res.result)
          this.$store.commit("updateCartCount",res.result);
        }
      });
    }
  },
  components: { App },
  template: '<App/>'
})

