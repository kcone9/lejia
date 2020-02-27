<template>
  <div >
    <router-view/>
    <van-tabbar v-model="tabbarActive" border inactive-color='#929292' active-color='#fe0002' :z-index="10" @change="activeTabbar">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/effect/eclass">城品</van-tabbar-item>
      <!--van-tabbar-item icon="manager-o">服务</van-tabbar-item-->
      <van-tabbar-item icon="shopping-cart-o" to="/effect/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/home/homecart">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      tabbarActive:0
    }
  },
  methods:{
    activeTabbar(e){
      this.tabbarActive=e
    }
  },
  created(){
    if(this.$route.name=='homeCart'){
      this.tabbarActive=4
    }
  },
  mounted(){
  }
}
</script>
<style scoped lang='less'>
</style>
