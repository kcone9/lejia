<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
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
