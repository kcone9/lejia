<template>
    <div class="effect">
        
        <router-view/>
        <van-tabbar v-model="tabbarActive" border inactive-color='#929292' active-color='#fe0002' :z-index='10' @change="activeTabbar" safe-area-inset-bottom>
            <van-tabbar-item icon="apps-o" to="/effect/eclass">分类</van-tabbar-item>
            <van-tabbar-item icon="newspaper-o" to="/ecffect/filt">推选</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" to="/effect/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="records" to="/login">商城订单</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tabbarActive:0
        }
    },
    methods:{
        activeTabbar(e){
            // console.log(e)
        },
        init(){
            // 刷新时，底部导航栏的指向
            var tabList=[{text:"/effect/eclass"},{text:"/ecffect/filt"},{text:"/effect/cart"},{text:"/login"}]
            tabList.forEach((value,key)=>{
                if(this.$route.path===value.text){
                    this.tabbarActive=key
                    return false
                } 
            })
        }
    },
    created(){
        this.init()
    },
    beforeRouteEnter(to,form,next){
        // console.log('进入当前组件')
        next()
    },
    beforeRouteUpdate(to,form,next){
        // console.log('更新组件',to,form)
        var tabList=[{text:"/effect/eclass"},{text:"/ecffect/filt"},{text:"/effect/cart"},{text:"/login"}]
        tabList.forEach((value,key)=>{
            // value.key=key
            if(to.path===value.text){
                console.log('切换',this.$route.path,key)
                this.tabbarActive=key
                 return false
            } 
        })
        next()
    }
    /*beforeRouteEnter(to,form,next){
        console.log('router',to,form,next)
        console.log('1',to)
        console.log('2',form)
        form.name='effectEclass'
        form.path='/effect/eclass'
        console.log('3',next)
    }
    router.beforeEach((to, from, next) => {
        to and from are both route objects. must call `next`.
    })*/
}
</script>
<style scoped lang='less'>
.effect{
    
    .body{
        border:1px solid red;
    }
}
</style>