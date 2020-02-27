<template><!--商品列表组件-->
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
</template>
<script>
export default {
    name:'',
    data(){
        return {
          shopList:[],
          shopOff:true,
          shopAll:[]
        }
    },
    methods:{
      init(){
        this.axios.get(this.$store.state.domain+this.data).then(res=>{
          var list=res.data
          this.shopAll=list
          this.shopList=list.slice(0,6)
          this.shopAll=res.data
        })
      },
      shopBtn(i){
        // console.log(i)
        this.$emit('sonShopBtn',this.shopList[i],i)
      },
      shopAdd(){
        setTimeout(()=>{
          var list=this.shopAll
          if(this.shopList.length==6){
            this.shopList=this.shopList.concat(this.shopAll.slice(6,12))
          }else if(this.shopList.length<13){
            this.shopList=this.shopList.concat(this.shopAll.slice(12,18))
          }else if(this.shopList.length<19){
            this.shopList=this.shopList.concat(this.shopAll.slice(18,23))
          }else{
            this.$emit('noMore',false)
          }
          },300)
      },
      tabs(name){
        if(name==0){
            this.shopList=this.shopAll
            
        }else{
          var list=[]
          this.shopAll.forEach((value,key)=>{
            if(name==value.type){
                list.push(value)
            }
          })
          this.shopList=list
        }
      },
      jump(i){
        this.$router.push({name:`Details`,params:{id:i}})
      }
    },
    created(){
        this.init()
    },
    props:['data','title']
}
</script>
<style scoped lang="less">
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
</style>