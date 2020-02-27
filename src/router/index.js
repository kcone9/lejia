import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: ()=> import('@/components/Home'),
      children:[{
        path:'/home',
        name:'homeComponent',
        component:()=> import('@/components/HomeComponent')
      },
      {
        path:'/home/homecart',//我的信息
        name:'homeCart',
        component:()=> import('@/components/HomeCart')
      }]
    },
    {
      path:'/customer',//客服
      name:'customer',
      component:()=> import('@/views/Customer')
    },
    {
      path:'/repairs',//报修
      name:'repairs',
      component:()=> import('@/views/Repairs')
    },
    {
      path:'/print', //预约页面
      name:'Print',
      component:()=> import('@/views/Print')
    },
    {
      path:'/login',//用户登录
      name:'Login',
      component:()=>import('@/views/Login')
    },
    {
      path:'/useragree',//用户协议
      name:'UserAgree',
      component:()=>import('@/views/UserAgree')
    },
    {
      path:'/details', //产品详情
      name:'Details',
      component:()=>import('@/views/Details')
    },
    {
      path:'/effect',// 第二导航组件
      name:'Effect',
      component:()=>import('@/views/Effect'),
      children:[{
        path:'/effect/eclass',// 产品分类
        name:'effectEclass',
        component:()=>import('@/components/EffectClass')
      },
      {
        path:'/ecffect/filt',//精选
        name:'effectFilt',
        component:()=>import('@/components/EffectFilt')
      },{
        path:'/effect/cart',// 购物车
        name:'effectCart',
        component:()=>import('@/components/EffectCart')
      }]
    }
  ]
})
