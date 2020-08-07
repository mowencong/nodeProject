<template>
    <div class="login" 
    v-loading="loading"
    element-loading-text="正在跳转到首页">
        <div class="main">
            <header>登录</header>
            <div class="inp">
                <div class="username">
                    <el-input v-model="username" placeholder="请输入用户名" :autofocus="show"></el-input>
                </div>
                <div class="password">
                    <el-input v-model="password" placeholder="请输入密码" :showPassword="show" :autofocus="show"></el-input>
                </div>
            </div>
            <div class="btn">
                <div class="left">
                    <el-checkbox v-model="checked">记住我</el-checkbox>
                </div>
                <div class="right" @click="login()">
                    登录
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            password:'',
            username:'',
            show:true,
            checked: true,
            loading: false
        }
    },
    methods:{
        login(){
            let param = {
                username:this.username,
                password:this.password
            }
            this.$http.post('api/alogin',param).then(res=>{
                if(res.data.status == 1){
                    localStorage.setItem('user',JSON.stringify(res.data))
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    this.loading = true
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/'
                        })
                        this.loading =false
                    },2000)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #eee;
    .main{
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        background: #fff;
        width:400px;
        padding: 40px 0;
        // height:200px;
        header{
            height:30px;
            line-height: 30px;
            text-align: center;
        }
        .inp{
            padding:0 40px;
            .password,.username{
                margin:20px;
            }
        }
        .btn{
            padding:0 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .right{
                cursor: pointer;
                width:60px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background:#3c8dbc;
                color:#fff;
            }
        }
    }
}
</style>