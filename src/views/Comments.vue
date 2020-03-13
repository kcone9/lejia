<template>
    <div class="home">
        <div class="header" ref="header">
            <div class="item">
                <div class="com" v-for="(item,i) of starText" :key="i" v-show="i<4" @click="commentsBtn(i)">
                    <p :class="{'comActive':item.cb}">{{item.text}}</p>
                </div>
            </div>
            <div class="item item-start">
                <div class="com" v-for="(item,i) of starText" :key="i" v-show="i>=4" @click="commentsBtn(i)" >
                    <p :class="{'comActive':item.cb}">{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="comtentList" v-show="commentNot">
            <div class="pad" v-for="(item,i) of swipeList" :key="i">
                <div class="com">
                    <div class="between">
                        <div class="left">
                            <van-image width="35px" height="35px" :src="$store.state.domain+item.author_src" round />
                            <div class="text">
                                <p>{{item.author}}</p>
                                <van-rate v-model="item.star" :size="12" color="#FFA201" void-icon="star" void-color="#f5f5f5" />
                            </div>
                        </div>
                        <div class="data">{{item.comment_time}}</div>
                    </div>
                    <div class="item">
                        <p class="spec">{{item.spec}}</p>
                    </div>
                    <div class="item">
                        <p class="commentText">{{item.text}}</p>
                    </div>
                </div>
            </div>
            <div class="load" ref="load">
              <p>{{shopLOaderText}}</p>
              <van-loading type="spinner" v-show="loadOff"/>
            </div>
        </div>
        <div class="conmentNot" v-show="!commentNot" :style="{height:commentNotHeight+'px'}">
            <div class="pad">
                <van-image :src="$store.state.domain+'/test/commentNot.png'" width="100px" height="76px"/>
                <p>暂无评论!</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Comments',
    data(){
        return {
            starText:[],
            star:5,
            shopLOaderText:'正在加载',
            shopOff:false,
            loadOff:true,
            swipeList:[],
            commentStar:0,
            commentPageCount:1,
            commentNot:true,
            commentNotHeight:0
        }
    },
    methods:{
        commentBtnText(){ // 评分按钮文本信息
            var list=[{text:'全部'},{text:'五星'},{text:'四星'},{text:'三星'},{text:'二星'},{text:'一星'}]
            list.forEach((value,key)=>{
                if(key==0) value.cb=true
                else value.cb=false
                value.id=key
            })
            this.axios.get(this.$store.state.domain+'lejia/commentCount').then(res=>{
                var count=0
                list.forEach((value,key)=>{
                    if(key>0){
                        for(let item of res.data.data){
                            if((6-key)==item.star){
                                value.text=value.text+`(${item.count})`
                                count=count+item.count
                            }
                        }
                    }
                })
                list[0].text=list[0].text+`(${count})`
                this.starText=list
            })
            
        },
        commentsBtn(id){
            var list=[]
            this.starText.forEach((value,key)=>{
                if(key==id) value.cb=true
                else value.cb=false
            })
            this.commentStar=6-id
            if(id!=0) {
                var str=this.starText[id].text.slice(3,this.starText[id].text.length-1)
                if(parseInt(str)==0) this.commentNot=false
                else this.commentPage(1,this.commentStar,true)
            }
            else {
                
                this.commentPage(1,0,true)
                this.commentStar=0
            }
            this.commentPageCount=1
        },
        commentsStar(star){
            this.axios.get(this.$store.state.domain+'lejia/commentSatr?star='+star).then(res=>{
                if(res.data.code==1){
                    this.swipeList=res.data.data
                }
            })
        },
        commentPage(page,star,starBoolean){
            // console.log(233)
            if(page==undefined) page=1
            if(star==undefined) star=0
            if(starBoolean==undefined) starBoolean=false
            this.axios.get(this.$store.state.domain+'lejia/comment?page='+page+'&star='+star).then(res=>{
                if(res.data.code==1){
                    var list=res.data.data
                    for(let value of list) {value.comment_time=value.comment_time.slice(0,value.comment_time.indexOf('T'))}
                    if(starBoolean) this.swipeList=list
                    else this.swipeList=this.swipeList.concat(list)
                    if(list.length<5) {
                        this.shopOff=false
                        this.shopLOaderText='没有更多了'
                        this.loadOff=false
                    }
                    else this.shopOff=true
                    this.commentNot=true
                }else {
                    this.loadOff=false
                    this.shopOff=false
                    this.shopLOaderText='没有更多了'
                    // this.commentNot=false
                }
            })
        },
        shopAdd(){
            if(this.shopOff){
                this.shopOff=false
                this.shopLOaderText='正在加载'
                this.loadOff=true
                setTimeout(()=>{
                    ++this.commentPageCount
                    this.commentPage(this.commentPageCount,this.commentStar) //5星时执行替换操作
                },1000)
            }
        },
        noMoreEvent(value){
            this.shopOff=false
            this.shopLOaderText='没有更多了'
        },
        load(){
            var inter=new IntersectionObserver(
            (event)=>{
                if(event[0].isIntersecting){
                this.shopAdd()
                }
            })
            inter.observe(this.$refs.load)
        }
    },
    created(){
        this.commentBtnText()
        this.commentPage(1,0)
        

    },
    mounted(){
        this.load()
        this.commentNotHeight=window.screen.height-this.$refs.header.clientHeight
    }
}
</script>
<style lang="less" scoped>
.home{
    width:100vw;
    height:100vh;
    .header{
        width:100%;
        padding:0 3.5vw;
        padding-top:3vh;
        padding-bottom:2vh;
        .item{
            display:flex;
            justify-content:space-between;
            // margin-bottom:2vh;
            .com{
                width:25%;
                display:flex;
                justify-content:center;
                p{
                    width:90%;
                    border-radius:16px;
                    // border:1px solid red;
                    background-color:#f3f4f5;
                    color:#333;
                    text-align:center;
                    height:30px;
                    line-height:30px;
                    font-size:0.9rem;
                }
                .comActive{
                    border:1px solid #fe0002;
                    color:#fe0002;
                    background-color:#fcf3f1;
                }
            }
        }
        .item-start{
            justify-content:flex-start;
            margin-top:2vh;
        }
    }
    .comtentList{
        .pad{
            padding-bottom:1vh;
            background-color:#f5f5f5;
            
        }
        .load{
            // border:1px solid red;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#666;
            height:36px;
            p{
                margin-right:10px;
                font-size:0.9rem;
            }
        }
        .com{
            padding:1vh 3.5vw;
            background-color:#fff;
            .between{
                display:flex;
                justify-content:space-between;
                align-items:center;
                .left{
                    display:flex;
                    .text{
                        margin-left:3.5vw;
                        p{
                            font-size:0.9rem;
                        }
                    }
                }
                .data{
                    font-size:0.9rem;
                }
            }
            .item{
                margin-top:1vh;
                .spec{
                    color:#999;
                    font-size:0.9rem;
                }
                .commentText{
                    color:#333;
                    font-size:0.9rem;
                    height:40px;
                    overflow:hidden;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
            }
        }
    }
    .conmentNot{
        padding-top:8vh;
        background-color:#f5f5f5;
        .pad{
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
             p{
                 margin-top:1vh;
                color:#999;
                font-size:0.9rem;
            }
        }
        
        
       
    }
}
</style>