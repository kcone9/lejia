<template>
    <div class="home" @scroll.capture="scrollHome">
        <van-search placeholder="搜索你想要的商品" v-model="searchvalue" />
        <van-swipe :autoplay="3000" indicator-color="#AE332E">
            <van-swipe-item><van-image :src="$store.state.domain+'test/swipe0.jpg'" fit='fill'/></van-swipe-item>
            <van-swipe-item><van-image :src="$store.state.domain+'test/swipe1.jpg'" fit='fill'/></van-swipe-item>
        </van-swipe>
        <div class="hr"></div>
        <div class="the_title">
        <p class="one">[日日顺乐家]</p>
        <p class="two">专业场景服务平台</p>
        </div>
        <van-swipe :loop="false" :width="350" class="my-vant-swipe" :show-indicators="false">
          <van-swipe-item v-for="(item,i) of swipeList" :key="i">
              <div class="shopSwipe">
                <div class="top">
                    <p class="left">{{item.label}}</p>
                    <p class="right">{{item.numPeople}}人精选</p>
                </div>
                <div class="bottom">
                    <p class="shopName">{{item.title}}</p>
                    <van-image :src="$store.state.domain+item.src"/>
                    <p class="price">￥{{item.price}}</p>
                    <p class="subtitle">{{item.subtitle}}</p>
                </div>
              </div>
          </van-swipe-item>
        </van-swipe>
        <div class="the_title">
          <p class="one">[商品推荐]</p>
          <p class="two">甄选品质商品 ▪ 为您精心推选</p>
        </div>
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
                      <van-button color="linear-gradient(to right, #f68817 , #fcac3d )" size="large" @click="setCartBtn(addCart.count)">加入购物车</van-button>
                  </div>
                  <div class="btns">
                      <van-button color="linear-gradient(to right, #ff3061 , #fe0001 )" size="large" @click="doBuy">立即购买</van-button>
                  </div>
              </div>
          </div>
        </van-popup>
        <van-tabs v-model="active" @change="tabs" ref="tabs">
        <van-tab title="全部分类">
            <homelist data="lejia/shopall"  @sonShopBtn="shopBtn" ref="son" @noMore="noMoreEvent"/>
            <div class="load" >
              <p>{{shopLOaderText}}</p>
              <van-loading type="spinner" v-show="shopOff"/>
            </div>
        </van-tab>
        <van-tab title="乐家专区">
            <homelist data="lejia/shopall" @sonShopBtn="shopBtn" ref="son1"/>
        </van-tab>
        <van-tab title="礼盒礼品">
            <homelist data="lejia/shopall" @sonShopBtn="shopBtn" ref="son2"/>
        </van-tab>
        <van-tab title="乐家成品">
            <homelist data="lejia/shopall" @sonShopBtn="shopBtn" ref="son3"/>
        </van-tab>
        <van-tab title="家电周边">
            <homelist data="lejia/shopall" @sonShopBtn="shopBtn" ref="son4"/>
        </van-tab>
        <van-tab title="顺心宝">
            <homelist data="lejia/shopall" @sonShopBtn="shopBtn" ref="son5"/>
        </van-tab>
        </van-tabs>
        <div class="globaltop" v-show="top"></div>
    </div>
</template>
<script>
import HomeList from './HomeComponentList'
import {Toast} from 'vant'
export default {
    data(){
        return{
            searchvalue: '',
            tabbarActive:0,
            index:'1',
            active:0,
            rateValue:2,
            shopList:[],
            shopAll:[],
            popupOff:false,
            shopOff:true,
            shopLOaderText:'正在加载',
            top:false,
            dataSave:[],
            addCart:{
                price:0,
                remark:'',
                image:'',
                spec:'',
                cash:0,
                count:1
            },
            domain:this.$store.state.domain,
            swipeList:[]
        }
    },
    methods:{
      init(){
          this.axios.get(this.$store.state.domain+'lejia/shopall').then((res)=>{
              var list=res.data
              // console.log(this.$store.state.domain);
              this.shopList=list.slice(0,6)
              this.shopAll=res.data
          })
          // 获取轮播数据
          this.axios.get(this.$store.state.domain+'lejia/omnibus').then(res=>{
              this.swipeList=res.data
          })
      },
      setCartBtn(num){
            // 加入购物车
            var list=[]
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
              } catch (errMsg){}
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
      shopBtn(list,id){
          this.popupOff=true
          this.addCart.price=list.price
          this.addCart.image=this.$store.state.domain+list.imgSmall
          this.addCart.remark=list.account
          this.addCart.spec=list.sel
          this.addCart.cash=list.cash
          this.axios.get(this.$store.state.domain+`lejia/detail?id=${id}`).then(res=>{
            console.log(res.data)
            this.dataSave=res.data
          })
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
      tabs(name,title){
        switch(name){
          case 0:
            this.$refs.son.tabs(name)
            break;
          case 1:
            setTimeout(()=>{
              this.$refs.son1.tabs(name)
            },100)
            break;
          case 2:
            setTimeout(()=>{
              this.$refs.son2.tabs(name)
            },100)
            break;
          case 3:
            setTimeout(()=>{
              this.$refs.son3.tabs(name)
            },100)
            break;
          case 4:
            setTimeout(()=>{
              this.$refs.son4.tabs(name)
            },100)
            break;
          case 5:
            setTimeout(()=>{
              this.$refs.son5.tabs(name)
            },100)
            break;
        }
      },
      shopAdd(){
        if(this.shopOff){
            this.$refs.son.shopAdd()
        }
      },
      noMoreEvent(value){
        this.shopOff=false
        this.shopLOaderText='没有更多了'
      },
      scrollHome(e){
        var height=e.target.scrollHeight-this.$refs.tabs.$vnode.elm.lastChild.clientHeight-44 // 导航滑动到其他位置时，新出现导航
        /*if(e.target.scrollTop>height){
          this.top=true
        }else{
          this.top=false
        }*/
      }
    },
    created(){
        this.init()
    },
    mounted(){
      // 加载框是否显示 mounted
      var inter=new IntersectionObserver(
      (event)=>{
          if(event[0].isIntersecting){
          this.shopAdd()
          }
      })
      var element=this.$refs.tabs.$vnode.elm.lastChild.firstChild
      element.getElementsByClassName('load')
      setTimeout(()=>{
          inter.observe(element.childNodes[2])
      },0)
    },
    components:{
      'homelist':HomeList
    }
}
</script>
<style scoped lang="less">
.home{
  padding-bottom:50px;
  overflow-y:scroll;
  width:100vw;
  height:100vh;
  .hr{
    width:100%;
    height:10px;
    background-color:#f5f5f5;
  }
  .globaltop{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:44px;
    z-index:3;
    border:1px solid red;
  }
  .the_title{
    width:100%;
    height:12vh;
    // border:1px solid red;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    .one{
      color:#333;
      font-size:1.05rem;
      font-weight:600;
      margin-bottom:1vh;
      letter-spacing:0.5px;
    }
    .two{
      color:#a5a5a5;
      font-size:0.93rem;
    }
  }
  .my-vant-swipe{
    padding:2vh 0;
    padding-left:3vw;
  }
  .shopSwipe{
    border-radius:8px;
    box-shadow: 0 0 24px rgba(0,0,0,.1);
    overflow:hidden;
    padding:2vh 4vw;
    .top{
      display:flex;
      justify-content:space-between;
      align-items:center;
      .left{
        background-color:#73AB6E;
        color:#fff;
        padding:2px 5px;
        font-size:0.9rem;
        // border-top-right-radius:8px;
        border-bottom-right-radius:8px;
      }
      .right{
        color:#717171;
        font-size:0.9rem;
      }
    }
    .bottom{
      .shopName{
        font-size:0.95rem;
        margin:2vh 0;
      }
      .price{
        // color:#333;
        font-size:1rem;
        font-weight:600;
        margin:1vh 0;
      }
      .subtitle{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;  /*显示的行数*/
        overflow: hidden;
        word-break:break-all; /*可择*/
        color:#333;
        font-size:1rem;
      }
    }
  }
  .load{
    // border:1px solid red;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#666;
    height:30px;
    p{
      margin-right:10px;
      font-size:0.9rem;
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
</style>