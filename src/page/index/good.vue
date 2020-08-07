<template>
    <div class="good">
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
                <el-table-column prop="id" label="类型">
                </el-table-column>
                 <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="banner" label="轮播图">
                </el-table-column>
                <el-table-column prop="price" label="价格">
                </el-table-column>
                <el-table-column prop="price" label="销量">
                </el-table-column>
                 <el-table-column prop="price" label="库存">
                </el-table-column>
                 <el-table-column prop="price" label="推广码">
                </el-table-column>
                 <el-table-column prop="price" label="更新时间">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            show:false,
            tableData:[],
            currentPage:1,
        }
    },
    methods:{
        handleEdit(index, row) {
            console.log('---',index, row);
            this.formLabelAlign = row
            this.show = true
            this.type="edit"
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
         add(){
            this.show = true
        },
         handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log('选择的想？',val)
        },
         //上一页下一页pageSize 改变时会触发
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        //当前页currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
    }
}
</script>
<style lang="less" scoped>
.good{
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