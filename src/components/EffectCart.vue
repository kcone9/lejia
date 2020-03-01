<template>
    <div class="home" :style="{'paddingBottom':paddingBottom+'px'}">
        <div class="header" v-show="isCart">
            <p>您的购物车还没有商品哦~</p>
            <van-button size="small" to="/effect/eclass" class="stroll">去逛逛</van-button>
        </div>
        <div class="cartMan">
          <p></p>
          <p class="mod">购物车(9)</p>
          <p class="right" @click="delTrans">{{delTransText}}</p>
        </div>
        <div class="cartList">
          <div class="com" v-for="(item,i) of cartList" :key="i">
            <div class="shopName">
              <van-icon name="checked" size="20px" :color="item.cb?'#FE0002':'#DBDBDB'" @click="IconShopBtn(item.shopId)"/>
              <div class="right">
                <van-icon name="gift-card-o" />
                <p>{{item.name}}</p>
              </div>
            </div>
            <div class="bottom" v-for="(items,j) of item.data" :key="j">
              <van-icon name="checked" size="20px" :color="items.cb?'#FE0002':'#DBDBDB'" @click="IconProductBtn(item.shopId,items.id)"/>
              <div class="content">
                <van-image :src="$store.state.domain+items.imgSmall" width="75px" height="75px"/>
                <div class="right">
                  <p class="title">{{items.title}}</p>
                  <div class="elect"><p>{{items.sel}}</p></div>
                  <div class="label">
                    <p class="price">￥<span>{{items.price}}</span></p>
                    <van-stepper ref="stepper" class="stepper" v-model="items.num" min="1" integer button-size="20px"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="the_title">
            <p class="one">[商品推荐]</p>
            <p class="two">甄选品质商品 ▪ 为您精心推选</p>
        </div>
        <div class="shopList">
          <div class="com" v-for="(item,i) of shopList" :key="i" @click="jump(item.id)">
              <div class="img">
                  <div class="empty" :style="{'display':item.ifEmpty==0?'none':''}">
                      <div class="pad">已售罄</div>
                  </div>
                  <van-image :src="$store.state.domain+item.imgBig" fit="fill" width="174px" height="174px"/>
              </div>
              <p class="title">{{item.title}}</p>
              <div class="label">
                  <p class="price">￥{{item.price}}</p>
                  <p class="adds">{{item.adds}}</p>
              </div>
              <div class="cart">
                  <van-rate v-model="item.comment" size="16px" readonly/>
                  <van-icon v-show="item.ifEmpty==0" name="add" color="#FE0000" size="26px" @click.stop="shopBtn(item.id)"/>
              </div>
          </div>
      </div>
        <div class="load" ref="tabs">
            <p>{{shopLOaderText}}</p>
            <van-loading type="spinner" v-show="shopOff"/>
        </div>
        <van-popup v-model="popupOff" position="bottom">
          <div class="shopPopug">
              <div class="abs" @click="popupOff=false">
                <van-icon name="close" size="28px"/>
              </div>
              <div class="top">
                <van-image :src="$store.state.domain+addCart.imgSmall" width="96" height="96"/>
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
        <div class="delCart" v-show="!submitOff">
          <div class="left" @click="allDelEvent">
            <van-icon name="checked" size="20px" :color="allDelBtn?'#FE0002':'#DBDBDB'" /><!--:color="item.cb?'#FE0002':'#DBDBDB'"allDel-->
            <p>全选</p>
          </div>
          <van-Button class="btn" size="small" color="linear-gradient(to right, #ff6034 , #ee0a24 )" @click="allDelBtnEvent">删除</van-Button>
        </div>
        <van-submit-bar class="submit" v-show="submitOff"
          :price="allPrice"
          button-text="提交订单"
          @submit="onSubmitBtn"
          :decimal-length="1"
        >
          <van-checkbox v-model="allBtn" @change="allCheck" checked-color="#FE0002">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    data(){
        return {
          paddingBottom:50,
          shopList:[],
          shopAll:[],
          cartList:[],
          addCart:{
              price:0,
              remark:'',
              image:'',
              spec:'',
              cash:0,
              count:1
          },
          allPrice:0,
          allBtn:false,
          allDelBtn:false,
          delTransText:'管理',
          popupOff:false,
          shopOff:true,
          shopLOaderText:'正在加载',
          top:false,
          isCart:true,
          submitOff:true //提交组件显示
        }
    },
    methods:{
        init(){
            this.axios.get(this.$store.state.domain+'lejia/shopall').then((res)=>{
                var list=res.data
                this.shopList=list.slice(0,6)
                this.shopAll=res.data
            })
            /*if(this.$route.params.id){
                this.getData(this.$route.params.id)
                sessionStorage.setItem('lejia-cartid',this.$route.params.id)
            }else{
                this.getData(parseInt(sessionStorage.getItem('lejia-cartid')))
            }*/
            // 检查浏览器是否有购物车缓存
            if(localStorage['lejiaCarts']){
              let list=JSON.parse(localStorage['lejiaCarts'])
              // let price=0;
              for(let value of list){
                value.cb=false
                for(let item of value.data){
                  item.cb=false
                  // price=price+item.price*item.num
                }
              }
              this.allPrice=0
              this.cartList=list
              this.isCart=false
              this.paddingBottom=100
              this.submitOff=true
            } else {
              this.isCart=true
              this.submitOff=false
            }
        },
        allDelEvent(){
          this.allDelBtn=!this.allDelBtn
          if(this.allDelBtn) this.allCheckEvent(true)
          else this.allCheckEvent(false)
        },
        allDelBtnEvent(){
          this.cartList.forEach((value,key)=>{
            for(let iten of value.data){
              if(item.cb){
                
              }
            }
          })
        },
        delTrans(){
          if(this.delTransText=='管理') {
            this.delTransText='完成'
            this.submitOff=false
          }else{
            this.delTransText='管理'
            this.submitOff=true
          }
        },
        IconShopBtn(id){ //购物车列表左侧店铺全选
        try{
          for(let value of this.cartList){
            if(value.shopId==id){
              value.cb=!value.cb
                for(let item of value.data){
                  if(value.cb) item.cb=true 
                  else item.cb=false
                }
                this.IconAllPrice()
              throw new Error('跳出循环')
            }
          }
        } catch(err){}
        },
        IconProductBtn(shopId,id){ //购物车列表左侧商品单选按钮
        let checkCount=0
        try{
          this.cartList.forEach((value,key)=>{
            if(value.shopId==shopId){
              let count=value.data.length
                for(let item of value.data){
                  if(item.id==id){
                    item.cb=!item.cb
                  }
                  if(item.cb) checkCount++
                }
                if(checkCount==count) value.cb=true
                else value.cb=false
                this.IconAllPrice()
              throw new Error()
            }
          })
        }catch(err){}
        },
        IconAllPrice(){ //计算所有选中商品的价格
        var allPrice=0
          for(let value of this.cartList){
            for(let item of value.data){
              if(item.cb){
                allPrice=allPrice+item.price*item.num
              }
            }
          }
          this.allPrice=allPrice*100
        },
        allCheck(value){// 选择全部商品
          if(value) this.allCheckEvent(true)
            else this.allCheckEvent(false)
        },
        allCheckEvent(value){//全选按钮封装方法
          for(let values of this.cartList){
            values.cb=value
            for(let item of values.data){
              item.cb=value
            }
          }
          this.IconAllPrice()
        },
        shopBtn(key){
            this.popupOff=true
            this.addCart.price=this.shopList[key].price
            this.addCart.imgSmall=this.shopList[key].imgSmall
            this.addCart.remark=this.shopList[key].account
            this.addCart.spec=this.shopList[key].sel
            this.addCart.cash=this.shopList[key].cash
        },
        shopAdd(){
          if(this.shopOff){
              setTimeout(()=>{
              var list=this.shopAll
              if(this.shopList.length==6){
                  this.shopList=this.shopList.concat(this.shopAll.slice(6,12))
              }else if(this.shopList.length<13){
                  this.shopList=this.shopList.concat(this.shopAll.slice(12,18))
              }else if(this.shopList.length<19){
                  this.shopList=this.shopList.concat(this.shopAll.slice(18,23))
              }else{
                  this.shopOff=false
                  this.shopLOaderText='没有更多了'
              }
              },300)
          }
      },
      onSubmitBtn(){
        Toast({
            message:'请登录',
            duration:1000
        })
        setTimeout(()=>{
            this.$router.push({path:'/login'})
        },1000)
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
      setTimeout(()=>{
          inter.observe(this.$refs.tabs)
      },0)
      // 进步器样式
      // this.$refs.stepper.$vnode.elm.getElementsByClassName("van-stepper__input")[0].style.width="24px"
    }
}
</script>
<style scoped lang='less'>
.home{
    width:100vw;
    // padding-bottom:50px;
    padding:50px 0;
    height:100vh;
    overflow-y:scroll;
    .header{
        width:100%;
        height:28vh;
        // border:1px solid red;
        background-color:#F5F5F5;
        background-image:url(http://127.0.0.1:5050/test/effectcart01.png);
        background-repeat:no-repeat;
        background-size:88px 90px;
        background-position:center 4vh;
        text-align:center;
        padding-top:15vh;
        p{
            color:#999;
            font-size:0.9rem;
            padding-bottom:2vh;
        }
        .stroll{
            color:#999;
            background-color:#f5f5f5;
            border:1px solid #e7e7e7;
        }
    }
    .cartMan{
      position:fixed;
      left:0;
      top:0;
      z-index:1;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 3.5vw;
      height:50px;
      width:100%;
      background-color:#fff;
      border-bottom:1px solid #f3f3f3;
      color:#333;
    }
    .cartList{
      .com{
        padding:2.5vh 3.5vw;
        padding-bottom:0;
        width:100%;
        .shopName{
          display:flex;
          
          .right{
            margin-left:3.5vw;
            display:flex;
            align-items:center;
            p{
              color:#333;
              font-size:0.94rem;
              margin-left:1vw;
            }
          }
        }
        .bottom{
          display:flex;
          align-items:center;
          margin-top:2vh;
          .content{
            background-color:#f5f5f5;
            margin-left:3.5vw;
            display:flex;
            padding:1.5vh 2vw;
            width:84vw;
            .right{
              padding-left:2vw;
              width:60vw;
              // border:1px solid red;
              display:flex;
              flex-direction:column;
              justify-content:space-between;
              .title{
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                width:80%;
                font-size:0.9rem;
              }
              .elect{
                P{
                  font-size:0.8rem;
                  padding:0.2vh 1vw;
                  color:#999;
                  background-color:#e6e6e6;
                  display:inline;
                }
              }
              .label{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding-right:3.5vw;
                .price{
                  color:#333;
                  span{
                    font-size:1rem;
                    font-weight:600;
                  }
                }
                .stepper{
                  border:1px solid #A5A6A6;
                  border-radius:4px;
                  padding:.0.5vh 0.5vw;
                }
              }
            }
          }
        }
      }
    }
    .submit{
      position:fixed;
      z-index:3;
      left:0;
      bottom:50px;
      border-top:1px solid #f3f3f3;
    }
    .delCart{
      position:fixed;
      border-top:1px solid #f3f3f3;
      z-index:1;
      left:0;
      bottom:50px;
      height:50px;
      width:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:0 3.5vw;
      background-color:#fff;
      .left{
        display:flex;
        p{
          margin-left:10px;
          font-size:0.9rem;
          color:#333;
        }
      }
      .btn{
        width:110px;
        height:40px;
        border-radius:24px;
        font-size:0.9rem;
      }
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
    .shopList{
    width:100%;
    white-space: wrap;
    padding:0 2vw;
    padding-top:2vh;
    // text-align:left;
    .com{
      width:50%;
      display:inline-block;
      padding:0 2vw;
      padding-bottom:1vh;
      // border:1px solid red;
      .img{
        position: relative;
        display:flex;
        justify-content:center;
        align-items:center;
        .empty{
          position:absolute;
          z-index:1;
          width:100%;
          height:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          .pad{
            width:70px;
            height:70px;
            // border:1px solid red;
            border-radius:50%;
            background-color:rgba(0,0,0,.4);
            color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            align-items:center;
          }
        }
      }
      .title{
        overflow:hidden;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color:#333;
        margin-bottom:1vh;
        height:42px;
      }
      .label{
        width:100%;
        // border:1px solid red;
        margin-bottom:1vh;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .price{
          color:#fe0003;
          font-weight:600;
          width:50%;
        }
        .adds{
          width:50%;
          // border:1px solid red;
          font-size:0.9rem;
          color:#999;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
      .cart{
        display:flex;
        justify-content:space-between;
        align-items:center;
        height:24px;
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
      margin:3vh 0;
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