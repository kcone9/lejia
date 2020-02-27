<template>
    <div class="home">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,i) of swipeImg" :key="i">
                <van-image :src="$store.state.domain+item.src"/>
            </van-swipe-item>
        </van-swipe>
        <!--van-goods-action safe-area-inset-bottom style="z-index:5" ref="goods">
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-button type="warning"  text="加入购物车" @click="setCartBtn"/>
            <van-goods-action-button type="danger" text="立即购买" @click="doBuy"/>
        </van-goods-action-->
        <div class="goodsAction">
            <div class="left">
                <div class="com" @click="jumpCustomer()">
                    <van-icon name="chat-o" color="#323233" size="22px"/>
                    <p>客服</p>
                </div>
                <div class="com" @click="jumpEffectCart()">
                    <van-icon name="cart-o" color="#323233" size="22px"/>
                    <p>购物车</p>
                </div>

            </div>
            <div class="right">
                <div class="com" v-show="emptyOff">
                    <van-button size="large" color="linear-gradient(to right, #f68817, #fcac3d)" @click="setCartBtn(1)">加入购物车</van-button>
                </div>
                <div class="com" v-show="emptyOff">
                    <van-button size="large" color="linear-gradient(to right, #ff3061, #fe0001)" @click="doBuy">立即购买</van-button>
                </div>
                <van-button size="large" color="#ccc" v-show="!emptyOff">已售迹</van-button>
            </div>
        </div>
        <div class="details">
            <div class="details_title">
                <p class="title">{{product.title}}</p>
                <div class="label">
                    <p>{{product.adds}}</p>
                    <p>&nbsp;&nbsp;库存{{product.cash}}件</p>
                </div>
                <p class="price">￥<span>{{product.price}}</span></p>
            </div>
            <div class="spec" @click="opeanCartBtn">
                <div class="pad">
                    <p class="left">规格</p>
                    <div class="right">
                        <p>已选：{{product.sel}}</p>
                        <van-icon name="arrow" color="#333"/>
                    </div>
                </div>
            </div>
            <div class="three">
                <div class="img">
                    <van-image width="72px" height="30px" :src="$store.state.domain+'test/detail_logo.png'"/>
                </div>
                <van-grid :column-num="3" :border='false'>
                    <van-grid-item icon="gem-o" text="安全健康" />
                    <van-grid-item icon="records" text="全程溯源" />
                    <van-grid-item icon="manager-o" text="专业认证" />
                </van-grid>
                <p class="text">{{product.subtitle}}</p>
            </div>
            <div class="message">
                <div class="pad">
                    <div class="title">产品信息</div>
                    <div class="item">
                        <p class="left">商品产地</p>
                        <p class="right">{{product.adds}}</p>
                    </div>
                    <div class="item">
                        <p class="left">商品配送</p>
                        <p class="right">{{product.account}}</p>
                    </div>
                </div>
            </div>
            <div class="evaluate">
                <div class="top">
                    <p class="left">用户评价</p>
                    <p class="right">更多
                        <van-icon name="arrow" color="#666"/>
                    </p>
                </div>
                <van-swipe :loop="false" :width="width" :show-indicators="false">
                    <van-swipe-item v-for="(item,i) of swipeList" :key="i">
                        <div class="com">
                            <div class="pad">
                                <div class="tops">
                                    <div class="left">
                                        <van-image width="35px" height="35px" round/>
                                        <div class="author">
                                            <p class="name">{{item.name}}</p>
                                            <van-rate v-model="item.star" :size="12" color="#FFA201" void-icon="star" void-color="#f5f5f5" />
                                        </div>
                                    </div>
                                    <div class="right">{{item.date}}</div>
                                </div>
                                <p class="evaluate_spec">{{item.spec}}</p>
                                <p class="text">{{item.text}}</p>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="details_go">
                <div class="pad">
                    商品详情
                </div>
            </div>
        </div>
        <div class="detail_list">
            <van-image v-for="(item,i) of detailImg" :key="i" :src="$store.state.domain+item.src"/>
        </div>
        <van-divider :style="{ color: '#ddd', borderColor: '#ddd', padding: '0 16px' }">好品质·有底线</van-divider>
        <van-popup v-model="popupOff" position="bottom">
          <div class="shopPopug">
              <div class="abs" @click="popupOff=false">
                <van-icon name="close" size="28px"/>
              </div>
              <div class="top">
                <van-image :src="addCart.image" width="96" height="96"/>
                <div class="right">
                    <p class="price">￥{{addCart.price}}</p>
                    <p class="select">已选"{{addCart.spec}}"</p>
                    <p class="remark"><van-icon name="warning-o" size="15px" color="#cfa972" style="margin-right:1vw"/>{{addCart.remark}}</p>
                </div>
              </div>
              <div class="specs">
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
                      <van-button color="linear-gradient(to right, #f68817 , #fcac3d )" size="large" @click="setCartBtn(addCart.count)">加入购物车</van-button>
                  </div>
                  <div class="btns">
                      <van-button color="linear-gradient(to right, #ff3061 , #fe0001 )" size="large" @click="doBuy">立即购买</van-button>
                  </div>
              </div>
          </div>
        </van-popup>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {Toast} from 'vant'
export default {
    data(){
        return {
            startValue:5,
            width:300,
            swipeList:[],
            swipeImg:[],
            product:{
                title:'',
                subtitle:'',
                adds:'',
                account:'',
                cash:0,
                sel:''
            },
            detailImg:[],
            popupOff:false,
            addCart:{
                price:0,
                remark:'',
                image:'',
                spec:'',
                cash:0,
                count:1
            },
            ifEmpty:0,
            emptyOff:true, //是否显示购物车，立即购买
            dataSave:{}
        }
    },
    methods:{
        init(){
            //评价轮播数据
            var swipe={name:'Kimmy',star:5,data:'2020-01-29',spec:'规格:1 盒 *2 kg',text:'好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！好评！'}
            var list=[]
            for(let i=0;i<6;i++){
                list.push(swipe)
            }
            this.swipeList=list
            //跳转传过来的参数,并处理浏览器刷新无数据问题
            if(this.$route.params.id !== undefined | this.$route.params.id !==null){
                var i=this.$route.params.id
                this.getData(i)
                sessionStorage.setItem('lejia-id',this.$route.params.id)
            }else{
                this.getData(parseInt(sessionStorage.getItem('lejia-id')))
            }
        },
        jumpCustomer(){ //跳到客服
            this.$router.push('/customer')
        },
        jumpEffectCart(){ //跳到购物车
            this.$router.push({name:'effectCart',params:{id:this.dataSave.product[0].id}})
            // console.log(JSON.parse(localStorage['lejiaCarts']))
        },
        setCartBtn(num){
            // 加入购物车
            var list=[]
            // console.log(num)
            if(localStorage['lejiaCarts']){
                list=JSON.parse(localStorage['lejiaCarts'])
                try{
                list.forEach((value,key)=>{
                    if(value.shopId==this.dataSave.product[0].shopId){
                        value.data.forEach((item,ids)=>{
                            if(item.id===this.dataSave.product[0].id){
                                Toast({
                                      message:'已在购物车中',
                                      duration:1000
                                  })
                                throw new Error("跳出循环")
                            }else if(ids===(value.data.length-1)){
                                console.log('已添加与本商品同店铺的其他商品，但本商品未添加')
                                this.addCartData(list,num)
                                throw new Error("跳出循环")
                            }
                        })
                    }else if(key===(list.length-1)){
                        console.log('将该商品加入新的店铺')
                        this.addCartData(list,num)
                    }
                })
            } catch (errMsg){
                // console.log(errMsg)
            }
            }else{
                list.push({shopId:this.dataSave.product[0].shopId,name:this.dataSave.product[0].name,data:[{
                    title:this.dataSave.product[0].title,
                    sel:this.dataSave.product[0].sel,
                    price:this.dataSave.product[0].price,
                    id:this.dataSave.product[0].id,
                    imgSmall:this.dataSave.product[0].imgSmall,
                    num:num
                }]})
                localStorage['lejiaCarts']=JSON.stringify(list)
            }
        },
        addCartData(data,num){
            //加商品加入购物车(浏览器已缓存,但没有当前商品)
            
            for(let i=0;i<data.length;i++){
                if(data[i].shopId===this.dataSave.product[0].shopId){// 在原有店铺上加入产品
                console.log('在原有店铺上加入产品')
                    data[i].data.push({
                        title:this.dataSave.product[0].title,
                        sel:this.dataSave.product[0].sel,
                        price:this.dataSave.product[0].price,
                        id:this.dataSave.product[0].id,
                        imgSmall:this.dataSave.product[0].imgSmall,
                        num:num
                    })
                    localStorage['lejiaCarts']=JSON.stringify(data)
                    break
                }else if(i===(data.length-1)){
                    console.log('商品会被加入到新店铺')
                    data.push({shopId:this.dataSave.product[0].shopId,name:this.dataSave.product[0].name,data:[{ //商品会被加入到新店铺
                        title:this.dataSave.product[0].title,
                        sel:this.dataSave.product[0].sel,
                        price:this.dataSave.product[0].price,
                        id:this.dataSave.product[0].id,
                        imgSmall:this.dataSave.product[0].imgSmall,
                        num:num
                    }]})
                    localStorage['lejiaCarts']=JSON.stringify(data)
                    break
                }
            }
        },
        doBuy(){
            Toast({
                message:'请登录',
                duration:1000
            })
            setTimeout(()=>{
                this.$router.push({path:'/login'})
            },1000)
        },
        getData(id){
            this.axios.get(this.$store.state.domain+`lejia/detail?id=${id}`).then(res=>{
                // 轮播,商品详情,商品内容
                this.swipeImg=res.data.swipe
                this.product.title=res.data.product[0].title
                this.product.adds=res.data.product[0].adds
                this.product.cash=res.data.product[0].cash
                this.product.price=res.data.product[0].price
                this.product.sel=res.data.product[0].sel
                this.product.subtitle=res.data.product[0].subtitle
                this.product.account=res.data.product[0].account
                this.detailImg=res.data.img
                // 商品规格数据
                this.addCart.price=res.data.product[0].price
                this.addCart.image=this.$store.state.domain+res.data.product[0].imgSmall
                this.addCart.remark=res.data.product[0].account
                this.addCart.spec=res.data.product[0].sel
                this.addCart.cash=res.data.product[0].cash
                this.ifEmpty=res.data.product[0].ifEmpty //商品是否售迹
                this.dataSave=res.data
                if(res.data.product[0].ifEmpty==1){//商品已经售迹
                    this.product.sel='规格'
                    this.emptyOff=false
                }else{
                }
            })
        },
        textBtn(){
        },
        opeanCartBtn(){
            if(this.ifEmpty==1){
                Toast({
                    message:'商品已售迹',
                    duration:1000
                })
            }else this.popupOff=true
        }
    },
    watch:{},
    computed:{
    },
    mounted(){
        
    },
    created(){
        //初始化轮播左边宽
        var width=window.screen.width
        this.width=Math.floor(width*0.9)
        this.init()
    }
}
</script>
<style scoped lang='less'>
.home{
    width:100vw;
    .my-swipe{
        width:100%;
        height:373px;
        .van-swipe-item{
            display:flex;
            align-items:center;
            justify-content:center;
        }
    }
    .goodsAction{
        position:fixed;
        z-index:3;
        width:100%;
        height:50px;
        left:0;
        bottom:0;
        display:flex;
        background-color:#fff;
        .left{
            display:flex;
            width:35%;
            // border:1px solid red;
            .com{
                width:50%;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                p{
                    font-size:0.9rem;
                }
            }
        }
        .right{
            width:75%;
            // border:1px solid red;
            display:flex;
            .com{
                width:50%;
            }
        }
    }
    .details{
        .details_title{
            padding:0 3.5vw;
            padding-bottom:1.8vh;
            // border:1px solid red;
            .title{
                font-size:0.98rem;
                margin-top:1.8vh;
            }
            .label{
                display:flex;
                font-size:0.9rem;
                margin-top:1vh;
            }
            .price{
                color:#fe0002;
                margin-top:1vh;
                span{
                    font-size:1.2rem;
                    font-weight:600;
                }
            }
        }
    }
    .spec{
        background-color:#f5f5f5;
        padding:1.2vh 0;
        .pad{
            padding:1.8vh 3.5vw;
            background-color:#fff;
            display:flex;
            justify-content:space-between;
            .left{
                color:#999;
                font-size:0.9rem
            }
            .right{
                color:#333;
                font-size:0.9rem;
                display:flex;
                align-items:center;
                p{
                    margin-right:1vw;
                }
            }
        }
    }
    .three{
        padding:0 3.5vw;
        padding-bottom:1.8vh;
        .img{
            display:flex;
            justify-content:center;
            padding:1.8vh 0;
        }
        .text{
            font-size:0.8rem;
            line-height:2.8vh;
            color:#333;
        }
    }
    .message{
        background-color:#f5f5f5;
        padding:1.2vh 0;
        .pad{
            background-color:#fff;
            padding:1.8vh 3.5vw;
            .title{
                font-weight:600;
                font-size:0.96rem;
            }
            .item{
                display:flex;
                align-items:center;
                .left{
                    color:#999;
                    font-size:0.9rem;
                    margin-right:2vw;
                }
                .right{
                    color:#333;
                    font-size:0.9rem;
                }
            }
        }
    }
    .evaluate{
        .top{
            display:flex;
            justify-content:space-between;
            padding:1.8vh 3.5vw;
            .left{
                font-weight:600;
                font-size:0.97rem;
            }
            .right{
                color:#666;
                font-size:0.9rem;
                display:flex;
                align-items:center;
            }
        }
        .com{
            padding:1.8vh 3.5vw;
            .pad{
                box-shadow: 0 4px 16px 0 rgba(0,0,0,.12);
                // border:1px solid red;
                padding:1vh 2vw;
                border-radius:5px;
                .tops{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .left{
                        display:flex;
                        align-items:center;
                        .author{
                            margin-left:2vw;
                            .name{
                                color:#333;
                                font-size:0.9rem;
                            }
                        }
                        
                    }
                    .right{
                        color:#999;
                        font-size:0.8rem;
                    }
                }
                .evaluate_spec{
                    color:#999;
                    font-size:0.8rem;
                    margin-top:0.5vh;
                    margin-bottom:2vh;
                }
                .text{
                    color:#333;
                    font-size:0.9rem;
                    // border:1px solid red;
                    height:42px;
                    overflow:hidden;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
            }
        }
    }
    .details_go{
        background-color:#f5f5f5;
        padding-top:1.2vh;
        .pad{
            background-color:#fff;
            padding:1vh 3.5vw;
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
    .specs{
      padding:0 4vw;
      margin:1vh 0;
      .title{
        font-weight:600;
        font-size:1rem;
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
        font-size:1rem;
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
</style>