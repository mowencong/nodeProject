<template>
    <div class="fenlei">
        <div v-if="show">
            <div class="top">
                <div>新增分类</div>
                <el-button type="primary" @click="back">列表</el-button>
            </div>
            <div class="main">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="list" v-if="!show">
            <div class="btn">
                <el-button type="danger" plain @click="Alldel()">批量删除</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="tableData"
            @selection-change="handleSelectionChange"
            >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column prop="id" label="用户ID">
                </el-table-column>
                 <el-table-column prop="name" label="分类名称">
                </el-table-column>
                <el-table-column prop="CreateTime" label="注册时间">
                </el-table-column>
                <el-table-column prop="UpdateTime" label="修改时间">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
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
        return{
            ruleForm:{
                name:'',
            },
            rules:{
                name:[
                    {
                        required:true,message:'请输入商品分类',trigger:'blur'
                    }
                ]
            },
            tableData:[],
            currentPage:1,
            show:false,
            multipleSelection: []
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        //获取分类列表
        getList(){
            this.$http.get('api/classtify').then(res=>{
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
        },
        back(){
            this.show = false
            this.getList()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log('选择的想？',val)
        },
        Alldel(){
            let param = {}
            if(this.multipleSelection.length){
                this.$http.post('api/delete/delAllfenlei',param).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.getList()
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
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let param = {
                  name:this.ruleForm.name
              }
              this.$http.post('api/classtify',param).then(res=>{
                  if(res.data.status == 1){
                      this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$refs[formName].resetFields();
                  }else{
                      this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                  }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleDelete(index, row) {
            console.log('===',index, row);
            let param = {
                id:row.id
            }
            this.$http.post('api/delete/delClass',param).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.getList()
                    },500)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
        },
        //上一页下一页pageSize 改变时会触发
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        //当前页currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        add(){
            this.show = true
        },
    }
}
</script>
<style lang="less" scoped>
.fenlei{
    background: #fff;
    height:100%;
    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:60px;
        line-height: 60px;
        border-bottom:1px solid #ccc;
        padding:0 20px;
        font-size: 28px;
    }
    .main{
        margin-top:30px;
        .el-input{
            width:20rem;
        }
    }
    .list{
        .btn{
            display: flex;
            justify-content: space-between;
            padding:30px;
        }
        .fy{
            margin-top:30px;
            text-align: right;
            padding:0 20px;
        }
    }
}

</style>