<template>
    <div class="eclass">
        <div class="header">
            <van-icon name="arrow-left" size="24px" color="#444" @click="goBack"/>
            <div class="search">
                <input type="text" placeholder="搜索你想要的商品">
                <van-icon name="search" size="24px" color="#909090"/>
            </div>
        </div>
        <div class="main" :style="{'height':height}">
            <div class="aside">
                <div  v-for="(item,i) of aside" :key="i" @click="asideBtn(i)" :class="item.cb?'com active':'com'">
                    {{item.text}}
                </div>
            </div>
            <div class="body" @scroll.capture="bodyScroll($event)" ref="body">
                <div class="com" v-for="(item,i) of shopList" :key="i" ref="comHeight">
                    <div class="img">
                        <van-image :src="$store.state.domain+item.imgSmall" width="80px" height="80px"/>
                        <div class="empty" v-show="item.ifEmpty==1">
                            <div class="pad"><p>已售迹</p></div>
                        </div>
                    </div>
                    <div class="right">
                        <p class="title">{{item.title}}</p>
                        <p class="subtitle">{{item.subtitle}}</p>
                        <div class="label">
                            <p class="price">￥{{item.price}}</p>
                            <p class="myicon" @click="bodyBtn(item.id)" v-show="item.ifEmpty==0">
                                <van-icon name="add"  color="#FE0000" size="22px"/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <van-popup v-model="popupOff" position="bottom">
                <div class="shopPopug">
                    <div class="abs" @click="popupOff=false">
                        <van-icon name="close" size="28px"/>
                    </div>
                    <div class="top">
                        <van-image :src="$store.state.domain+'test/shops1.jpg'" width="96" height="96"/>
                        <div class="right">
                            <p class="price">￥{{addCart.price}}</p>
                            <p class="select">已选"{{addCart.spec}}"</p>
                            <p class="remark"><van-icon name="warning-o" size="15px" color="#cfa972" style="margin-right:1vw"/>{{addCart.remark}}</p>
                        </div>
                    </div>
                    <div class="spec">
                        <div class="title">规格</div>
                        <div class="content">
                            <div class="com">{{addCart.spec}}</div>
                        </div>
                    </div>
                    <div class="count">
                        <p class="title">数量</p>
                        <div class="right">
                            库存件{{addCart.cash}}<van-stepper v-model="addCart.count" min="1" integer button-size="24px" style="margin-left:2vw;"/>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="btns">
                            <van-button color="linear-gradient(to right, #f68817 , #fcac3d )" size="large">加入购物车</van-button>
                        </div>
                        <div class="btns">
                            <van-button color="linear-gradient(to right, #ff3061 , #fe0001 )" size="large">立即购买</van-button>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            aside:[],
            height:567,
            asideDefault:0,
            shopList:[],
            popupOff:false,
            addCart:{
                price:0,
                remark:'',
                image:'',
                spec:'',
                cash:0,
                count:1
            }
        }
    },
    methods:{
        init(){
            // 侧边栏初始化
            var aside=[{text:'海尔家专区'},{text:'礼品礼盒'},{text:'乐家诚品'},{text:'家电周边'}]
            aside.forEach((value,key)=>{
                value.cb=false
                if(key==0) value.cb=true
            })
            this.aside=aside
            // 获取商品数据
            this.axios.get(this.$store.state.domain+'lejia/shopall').then(res=>{
                var raw=[1,3,16] //需要插入数据的数组下标
                var arrSave=[] //保存数组的下标
                res.data.forEach((value,key)=>{
                    value.nav=false
                    if(key==1) value.nav=true
                    if(key==3) value.nav=true
                    if(key==16) value.nav=true
                })
                var test=res.data
                /*for(var i=0;i<3;i++){
                    test.splice(raw[i],2,test[raw[i]],{test:'success'})
                }*/
                // console.log(res.data)
                this.shopList=res.data
            })
        },
        asideBtn(key){
            if(key!==this.asideDefault){
                this.aside[key].cb=true
                this.aside[this.asideDefault].cb=false
                this.asideDefault=key
            }
            var list=[0,2,4,17]
            var height=this.$refs.comHeight[0].clientHeight
            list[key]*height
            this.$refs.body.scrollTop=list[key]*height
        },
        bodyScroll(e){
            // console.log(e.target.scrollTop)
        },
        bodyBtn(key){
            this.popupOff=true
            this.addCart.price=this.shopList[key].price
            this.addCart.image=this.shopList[key].imgSmall
            this.addCart.remark=this.shopList[key].account
            this.addCart.spec=this.shopList[key].sel
            this.addCart.cash=this.shopList[key].cash
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    created(){
        var height=window.screen.height
        this.height=height-100 //设置初始mian元素高度
        this.init()
    }
}
</script>
<style scoped lang="less">
.eclass{
    .header{
        display:flex;
        // justify-content:space-between;
        height:50px;
        align-items:center;
        padding:0 3.5vw;
        .search{
            margin-left:3.5vw;
            width:80vw;
            background-color:#efefef;
            color:#909090;
            height:36px;
            border-radius:14px;
            padding:0 2.8vw;
            display:flex;
            align-items:center;
            justify-content:space-between;
            input{
                width:80%;
                background-color:#efefef;
                border:none;
                height:100%;
                font-size:0.9rem;
                
            }
        }
    }
    .main{
        width:100%;
        display:flex;
        height:567px;
        .aside{
            width:24vw;
            // border:1px solid red;
            
            background-color:#efefef;
            .com{
                color:#666;
                font-size:0.9rem;
                padding:3.5vh 0;
                padding-left:3.5vw;
                font-size:0.97rem;
            }
            .active{
                color:#fe0002;
                border-left:3px solid #fe0002;
                background-color:#fff;
                font-weight:600;
            }
        }
        .body{
            width:76vw;
            // border:1px solid red;
            overflow-y:scroll;

            .com{
                padding:1vh 0;
                margin:0 3.5vw;
                display:flex;
                // width:100%;
                border-bottom:1px solid #F3F3F3;
                .img{
                    // width:80px;
                    // height:80px;
                    position:relative;
                    // border:1px solid red;
                    .empty{
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        position:absolute;
                        z-index:1;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        .pad{
                            width:56px;
                            height:56px;
                            background-color:rgba(0,0,0,.4);
                            border-radius:50%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            p{
                                font-size:0.9rem;
                                color:#fff;
                            }
                        }
                    }
                }
                .right{
                    padding-left:2vw;
                    // border:1px solid red;
                    width:70%;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    .title{
                        font-weight:600;
                        font-size:0.9rem;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                    .subtitle{
                        font-size:0.89rem;
                        width:100%;
                        height:38px;
                        color:#999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .label{
                        display:flex;
                        justify-content:space-between;
                        .price{
                            color:#FE0000;
                        }
                    }
                }
                
            }
        }
        .shopPopug{
            width:100%;
            position:relative;
            .abs{
                position:absolute;
                top:1vh;
                right:2vw;
            }
            .top{
                padding:0 4vw;
                margin-top:1vh;
                display:flex;
                .right{
                    margin-left:1vw;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-around;
                    .price{
                        color:#333;
                        font-size:1.1rem;
                        font-weight:600;
                    }
                    .select{
                        color:#333;
                        font-size:0.96rem;
                    }
                    .remark{
                        color:#cfa972;
                        font-size:0.9rem;
                        display:flex;
                        align-items:center;
                    }
                }
            }
            .spec{
                padding:0 4vw;
                margin:1vh 0;
                .title{
                    font-weight:600;
                    font-size:1.2rem;
                    margin-bottom:1vh;
                }
                .content{
                    display:flex;
                    .com{
                    border:1px solid red;
                    background-color:#fcf3f1;
                    color:#fe0002;
                    border:1px solid #fe0002;
                    border-radius:4px;
                    padding:0.5vh 2vw;
                    font-size:0.9rem;
                    }
                }
            }
            .count{
                padding:0 4vw;
                display:flex;
                justify-content:space-between;
                margin:1vh 0;
                .title{
                    font-weight:600;
                    font-size:1.2rem;
                    margin-bottom:1vh;
                }
                .right{
                    display:flex;
                    align-items:center;
                    color:#333;
                    font-size:0.9rem;
                }
            }
            .btn{
                width:100%;
                display:flex;
                .btns{
                    width:50%;
                }
            }
        }
    }
}
</style>