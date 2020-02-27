<template>
    <div class="cart">
        <div class="setoff">
            <table></table>
            <div class="pad"></div>
            <div class="header">
                <div class="left">
                    <van-image :src="$store.state.domain+'test/user1.png'" width="64px" height="64px" round/>
                    <p>注册/登录</p>
                </div>
                <router-link to='/customer' class="right">
                    <van-icon name="service-o" color="#fff" size="24px"/>
                    <p>联系客服</p>
                </router-link>
            </div>
        </div>
        <div class="mat" :style="{'height':height+'px'}"></div>
        <div class="main" ref="main">
            <div class="order">
                <div class="title">
                    <p class="name">商品订单</p>
                    <p class="text">查看全部 <van-icon name="arrow" color="#999" style="margin-left:1.2vw;"/></p>
                </div>
                <div class="content">
                    <div class="com" v-for="(item,i) of orderIcon" :key="i">
                        <van-image width="30px" height="30px" fit="cover" :src="item.img"/>
                        <p>{{item.text}}</p>
                    </div>
                </div>
            </div>
            <div class="order">
                <div class="title">
                    <p class="name">服务订单</p>
                    <p class="text">查看全部 <van-icon name="arrow" color="#999" style="margin-left:1.2vw;" /></p>
                </div>
                <div class="content">
                    <div class="com" v-for="(item,i) of serveIcon" :key="i">
                        <van-image width="30px" height="30px" fit="cover" :src="item.img"/>
                        <p>{{item.text}}</p>
                    </div>
                </div>
            </div>
            <div class="project">
                <p>智家项目</p>
                <van-icon name="arrow" color="#999"/>
            </div>
            <div class="backage">
                <div class="title"><i></i><p>我的钱包</p></div>
                <div class="content">
                    <div class="com" v-for="(item,i) of pagText" :key="i">
                        <div class="top">
                            <p>{{item.text}}</p>
                            <van-image :src="item.img" width="18px" height="14px"/>
                        </div>
                        <div class="mod">
                            <span>{{item.price}}</span>{{item.unit}}
                        </div>
                        <div class="bottom">
                            <p>{{item.label}}</p>
                            <van-icon name="arrow" color="#cfa972"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="backage">
                <div class="title"><i></i><p>更多服务</p></div>
                <div class="content" >
                    <van-grid :column-num="3" ref="grid">
                        <van-grid-item v-for="(item,i) of gridIcon" :key="i" :icon="item.icon" :text="item.text" :to="item.to"/>
                    </van-grid>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            orderIcon:[],
            serveIcon:[],
            pagText:[],
            gridIcon:[],
            height:1000
        }
    },
    methods:{
        init(){ //订单与服务
            var icon=this.$store.state.domain+'test/user1.png' 
            var orderText=['代付款','代发货','待收货','待评价','退款/售后']
            var orderIcon=[]
            var serveIcon=[]
            for(var i=1;i<6;i++){
                orderIcon.push({img:this.$store.state.domain+`test/${'icon'+i}.png`,text:orderText[i-1]})
                serveIcon.push({img:this.$store.state.domain+`test/${'icon2-'+i}.png`,text:orderText[i-1]})
            }
            this.orderIcon=orderIcon
            this.serveIcon=serveIcon
            // 我的钱包
            var pagText=[{text:'乐卡余额',price:0.00,unit:'元',label:'立即充值'},{text:'贵宾储蓄卡',price:0.00,unit:'元',label:'立即充值'},{text:'专项体验卡',price:0,unit:'张',label:'立即查看'},{text:'家电服务卡',price:0,unit:'张',label:'立即激活'},{text:'单品会换卡',price:0,unit:'张',label:'立即会换'}]
            var pagImg=[]
            for(var i=1;i<6;i++){
                pagText[i-1].img=this.$store.state.domain+`test/card${i}.png`
            }
            this.pagText=pagText
            // 宫格数据
            var grid=[{text:'地址管理',icon:'wap-home-o'},{text:'包裹拒投',icon:'free-postage'},{text:'问题中心',icon:'service-o'},{text:'邀请好友',icon:'share'},{text:'账号设置',icon:'setting-o'},{text:'关于乐家',icon:'smile-comment-o'}]
            grid.forEach((value,key)=>{
                value.id=key
                if(key==2) value.to='/customer'
                    else value.to='/login'
            })
            this.gridIcon=grid
        }
    },
    created(){
        this.init()
        
    },
    mounted(){
        var element=this.$refs.grid.$vnode.elm
        element.style.borderRadius='10px'
        element.style.overflow='hidden'
        var height=this.$refs.main.offsetHeight
        this.height=height-60
    }
}
</script>
<style scoped lang='less'>
.cart{
    position: relative;
    width:100%;
    .mat{
        width:100%;
        height:1122px;

        background-color:#F5F5F5;
        z-index:-2;
    }
    .setoff{
        width:100%;
        height:180px;
        background:url(http://127.0.0.1:5050/test/cartBack.png) no-repeat right bottom 75%;
        .pad{
            position:absolute;
            top:0;
            left:0;
            z-index:-1;
            width:100%;
            height:100%;
            background:-webkit-linear-gradient(0deg,#ff3061 0%,#fe0001 10%);
        }
        .header{
            margin-top:4vh;
            padding:0 4vw;
            display:flex;
            justify-content:space-between;
            align-items:center;
            .left{
                display:flex;
                align-items:center;
                p{
                    margin-left:10px;
                    color:#fff;
                    font-size:1.2rem;
                    letter-spacing:0.4vw;
                    font-weight:700;
                }
            }
            .right{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                p{
                    color:#fff;
                    font-size:0.9rem;
                }
            }
        }
        
    }
    .main{
        position:absolute;
        top:120px;
        left:0;
        width:100%;
        z-index:3;
        padding:3vw;
        padding-bottom:50px;
        .order{
            border-radius:18px;
            background-color:#fff;
            margin-bottom:3.2vh;
            .title{
                display:flex;
                justify-content:space-between;
                align-items:center;
                border-bottom:1px solid #F3F3F3;
                padding:2vh 3.5vw;
                .name{
                    font-size:1.2rem;
                    font-weight:600;
                }
                .text{
                    color:#999;
                    font-size:0.9rem;
                    display:flex;
                    align-items:center;
                }
            }
            .content{
                display:flex;
                padding:2vh 0;
                .com{
                    width:20%;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    p{
                        font-size:0.9rem;
                        color:#333;
                        margin-top:0.5vh;
                    }
                }
            }
        }
        .project{
            border-radius:1px;
            background-color:#fff;
            display:flex;
            justify-content:space-between;
            padding:2vh 3.5vw;
            color:#333;
        }
        .backage{
            padding-top:2vh;
            .title{
                display:flex;
                align-items:center;
                i{
                    width:4px;
                    height:16px;
                    background-color:#FE0002;
                    margin-right:3.3vw;
                }
                p{
                    font-size:1.1rem;
                    font-weight:600;
                }
            }
            .content{
                display:flex;
                flex-wrap:wrap;
                padding-top:2vh;
                padding-bottom:2vh;
                // border:1px solid red;
                align-items:center;
                // justify-content:space-evenly;
                .com{
                    width:48%;
                    height:16vh;
                    background-color:#fff;
                    border-radius:10px;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-evenly;
                    padding:1vh 2.4vw;
                    margin:0 1%;
                    margin-bottom:1vh;
                    .top{
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        font-size:0.93rem;
                        p{
                            color:#333;
                        }
                    }
                    .mod{
                        color:#333;
                        font-size:0.93rem;
                        span{
                            font-weight:600;
                            font-size:1.1rem;
                            margin-right:1vw;
                        }
                    }
                    .bottom{
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        color:#cfa972;
                        font-size:0.93rem;
                    }
                }
            }
        }
    }
}
</style>