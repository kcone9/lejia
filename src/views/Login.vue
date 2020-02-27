<template>
    <div class="login">
        <div class="header">
            <div class="top">
                <van-icon name="arrow-left" color="#fff" size="26px" @click="backBtn"/>
            </div>
        </div>
        <div class="input">
            <van-cell-group>
                <van-field v-model="userName" type="tel" label="用户名" placeholder="请输入你的用户名"/>
                <van-field v-model="passWord" type="password" label="密码" placeholder="请输入密码"/>
            </van-cell-group>
            <div class="btn">
                <van-button type="info" size="large" @click="loginBtn">登录</van-button>
            </div>
        </div>
        <div class="text" @click="test">
            <p class="one">登录即表示您同意<router-link to='/useragree'>《用户注册协议》</router-link></p>
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    data(){
        return {
            userName:'',
            passWord:''
        }
    },
    methods:{
        backBtn(){
            this.$router.go(-1)
        },
        loginBtn(){
            if(this.userName.length==0 || this.passWord.length==0) Toast('用户名和密码不能为空！')
                else {
                    this.axios.post(this.$store.state.domain+'lejia/login',`userName=${this.userName}&passWord=${this.passWord}`,{timeout:10*1000}).then(res=>{
                        if(res.data){
                            var userMessage={userId:res.data[0].id,userName:res.data[0].userName,passWord:res.data[0].passWord}
                            this.$store.dispatch('login',userMessage)
                        }
                    }).catch((err)=>{
                        if(err=='Error: timeout of 10000ms exceeded') Toast('登录超时，请检查网路配置')
                    })
                }
        },
        test(){
            
            console.log(this.$store.state.userMessage)
        }
    }
}
</script>
<style scoped lang='less'>
.login{
    .header{
        width:100%;
        height:38vh;
        // border:1px solid red;
        background-image: url(http://127.0.0.1:5050/test/login1.jpg);
        background-repeat:no-repeat;
        background-position:center;
        background-size:100% 100%;
        line-height:0px;
        .top{
            // border:1px solid red;
            padding-left:2.5vw;
            padding-top:1.4vh;
        }
    }
    .input{
        margin-top:2vh;
        .btn{
            padding:0 16px;
            margin-top:4vh;
        }
    }
    .text{
        width:100%;
        text-align:center;
        margin-top:4vh;
        .one{
            font-size:0.9rem;
            span{
                color:#0894ec;
            }
        }
    }
}
</style>