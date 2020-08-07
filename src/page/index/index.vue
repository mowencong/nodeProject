<template>
    <div class="home">
        <el-container style="height: 800px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu 
                class="el-menu-vertical-demo"
                :default-active='active'
                background-color="#1F3058"
                text-color="#fff"
                active-text-color="#ffd04b"
                @open="handleOpen"
                @close="handleClose"
                @select="goPath">
                <el-menu-item index="home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Home</span>
                </el-menu-item>
                <el-menu-item index="userlist">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-submenu index="content">
                    <template slot="title"><i class="el-icon-menu"></i>内容管理</template>
                    <el-menu-item-group>
                    <!-- <template slot="title">分组一</template> -->
                    <el-menu-item index="banner">轮播图</el-menu-item>
                    <el-menu-item index="artical">文章管理</el-menu-item>
                    <el-menu-item index="info">公告管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="commodity">
                    <template slot="title"><i class="el-icon-shopping-cart-full"></i>商品管理</template>
                    <el-menu-item-group>
                    <el-menu-item index="classify">分类管理</el-menu-item>
                    <el-menu-item index="price">价格标签</el-menu-item>
                    <el-menu-item index="good">商品管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="order">
                    <i class="el-icon-user"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="setting">
                    <i class="el-icon-user"></i>
                    <span slot="title">系统配置</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- <span>{{user.user_name}}</span> -->
                </el-header>
                
                <el-main>
                    <router-view></router-view>
                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return{
            // tableData: Array(20).fill(item),
            tableData:[],
            user:null,
            show:false,
            type:'',
            labelPosition: 'right',
            formLabelAlign: {},
            currentPage: 1,
            active:'home'
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem('user'))
    },
    mounted(){
    },
    methods:{
        //菜单栏打开
        handleOpen(key, keyPath) {
            this.active = key
        console.log(key, keyPath);
        },
        //菜单栏关闭
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //路由跳转
        goPath(index, indexPath){
            console.log(index, indexPath);
            this.$router.push({name:index})
        },
    }
}
</script>
<style lang="less" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-menu-item.is-active {
    background-color: #409eff !important;
    color: #ffffff !important;
  }
  .el-main{
      background: #eee;
  }
  .el-input{
      width:20rem;
  }
  .btn{
      margin-top:60px;
      width:25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .fy{
      margin-top:30px;
      text-align: right;
  }
</style>