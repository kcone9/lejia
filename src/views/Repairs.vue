<template>
    <div class="repairs">
        <div class="select">
            <p class="title">请选择故障</p>
            <div class="content" :style="{height:contentActive}">
                <p v-for='(item,i) of plist' :key='i' @click='pBtn(i)' :class="{'active':item.cb}">{{item.text}}</p>
            </div>
            <div @click='more(moreOff)'>其他 <van-icon :name='moreIcon'/></div>
            <textarea class="textarea" placeholder="请填写故障详细描述"></textarea>
        </div>
        <div class="hr"></div>
        <div class="input">
            <van-field v-model="useName" placeholder="请输入您的姓名" label="姓名" right-icon="close"/>
            <van-field v-model="phone" type='tel' placeholder="请输入您的手机号码" label="电话" right-icon="close"/>
        </div>
        <div class="hr"></div>
        <div class="hr"></div>
        <div class="submit">
            <van-button size='large' color='#C8013C' type="primary">确认提交</van-button>
            <!-- <div class="hr"></div> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            plist:[],
            moreOff:false,
            moreIcon:'arrow-up',
            contentActive:'16.2vh',
            phone:'',
            userName:''
        }
    },
    methods:{
        init(){
            var list=[{text:'件未取，误关箱门'},{text:'取件跳转到投递界面'},{text:'件未取，显示已取件'},{text:'输入密码，提示无效/错误'},{text:'输入密码箱门未开'},{text:'触摸屏失灵'},{text:'黑屏'},{text:'要求屏蔽/解禁'},{text:'误删取件码'},{text:'短信/柜子地址问题'},{text:'输入密码提示箱门故障'},{text:'摄像头不工作'},{text:'死机'},{text:'蓝花屏'},{text:'白屏/蓝屏（软件故障）'},{text:'未收到取件码'},{text:'取件后仍有短信提醒'},{text:'开箱，空箱'},{text:'调监控'},{text:'断电后无法取件'},{text:'管理员回收'},{text:'收费类用户不满意'}]
            list.forEach((value,key)=>{
                value.cb=false
            })
            this.plist=list
            this.screenHeight()
        },
        screenHeight(){
            switch(window.screen.height){
                case 640:
                    this.contentActive='18.2vh'
                    break
                case 568:
                    this.contentActive='19.2vh'
                    break
                case 667:
                    this.contentActive='17.2vh'
                    break
                default :
                    this.contentActive='16.2vh'
            }
            return this.contentActive
        },
        pBtn(event){
            this.plist.forEach((value,key)=>{
                value.cb=false
                if(key==event){
                    value.cb=true
                }
            })
        },
        more(boolean){
            if(boolean){
                this.moreIcon='arrow-up'
                this.contentActive=this.screenHeight()
            }else{
                this.moreIcon='arrow-down'
                this.contentActive=''
            }
            this.moreOff=!this.moreOff
        }
    },
    created(){
        this.init()
    }
}
</script>
<style scoped lang='less'>
.repairs{
    background-color:#f5f5f5;
    width:100%;
    height:100vh;
}
.hr{
    width:100%;
    height:2vh;
    // background-color:#F5F5F5;
}
.select{
    padding:0 5vw;
    background-color:#fff;
    .title{
        padding:2.2vh 0;
        color:#333;
        // padding-left:5vw;
        font-size:1.1rem;
    }
    .content{
        width:100%;
        display:flex;
        flex-wrap:wrap;
        overflow:hidden;
        p{
            border:1px solid #666;
            border-radius:18px;
            color:#666;
            padding:0.8vh 2vw;
            margin-right:1.2vw;
            margin-bottom:1.2vh;
            font-size:0.96rem;
        }
        .active{
            border:none;
            color:#fff;
            background-color:#C8013C;
        }
    }
    .textarea{
        width:100%;
        height:12vh;
        margin:2vh 0;
        padding:2vw;
        font-size:0.9rem;
        resize:none;
    }
}
.submit{
    padding:0 4vw;
    width:100%;
    background-color:#f5f5f5;
    // border:1px solid red;
}
</style>