<template>
    <div class="print">
        <img class="detail" :src="image" alt="">
        <div class="btn">
            <van-button size='large' color='#C7003B'>一键预约</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imageList:['https://kcone-1258907579.cos.ap-guangzhou.myqcloud.com/print.jpg?q-sign-algorithm=sha1&q-ak=AKIDZsBMTT6bBkrWJAzeqzMse1U9YXb6UFW0AJVvcgDB7Lle-2cycUFnUkfUhgivsAom&q-sign-time=1579062093;1579065693&q-key-time=1579062093;1579065693&q-header-list=&q-url-param-list=&q-signature=c91b614d5a150521d81e4895dae9130215c4bfc5&x-cos-security-token=8lcXwsJFLqX8Eg1MlMWMSXFau1Wev6sNed6c52b6dfdf8c0af70546eb74996309Z0wduAIs3OvQPSek8LAlXAIa1vAHGNJ_vA8NBLJ3jcXGC4AQ8E2eoysLTebvgPTXK2x_4fwsj9uNDlA12JqxpYuLjRNt0F2jYSlcL2UuMRiVAZV7iNwKv1jMjUjKNmYIgO23sM4gPXpglU0U1r20zTQNgllP7Do77YEEbDhOS68','https://kcone-1258907579.cos.ap-guangzhou.myqcloud.com/print2.jpg?q-sign-algorithm=sha1&q-ak=AKID3deM76sSqs8umPz6kGJfVGn_gRDFdtahOj9PuPwYOyaM1jeeALWY0LenCT94Hidu&q-sign-time=1579062477;1579066077&q-key-time=1579062477;1579066077&q-header-list=&q-url-param-list=&q-signature=1fe2764ce7de7557afcc36cc838f623ad11898d2&x-cos-security-token=8lcXwsJFLqX8Eg1MlMWMSXFau1Wev6sNd30f3e913c609be266e99bd72f64ae16Z0wduAIs3OvQPSek8LAlXAKwQcxYOQL7Y_ah37RoXne6j-KKVEJLZXlDaEdkmwnlvdbGhKNbJzVs6YMik_4RUNycZDoCS7W6dzRsLGUEYRZS5V-Q3RtM3gGlr4j-d1s6sRyhMVXq32gBhWYNZ6tMXl4vEfv6zG8G7RFa3j-snv8'],
            image:''
        }
    },
    methods:{
        init(){
            if(!this.$route.query.id){
                this.image=this.imageList[0]
            }else{
                this.image=this.imageList[this.$route.query.id]
            }
        }
    },
    created(){
        this.init()
    }
}
</script>
<style scoped lang='less'>
.print{
    width:100%;
    height:100vh;
    overflow-y:scroll;
    // position:relative;
    // border:1px solid red;
    .detail{
        width:100%;
        height:auto;
    }
    .btn{
        bottom:0;
        left:0;
        position:fixed;
        width:100%;
    }
}

</style>

