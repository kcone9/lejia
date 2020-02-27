<template>
    <div>
        <img src="../assets/image/customer1.jpg" alt="" class="img">
        <div class="list">
            <div class="com">
                <div class="left">
                    <img class="big" src="../assets/image/phone.png" alt="">
                    <div class="mid">
                        <p class="one">电话直达</p>
                        <p class="two">专业客服，耐心服务</p>
                    </div>
                </div>
                <a href="tel:4008-315-315">
                    <img class="jump" src="../assets/image/icon-phone.png" alt="">
                </a>
            </div>
            <div class="com">
                <div class="left">
                    <img class="big" src="../assets/image/breakdown.png" alt="">
                    <div class="mid">
                        <p class="one">故障申报</p>
                        <p class="two">快递柜一键申报，我帮你</p>
                    </div>
                </div>
                <router-link to="/repairs">
                    <img src="../assets/image/icon-problem.png" alt="" class="jump" @click='jump()'>
                </router-link>
            </div>
        </div>
        <div class="hr"></div>
        <div class="self">
            <p class="title">自助服务</p>
            <van-collapse v-model="activeNames" class="van-collapse" ref='collapse'>
                <van-collapse-item title="1. 我想购买农特商品如何下单？" name="1">打开“日日顺乐家”APP或关注“日日顺乐家”公众号（rrslj365）进入乐家商城菜单 - 点击“诚品” - 点击“分类” - 选择商品 - 点击立即下单（如果没有登录，通过手机号+验证码进行登录）- 选择或填写“收货地址” - 点击提交订单- 选择支付方式 - 点击确认支付</van-collapse-item>
                <van-collapse-item title="2. 商品下单后怎么查询货发到哪了？ " name="2">打开“日日顺乐家”APP或进入“日日顺乐家”公众号”（rrslj365）- 点击我的/我的订单 - 点击待收货 - 点击物流查询</van-collapse-item>
                <van-collapse-item title="3.我下单的服务如何查询进度？" name="3">打开“日日顺乐家”APP - 点击我的服务 - 点击想要查看的订单 - 订单详情中会展示服务进度</van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeNames:['0']
        }
    },
    methods:{
        init(){
            var collapse=this.$refs.collapse.$el.getElementsByClassName('van-collapse-item')
            for(var item of collapse){
                item.style.border='none'
            }
        },
        jump(){
            console.log(233)
        }
    },
    mounted(){
        this.init()
    }
}
</script>
<style scoped lang='less'>
.img{
    width:100%;
    height:auto;
}
.hr{
    width:100%;
    height:2vh;
    background-color:#F5F5F5;
}
.self{
    .van-collapse{
        padding-left:1vw;
    }
    
    .title{
        padding-left:5vw;
        font-weight:700;
        font-size:0.92rem;
        color:#333;
        margin:3vh 0;
        // margin-bottom:4vh;
    }
}
.list{
    width:100%;
    .com{
        display:flex;
        align-items:center;
        justify-content:space-between;
        width:100%;
        padding-right:5vw;
        padding-left:4vw;
        margin:1.4vh 0;
        .left{
            display:flex;
            .big{
                width:72px;
                height:72px;
            }
            .mid{
                // border:1px solid red;
                display:flex;
                flex-direction:column;
                justify-content:space-evenly;
                padding-bottom:1.1vh;
                margin-left:1.4vw;
                .one{
                    color:#333;
                    font-size:1.2rem;
                }
                .two{
                    font-size:0.9rem;
                    color:#999;
                }
            }
        }
        .jump{
            width:32px;
            height:32px;
        }
        
    }
}
</style>