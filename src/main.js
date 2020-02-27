import Vue from 'vue'
import App from './App'
import router from './router'
import {GoodsActionButton,GoodsActionIcon,GoodsAction,Divider,Checkbox,SubmitBar,CellGroup,Grid,GridItem,Loading,Stepper,Button,Search,Collapse,CollapseItem,Icon,Field,Tabbar,TabbarItem,Swipe,SwipeItem,Image,Tab,Tabs,Rate,Popup} from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
var store=new Vuex.Store({
  state:{
    count:100,
    domain:"http://127.0.0.1:5050/",
    userMessage:{
      userId:null,
      userName:null,
      passWord:null
    }
  },
  getters:{
    getStateCount(state){
      return state.count=300
    }
  },
  mutations:{
    login(state,val){
      state.userMessage.userId=val.userId
      state.userMessage.userName=val.userName
      state.userMessage.passWord=val.passWord
      return state.userMessage
    },
    reduce(state){
      return state.count--
    }
  },
  actions:{
    login(go,val){
      go.commit('login',val)
    },
    actReduce(go){
      go.commit('reduce')
    }
  }
})
Vue.config.productionTip = false
// Vue.component(Button.name,Button)
axios.defaults.withCredentials=true 
Vue.prototype.axios=axios
Vue.use(Button).use(Collapse).use(CollapseItem).use(Icon).use(Field).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Image).use(Checkbox).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
Vue.use(Search).use(Tab).use(Tabs).use(Rate).use(Popup).use(Stepper).use(Loading).use(Grid).use(GridItem).use(CellGroup).use(SubmitBar).use(Divider)
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
