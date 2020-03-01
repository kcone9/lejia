<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  methods:{
    isLogin(){ //判断登录
      this.axios.get(this.$store.state.domain+'lejia/logout').then(res=>{
        if(res.data.userId!=null){
          this.$store.state.userMessage.userId=res.data.userId
          this.$store.state.userMessage.userName=res.data.userName
          this.$store.state.userMessage.passWord=res.data.passWord
          this.$store.state.userMessage.headerSrc=res.data.headerSrc
        }
      })
    }
  },
  created(){
    this.isLogin()
  }
}
</script>
<style lang='less'>
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
}
.main{
  // width:100%;
  // height:100vh;
  // border:1px solid red;
}
</style>
