<template>
    <div class="banner">
        <!-- 编辑 -->
        <div v-if="!show&&type=='edit'">
            <div style="padding:30px"><el-button type="primary" plain @click="back()">列表</el-button></div>
            <div style="margin-top:30px">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="排序">
                    <el-input v-model="formLabelAlign.sort">
                        <i slot="prefix" class="el-icon-edit"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-image
                    prop="image" 
                    style="width: 100px; height: 100px"
                    :src="formLabelAlign.image" 
                   >
                </el-image>
                </el-form-item>
                <el-form-item>
                    <div class="upload">
                        <el-input v-model="formLabelAlign.filename"></el-input>
                        <el-upload><el-button type="primary" plain @click="liulan()">浏览</el-button></el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <div class="btn1">
                <el-button type="warning" plain @click="clear()">重置</el-button>
                <el-button type="primary" plain @click="submit()">提交</el-button>
            </div>
            </div>
        </div>
        <div v-if="!show&&type=='show'">
            <div style="padding:30px"><el-button type="primary" plain @click="back()">列表</el-button></div>
            <div style="margin-top:30px">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="排序">
                    <el-input v-model="formLabelAlign.sort" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片">
                     <el-image
                        prop="image" 
                        style="width: 100px; height: 100px"
                        :src="formLabelAlign.image" 
                    >
                    </el-image>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input v-model="formLabelAlign.createTime" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-input v-model="formLabelAlign.UpdateTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-form>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list" v-if="show">
            <div class="btn">
                <el-button type="danger" plain @click="Alldel()">批量删除</el-button>
                <el-button type="primary" plain @click="submit()">新增</el-button>
        </div>
        <el-table :data="tableData"
        @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
            </el-table-column>
            <el-table-column prop="image" label="图片">
                <template slot-scope="scope">
                    <el-image
                    prop="image" 
                    style="width: 100px; height: 100px"
                    :src="scope.row.image" 
                   >
                </el-image>
                </template>
                
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
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
        </div>
        <div class="add" v-if="!show&&type=='add'">
            <div class="top">
                <span>轮播图管理</span>
                <span>创建</span>
            </div>
            <div class="main">
                <div class="hea">
                    <div class="left">创建</div>
                    <div class="right"><el-button type="primary" plain @click="back()">列表</el-button></div>
                </div>
                <div class="bottom">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                        prop="id"
                        label="排序"
                    >
                        <el-input-number v-model="num" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item
                        label="图片">
                        <!-- <el-button size="small" type="primary">选取文件</el-button> -->
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="http://localhost:8080/api/banner"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-change="Change"
                            :auto-upload="false"
                            :data="{id:num}"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            list-type="picture-card"
                            name="img">
                            <i class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitUpload">提交</el-button>
                        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="fy" v-if="show">
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
</template>
<script>
export default {
    data(){
        return{
            dynamicValidateForm: {
                id: ''
            },
            tableData:[],
            show:true,
            num:1,
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            type:'',
            formLabelAlign: {},
            currentPage: 1,
            labelPosition: 'right',
            multipleSelection: []
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        //获取列表
        getList(){
            this.$http.get('api/banner').then(res=>{
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
        //新增
        submit(){
            this.show = false
            this.type='add'
        },
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
            this.show = false
            this.type="edit"
        },
        handleShow(index,row){
            this.formLabelAlign = row
            this.show = false
            this.type="show"
            console.log('-----',index,row)
        },
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
        Alldel(){
            let param = {}
            if(this.multipleSelection.length){
                this.$http.post('api/delete/delBanner',param).then(res=>{
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
        //返回列表页
        back(){
            this.show = true
            this.getList()
        },
        handleChange(value){
            console.log(value);
        },
        //上传文件
        submitUpload() {
            this.$refs.upload.submit();
        },
        //文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //点击文件列表中已上传的文件时的钩子
        handlePreview(file) {
            console.log(file);
        },
        //文件超出个数限制时
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        //上传文件之前的钩子，参数为上传的文件
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        Change(file,fileList){
            console.log('==============',file,fileList);
            if(file.status=='success'){
                if(file.response.status==1){
                this.dialogImageUrl = file.response.data.url
                this.dialogVisible = true
                this.$message({
                showClose: true,
                message: file.response.message,
                type: 'success'
            });
            }else{
                this.$message({
                showClose: true,
                message: file.response.message,
                type: 'error'
            });
            }
            }
            
        }
    }
}
</script>
<style lang="less" scoped>
.banner{
    background: #fff;
    height:100%;
}
.btn{
    display: flex;
    justify-content: space-between;
    text-align: right;
    // margin-bottom:30px;
    padding:30px;
}
 .btn1{
    //   margin-top:60px;
      padding:30px;
      width:25rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
  }
.top{
    span:first-child{
        display: inline-block;
        font-size: 36px;
    }
}
.main{
    background: #fff;
    margin-top:30px;
    padding:30px;
    .hea{
        display:flex;
        justify-content: space-between;
    }
    .bottom{
        margin-top:30px;
    }
}
.fy{
      margin-top:30px;
      text-align: right;
  }
   .el-input{
      width:20rem;
  }
  .upload{
      display: flex;
  }
</style>