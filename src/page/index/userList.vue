<template>
    <div class="user">
        <!-- 编辑 -->
        <div v-if="show&&type=='edit'">
            <el-button type="primary" plain @click="back()">列表</el-button>
            <div style="margin-top:30px">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="用户昵称">
                    <el-input v-model="formLabelAlign.name">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="formLabelAlign.mobile">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="formLabelAlign.password">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="支付密码">
                    <el-input v-model="formLabelAlign.pay_pass">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="推广码">
                    <el-input v-model="formLabelAlign.share_code">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button type="warning" plain @click="clear()">重置</el-button>
                <el-button type="primary" plain @click="submit()">提交</el-button>
            </div>
            </div>
        </div>
        <!-- 显示 -->
        <div v-if="show&&type=='show'">
            <el-button type="primary" plain @click="back()">列表</el-button>
            <div style="margin-top:30px">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="用户昵称">
                    <el-input v-model="formLabelAlign.name" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="formLabelAlign.mobile" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="formLabelAlign.password" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="支付密码">
                    <el-input v-model="formLabelAlign.pay_pass" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="推广码">
                    <el-input v-model="formLabelAlign.share_code" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input v-model="formLabelAlign.CreateTime" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-input v-model="formLabelAlign.UpdateTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-form>
            </div>
        </div>
        <!-- 子组件显示 -->
    <div v-if="!show">
        <div style="padding:30px">
            <el-button type="danger" plain @click="allDel()">批量删除</el-button>
        </div>
    <el-table :data="tableData"
    @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column prop="id" label="用户ID">
        </el-table-column>
        <el-table-column prop="mobile" label="用户号码" :show-overflow-tooltip="true" width="120">
            <template slot-scope="scope">
                <a href="http://baidu.com">{{scope.row.mobile}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="UpdateTime" label="修改时间">
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)">显示</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
        <div class="fy" v-if="!show">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
            </el-pagination>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        const item = {
            id:1,
            mobile:'法国发过法国风格非官方',
            CreateTime:'2016-05-02',
            UpdateTime: '2016-05-02',
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
            multipleSelection: []
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem('user'))
    },
    mounted(){
        this.getUser()
    },
    methods:{
        //上一页下一页pageSize 改变时会触发
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        //当前页currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleEdit(index, row) {
            console.log('---',index, row);
            this.formLabelAlign = row
            this.show = true
            this.type="edit"
        },
        handleShow(index,row){
            this.formLabelAlign = row
            this.show = true
            this.type="show"
            console.log('-----',index,row)
        },
        //单个删除
        handleDelete(index, row) {
            console.log('===',index, row);
            let param = {
                id:row.id
            }
            this.$http.post('api/delete',param).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.getUser()
                    },500)
                    setTimeout(()=>{
                        this.show = false
                        this.type = ''
                    },2000)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
        },
         handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log('选择的想？',val)
        },
        //批量删除
        allDel(){
            let param = {}
            if(this.multipleSelection.length){
                this.$http.post('api/delete/delAlluser',param).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.getUser()
                    },500)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
            }else{
                this.$message({
                    showClose: true,
                    message: '请选择要删除的项',
                    type: 'error'
                });
            }
        },
        //返回列表页
        back(){
            this.show = false
            this.type = ''
        },
        //重置
        clear(){
            this.formLabelAlign = {}
        },
        //修改提交
        submit(){
            let param = {
                id:this.formLabelAlign.id,
                username:this.formLabelAlign.name,
                password:this.formLabelAlign.password,
                pay_pass:this.formLabelAlign.pay_pass,
                share_code:this.formLabelAlign.share_code
            }
            this.$http.post('api/update',param).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.show = false
                        this.type = ''
                    },2000)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
        },
        getUser(){
            //获取注册用户
            this.$http.get('api/user').then(res=>{
                if(res.data.status == 1){
                    this.tableData = res.data.list || []
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
.user{
    background: #fff;
    height:100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
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
      padding:0 20px;
  }
</style>