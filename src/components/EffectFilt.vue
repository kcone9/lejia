<template>
    <div class="home">
        <van-image src="http://127.0.0.1:5050/test/filt01.jpg"/>
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
        <div class="rule">
            <van-image :src="$store.state.domain+'test/filt02.png'" width="102px" fit="contain"/>
            <div class="right">
                <div class="title">·推选规则说明·</div>
                <p>1.乐家诚品每期有3款产品供用户推选</p>
                <p>2.用户推选最喜欢的产品，推选数最多则优先上架</p>
                <p>3.推选截止后，所推选产品上架的用户获得大额体验券，其他参与用户赠送小额体验券</p>
                <p>4.最终解释权归日日顺乐家所有</p>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            swipeList:[]
        }
    },
    methods:{
        init(){
            //获取轮播数据
            this.axios.get(this.$store.state.domain+'lejia/omnibus').then(res=>{
                this.swipeList=res.data
            })
        }
    },
    created(){
        this.init()
    }
}
</script>
<style scoped lang="less">
.home{
    width:100vw;
    padding-bottom:50px;
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
  .rule{
      display:flex;
      padding:2vh 3.5vw;
      .img{
          width:30vw;
          display:flex;
          align-items:center;
          justify-content:center;
          padding-left:1vw;
      }
      .right{
          width:70vw;
          padding-left:1vh;
          .title{
              color:#333;
              font-weight:700;
              font-size:1rem;
              margin-bottom:2vh;
          }
          p{
              color:#7e7e7e;
              font-size:0.9rem;
              line-height:3.5vh;
          }
      }
  }
}
</style>